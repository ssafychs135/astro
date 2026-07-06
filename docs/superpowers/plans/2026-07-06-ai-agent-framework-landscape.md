# AI 에이전트 프레임워크 지형도 블로그 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** LangChain·LlamaIndex·LangGraph·CrewAI·Atomic Agents·ReAct 6개 도구를 추상화 층위로 정리하는 인터랙티브 `.mdx` 블로그 글을 발행한다.

**Architecture:** 신규 `LayerStack.astro` 컴포넌트(순수 CSS 층위 다이어그램) 하나를 만들고, 기존 컴포넌트(`Metrics`/`Cards`/`Callout`/`Term`)를 재사용해 `blog` 컬렉션에 `.mdx` 글 한 편을 추가한다. 테스트 도구가 없는 저장소이므로 검증 게이트는 `astro check` + `astro build` + 브라우저 확인이다.

**Tech Stack:** Astro 5, MDX, Tailwind CSS v4 (CSS-first, `@theme`), Quantum Obsidian 디자인 시스템.

## Global Constraints

- 컬렉션 스키마: `blog` = `title`, `description`, `pubDate` (필수) + `updatedDate?`, `heroImage?`, `tags?: string[]`, `category?`. frontmatter가 스키마를 위반하면 빌드 실패.
- `heroImage`는 `../../assets/` 상대 경로여야 Astro `<Image>`/sharp 최적화가 적용됨. 사용 파일: `../../assets/blog-placeholder-3.jpg` (존재 확인 완료).
- 파일명: 소문자-하이픈. 슬러그 `ai-agent-framework-landscape` (기존 6개 글과 미충돌 확인 완료).
- 날짜 형식: `YYYY-MM-DD`. `pubDate: 2026-07-06`.
- 들여쓰기: `.astro`/`.css` 파일은 **탭** 사용.
- CSS 변수만 사용 (하드코딩 색 금지): `--color-primary`, `--color-secondary`, `--glass-border`, `--surface`, `--text-base`, `--text-muted`, `--font-space-grotesk`. (global.css에 존재 확인 완료.)
- 신규 컴포넌트는 `LayerStack.astro` **단 하나**. 그 외 컴포넌트는 기존 것 재사용. 무관한 리팩터링 금지.
- 정직성: "조사·비교 학습 기록" 톤. 실무 도입/운영 경험을 지어내지 않음. 문장은 형식적 문어체.
- 사실 검증 완료 (Context7, 2026-07-06): LangGraph는 1.0+ "low-level orchestration framework and runtime" (durable execution, human-in-the-loop, memory). CrewAI는 **Crews**(자율 역할 협업)와 **Flows**(`@start`/`@listen` + Pydantic 상태 제어)의 두 축. Atomic Agents는 `BaseIOSchema`(Pydantic) 입출력 스키마를 Instructor로 강제하는 원자성 기반 모듈 프레임워크. ReAct는 프레임워크가 아닌 추론+행동 패턴.

---

### Task 1: `LayerStack.astro` 컴포넌트

층위 다이어그램 컴포넌트. 아래→위 스택, 각 밴드에 층 이름·설명·프레임워크 칩·성격 힌트. 순수 CSS(클라이언트 JS 없음), `DeepDive.astro`와 동일한 `not-prose` + scoped `<style>` 패턴.

**Files:**
- Create: `src/components/interactive/LayerStack.astro`

**Interfaces:**
- Produces: `LayerStack` 컴포넌트. Props: `layers: { label: string; sub: string; frameworks: string[]; note: string }[]`. 전달된 배열 순서 그대로 위→아래로 렌더. Task 2의 `.mdx`가 이 props로 호출한다.

- [ ] **Step 1: 컴포넌트 파일 작성**

`src/components/interactive/LayerStack.astro` 전체 내용 (들여쓰기는 탭):

