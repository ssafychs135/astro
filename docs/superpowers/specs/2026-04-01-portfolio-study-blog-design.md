# 디자인 문서: 포트폴리오 및 개발 공부 기록 블로그 전환

이 문서는 기존 Astro 블로그 템플릿을 개인 프로그래머의 포트폴리오와 학습 기록(Study Note) 관리에 최적화된 구조로 전환하기 위한 설계를 담고 있습니다.

## 1. 목적 및 목표
- **포트폴리오 관리**: 프로젝트 성과, 사용 기술, 링크(Github/Demo) 등을 체계적으로 전시
- **학습 기록(Study Note)**: 개발 공부 내용, TIL, 기술 블로그 포스팅을 카테고리별로 기록
- **전문성 강조**: 각 콘텐츠 성격에 맞는 전용 스키마와 레이아웃 적용

## 2. 아키텍처 및 폴더 구조

### 2.1 콘텐츠 컬렉션 (src/content/)
기존 `blog` 컬렉션을 대체하거나 병행하여 다음 두 가지 전용 컬렉션을 운용합니다.
- `src/content/portfolio/`: 프로젝트 상세 정보 (MD/MDX)
- `src/content/study/`: 학습 및 기술 기록 (MD/MDX)

### 2.2 페이지 라우팅 (src/pages/)
- `/portfolio`: 프로젝트 리스트 (카드 그리드 형태)
- `/portfolio/[...slug]`: 프로젝트 상세 페이지
- `/study`: 학습 기록 리스트 (타임라인/리스트 형태)
- `/study/[...slug]`: 학습 노트 상세 페이지

### 2.3 전용 레이아웃 (src/layouts/)
- `PortfolioPost.astro`: 기술 스택 및 링크 버튼 강조 디자인
- `StudyPost.astro`: 가독성 중심의 텍스트 레이아웃 및 태그 시스템

## 3. 데이터 스키마 설계 (src/content.config.ts)

### 3.1 Portfolio 스키마
| 필드 | 타입 | 필수 여부 | 설명 |
| :--- | :--- | :--- | :--- |
| `title` | string | 필수 | 프로젝트 이름 |
| `description` | string | 필수 | 간단한 한 줄 소개 |
| `pubDate` | date | 필수 | 프로젝트 완료/게시일 |
| `updatedDate` | date | 선택 | 업데이트일 |
| `heroImage` | image | 선택 | 대표 이미지 |
| `stack` | string[] | 필수 | 사용 기술 스택 (예: React, TypeScript) |
| `githubUrl` | string | 선택 | 저장소 링크 |
| `demoUrl` | string | 선택 | 배포/데모 링크 |
| `role` | string | 선택 | 담당 역할 |

### 3.2 Study 스키마
| 필드 | 타입 | 필수 여부 | 설명 |
| :--- | :--- | :--- | :--- |
| `title` | string | 필수 | 게시글 제목 |
| `description` | string | 필수 | 핵심 요약 |
| `pubDate` | date | 필수 | 작성일 |
| `updatedDate` | date | 선택 | 마지막 수정일 |
| `heroImage` | image | 선택 | 관련 이미지 |
| `tags` | string[] | 필수 | 관련 태그 (예: 에러로그, 알고리즘) |
| `category` | string | 필수 | 학습 주제 (예: React, CS) |

## 4. 단계별 구현 계획
1. **스키마 정의**: `src/content.config.ts` 수정 및 컬렉션 추가
2. **콘텐츠 생성**: `portfolio`, `study` 샘플 데이터 작성
3. **레이아웃 제작**: 각 컬렉션에 최적화된 Astro 레이아웃 구현
4. **페이지 라우팅**: `/portfolio`, `/study` 목록 및 상세 페이지 구현
5. **네비게이션 업데이트**: 헤더 메뉴 수정 (`Blog` -> `Portfolio`, `Study`)
