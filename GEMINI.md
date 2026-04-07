# ✍️ Gemini CLI 콘텐츠 작성 가이드라인 (Astro Blog)

이 프로젝트는 Astro의 `Content Collections`를 기반으로 하며, 모든 새로운 글은 `src/content/` 디렉토리 내의 적절한 카테고리에 맞춰 작성되어야 합니다.

## 🚀 콘텐츠 등록 기본 원칙
1. **파일 경로**: 아래 카테고리에 맞는 폴더에 `.md` 또는 `.mdx` 파일을 생성합니다.
2. **날짜 형식**: `pubDate`와 `updatedDate`는 반드시 `YYYY-MM-DD` 형식을 따릅니다.
3. **이미지 참조**: `heroImage` 사용 시 `src/assets/`의 이미지를 상대 경로(`../../assets/파일명.jpg`)로 참조합니다.
4. **슬러그(Slug)**: 파일명은 영문 소문자와 하이픈(`-`)만 사용합니다 (예: `my-new-post.md`).

---

## 📂 카테고리별 작성 양식

### 1. 블로그 (Tech Research)
- **경로**: `src/content/blog/`
- **필수 Frontmatter**:
  ```yaml
  title: string
  description: string (요약문)
  pubDate: Date (YYYY-MM-DD)
  heroImage: string (상대 경로)
  ```

### 2. 학습 노트 (Growth Log)
- **경로**: `src/content/study/`
- **필수 Frontmatter**:
  ```yaml
  title: string
  description: string
  pubDate: Date
  category: string (기술 스택, 예: React, Astro)
  tags: string[] (태그 리스트)
  ```
- **권장 구조**: `🔍 문제 상황 / 학습 목표`, `🛠 해결 과정 / 내용`, `✅ 결과 및 회고` 섹션 포함.

### 3. 포트폴리오 (Portfolio)
- **경로**: `src/content/portfolio/`
- **필수 Frontmatter**:
  ```yaml
  title: string
  description: string
  pubDate: Date
  stack: string[] (기술 스택 리스트)
  heroImage: string
  ```
- **선택 사항**: `role`, `githubUrl`, `demoUrl`
- **권장 구조**: `📝 프로젝트 소개`, `🚀 주요 기능 및 성과`, `💻 기술적 도전 및 해결` 섹션 포함.

---

## 🤖 Gemini 수행 지침
- 새로운 글 작성을 요청받으면, 먼저 `src/content/`의 기존 파일들을 참고하여 스타일을 맞춥니다.
- `src/content.config.ts`의 스키마를 항상 준수합니다.
- 글 작성 후에는 반드시 해당 파일이 생성되었는지 확인하고, 사용자에게 경로를 안내합니다.
