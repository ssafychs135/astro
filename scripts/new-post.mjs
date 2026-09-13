#!/usr/bin/env node
// Scaffold a new content entry with schema-correct frontmatter.
// Usage: npm run new -- <blog|portfolio> "<제목>" [slug] [--md]
//   slug is optional for English titles; required for Korean titles.
//   Creates .mdx by default; --md creates a plain Markdown file (no components).

import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = path.resolve(import.meta.dirname, '..');

const today = () => {
	const d = new Date();
	const p = (n) => String(n).padStart(2, '0');
	return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

const slugify = (s) =>
	s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const yamlString = (s) => `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

const importLine = (dir, name) => `import ${name} from '../../components/${dir}/${name}.astro';`;

const PORTFOLIO_SECTIONS = ['Overview', 'Architecture', 'Features', 'Defects', 'Result', 'Retrospective'];

const COLLECTIONS = {
	blog: {
		dir: 'src/content/blog',
		frontmatter: (title) => [
			`title: ${yamlString(title)}`,
			`description: ""`,
			`pubDate: ${today()}`,
			`tags: []            # 선택. /blog 태그 필터에 노출. 예: ["RAG", "Agent"]`,
			`# category: ""       # 선택. 예: AI Engineering`,
			`# heroImage: "../../assets/이미지명.jpg"`,
		],
		imports: [
			importLine('troubleshooting', 'Metrics'),
			importLine('troubleshooting', 'Callout'),
			importLine('interactive', 'Term'),
			importLine('interactive', 'DeepDive'),
		],
		body: () => `\n여기에 본문을 작성하세요.\n\n## 정리\n\n## 참고 자료\n`,
	},
	portfolio: {
		dir: 'src/content/portfolio',
		frontmatter: (title) => [
			`title: ${yamlString(title)}`,
			`description: ""`,
			`pubDate: ${today()}`,
			`stack: []           # 필수. 예: ["React", "TypeScript"]`,
			`# role: "담당 영역 (팀 프로젝트)"`,
			`# githubUrl: "https://github.com/ssafychs135/repo"`,
			`# demoUrl: "https://example.com"`,
			`# heroImage: "../../assets/portfolio/이미지명.jpg"`,
		],
		imports: [
			importLine('troubleshooting', 'Section'),
			importLine('troubleshooting', 'Metrics'),
			importLine('troubleshooting', 'Grid'),
			importLine('troubleshooting', 'Flow'),
			importLine('troubleshooting', 'Defect'),
			importLine('troubleshooting', 'Toggle'),
			importLine('troubleshooting', 'Verdict'),
			importLine('troubleshooting', 'Kv'),
		],
		body: (mdx) =>
			mdx
				? '\n' +
					PORTFOLIO_SECTIONS.map(
						(label, i) => `<Section n="${String(i + 1).padStart(2, '0')}" label="${label}">\n\n</Section>\n`,
					).join('\n')
				: '\n' + PORTFOLIO_SECTIONS.map((label) => `## ${label}\n`).join('\n'),
	},
};

const args = process.argv.slice(2);
const md = args.includes('--md');
const [collection, title, slugArg] = args.filter((a) => a !== '--md');

function fail(msg) {
	console.error(`\n  ✗ ${msg}\n`);
	console.error(`  사용법: npm run new -- <blog|portfolio> "<제목>" [slug] [--md]`);
	console.error(`  예시:   npm run new -- blog "RAG 평가 자동화" rag-eval-automation\n`);
	process.exit(1);
}

if (!collection || !COLLECTIONS[collection]) {
	fail(`컬렉션을 지정하세요 (blog | portfolio). 받은 값: ${collection ?? '(없음)'}`);
}
if (!title) fail('제목을 지정하세요.');

const cfg = COLLECTIONS[collection];
const slug = slugArg ? slugify(slugArg) : slugify(title);
if (!slug) {
	fail('한글 제목은 영문 슬러그를 함께 지정하세요. 예: npm run new -- blog "뷰 트랜지션 충돌" view-transition-conflict');
}

const dir = path.join(ROOT, cfg.dir);
const ext = md ? 'md' : 'mdx';
const clash = ['md', 'mdx'].map((e) => path.join(dir, `${slug}.${e}`)).find((f) => existsSync(f));
if (clash) fail(`같은 슬러그의 파일이 이미 있습니다: ${path.relative(ROOT, clash)}`);
const file = path.join(dir, `${slug}.${ext}`);

const imports = md ? '' : `\n${cfg.imports.join('\n')}\n`;
const content = `---\n${cfg.frontmatter(title).join('\n')}\n---\n${imports}${cfg.body(!md)}`;

await mkdir(dir, { recursive: true });
await writeFile(file, content, 'utf-8');

console.log(`\n  ✓ 생성됨: ${path.relative(ROOT, file)}`);
console.log(`  - description을 채우고 본문을 작성하세요.`);
if (collection === 'portfolio') {
	console.log(`  - 필수 항목(stack)을 채워야 빌드가 통과합니다.`);
}
console.log(`  - 이 파일을 커밋해 master에 push하면 바로 공개됩니다. 작성 중에는 커밋하지 마세요.`);
console.log('');
