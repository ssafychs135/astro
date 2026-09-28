import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const portfolio = defineCollection({
	loader: glob({ base: './src/content/portfolio', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			stack: z.array(z.string()),
			githubUrl: z.string().url().optional(),
			demoUrl: z.string().url().optional(),
			role: z.string().optional(),
			// Working period shown on cards and the post header, e.g. "2026.07 ~ 2026.09". pubDate is the date it was published here.
			period: z.string().optional(),
		}),
});

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tags: z.array(z.string()).optional(),
			category: z.string().optional(),
			// Part number within a series; only breaks same-day ties in list order (see utils/sortPosts.ts).
			seriesOrder: z.number().int().positive().optional(),
		}),
});

export const collections = { portfolio, blog };