```astro
---
// LayerStack — 에이전트 프레임워크 지형도의 추상화 층위 다이어그램.
// 순수 CSS 시각화(클라이언트 JS 없음): 위→아래로 쌓인 층위 밴드.
// 각 밴드는 층 이름·설명·소속 프레임워크 칩·성격 힌트를 보여준다.
interface Layer {
	label: string; // 예: "Layer 1 · 컴포넌트"
	sub: string; // 짧은 설명
	frameworks: string[]; // 칩으로 표시할 프레임워크들
	note: string; // 성격 힌트 (예: "부품 · 조립")
}
interface Props {
	layers: Layer[]; // 전달 순서대로 위→아래 렌더
}
const { layers } = Astro.props;
---

<div class="ls not-prose">
	{layers.map((l) => (
		<div class="ls-band">
			<div class="ls-meta">
				<span class="ls-label">{l.label}</span>
				<span class="ls-sub">{l.sub}</span>
			</div>
			<div class="ls-chips">
				{l.frameworks.map((f) => <span class="ls-chip">{f}</span>)}
			</div>
			<span class="ls-note">{l.note}</span>
		</div>
	))}
</div>

<style>
	.ls {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		margin: 2rem 0;
	}
	.ls-band {
		display: grid;
		grid-template-columns: minmax(9rem, 1.1fr) 2fr auto;
		align-items: center;
		gap: 1rem;
		padding: 0.9rem 1.15rem;
		border: 1px solid var(--glass-border);
		border-radius: 14px;
		background: color-mix(in srgb, var(--color-primary) 4%, transparent);
		transition: border-color 0.15s, background 0.15s;
	}
	.ls-band:hover {
		border-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
		background: color-mix(in srgb, var(--color-primary) 8%, transparent);
	}
	.ls-meta {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}
	.ls-label {
		font-family: var(--font-space-grotesk);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: 800;
		color: var(--color-primary);
	}
	.ls-sub {
		font-size: 0.8rem;
		color: var(--text-muted);
		word-break: keep-all;
	}
	.ls-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}
	.ls-chip {
		font-size: 0.82rem;
		font-weight: 700;
		color: var(--text-base);
		padding: 0.25rem 0.6rem;
		border: 1px solid var(--glass-border);
		border-radius: 999px;
		background: var(--surface);
		white-space: nowrap;
	}
	.ls-note {
		justify-self: end;
		font-family: var(--font-space-grotesk);
		font-size: 0.62rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		font-weight: 700;
		color: var(--color-secondary);
		white-space: nowrap;
	}
	@media (max-width: 640px) {
		.ls-band {
			grid-template-columns: 1fr;
			gap: 0.55rem;
		}
		.ls-note {
			justify-self: start;
		}
	}
</style>
```

- [ ] **Step 2: 타입 체크로 컴포넌트 검증**

Run: `npm run astro -- check`
Expected: 통과 (에러 0). 이 시점엔 아직 `.mdx`가 컴포넌트를 쓰지 않으므로, `LayerStack` 관련 신규 에러가 없어야 한다.

- [ ] **Step 3: 커밋**

```bash
git add src/components/interactive/LayerStack.astro
git commit -m "feat(components): add LayerStack abstraction-layer diagram"
```

---

### Task 2: 블로그 글 `.mdx` 작성

`blog` 컬렉션에 층위 지형도 글을 추가한다. frontmatter + 본문 전체. 컴포넌트: `Metrics`, `Callout`, `LayerStack`, `Cards`, `Term` 재사용/사용.

**Files:**
- Create: `src/content/blog/ai-agent-framework-landscape.mdx`

**Interfaces:**
- Consumes: Task 1의 `LayerStack` (`layers` props). 기존 `Metrics`(`items`), `Callout`(children), `Cards`(`heading`+`cards`+슬롯 `s0`/`s1`), `Term`(`word`,`def`).

- [ ] **Step 1: `.mdx` 파일 작성**

`src/content/blog/ai-agent-framework-landscape.mdx` 전체 내용:

````mdx
---
title: "AI 에이전트 프레임워크 지형도: 층위로 읽는 6개 도구"
description: "LangChain, LlamaIndex, LangGraph, CrewAI, Atomic Agents, 그리고 ReAct 패턴을 경쟁 관계가 아니라 추상화 층위로 정리한다. 각 도구가 무엇이고 스택의 어디에 위치하는지를 층위별로 짚는다."
pubDate: 2026-07-06
heroImage: "../../assets/blog-placeholder-3.jpg"
tags: ["AI Agent", "Framework"]
---

import Metrics from '../../components/troubleshooting/Metrics.astro';
import Callout from '../../components/troubleshooting/Callout.astro';
import Cards from '../../components/troubleshooting/Cards.astro';
import LayerStack from '../../components/interactive/LayerStack.astro';
import Term from '../../components/interactive/Term.astro';

