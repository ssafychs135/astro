#!/usr/bin/env node
// Scaffold a new content entry with schema-correct frontmatter.
// Usage: npm run new -- <blog|portfolio> "<제목>" [slug]
//   slug is optional for English titles; required for Korean titles.

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

const COLLECTIONS = {
	blog: {
		dir: 'src/content/blog',
		frontmatter: (title) => [
			`title: ${yamlString(title)}`,
			`description: ""`,
			`pubDate: ${today()}`,
			`tags: []            # 선택 — /blog 태그 필터에 노출. 예: ["RAG", "Agent"]`,
			`# category: ""       # 선택 — 예: AI Engineering`,
			`# heroImage: "../../assets/이미지명.jpg"`,
		],
		body: `\n여기에 본문을 작성하세요.\n`,
	},
	portfolio: {
		dir: 'src/content/portfolio',
		frontmatter: (title) => [
			`title: ${yamlString(title)}`,
			`description: ""`,
			`pubDate: ${today()}`,
			`stack: []           # 예: ["React", "TypeScript"]`,
			`# role: "Lead Developer"`,
			`# githubUrl: "https://github.com/ssafychs135/repo"`,
			`# demoUrl: "https://example.com"`,
			`# heroImage: "../../assets/이미지명.jpg"`,
		],
		body: `\n### 📝 프로젝트 소개\n\n### 🚀 주요 기능 및 성과\n\n### 💻 기술적 도전 및 해결\n`,
	},
};

const [collection, title, slugArg] = process.argv.slice(2);

function fail(msg) {
	console.error(`\n  ✗ ${msg}\n`);
	console.error(`  사용법: npm run new -- <blog|portfolio> "<제목>" [slug]`);
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
const file = path.join(dir, `${slug}.md`);
if (existsSync(file)) fail(`이미 존재하는 파일입니다: ${path.relative(ROOT, file)}`);

const content = `---\n${cfg.frontmatter(title).join('\n')}\n---\n${cfg.body}`;

await mkdir(dir, { recursive: true });
await writeFile(file, content, 'utf-8');

console.log(`\n  ✓ 생성됨: ${path.relative(ROOT, file)}`);
console.log(`  - description 를 채우고 본문을 작성하세요.`);
if (collection === 'portfolio') {
	console.log(`  - 필수 항목(stack)을 채워야 빌드가 통과합니다.`);
}
console.log('');
