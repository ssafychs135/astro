# The Growth Curator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing Astro blog into "The Growth Curator" – a vibrant, light-themed digital garden featuring an identity-first home page, timeline-based growth logs, magazine-style tech research, and a professional portfolio showcase.

**Architecture:** Update global CSS variables for the new design system, refactor existing Astro layouts to support the light editorial style, and rewrite the primary pages (Home, Study, Blog, Portfolio) using Tailwind CSS to match the Stitch-generated design.

**Tech Stack:** Astro, Tailwind CSS, TypeScript, Google Fonts (Plus Jakarta Sans, Inter, Space Grotesk).

---

### Task 1: Global Theme & Constants Update

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/consts.ts`

- [ ] **Step 1: Update global CSS variables**
Replace the existing colors with the 'Digital Garden' palette.
```css
:root {
	--accent: #3b82f6; /* Sky Blue */
	--accent-secondary: #8b5cf6; /* Lavender */
	--accent-success: #10b981; /* Emerald Green */
	--black: 15, 23, 42; /* Slate 900 */
	--gray: 100, 116, 139; /* Slate 500 */
	--gray-light: 241, 245, 249; /* Slate 100 */
	--gray-extra-light: 248, 250, 252; /* Slate 50 */
}
```

- [ ] **Step 2: Update site constants**
```typescript
export const SITE_TITLE = "The Growth Curator";
export const SITE_DESCRIPTION = "Growth-driven Developer SEO's Digital Garden";
```

- [ ] **Step 3: Commit**
```bash
git add src/styles/global.css src/consts.ts
git commit -m "style: update global theme variables and site constants"
```

---

### Task 2: Refactor Layouts & Components

**Files:**
- Modify: `src/components/BaseHead.astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Add new fonts to BaseHead**
Include Plus Jakarta Sans and Space Grotesk.
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&family=Inter:wght@400;600&family=Space+Grotesk:wght@500&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Update Header for new navigation**
Update menu labels to: Home, Tech Research, Growth Log, Portfolio.

- [ ] **Step 3: Update Footer**
Apply the new minimal mono-font style.

- [ ] **Step 4: Commit**
```bash
git add src/components/BaseHead.astro src/components/Header.astro src/components/Footer.astro
git commit -m "feat: update shared components for new design system"
```

---

### Task 3: Implement Identity-First Home Page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Rewrite Home Page**
Implement the massive hero section and the three section entry cards using the Stitch design as a reference.

- [ ] **Step 2: Commit**
```bash
git add src/pages/index.astro
git commit -m "feat: implement identity-first home page"
```

---

### Task 4: Implement Growth Log (Timeline View)

**Files:**
- Modify: `src/pages/study/index.astro`
- Modify: `src/layouts/StudyPost.astro`

- [ ] **Step 1: Create Timeline Layout**
Refactor the study index page to show a vertical timeline with emerald nodes.

- [ ] **Step 2: Update StudyPost layout**
Ensure the individual study notes match the clean light style.

- [ ] **Step 3: Commit**
```bash
git add src/pages/study/index.astro src/layouts/StudyPost.astro
git commit -m "feat: implement timeline-based growth log"
```

---

### Task 5: Implement Tech Research (Magazine Style)

**Files:**
- Modify: `src/pages/blog/index.astro`
- Modify: `src/layouts/BlogPost.astro`

- [ ] **Step 1: Create Magazine Layout**
Refactor the blog index page to use an asymmetric grid with large imagery.

- [ ] **Step 2: Commit**
```bash
git add src/pages/blog/index.astro src/layouts/BlogPost.astro
git commit -m "feat: implement magazine-style tech research"
```

---

### Task 6: Implement Portfolio Showcase

**Files:**
- Modify: `src/pages/portfolio/index.astro`
- Modify: `src/layouts/PortfolioPost.astro`

- [ ] **Step 1: Create Portfolio Grid**
Implement the clean card grid with lavender tags and demo/github links.

- [ ] **Step 2: Commit**
```bash
git add src/pages/portfolio/index.astro src/layouts/PortfolioPost.astro
git commit -m "feat: implement professional portfolio showcase"
```
