import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		// context.site has no base path, so the channel link and item links
		// must both carry the base explicitly.
		site: new URL(`${base}/`, context.site).href,
		items: posts.map((post) => ({
			...post.data,
			link: `${base}/blog/${post.id}/`,
		})),
	});
}
