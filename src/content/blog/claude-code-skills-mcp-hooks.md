---
title: "Claude Code의 Skills · MCP · Hooks, 무엇이 다른가"
description: "역할이 다른 세 가지 확장 메커니즘 Skills·MCP·Hooks를 '누가 결정하고 무엇을 확장하나'라는 축으로 정리한 노트입니다."
pubDate: 2026-05-30
category: "Claude Code"
tags: ["Claude Code"]
---

### 🔍 문제 상황 / 학습 목표

Claude Code를 본격적으로 사용하다 보면 **Skills**, **MCP**, **Hooks**가 전부 확장 기능처럼 뭉뚱그려 보인다. 셋 다 Claude를 더 잘 동작하게 만드는 수단으로 보이지만, 언제 무엇을 써야 하는지 물으면 답이 막힌다.

이 노트는 세 가지를 **"누가 실행을 결정하고, 무엇을 확장하는가"**라는 하나의 축으로 정리하는 것을 목표로 한다.

### 🛠 해결 과정 / 내용

핵심은 셋이 경쟁 관계가 아니라 **서로 다른 층위**를 확장한다는 점이다.

- **Skills**는 모델이 무엇을 할 줄 아는가, 즉 절차와 지식을 확장한다. 모델이 판단해서 가져다 쓴다.
- **MCP**는 모델이 무엇에 연결되는가, 즉 외부 도구와 데이터를 확장한다. 모델이 도구를 호출한다.
- **Hooks**는 언제 반드시 무엇이 일어나는가, 즉 자동화와 가드레일을 정한다. 하네스가 결정론적으로 실행하며 모델이 결정하지 않는다.

#### 1. Skills: 모델에게 "방법"을 가르친다

Skill은 `SKILL.md`로 패키징한 **재사용 가능한 절차와 전문지식**이다. `description`을 보고 모델이 지금 이 작업에 필요하다고 판단하면 그 순간 본문을 로드한다. 평소에는 이름과 설명만 노출되고 호출 시에 전체가 로드되는 점진적 공개 방식이다.

```yaml
---
name: debugging
description: Use when investigating a bug or unexpected behavior
---
(여기에 디버깅 절차·체크리스트를 서술)
```

반복되는 워크플로우, 팀의 디자인 규칙, 도메인 지식을 모델이 스스로 따르게 만들 때 사용한다.

#### 2. MCP: 외부 세계에 "연결"한다

MCP(Model Context Protocol)는 Claude를 외부 시스템에 잇는 **개방형 프로토콜**이다. 클라이언트와 서버 구조로 동작하며, MCP 서버가 `tools`, `resources`, `prompts`를 노출하면 모델이 그 도구를 호출한다.

```json
{
  "mcpServers": {
    "playwright": { "command": "npx", "args": ["@playwright/mcp"] }
  }
}
```

브라우저 제어의 Playwright, 코드 분석의 Serena, 문서의 Notion, 데이터베이스와 API처럼 **Claude 바깥의 능력**을 표준화된 방식으로 끌어온다. Skill이 방법에 해당한다면 MCP는 연결 통로에 해당한다.

#### 3. Hooks: 정책을 "강제"한다

Hook은 `settings.json`에 등록하는 **셸 명령**으로, `PreToolUse`, `PostToolUse`, `UserPromptSubmit`, `SessionStart`, `Stop` 등 특정 생명주기 이벤트에 **자동 실행**된다. 모델의 판단과 무관하게 하네스가 실행하므로 **결정론적**이다.

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash", "hooks": [{ "type": "command", "command": "./guard.sh" }] }
    ]
  }
}
```

커밋 전 자동 lint, 위험한 명령 차단, 저장 시 포매팅, 알림처럼 **항상 반드시 일어나야 하는 일**을 맡는다. `PreToolUse`는 가드레일로서 도구 실행을 막을 수도 있다.

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

- 반복 작업과 전문 절차를 **모델이 스스로 따르게** 하려면 **Skill**을 쓴다.
- **외부 시스템과 데이터**에 닿아야 한다면 **MCP**를 쓴다.
- **항상 자동으로 강제**할 규칙이나 자동화가 필요하다면 **Hook**을 쓴다.

실제로는 세 가지가 함께 쓰인다. 예를 들어 Hook이 `PreToolUse`로 위험 명령을 거르고, Skill이 그 작업을 어떻게 처리할지 알려주며, MCP로 외부 데이터를 가져오는 식으로 한 흐름 안에서 협력한다.

### ✅ 결과 및 회고

전체를 한 문장으로 압축하면 다음과 같다.

> **Skills는 가르치고(teach), MCP는 연결하고(connect), Hooks는 강제한다(enforce).**

가장 헷갈렸던 Skill과 Hook의 차이는 누가 결정하는가에 따라 갈렸다. Skill과 MCP는 모델이 상황을 보고 쓸지 말지 정하는 반면, Hook은 시스템이 조건만 맞으면 무조건 실행한다. 따라서 반드시 일어나야 하는 일이라면 Skill이 아니라 Hook이어야 한다.

도구를 깊이 이해할수록 더 잘 활용하게 된다. 세 메커니즘의 경계를 알고 나니 이것이 모델에게 맡길 일인지 시스템이 강제할 일인지를 먼저 묻게 되었다.