에이전트 도구를 검색하면 LangChain부터 CrewAI까지 여섯 개 이름이 흔히 하나의 목록에 나란히 놓인다. 그러나 이들은 서로의 대체재가 아니다. 각자 **추상화 층위가 다른 자리**를 차지한다. 이 글은 여섯 개 도구를 "무엇이고 어디에 위치하는가"라는 관점에서 층위별로 정리한다. 도입할 도구를 고르기 전에 지형을 먼저 읽는 것이 목적이며, 이 글은 그 지도를 그리기 위한 학습 기록이다.

<Metrics
	items={[
		{ big: '6개', cap: '비교 대상 도구' },
		{ big: '4개', cap: '추상화 층위' },
		{ big: '1개', cap: '기반 패턴 (ReAct)' },
		{ big: '조합', cap: '택일이 아님' },
	]}
/>

<Callout>
	이 도구들을 경쟁 프레임워크로 묶으면 잘못된 질문에 도달한다. 올바른 질문은 "A와 B 중 무엇을 쓸까"가 아니라
	"내 문제는 어느 층위의 도구를 필요로 하는가"다. 낮은 층위일수록 제어가 크고 코드가 많으며, 높은 층위일수록
	추상화가 크고 결정이 대신 내려진다.
</Callout>

## 한눈에 보는 층위

<LayerStack
	layers={[
		{ label: 'Layer 3 · 멀티에이전트', sub: '여러 에이전트를 팀으로 구성', frameworks: ['CrewAI', 'Atomic Agents'], note: '협업 · 고추상' },
		{ label: 'Layer 2 · 오케스트레이션', sub: '제어 흐름을 그래프로 설계', frameworks: ['LangGraph'], note: '제어 · 저수준' },
		{ label: 'Layer 1 · 컴포넌트', sub: 'LLM 앱을 이루는 부품과 통합', frameworks: ['LangChain', 'LlamaIndex'], note: '부품 · 조립' },
		{ label: 'Layer 0 · 패턴', sub: '모든 도구의 사고 방식', frameworks: ['ReAct'], note: '사고 · 행동' },
	]}
/>

주의할 점은 세로 위치와 제어 수준이 항상 비례하지 않는다는 것이다. LangGraph는 컴포넌트 위에서 흐름을 묶는 상위 층에 있지만, API 자체는 의도적으로 저수준이라 제어가 크다. 오른쪽 성격 힌트는 이 결을 세로 위치와 별개로 표시한다.

## Layer 0 — 패턴: ReAct

- **무엇** — <Term word="ReAct" def="Reasoning + Acting. 2022년 논문에서 제안된, LLM이 추론과 행동을 번갈아 수행하는 프롬프트 패턴." />는 LLM이 "생각 → 행동 → 관찰"을 반복하며 도구를 사용하는 방식이다. 프레임워크가 아니라 개념이다.
- **언제** — 도구를 쓰는 거의 모든 에이전트의 기반이다. 아래 도구들은 대부분 내부에서 이 패턴을 코드로 감싼 것이다.
- **의존성** — 없다. 순수한 프롬프트 설계다.

```text
Thought: 답하려면 최신 환율이 필요하다.
Action: search("USD KRW 환율")
Observation: 1 USD = 1,380 KRW
Thought: 이제 답할 수 있다.
Answer: 현재 환율은 1달러당 약 1,380원이다.
```

## Layer 1 — 컴포넌트: LangChain · LlamaIndex

이 층은 LLM 애플리케이션을 이루는 부품을 제공한다. 모델 호출, 프롬프트, 출력 파싱, 도구, 리트리버 같은 조각과 그 조각들을 잇는 통합이 여기에 있다.

<Cards
	heading="컴포넌트 층의 두 축"
	cards={[
		{ key: 'lc', title: 'LangChain', sub: '범용 통합' },
		{ key: 'li', title: 'LlamaIndex', sub: '데이터 · RAG 특화' },
	]}
>
	<div slot="s0">
		**무엇** — 범용 LLM 애플리케이션 조립 라이브러리다. 모델·프롬프트·출력 파서·도구·리트리버 같은 부품과 방대한 외부 통합을 제공하고, 이를 파이프라인으로 잇는다.

		**언제** — 다양한 서비스와 모델을 빠르게 연결해 프로토타입을 만들 때.

		**의존성** — LLM 제공자, 각 통합 패키지.
	</div>
	<div slot="s1">
		**무엇** — 데이터 중심 프레임워크다. 문서 수집·인덱싱·검색(RAG)에 특화되어 있으며 인덱스·쿼리 엔진·리트리버가 핵심이다.

		**언제** — 문서나 지식베이스 위에 질의응답을 얹는 RAG가 작업의 중심일 때.

		**의존성** — 임베딩 모델, 벡터 스토어.
	</div>
