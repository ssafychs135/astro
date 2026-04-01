# Design System Specification: The Growth Curator

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Garden"**

이 디자인 시스템은 개발자의 학습과 탐구 과정을 살아있는 유기체인 '정원'에 비유합니다. 단순한 기술 전시를 넘어, 지식이 어떻게 뿌리를 내리고(기술 조사), 줄기를 뻗으며(성장 기록), 열매를 맺는지(포트폴리오)를 보여주는 것이 목표입니다. 

전체적으로 청량하고(Vibrant), 깨끗하며(Clean), 에너지가 넘치는(Energetic) 분위기를 지향합니다.

---

## 2. Colors & Surface Philosophy
밝은 라이트 모드를 베이스로 하며, 성장을 상징하는 블루와 라벤더 톤을 강조 색상으로 사용합니다.

- **Primary:** `Sky Blue` (#3b82f6) - 지적 탐구와 신뢰
- **Secondary:** `Lavender` (#8b5cf6) - 창의성과 실험
- **Background:** `Pure White` (#ffffff) / `Soft Gray` (#f8fafc)
- **Accent:** `Emerald Green` (#10b981) - '성장' 상태 및 완료 표시

### Surface Hierarchy
- **Level 0 (Base):** `surface` (#ffffff)
- **Level 1 (Section):** `surface-container-low` (#f1f5f9) - 대형 섹션 구분
- **Level 2 (Component):** `surface-container` (#ffffff) - 그림자 없이 1px 테두리로 구분된 카드

---

## 3. Typography
현대적이고 경쾌한 산세리프 폰트 조합을 사용합니다.

- **Headlines:** `Inter` 또는 `Plus Jakarta Sans` - 두껍고(Extra Bold) 자간을 좁게 설정하여 현대적인 느낌 강조
- **Body:** `Inter` - 가독성을 위해 적절한 행간(1.6) 확보
- **Meta/Labels:** `Space Grotesk` - 기술적인 정밀함과 위트를 더하는 폰트로 사용

---

## 4. Layout & Information Architecture
**구조: 독립형 (Independent Sections)**

### 4.1 Home Page (The Identity)
- **Hero:** 화면의 절반 이상을 차지하는 거대한 텍스트로 본인의 비전 기술 ("Growth-driven Developer SEO")
- **Visual:** 본인을 상징하는 캐릭터나 추상적인 기하학적 도형(정원 모티브) 배치
- **Navigation:** 하단에 3가지 핵심 섹션으로 가는 커다란 카드형 링크

### 4.2 Growth Log (The Timeline & Grid)
- **Dual View:** 상단 토글을 통해 'Timeline'과 'Grid' 전환
- **Timeline:** 수직 선을 따라 학습 노드가 배치되는 형태
- **Grid:** GitHub 잔디를 연상시키는 밀도 있는 사각형 지식 블록

### 4.3 Tech Research (The Magazine)
- **Layout:** 비대칭 그리드, 큰 헤드라인 이미지, 잡지 스타일의 텍스트 배치
- **Point:** 글의 핵심 요약을 카드 상단에 과감하게 배치

### 4.4 Portfolio (The Showcase)
- **Style:** 깔끔한 화이트 카드에 사용 기술 태그를 '라벤더' 색상으로 강조

---

## 5. Do's and Don'ts
- **Do:** 둥근 모서리(`rounded-xl`)를 적절히 사용하여 친근함 유지
- **Do:** 생동감 있는 그라디언트(Blue to Purple)를 주요 버튼에 사용
- **Don't:** 너무 어두운 색상이나 칙칙한 톤 지양
- **Don't:** 복잡한 그림자 사용 지양 (Flat 또는 아주 얇은 Outline 선호)
