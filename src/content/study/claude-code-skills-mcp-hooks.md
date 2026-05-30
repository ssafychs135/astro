---
title: "Claude Code의 Skills · MCP · Hooks, 무엇이 다른가"
description: "비슷해 보이지만 역할이 전혀 다른 세 가지 확장 메커니즘 — '누가 결정하고, 무엇을 확장하나'라는 축으로 Skills·MCP·Hooks를 정리한 학습 노트."
pubDate: 2026-05-30
category: "Claude Code"
tags: ["Claude Code", "MCP", "Skills", "Hooks", "AI Workflow"]
---

### 🔍 문제 상황 / 학습 목표

AI 코딩 에이전트(Claude Code)를 본격적으로 쓰다 보면 **Skills**, **MCP**, **Hooks**가 전부 "확장 기능"처럼 뭉뚱그려 보인다. 셋 다 "Claude를 더 잘 동작하게 만드는 무언가" 같지만, 막상 *언제 무엇을 써야 하는지* 물으면 답이 막힌다.

세 가지를 **"누가 실행을 결정하고, 무엇을 확장하는가"** 라는 하나의 축으로 정리하는 것이 이 노트의 목표다.

### 🛠 해결 과정 / 내용

핵심부터: 셋은 경쟁 관계가 아니라 **서로 다른 층위**를 확장한다.

- **Skills** — 모델이 *무엇을 할 줄 아는가*(절차·지식)를 확장. **모델이 판단해서** 가져다 쓴다.
- **MCP** — 모델이 *무엇에 연결되는가*(외부 도구·데이터)를 확장. **모델이 도구를 호출**한다.
- **Hooks** — *언제 반드시 무엇이 일어나는가*(자동화·가드레일)를 정한다. **하네스가 결정론적으로 실행**한다(모델이 결정하지 않는다).

#### 1. Skills — 모델에게 "방법"을 가르친다

Skill은 `SKILL.md`(마크다운 + frontmatter)로 패키징한 **재사용 가능한 절차·전문지식**이다. `description`을 보고 모델이 *지금 이 작업에 필요하다*고 판단하면 그 순간 본문을 로드한다(progressive disclosure — 평소엔 이름·설명만, 호출 시 전체).

```yaml
---
name: debugging
description: Use when investigating a bug or unexpected behavior
---
(여기에 디버깅 절차·체크리스트를 서술)
```

반복되는 워크플로우, 팀의 디자인 규칙, 도메인 지식을 "모델이 알아서 따르게" 만들 때 쓴다.

#### 2. MCP — 외부 세계에 "연결"한다

MCP(Model Context Protocol)는 Claude를 외부 시스템에 잇는 **개방형 프로토콜**이다. 클라이언트–서버 구조로, MCP 서버가 `tools` · `resources` · `prompts`를 노출하면 모델이 그 도구를 호출한다.

```json
{
  "mcpServers": {
    "playwright": { "command": "npx", "args": ["@playwright/mcp"] }
  }
}
```

브라우저(Playwright), 코드 분석(Serena), 문서(Notion), DB·API처럼 **Claude 바깥의 능력**을 표준화된 방식으로 끌어온다. Skill이 "방법"이라면 MCP는 "연결 통로"다.

#### 3. Hooks — 정책을 "강제"한다

Hook은 `settings.json`에 등록하는 **셸 명령**으로, 특정 라이프사이클 이벤트(`PreToolUse` · `PostToolUse` · `UserPromptSubmit` · `SessionStart` · `Stop` 등)에 **자동 실행**된다. 모델의 판단과 무관하게 하네스가 돌리므로 **결정론적**이다.

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash", "hooks": [{ "type": "command", "command": "./guard.sh" }] }
    ]
  }
}
```

커밋 전 자동 lint, 위험한 명령 차단, 저장 시 포매팅, 알림처럼 **항상·반드시 일어나야 하는 일**을 맡는다. `PreToolUse`는 도구 실행을 막을 수도 있다(가드레일).

#### 한눈에 비교

| 구분 | Skills | MCP | Hooks |
|---|---|---|---|
| 한 줄 | 모델이 쓰는 *방법·지식* | 외부 도구·데이터 *연결* | 이벤트 기반 *자동 실행* |
| 트리거 | 모델이 판단해 호출 | 모델이 도구 호출 | 하네스가 자동 |
| 결정론적? | 아니오(모델 주도) | 아니오(모델 주도) | **예**(시스템 주도) |
| 무엇을 확장 | 할 줄 아는 것 | 접근할 수 있는 것 | 강제되는 정책 |
| 설정 | `SKILL.md` | `.mcp.json` / settings | `settings.json` → hooks |
| 대표 예 | 디버깅 절차, 디자인 규칙 | Playwright, Serena, Notion | lint·위험명령 차단 |

#### 언제 무엇을?

- 반복 작업·전문 절차를 **모델이 알아서 따르게** 하고 싶다 → **Skill**
- **외부 시스템·데이터**에 닿아야 한다 → **MCP**
- **항상·자동으로 강제**할 규칙이나 자동화가 필요하다 → **Hook**

실제로는 함께 쓰인다. 예를 들어 *Hook*이 `PreToolUse`로 위험 명령을 거르고, *Skill*이 그 작업을 어떻게 처리할지 알려주고, *MCP*로 외부 데이터를 가져오는 식으로 한 흐름 안에서 협력한다.

### ✅ 결과 및 회고

멘탈 모델 한 줄로 압축하면:

> **Skills는 가르치고(teach), MCP는 연결하고(connect), Hooks는 강제한다(enforce).**

가장 헷갈렸던 Skill과 Hook의 차이는 **"누가 결정하나"** 한 줄로 갈렸다. Skill·MCP는 *모델이 상황을 보고* 쓸지 말지 정하는 반면, Hook은 *시스템이 조건만 맞으면 무조건* 실행한다. 그래서 "반드시"가 필요하면 Skill이 아니라 Hook이어야 한다.

도구를 깊이 이해할수록 더 잘 부리게 된다 — 세 메커니즘의 경계를 알고 나니, "이건 모델에게 맡길 일인가, 시스템이 강제할 일인가"를 먼저 묻게 됐다.