</Cards>

<Callout>
	둘은 기능이 겹치지만 무게중심이 다르다. LangChain은 "넓은 통합"에, LlamaIndex는 "깊은 데이터 파이프라인"에 강하다.
	실제로 한 시스템에서 함께 쓰기도 한다.
</Callout>

## Layer 2 — 오케스트레이션: LangGraph

- **무엇** — LangChain 팀이 만든 저수준 오케스트레이션 프레임워크이자 런타임이다. 에이전트의 제어 흐름을 상태 그래프(노드·엣지)로 명시하며, 지속 실행·휴먼 인 더 루프·메모리를 내장한다.
- **언제** — 분기·반복·중단과 재개가 있는 복잡한 상태 기반 워크플로우를 정밀하게 제어해야 할 때. "에이전트가 알아서"가 아니라 "내가 흐름을 설계"하고 싶을 때.
- **의존성** — 컴포넌트 층(LangChain 등)을 노드 안에서 호출한다. 그래프 구조 자체는 특정 부품에 얽매이지 않는다.

```python
from langgraph.graph import StateGraph, END

g = StateGraph(State)
g.add_node("retrieve", retrieve)
g.add_node("answer", answer)
g.add_edge("retrieve", "answer")
g.add_conditional_edges("answer", needs_more, {"yes": "retrieve", "no": END})
app = g.compile()
```

## Layer 3 — 멀티에이전트: CrewAI · Atomic Agents

이 층은 여러 에이전트를 하나의 팀 또는 파이프라인으로 묶는다. 같은 "멀티에이전트"라도 철학이 갈린다.

<Cards
	heading="멀티에이전트 층의 두 철학"
	cards={[
		{ key: 'crew', title: 'CrewAI', sub: '역할 기반 협업' },
		{ key: 'atom', title: 'Atomic Agents', sub: '스키마 기반 배선' },
	]}
>
	<div slot="s0">
		**무엇** — 역할 기반 멀티에이전트 프레임워크다. 역할·목표·배경을 가진 에이전트 팀이 자율 협업하는 **Crew**와, `@start`·`@listen` 데코레이터와 Pydantic 상태로 흐름을 구조화하는 **Flow**의 두 축을 가진다. 자율성과 제어를 나눠 담는다.

		**언제** — 리서치 → 작성 → 편집처럼 여러 역할이 협업하는 작업을 빠르게 조립할 때.

		**의존성** — LLM 제공자. Flow 상태는 Pydantic.
	</div>
	<div slot="s1">
		**무엇** — "원자성"을 앞세운 경량·모듈 프레임워크다. 각 에이전트는 Pydantic 입출력 스키마(`BaseIOSchema`)를 갖고, Instructor로 스키마를 강제해 타입 안전한 출력을 보장한다. 한 에이전트의 출력 스키마를 다음 에이전트의 입력 스키마에 맞춰 연결한다.

		**언제** — 자율성보다 통제가 필요할 때. 예측 가능한 타입 안전 파이프라인을 세밀히 조립하고 싶을 때.

		**의존성** — Instructor, Pydantic, LLM 제공자.
	</div>
</Cards>

<Callout>
	CrewAI는 역할과 자율 협업을, Atomic Agents는 스키마와 명시적 연결을 강조한다. 전자는 "팀을 꾸린다"에,
	후자는 "부품을 배선한다"에 가깝다.
</Callout>

## 종합 비교

| 도구 | 층위 | 성격 | 대표 사용처 | 의존 |
| --- | --- | --- | --- | --- |
| ReAct | 패턴 | 사고 + 행동 | 도구 사용 에이전트의 기반 | 없음 |
| LangChain | 컴포넌트 | 범용 통합 | 다양한 서비스 연결·프로토타입 | LLM · 통합 패키지 |
| LlamaIndex | 컴포넌트 | 데이터 · RAG | 문서 QA · 지식 검색 | 임베딩 · 벡터 스토어 |
| LangGraph | 오케스트레이션 | 저수준 제어 | 상태 기반 복잡 워크플로우 | 컴포넌트 층 |
| CrewAI | 멀티에이전트 | 역할 협업 | 역할 분담 자동화 | LLM · Pydantic |
| Atomic Agents | 멀티에이전트 | 스키마 배선 | 타입 안전 파이프라인 | Instructor · Pydantic |

