# 콘텐츠 작성 가이드

사이트 콘텐츠는 `src/content/`의 두 컬렉션으로 관리한다. 스키마 정본은 `src/content.config.ts`이며, frontmatter가 스키마와 맞지 않으면 빌드가 실패한다.

| 컬렉션 | 경로 | 메뉴 | 주소 |
| --- | --- | --- | --- |
| `blog` | `src/content/blog/` | Research | `/astro/blog/<파일명>/` |
| `portfolio` | `src/content/portfolio/` | Portfolio | `/astro/portfolio/<파일명>/` |

---

## 발행 절차

1. **파일 생성.** `npm run new`로 만든다. 아래 "새 글 만들기" 참고.
2. **작성.** 컬렉션별 frontmatter와 구성을 따른다.
3. **문체 점검.** Claude Code에서 `content-style` 스킬을 실행하거나 `bash .claude/skills/content-style/lint.sh <파일>`로 기계 점검을 한다. 판단이 필요한 항목은 아래 "문체 규칙"으로 직접 확인한다.
4. **검증.** 두 명령을 모두 통과시킨다. `build`는 스키마 위반과 깨진 이미지 경로를 잡는다.
   ```bash
   npm run astro -- check
   npm run build
   ```
   화면은 `npm run dev` 후 `http://localhost:4321/astro/blog/<파일명>/`에서 확인한다.
5. **커밋과 push.** 커밋 메시지는 `content(blog): add <주제> post` 형식을 쓴다. `master`에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 빌드해 GitHub Pages에 배포한다.

### 초안 관리

초안 기능은 없다. 컬렉션 폴더에 있는 파일은 모두 발행 대상이며, 커밋되어 `master`에 올라가면 바로 공개된다. `pubDate`를 미래 날짜로 적어도 걸러지지 않는다.

- 작성 중인 글은 커밋하지 않는다. `git add .` 대신 파일을 지정해 커밋한다.
- 오래 보관할 초안은 브랜치에서 작업하거나 `.git/info/exclude`에 등록한다.

### 발행 후 노출 위치

- 목록 페이지: `pubDate` 최신순
- 홈 화면: 블로그 최신 3개, 포트폴리오 전체
- RSS(`/astro/rss.xml`): 블로그 전체

---

## 새 글 만들기

```bash
npm run new -- blog "RAG 평가 자동화" rag-eval-automation
npm run new -- portfolio "프로젝트명" my-project
npm run new -- blog "Simple Notes" --md
```

- 인자는 순서대로 컬렉션(`blog` | `portfolio`), 제목, 파일명 슬러그다.
- 한글 제목은 슬러그를 만들 수 없으므로 영문 슬러그를 함께 넘긴다.
- 기본은 `.mdx`로 생성하며 자주 쓰는 컴포넌트 import가 들어간다. 컴포넌트를 쓰지 않을 글은 `--md`를 붙인다.
- 생성 후 `description`을 채운다. 포트폴리오는 `stack`도 채워야 한다.

### 파일명

- 영문 소문자와 하이픈만 쓴다. 예: `apple-on-device-llm-moe.mdx`
- 파일명이 곧 주소다. 발행 후 바꾸면 기존 링크가 깨진다.
- 확장자만 다른 같은 이름의 파일(`a.md`, `a.mdx`)을 두지 않는다.

---

## 블로그 (Research)

기술 조사와 분석 글을 싣는다.

### frontmatter

```yaml
---
title: "애플은 어떻게 20B 모델을 아이폰에 담았나"
description: "WWDC 2026 공개 온디바이스 모델 AFM 3 Core Advanced는 20B를 통째로 메모리에 올리지 않는다. 업계 표준 MoE와 다른 길을 택한 이유를 하드웨어 제약의 관점에서 정리한다."
pubDate: 2026-07-10
# updatedDate: 2026-07-20
heroImage: "../../assets/blog-placeholder-2.jpg"
tags: ["LLM", "On-Device", "MoE"]
# category: "AI Engineering"
---
```

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| `title` | O | 짧게 쓴다. |
| `description` | O | 한 문장. 목록과 검색 결과의 요약문으로 쓰인다. |
| `pubDate` | O | `YYYY-MM-DD` |
| `updatedDate` | | 내용을 크게 고쳤을 때 추가한다. |
| `heroImage` | | `src/assets/` 기준 상대 경로. |
| `tags` | | `/blog` 목록의 태그 필터에 쓰인다. 기존 태그(`LLM`, `RAG`, `On-Device`, `AI Agent` 등)를 먼저 재사용한다. |
| `category` | | 자유 문자열. |

### 구성

