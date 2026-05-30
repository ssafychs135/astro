// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import remarkCjkFriendly from 'remark-cjk-friendly';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ssafychs135.github.io',
  base: '/astro',
  integrations: [mdx(), sitemap()],

  // Fix **bold**/_emphasis_ adjacent to CJK characters (Korean particles)
  markdown: {
    remarkPlugins: [remarkCjkFriendly],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});