# AI 에이전트 프레임워크 지형도 — 설계 문서

- **작성일**: 2026-07-06
- **컬렉션**: `blog` (Research)
- **형식**: 인터랙티브 `.mdx`
- **각도**: 지형도(Landscape) 매핑 — "각 도구가 무엇이고 어디에 위치하는가"를 개념 중심으로 정리
- **정렬 축**: 추상화 층위 (패턴 → 컴포넌트 → 오케스트레이션 → 멀티에이전트)
- **대상 도구(6)**: ReAct(패턴), LangChain, LlamaIndex, LangGraph, CrewAI, Atomic Agents

## 목적과 핵심 통찰

나열되는 이 도구들은 흔히 "경쟁 프레임워크"로 묶이지만, 실제로는 **추상화 층위가 서로 다르다.** 이 글의 목적은 독자가 "A는 B의 대체재"라는 오해 대신 "각각 다른 층에 산다"는 정신모델을 갖게 하는 것이다. 따라서 글의 구조 자체가 층위 스택이 된다.

- **정직성**: 이 글은 "조사·비교 학습 기록" 프레이밍으로 쓴다. 실무 도입 경험을 지어내지 않는다. 각 도구는 공식 문서/개념 수준에서 소개하고, 개인적 운영 경험을 주장하지 않는다.

## 메타 정보

- **파일**: `src/content/blog/ai-agent-framework-landscape.mdx`
- **제목(안)**: "AI 에이전트 프레임워크 지형도: 층위로 읽는 6개 도구"
- **description**: 층위 관점을 담은 한두 문장 (매거진 리스트 요약문으로 노출)
- **frontmatter**:
  - `pubDate: 2026-07-06`
  - `heroImage`: 기존 `../../assets/blog-placeholder-*.jpg` 재사용
  - `tags: ["AI Agent", "Framework"]`
- **분량**: ~3,000자 (표준 리서치, 기존 Gemma·Nemotron 글 밀도)

## 본문 구조 (층위 축)

| # | 섹션 | 내용 | 컴포넌트 |
|---|------|------|----------|
| — | 상단 스탯 | "6개 도구 · 4개 층위" | `Metrics` |
| 0 | 도입 | "경쟁자가 아니라 다른 층위" — 핵심 정신모델 세팅 | `Callout` |
| 1 | 층위 다이어그램 | 4개 층위 스택 + 각 층에 프레임워크 배치 | **`LayerStack` (신규)** |
| 2 | Layer 0 — 패턴 | ReAct (추론+행동). 프레임워크가 아닌 기반 패턴 | 텍스트 + `Term` |
| 3 | Layer 1 — 컴포넌트 | LangChain(범용 통합) · LlamaIndex(데이터/RAG 특화) | `Cards` |
| 4 | Layer 2 — 오케스트레이션 | LangGraph (상태 그래프, 저수준·고제어) | 텍스트 + 개념 스니펫 |
| 5 | Layer 3 — 멀티에이전트 | CrewAI(역할 협업) · Atomic Agents(스키마 기반 모듈) | `Cards` |
| 6 | 종합 비교표 | 층위 · 제어수준 · 학습곡선 · 대표 사용처 · 의존성 | `Kv` 또는 마크다운 표 |
| 7 | 마무리 | "선택이 아니라 조합" — 실무는 여러 층을 함께 씀 | `Callout` |

각 프레임워크 소개는 **무엇 / 언제 / 의존성** 3요소 + 짧은 개념 스니펫으로 통일(리트리버 글과 동일 패턴).

## 신규 컴포넌트: `LayerStack.astro`

- **위치**: `src/components/interactive/LayerStack.astro`
- **역할**: 4개 층위를 아래→위로 쌓은 스택 다이어그램. 각 층은 밴드이고, 그 층의 프레임워크가 칩으로 표시됨. 밴드 우측에 "제어 ↔ 추상화" 위치 힌트.
- **props**: `layers: [{ label, sub, frameworks: string[], control: '고제어' | '중간' | '고추상' }]`
- **디자인**: Quantum Obsidian(민트 `--color-primary`, 퍼플 `--color-secondary`, `.tech-label`, `.card-obsidian`) 기존 CSS 패턴 준수.
- **인터랙션**: 최소 — hover 밴드 강조 정도, 클라이언트 JS 없이 CSS만.
- **원칙**: 신규 컴포넌트는 이 하나뿐. 나머지는 전부 기존 컴포넌트 재사용.

## 정확성 검증 (본문 작성 전 필수)

프레임워크는 빠르게 변하므로(지식 컷오프 2026-01 이후 변동 가능), Context7/공식 문서로 확인 후 집필:

- 각 프레임워크의 현재 포지셔닝 (특히 CrewAI, Atomic Agents, LangGraph)
- ReAct가 패턴이라는 점 재확인, LlamaIndex vs LangChain 현재 경계
- 개념 스니펫의 API가 최신인지

## 검증 게이트 (완료 기준)

1. `npm run astro -- check` 통과 (타입 + 콘텐츠 스키마)
2. `npm run build` 통과 (스키마 위반·깨진 `<Image>` 소스 검출)
3. 브라우저에서 `/astro/blog/ai-agent-framework-landscape/` 확인 — `LayerStack` 다이어그램 렌더링 및 반응형 확인

## 비목표 (YAGNI)

- 핸즈온 코드 실습(같은 과제 N개 프레임워크로 구현)은 이번 글 범위 밖 — 개념 스니펫만.
- 신규 컴포넌트 2개 이상 — 금지. `LayerStack` 하나만.
- 무관한 컴포넌트/스타일 리팩터링 — 하지 않음.