## 마무리: 택일이 아니라 조합

<Callout>
	실전에서 이 도구들은 택일 대상이 아니라 조합 대상이다. ReAct 패턴 위에 LangChain·LlamaIndex 부품을 얹고,
	LangGraph로 흐름을 묶으며, 필요하면 CrewAI·Atomic Agents로 다중 에이전트를 구성한다. 도구를 고르는 첫걸음은
	"무엇이 최고인가"가 아니라 "내 문제는 지금 어느 층위에 있는가"를 아는 것이다.
</Callout>
````

- [ ] **Step 2: 타입·스키마 체크**

Run: `npm run astro -- check`
Expected: 통과 (에러 0). frontmatter가 `blog` 스키마를 만족하고 MDX 컴포넌트 타입이 맞아야 한다.

- [ ] **Step 3: 프로덕션 빌드로 최종 검증**

Run: `npm run build`
Expected: 성공. 새 라우트 `/astro/blog/ai-agent-framework-landscape/`가 생성되고 `<Image>`(heroImage) 최적화가 통과해야 한다. 실패 시 frontmatter·이미지 경로·컴포넌트 슬롯을 점검한다.

- [ ] **Step 4: 커밋**

```bash
git add src/content/blog/ai-agent-framework-landscape.mdx
git commit -m "content(blog): add AI agent framework landscape post"
```

---

### Task 3: 브라우저 확인 및 그래프 갱신

**Files:**
- (수정 없음 — 검증 및 지식 그래프 갱신)

- [ ] **Step 1: 로컬 미리보기 실행**

Run: `npm run dev`
그다음 브라우저에서 `http://localhost:4321/astro/blog/ai-agent-framework-landscape/` 열기.
확인: (1) `LayerStack` 4개 밴드가 렌더되고 프레임워크 칩이 보인다. (2) 밴드 hover 시 민트 테두리 강조. (3) `Cards` 탭 전환 동작. (4) `Term`("ReAct") 클릭 시 정의 팝오버. (5) 브라우저 폭을 640px 이하로 줄여 `LayerStack`이 세로 스택으로 접히는지 확인. (6) 목록 페이지 `/astro/blog/`에서 새 글이 최상단(2026-07-06)에 노출되는지 확인.

- [ ] **Step 2: 이슈 발견 시 수정 후 재확인**

시각 문제가 있으면 `LayerStack.astro` 또는 `.mdx`를 수정하고 Step 1을 반복한다. 수정이 없으면 다음 단계로.

- [ ] **Step 3: 지식 그래프 갱신**

Run: `graphify update .`
Expected: AST 기반 갱신 완료 (API 비용 없음). 새 컴포넌트·콘텐츠가 그래프에 반영된다.

- [ ] **Step 4: 그래프 변경분 커밋 (변경이 있으면)**

```bash
git add graphify-out/
git commit -m "chore(graphify): refresh graph after landscape post"
```

---

## Self-Review

**Spec coverage:**
- 메타(파일/제목/frontmatter/분량) → Task 2 Step 1 ✓
- 본문 7개 섹션(도입·다이어그램·Layer 0~3·비교표·마무리) → Task 2 Step 1 본문에 모두 포함 ✓
- 신규 `LayerStack` 컴포넌트(위치·props·디자인·CSS-only) → Task 1 ✓
- 정확성 검증 → Global Constraints에 Context7 검증 결과 반영 완료 ✓
- 검증 게이트(check·build·브라우저) → Task 2 Step 2–3, Task 3 ✓
- 비목표(핸즈온 실습 제외, 신규 컴포넌트 1개, 무관 리팩터링 금지) → Global Constraints 준수 ✓

**Placeholder scan:** TBD/TODO/"적절히 처리" 없음. 컴포넌트 코드·본문 전체·frontmatter가 실제 내용으로 채워짐 ✓

**Type consistency:** `LayerStack` props `{ label, sub, frameworks, note }` — Task 1 정의와 Task 2 호출이 일치. `Cards`는 `heading`+`cards`(`key`/`title`/`sub`)+슬롯 `s0`/`s1`로 기존 API와 일치. `Term`은 `word`/`def`로 일치. `Metrics`는 `items`(`big`/`cap`)로 일치 ✓
