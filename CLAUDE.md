# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal Astro static site — "The AX Strategist", an AI-transformation-themed blog/portfolio. Korean-language content. Builds to static HTML and deploys to GitHub Pages.

## Commands

```sh
npm run dev              # dev server — http://localhost:4321/astro/ (served under the base path)
npm run build            # production build to ./dist/
npm run preview          # preview the built ./dist/ locally
npm run astro -- check   # type-check .astro/.ts + validate content-collection schemas
```

There is no lint/format/test tooling. `astro check` plus `astro build` are the validation gates — run both before considering a change done; `build` catches content-schema violations and broken `<Image>` sources that `check` can miss. For UI/interactive changes, also verify in the browser at the `/astro/`-prefixed URL.

Node `>=22.12.0` is required. Package manager is npm.

## Architecture

### Base path is `/astro` — this is the single most error-prone invariant
The site deploys under `https://ssafychs135.github.io/astro` (`site` + `base` in `astro.config.mjs`). **Every internal link must be base-aware.** The canonical pattern, used in `Header.astro` and all list pages, is:

```js
const base = import.meta.env.BASE_URL.replace(/\/$/, "");
// then: `${base}/blog/${post.id}/`
```

Hardcoding `/blog/...` works in dev but produces broken links in production. When adding any navigation or link, follow this pattern.

### View Transitions
`<main>` animates with `transition:animate="fade"` and the `Header` uses `transition:persist`. Any client-side `<script>` that binds DOM event listeners **must re-run on the `astro:after-swap` event** — otherwise it stops working after the first client-side navigation. See the mobile-menu script in `src/components/Header.astro` for the pattern (`setupMobileMenu()` called both on load and on `astro:after-swap`).

### Content collections (`src/content.config.ts`)
Two collections, each loaded via the `glob` loader with a **distinct Zod schema** — do not assume shared fields beyond the base:
- **`blog`** (Research — formerly split into blog+study, now merged) — base (`title`, `description`, `pubDate`, optional `updatedDate`/`heroImage`) + optional `tags: string[]` and `category: string`. The `/blog` list page renders a client-side tag filter from the union of all posts' `tags`.
- **`portfolio`** — base + required `stack: string[]`, optional `role`/`githubUrl`/`demoUrl`. Portfolio entries are `.mdx` and embed interactive widgets from `src/components/troubleshooting/`.

Routing: list pages (`src/pages/<collection>/index.astro`) call `getCollection()` and sort by `pubDate` descending. Dynamic post routes (`[...slug].astro`) use `getStaticPaths()` mapping **`post.id`** (not `post.slug`) to the `slug` param, then render the body via `const { Content } = await render(post)`.

### Layouts (two distinct kinds — keep them distinct)
- **`MainLayout.astro`** wraps list/index pages, providing `Header` + `Footer` + the `<main>` container.
- **Post layouts** (`BlogPost`, `PortfolioPost`) do **not** wrap `MainLayout`. Each renders its own complete `<html>/<head>/<body>` with its own `Header`/`Footer`, and renders the post body inside `<div class="prose-obsidian">`. Their `Props` type is `CollectionEntry<'collection'>['data']`.

### Design system — "Quantum Obsidian"
The entire design system lives in `src/styles/global.css`. There is **no `tailwind.config.js`** — this is Tailwind CSS v4, configured CSS-first via `@import "tailwindcss"`, `@plugin`, and `@theme` (wired through `@tailwindcss/vite` in `astro.config.mjs`). Dark, technical/HUD aesthetic: mint `--color-primary` (#69f6b8), purple `--color-secondary` (#c180ff), deep-navy surfaces. Fonts: Pretendard (body/headings, Korean), Space Grotesk (`.tech-font`/`.tech-label`, uppercase HUD chrome), Inter. Reuse the existing custom classes (`.prose-obsidian`, `.card-obsidian`, `.tech-label`, `.telemetry-bar`, `.blueprint-frame`, `.glass-panel`, `.pulse-dot`, `.tag-obsidian`) rather than reinventing styles. UI copy is written in system/HUD voice (`> System_Insights // ...`, `01_Portfolio`). `<html lang="ko">` and `word-break: keep-all` throughout.

### Indentation
Tabs in `.astro`, `.ts`, and `.css` files.

## Authoring content

**Writing style is a hard requirement: follow the "문체 규칙" checklist in `CONTENT_GUIDE.md` for ALL prose** (blog, portfolio, UI copy). In short: formal 문어체; no ornate/metaphor/dramatic phrasing; no disclaimer openers or meta-commentary justifying the article's own structure; cut hedging/filler and stay on the substance; minimal em-dash connectors; short titles/descriptions; prefer everyday wording over stiff jargon. **When writing or editing content, run the `content-style` skill** to check the prose against these rules (mechanical lint + holistic review).

When adding posts, follow the per-collection templates in `CONTENT_GUIDE.md` (and `GEMINI.md`). Key rules: filenames are lowercase-with-hyphens; `pubDate`/`updatedDate` use `YYYY-MM-DD`; `heroImage` references `src/assets/` via relative path (`../../assets/<file>`) so Astro's `<Image>`/sharp optimization applies; frontmatter must satisfy the target collection's schema or the build fails. `portfolio` posts have recommended section structures documented in the guides.

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages automatically on push to `master` or `main` (via `withastro/action@v3`, Node 22). No manual deploy step.
