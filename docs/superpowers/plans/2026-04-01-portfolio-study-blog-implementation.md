# 포트폴리오 및 학습 기록 블로그 전환 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 Astro 블로그를 포트폴리오와 학습 기록(Study)으로 분리하여 전문적인 개인 사이트로 전환합니다.

**Architecture:** `content collections`를 활용하여 데이터 구조를 분리하고, 각 콘텐츠 성격에 맞는 전용 레이아웃과 라우팅을 구현합니다.

**Tech Stack:** Astro, TypeScript, Zod (Schema), MDX.

---

### Task 1: 콘텐츠 컬렉션 스키마 정의

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Step 1: `portfolio` 및 `study` 컬렉션 정의 추가**

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const portfolio = defineCollection({
	loader: glob({ base: './src/content/portfolio', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			stack: z.array(z.string()),
			githubUrl: z.string().url().optional(),
			demoUrl: z.string().url().optional(),
			role: z.string().optional(),
		}),
});

const study = defineCollection({
	loader: glob({ base: './src/content/study', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tags: z.array(z.string()),
			category: z.string(),
		}),
});

export const collections = { portfolio, study }; // 기존 blog 제거 또는 유지
```

- [ ] **Step 2: 타입 체크 및 빌드 확인**

Run: `npm run astro check`
Expected: PASS (새로운 컬렉션 폴더가 없어도 스키마 정의는 통과해야 함)

- [ ] **Step 3: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: define portfolio and study content collections"
```

---

### Task 2: 샘플 콘텐츠 및 폴더 생성

**Files:**
- Create: `src/content/portfolio/sample-project.md`
- Create: `src/content/study/sample-note.md`

- [ ] **Step 1: 포트폴리오 샘플 작성**

```markdown
---
title: "나의 첫 프로젝트"
description: "Astro를 이용한 개인 블로그 개발"
pubDate: "2026-04-01"
heroImage: "../../assets/blog-placeholder-1.jpg"
stack: ["Astro", "TypeScript", "React"]
githubUrl: "https://github.com/user/repo"
role: "Full-stack Developer"
---
프로젝트 상세 내용이 여기에 들어갑니다.
```

- [ ] **Step 2: 학습 기록 샘플 작성**

```markdown
---
title: "Astro Content Collections 학습"
description: "Astro의 강력한 콘텐츠 관리 기능을 공부합니다."
pubDate: "2026-04-01"
tags: ["Astro", "Study"]
category: "Web Development"
---
오늘 공부한 내용 요약...
```

- [ ] **Step 3: Commit**

```bash
git add src/content/portfolio/sample-project.md src/content/study/sample-note.md
git commit -m "test: add sample content for portfolio and study"
```

---

### Task 3: 전용 레이아웃 구현

**Files:**
- Create: `src/layouts/PortfolioPost.astro`
- Create: `src/layouts/StudyPost.astro`

- [ ] **Step 1: PortfolioPost 레이아웃 작성**

기존 `BlogPost.astro`를 참고하여 `stack`, `githubUrl` 등을 상단에 배치합니다.

- [ ] **Step 2: StudyPost 레이아웃 작성**

`tags`, `category`를 강조하는 심플한 텍스트 중심 레이아웃을 작성합니다.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/PortfolioPost.astro src/layouts/StudyPost.astro
git commit -m "feat: add specialized layouts for portfolio and study"
```

---

### Task 4: 페이지 라우팅 구현

**Files:**
- Create: `src/pages/portfolio/index.astro`
- Create: `src/pages/portfolio/[...slug].astro`
- Create: `src/pages/study/index.astro`
- Create: `src/pages/study/[...slug].astro`

- [ ] **Step 1: 목록 및 상세 페이지 구현**

각 컬렉션에서 `getCollection`으로 데이터를 가져와 리스트와 본문을 출력합니다.

- [ ] **Step 2: 브라우저 확인**

브라우저에서 `/portfolio`, `/study` 경로가 정상 작동하는지 확인합니다.

- [ ] **Step 3: Commit**

```bash
git add src/pages/portfolio/ src/pages/study/
git commit -m "feat: implement portfolio and study page routes"
```

---

### Task 5: 헤더 메뉴 업데이트 및 정리

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/consts.ts`

- [ ] **Step 1: 네비게이션 링크 수정**

`Blog` 링크를 제거하고 `Portfolio`, `Study` 링크를 추가합니다.

- [ ] **Step 2: 사이트 메타데이터 수정**

`src/consts.ts`에서 사이트 제목과 설명을 업데이트합니다.

- [ ] **Step 3: 최종 확인 및 Commit**

```bash
git add src/components/Header.astro src/consts.ts
git commit -m "feat: update navigation and site metadata"
```
