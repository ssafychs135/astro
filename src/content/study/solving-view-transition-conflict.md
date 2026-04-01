---
title: "Astro View Transitions API 충돌 해결"
description: "페이지 전환 시 전역 이벤트 리스너가 중복 등록되어 UI가 오작동하던 문제를 해결한 과정을 기록합니다."
pubDate: 2026-04-01
category: "Astro"
tags: ["BugFix", "JavaScript", "UX"]
---

### 🔍 문제 상황
View Transitions를 적용한 후, 페이지를 이동할 때마다 다크모드 토글 버튼의 클릭 이벤트가 2번씩 발생하는 현상을 발견했습니다.

### 🛠 해결 방법
Astro의 `astro:page-load` 이벤트를 사용하여 리스너를 한 번만 등록하도록 수정했습니다.

```javascript
document.addEventListener('astro:page-load', () => {
  // 여기서 이벤트 리스너를 등록하면 페이지 전환 후에도 한 번만 실행됩니다.
  initDarkMode();
});
```

### ✅ 결과
이제 부드러운 애니메이션과 함께 기능적인 결함 없이 페이지가 전환됩니다. 작은 디테일이 완성도를 만든다는 것을 다시 한번 깨달았습니다.