- 본문은 `~다`체로 쓴다.
- 도입 문단 뒤에 핵심 수치를 `<Metrics>`로 요약하면 글의 요점을 먼저 보여줄 수 있다.
- 소제목(`##`)은 이모지 없이 내용을 요약하는 문장이나 명사구로 쓴다.
- 부가 설명은 `<DeepDive>`로 접고, 처음 나오는 전문용어는 `<Term>`으로 정의를 붙인다.
- 출처나 전제는 도입부의 `<Callout>`에 한 번만 밝힌다.
- 마지막은 `## 정리`로 끝낸다. 외부 자료를 인용했다면 그 뒤에 `## 참고 자료`를 둔다.

---

## 포트폴리오

팀 프로젝트에서 맡은 역할과 해결한 문제를 기록한다. 경험을 부풀리지 않고, 직함이나 성과를 실제보다 크게 쓰지 않는다.

### frontmatter

```yaml
---
title: "iPhone 리뷰 & RAG 챗봇"
description: "IT 기기 정보를 한곳에 모은 플랫폼. RAG 챗봇으로 사양을 자연어로 묻고, 리뷰 게시판은 YouTube 자막을 요약해 함께 보여줍니다."
pubDate: 2025-12-26
stack: ["Django", "DRF", "Vue 3", "ChromaDB", "LangChain", "LangGraph", "LM Studio", "Gemma"]
role: "RAG · 데이터 전반 (team9)"
heroImage: "../../assets/portfolio/iphone-overview.jpg"
# githubUrl: "https://github.com/ssafychs135/repo"
# demoUrl: "https://example.com"
---
```

| 필드 | 필수 | 설명 |
| --- | --- | --- |
| `title`, `description`, `pubDate` | O | 블로그와 같다. |
| `stack` | O | 실제로 쓴 기술만 적는다. |
| `role` | | 맡은 영역. 예: `"AI · OCR 파이프라인 (팀 프로젝트)"` |
| `githubUrl`, `demoUrl` | | 전체 URL. 형식이 틀리면 빌드가 실패한다. |
| `heroImage` | | `src/assets/portfolio/`에 둔다. |

### 구성

본문은 `~습니다`체로 쓰고, `<Section>` 6개로 나눈다.

| 번호 | label | 내용 |
| --- | --- | --- |
| 01 | Overview | 프로젝트 목적과 내가 맡은 범위 |
| 02 | Architecture | 전체 구조. `<Flow>`와 `<Grid>`로 보여준다. |
| 03 | Features | 주요 기능 |
| 04 | Defects | 해결한 문제. 문제마다 `<Defect>` 하나를 쓴다. |
| 05 | Result | 결과 수치. `<Metrics>`로 요약한다. |
| 06 | Retrospective | 회고와 남은 과제 |

```mdx
<Section n="01" label="Overview">

프로젝트 설명.

</Section>
```

`<Section>` 안에서 마크다운을 쓰려면 여는 태그와 닫는 태그 앞뒤에 빈 줄을 둔다.

---

## 이미지

- 이미지는 `src/assets/`에 넣는다. 포트폴리오 대표 이미지는 `src/assets/portfolio/`, 트러블슈팅 스크린샷은 `src/assets/portfolio/ts/`에 둔다.
- `heroImage`는 상대 경로(`../../assets/<파일>`)로 참조한다. 이 경로여야 Astro가 이미지를 최적화한다.
- 본문 스크린샷은 import한 뒤 `<Shot>`에 넘긴다.
  ```mdx
  import ocrBefore from '../../assets/portfolio/ts/jupasu-ocr-before.png';

  <Shot src={ocrBefore} alt="오인식된 OCR 결과" tag="Before" caption="신뢰도 0.5대" />
  ```
- `alt`에는 이미지 내용을 적는다.
- 대표 이미지가 없으면 `blog-placeholder-*.jpg`를 임시로 쓸 수 있다.

---

## MDX 컴포넌트

`.mdx` 파일에서 import해서 쓴다. 경로는 컬렉션 파일 기준 `../../components/`다.

```mdx
import Metrics from '../../components/troubleshooting/Metrics.astro';
import Term from '../../components/interactive/Term.astro';
```

