#!/usr/bin/env python3
# 긴 문장 후보 추출: 본문을 마침표 기준으로 나누어 글자 수가 많은 순서로 출력한다.
# 사용: python3 sentences.py <파일경로> [개수, 기본 25]
# 길이는 후보를 고르는 기준일 뿐이다. 나눌지는 CONTENT_GUIDE.md "문체 규칙" 5번으로 판단한다.
# frontmatter, 코드 블록, 표, 제목, import/JSX 줄, HTML 주석은 제외한다.
import re
import sys

if len(sys.argv) < 2:
    print("사용법: sentences.py <파일경로> [개수]", file=sys.stderr)
    sys.exit(0)
path = sys.argv[1]
top = int(sys.argv[2]) if len(sys.argv) > 2 else 25

lines = open(path, encoding="utf-8").read().split("\n")
start = 0
if lines and lines[0].strip() == "---":
    start = next((i + 1 for i in range(1, len(lines)) if lines[i].strip() == "---"), 0)

found = []
in_code = False
for no, raw in enumerate(lines[start:], start + 1):
    line = raw.strip()
    if line.startswith("```"):
        in_code = not in_code
        continue
    if in_code or not line or line.startswith(("#", "|", "import ", "<", "{", "<!--")):
        continue
    text = re.sub(r"^(>\s*|[-*]\s+|\d+\.\s+)+", "", line)
    text = re.sub(r"\*\*|`", "", text)
    for sent in re.split(r"(?<=[.?!])\s+", text):
        sent = sent.strip()
        if sent:
            found.append((len(sent), no, sent))

found.sort(key=lambda t: -t[0])
print(f"{path}: 문장 {len(found)}개, 상위 {min(top, len(found))}개")
for n, no, sent in found[:top]:
    print(f"{n:4d}자  {no:4d}행  {sent}")
