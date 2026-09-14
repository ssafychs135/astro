// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import remarkCjkFriendly from 'remark-cjk-friendly';
import rehypeTableScroll from './src/utils/rehype-table-scroll.mjs';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ssafychs135.github.io',
  base: '/astro',
  integrations: [mdx(), sitemap()],

  // Fix **bold**/_emphasis_ adjacent to CJK characters (Korean particles)
  markdown: {
    remarkPlugins: [remarkCjkFriendly],
    // Wrap tables so the wrapper scrolls on narrow screens and the table itself can fill the width
    rehypePlugins: [rehypeTableScroll],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});