| 컴포넌트 | 위치 | 용도 | 주 사용처 |
| --- | --- | --- | --- |
| `Metrics` | troubleshooting | 핵심 수치 요약 | 공통 |
| `Callout` | troubleshooting | 출처·전제·요약 박스 | 공통 |
| `Kv` | troubleshooting | 항목-값 한 줄 | 공통 |
| `Toggle` | troubleshooting | 두 상태 비교 전환 | 공통 |
| `Cards` | troubleshooting | 카드를 눌러 설명 전환 (최대 5개) | 블로그 |
| `Term` | interactive | 용어 정의 팝오버 | 블로그 |
| `DeepDive` | interactive | 접히는 부가 설명 | 블로그 |
| `BarCompare` | interactive | 탭별 막대 비교 차트 | 블로그 |
| `LayerStack` | interactive | 층위 다이어그램 | 블로그 |
| `QatMemoryCalc` | interactive | Gemma 4 메모리 계산기 (글 전용) | 블로그 |
| `Section` | troubleshooting | 번호 붙은 섹션 | 포트폴리오 |
| `Flow` | troubleshooting | 단계 흐름 재생 | 포트폴리오 |
| `Grid` | troubleshooting | 아이콘 카드 격자 | 포트폴리오 |
| `Defect` | troubleshooting | 문제 해결 사례 | 포트폴리오 |
| `Verdict` | troubleshooting | 성공·실패 판정 한 줄 | 포트폴리오 |
| `Conf` | troubleshooting | 0~1 수치 게이지 | 포트폴리오 |
| `Shot` | troubleshooting | 최적화된 스크린샷 | 포트폴리오 |
| `ShotRow` | troubleshooting | 스크린샷 가로 배치 | 포트폴리오 |

새 컴포넌트를 만들 때 클릭 이벤트가 필요하면 `document`에 한 번만 위임 바인딩한다(`troubleshooting/runtime.ts`, `Term.astro` 참고). 요소에 직접 바인딩하면 페이지 전환 후 동작하지 않는다.

### 요약과 정보

**Metrics.** `items`는 `big`(큰 글자)과 `cap`(설명)의 배열이다. 4개가 알맞다.

```mdx
<Metrics
	items={[
		{ big: '20B', cap: '총 파라미터' },
		{ big: '1~4B', cap: '활성 파라미터' },
	]}
/>
```

**Callout.** 안에 마크다운, HTML, 다른 컴포넌트를 넣을 수 있다.

```mdx
<Callout>
이 글은 애플의 발표문과 IFP 논문을 근거로 한 분석이다.
</Callout>
```

**Kv.** `k`는 항목, `v`는 값이다. `type`을 `"ok"` 또는 `"fail"`로 주면 값에 색이 붙는다. `Callout`이나 `Toggle` 안에서 여러 줄로 쓴다.

```mdx
<Kv k="라우팅 주기" v="프롬프트 단위" type="ok" />
```

**Term.** 본문 중간에 넣는다. `word`는 본문에 보일 글자, `def`는 정의다.

```mdx
MoE는 모델의 <Term word="FFN" def="Feed-Forward Network. 어텐션 뒤에 붙는 완전연결 블록." /> 블록을 나눈다.
```

**DeepDive.** `title`은 필수, `eyebrow`는 선택이다. 기본으로 접혀 있다.

```mdx
<DeepDive title="클라우드 쪽 노선">
본문을 읽는 데 꼭 필요하지 않은 설명.
</DeepDive>
```

### 비교와 전환

**Toggle.** `off`와 `on` 두 슬롯을 전환한다. 이전/이후, A/B 비교에 쓴다.

```mdx
<Toggle heading="양자화 시점에 따른 차이" labelOff="PTQ" labelOn="QAT">
	<div slot="off">
		<Kv k="양자화 시점" v="학습 완료 후" />
	</div>
	<div slot="on">
		<Kv k="양자화 시점" v="학습 중" type="ok" />
	</div>
</Toggle>
```

**Cards.** `cards` 배열 순서대로 슬롯 `s0`~`s4`에 내용을 넣는다. 카드는 5개까지 쓸 수 있다.

```mdx
<Cards
	heading="핵심 기법"
	cards={[
		{ key: 'static', title: '정적 활성화', sub: 'Static activations' },
		{ key: 'channel', title: '채널 단위 양자화', sub: 'Channel-wise' },
	]}
>
	<div slot="s0">정적 활성화 설명</div>
	<div slot="s1">채널 단위 양자화 설명</div>
</Cards>
```

**BarCompare.** 탭(`groups`)마다 막대를 그린다. 막대 길이는 모든 탭의 최댓값을 기준으로 맞춰 탭끼리 크기를 비교할 수 있다. `tag`는 값 옆에 붙는 칩이다.

```mdx
<BarCompare
	heading="실행 스택별 처리량"
	unit="tok/s"
	foot="단일 스트림, 256 토큰 기준."
	groups={[
		{ key: 'eager', label: 'eager', bars: [{ label: 'AR', value: 18.1 }] },
		{ key: 'compile', label: 'torch.compile', bars: [{ label: 'AR', value: 43.4, tag: '2.40×' }] },
	]}
/>
```

**LayerStack.** `layers` 순서대로 위에서 아래로 쌓는다.

