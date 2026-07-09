---
name: content-style
description: Check Korean site content (blog, portfolio, UI copy) against the 문체 규칙 in CONTENT_GUIDE.md. Use when writing or editing prose under src/content, or when the user asks to review writing style. Runs a mechanical lint plus a holistic review, then fixes what it finds.
---

# 문체 점검 (content-style)

이 저장소의 한국어 콘텐츠(블로그·포트폴리오·UI 문구)를 `CONTENT_GUIDE.md`의 "문체 규칙"에 맞춰 점검하고 고친다.

## 절차

1. **대상 파일 결정.** 인자로 파일 경로가 오면 그 파일, 없으면 방금 작성·수정한 `src/content`의 `.md`/`.mdx`.
2. **기계 점검.** `bash .claude/skills/content-style/lint.sh <파일>`을 실행한다. 정규식으로 잡히는 패턴(선언식 서두, 구어체)을 확인한다.
3. **판단 점검.** `CONTENT_GUIDE.md`의 "문체 규칙" 9개를 기준으로 본문을 직접 읽는다. 정규식으로 못 잡는 다음 항목을 특히 본다.
   - 화려한 문체: 효과를 노린 은유·비유, 과장된 부사, 의인화, 극적 표현
   - 메타: 글의 구성·방법론을 정당화하는 문장
   - 헤지·군더더기: 방어적 caveat, 자기 분류를 정당화하는 문장
   - 대시(—) 연결, 제목·설명의 장황함, 딱딱한 전문용어
4. **수정.** 발견한 항목을 고친다. 사실과 구조는 유지하고 표현만 평서화한다.
5. **보고.** 무엇을 왜 고쳤는지 한 줄로 알린다.

규칙의 정본은 `CONTENT_GUIDE.md`다. 목표는 정직하고 담백한 기술 문체다.
