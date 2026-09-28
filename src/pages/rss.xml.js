import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_NAME } from '../consts';
import { byPubDateDesc } from '../utils/sortPosts';

export async function GET(context) {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const posts = (await getCollection('blog')).sort(byPubDateDesc);
	return rss({
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
		// context.site has no base path, so the channel link and item links
		// must both carry the base explicitly.
		site: new URL(`${base}/`, context.site).href,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			categories: post.data.tags,
			link: `${base}/blog/${post.id}/`,
		})),
	});
}
