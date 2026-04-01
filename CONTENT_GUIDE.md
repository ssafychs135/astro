# ✍️ 콘텐츠 작성 가이드 (The Growth Curator)

이 블로그는 `src/content/` 폴더 내의 각 카테고리별 마크다운 파일을 기반으로 운영됩니다. 새로운 글을 작성할 때 아래 템플릿을 복사해서 사용하세요.

---

## 1. Tech Research (기술 조사)
깊이 있는 기술 분석과 트렌드 리포트를 위한 매거진 스타일 섹션입니다.

- **저장 위치**: `src/content/blog/파일명.md`
- **템플릿**:
```markdown
---
title: "글 제목을 입력하세요"
description: "글의 핵심 요약을 한두 문장으로 작성하세요. 매거진 리스트에서 요약문으로 노출됩니다."
pubDate: 2026-04-01
heroImage: "../../assets/이미지명.jpg" # 또는 외부 URL (https://...)
---

여기에 본문 내용을 작성하세요.
```

---

## 2. Growth Log (성장 기록)
매일의 배움, TIL, 트러블슈팅을 기록하는 타임라인 스타일 섹션입니다.

- **저장 위치**: `src/content/study/파일명.md`
- **템플릿**:
```markdown
---
title: "학습 주제 또는 해결한 버그 제목"
description: "어떤 것을 배웠는지 또는 어떤 문제를 해결했는지 간단히 적어주세요."
pubDate: 2026-04-01
category: "기술스택" # 예: React, Astro, CSS, CS
tags: ["태그1", "태그2"] # 예: BugFix, TIL, Performance
# updatedDate: 2026-04-02 (선택 사항)
# heroImage: "../../assets/이미지명.jpg" (선택 사항)
---

### 🔍 문제 상황 / 학습 목표
...

### 🛠 해결 과정 / 내용
...

### ✅ 결과 및 회고
...
```

---

## 3. Portfolio (포트폴리오)
프로젝트 성과를 전시하는 쇼케이스 섹션입니다.

- **저장 위치**: `src/content/portfolio/파일명.md`
- **템플릿**:
```markdown
---
title: "프로젝트 이름"
description: "프로젝트에 대한 간단한 소개를 작성하세요."
pubDate: 2026-03-31
stack: ["React", "TypeScript", "Tailwind"] # 사용한 기술들
heroImage: "../../assets/이미지명.jpg" # 프로젝트 대표 이미지
role: "Lead Developer" # 담당 역할 (선택 사항)
githubUrl: "https://github.com/유저명/저장소" # (선택 사항)
demoUrl: "https://프로젝트-데모-링크.com" # (선택 사항)
---

### 📝 프로젝트 소개
...

### 🚀 주요 기능 및 성과
...

### 💻 기술적 도전 및 해결
...
```

---

## 💡 유용한 팁
- **이미지**: `src/assets/` 폴더에 이미지를 넣고 상대 경로(`../../assets/파일명`)로 참조하는 것을 권장합니다.
- **MDX 사용**: 더 풍부한 인터랙션이 필요하다면 확장자를 `.mdx`로 바꾸고 JSX/컴포넌트를 직접 사용할 수 있습니다.
- **최신순 정렬**: 모든 목록은 `pubDate`를 기준으로 최신순으로 자동 정렬됩니다.