```mdx
<LayerStack
	layers={[
		{ label: '오케스트레이션', sub: '제어 흐름을 그래프로', frameworks: ['LangGraph'], note: '상태 · 제어' },
		{ label: '컴포넌트', sub: 'LLM 앱의 부품', frameworks: ['LangChain'], note: '도구 · RAG' },
	]}
/>
```

### 포트폴리오 구성

**Flow.** `id`는 페이지 안에서 겹치지 않아야 한다. `nodes` 안의 `\n`은 줄바꿈이다.

```mdx
<Flow
	id="iphone-arch"
	heading="LangGraph 8-노드 그래프"
	nodes={['질문', 'router\n의도 분기', 'retrieve\n검색', '답변']}
	caption="단계마다 중간 상태를 추적한다."
/>
```

**Grid.** `cols`를 생략하면 항목 수만큼 한 줄에 놓는다. 항목이 4개를 넘으면 `cols={2}`를 준다.

```mdx
<Grid
	cols={2}
	items={[
		{ icon: '🔀', title: '라우팅', sub: '일반 대화는 검색을 우회한다.' },
		{ icon: '🎯', title: '검색기', sub: '출력을 enum으로 제약한다.' },
	]}
/>
```

**Defect.** `summary` 슬롯에 증상, `tech` 슬롯에 원인과 해결을 적는다. 기본 슬롯에는 `Toggle`로 전후 비교를 넣는다.

```mdx
<Defect pnum="DEFECT 01" category="Unicode Hygiene" title="보이지 않는 글자가 검색을 막다">
	<div slot="summary">
		메타데이터 필터 결과가 0건이었습니다.
	</div>
	<ul slot="tech">
		<li><b>원인</b>: 제품명에 NBSP(U+00A0)가 섞여 있었다.</li>
		<li><b>해결</b>: 입력 경계에서 NFKC 정규화를 적용했다.</li>
	</ul>

	<Toggle heading="필터 결과" labelOff="정규화 전" labelOn="정규화 후">
		<div slot="off"><Verdict type="fail">필터 0건</Verdict></div>
		<div slot="on"><Verdict type="ok">정상 매칭</Verdict></div>
	</Toggle>
</Defect>
```

**Verdict.** `type`은 `"ok"` 또는 `"fail"`이다.

**Conf.** `value`는 0~1 사이 숫자다. `type`은 `"hi"`(기본) 또는 `"lo"`로 색을 정한다.

```mdx
<Conf label="검색 결정성" value={1} type="hi" />
```

**Shot, ShotRow.** `Shot`의 `src`에는 import한 이미지를 넘긴다. 여러 장은 `ShotRow`로 묶고 `cols`(기본 3)로 열 수를 정한다.

```mdx
<ShotRow cols={2}>
	<Shot src={before} alt="정합 전 안경 위치" tag="Before" caption="방향 제각각" />
	<Shot src={after} alt="얼굴에 정렬된 안경" tag="After" caption="얼굴에 정렬" />
</ShotRow>
```

---

## 문체 규칙

블로그·포트폴리오·UI 문구를 작성하거나 수정할 때 아래를 지킨다. 정직하고 담백한 기술 문체가 목표다.

1. **형식 문어체.** 서술형·사실 위주로 쓰고 `~다`/`~습니다`로 끝낸다. 구어체(`~죠`, `~네요`, `~거든요`)와 수사적 질문은 쓰지 않는다.
2. **화려한 문체 금지.** 효과를 노린 은유·비유, 과장된 부사, 의인화, 문학적·극적 표현을 쓰지 않는다.
3. **선언식 서두 금지.** "미리 밝혀둔다" 같은 메타 선언으로 시작하지 않는다. 곧장 내용으로 들어간다.
4. **메타 금지.** 글의 구성이나 방법론을 정당화하지 않는다. 구조는 스스로 말한다.
5. **헤지·군더더기 금지.** 요점에 집중한다. 방어적 caveat이나 자기 분류를 정당화하는 문장은 독자에게 실질 가치가 없으면 뺀다.
6. **대시(—) 연결 최소화.** 설명이나 극적인 절을 대시로 덧붙이지 않는다. 마침표로 문장을 나눈다. (제목·목록 라벨 구분자는 예외.)
7. **간결성.** 제목과 설명(description)은 짧게 쓴다. 항목을 불필요하게 나열하지 않는다.
8. **자연스러운 어휘.** 독자가 잘 쓰지 않는 딱딱한 전문용어보다 일상적인 표현을 쓴다.
9. **불필요한 영어 혼용 최소화.** 설명은 한국어로 한다. 고유명사·API·정착된 약어(RAG, LLM, MCP 등)는 유지한다.

이 규칙은 정직성 원칙(과장·자기과시 금지)의 문장 단위 연장이다.
