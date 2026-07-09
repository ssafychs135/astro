#!/usr/bin/env bash
# 문체 규칙 기계 점검 — 콘텐츠 파일에서 정규식으로 잡히는 보편 금지 패턴을 찾는다.
# 사용: bash lint.sh <파일경로>
# 문맥 판단이 필요한 규칙(은유·메타·헤지·대시·장황함)은 content-style 스킬 본문이 사람처럼 읽어 처리한다.
# 규칙 정본: CONTENT_GUIDE.md "문체 규칙".
set -uo pipefail

file="${1:-}"
if [ -z "$file" ] || [ ! -f "$file" ]; then
  echo "사용법: lint.sh <파일경로>" >&2
  exit 0
fi

hits=""
check() { if grep -qE "$2" "$file" 2>/dev/null; then hits="${hits} [$1]"; fi; return 0; }

# 보편·저오탐 패턴만 점검한다.
check "선언식 서두" "밝혀둔다"
check "구어체" "죠[.,)? ]|네요|거든요|잖아"

if [ -n "$hits" ]; then
  echo "기계 점검 걸림:${hits} ($file)." >&2
  echo "그 외 은유·메타·헤지·대시·장황함은 본문을 직접 검토하세요." >&2
  exit 2
fi
echo "기계 점검 통과 ($file). 은유·메타·헤지·대시·장황함은 본문 검토가 필요하다."
exit 0
