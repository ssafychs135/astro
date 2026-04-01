# The AX Strategist Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the blog into "The AX Strategist" – a high-end, dark-themed portfolio for an AI Transformation specialist, featuring glowing neon accents, technical precision, and strategic business-AI alignment.

**Architecture:** Switch to a permanent Dark Mode base using Slate 950, update the global design tokens for Neon Emerald and Electric Violet, and refactor all major pages to reflect AX professional terminology and aesthetics.

**Tech Stack:** Astro, Tailwind CSS v4, Plus Jakarta Sans, Space Grotesk, Inter.

---

### Task 1: Quantum Dark Theme Integration

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/consts.ts`

- [ ] **Step 1: Update global CSS variables for Dark Mode**
Replace 'Digital Garden' palette with 'Quantum Dark'.
```css
:root {
	--accent: #10b981; /* Neon Emerald */
	--accent-secondary: #a855f7; /* Electric Violet */
	--black: 248, 250, 252; /* Slate 50 (Text color in dark mode) */
	--bg-base: #030712; /* Slate 950 */
	--gray: 148, 163, 184; /* Slate 400 */
	--gray-light: 30, 41, 59; /* Slate 800 */
}
```

- [ ] **Step 2: Update Tailwind v4 @theme and Custom Prose**
Apply sharp corners and glowing borders to the prose style.

- [ ] **Step 3: Update Site Constants**
```typescript
export const SITE_TITLE = "The AX Strategist";
export const SITE_DESCRIPTION = "Architecting the Future of AI Transformation";
```

- [ ] **Step 4: Commit**
```bash
git add src/styles/global.css src/consts.ts
git commit -m "style: integrate Quantum Dark theme and AX branding constants"
```

---

### Task 2: AX Identity Header & Navigation

**Files:**
- Modify: `src/components/Header.astro`

- [ ] **Step 1: Update Navigation Labels**
- Tech Research -> AX Strategy
- Growth Log -> AI Implementation
- Portfolio -> AX Solutions

- [ ] **Step 2: Apply Dark Technical Styling**
Use monospaced font for nav items and a subtle glowing bottom border for active links.

- [ ] **Step 3: Commit**
```bash
git add src/components/Header.astro
git commit -m "feat: update navigation for AX professional identity"
```

---

### Task 3: Implement AX Visionary Home Page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Rewrite Hero Section**
Implement "Architecting the Future of AI Transformation" with massive Space Grotesk typography.

- [ ] **Step 2: Implement Technical Visual**
Create a glowing grid/neural network motif using CSS/SVG.

- [ ] **Step 3: Update Section Cards**
Apply the 'Glowing Border' and 'Sharp Corner' style to the three AX pillars.

- [ ] **Step 4: Commit**
```bash
git add src/pages/index.astro
git commit -m "feat: implement AX visionary landing page"
```

---

### Task 4: Align Section Pages with AX Terminology

**Files:**
- Modify: `src/pages/blog/index.astro`
- Modify: `src/pages/study/index.astro`
- Modify: `src/pages/portfolio/index.astro`

- [ ] **Step 1: Update Page Titles and Descriptions**
Ensure each index page uses the new AX terminology (Strategy, Implementation, Solutions).

- [ ] **Step 2: Update Section Accents**
AX Strategy (Emerald), AI Implementation (Violet), AX Solutions (Emerald/Violet gradient).

- [ ] **Step 3: Commit**
```bash
git add src/pages/blog/index.astro src/pages/study/index.astro src/pages/portfolio/index.astro
git commit -m "feat: align section pages with AX professional terminology"
```

---

### Task 5: AX Content Migration (Sample Update)

**Files:**
- Modify: `src/content/blog/future-of-web-performance.md`
- Modify: `src/content/study/solving-view-transition-conflict.md`
- Modify: `src/content/portfolio/digital-garden-builder.md`

- [ ] **Step 1: Refactor Sample Content for AX Focus**
Rewrite titles and descriptions to focus on AI Transformation and ROI.

- [ ] **Step 2: Commit**
```bash
git add src/content/
git commit -m "content: refactor sample posts for AX professional context"
```
