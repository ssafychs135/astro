import type { CollectionEntry } from 'astro:content';

type BlogPost = CollectionEntry<'blog'>;

// Every series post is titled "<series name> N편: <subtitle>", so the series is read from the title
// instead of a separate frontmatter field.
const SERIES_TITLE = /^(.+?) (\d+)편: (.+)$/;

export interface SeriesInfo {
	name: string;
	part: number;
	subtitle: string;
}

export function seriesOf(post: BlogPost): SeriesInfo | undefined {
	const m = post.data.title.match(SERIES_TITLE);
	return m ? { name: m[1], part: Number(m[2]), subtitle: m[3] } : undefined;
}

export type ListEntry =
	| { kind: 'post'; post: BlogPost }
	| { kind: 'series'; name: string; posts: BlogPost[] };

// Collapses the parts of each series into one entry placed where its newest part sits in `posts`
// (expected newest first). Parts inside an entry are in reading order. A title that matches the
// pattern but has no sibling stays a single post.
export function groupBySeries(posts: BlogPost[]): ListEntry[] {
	const counts = new Map<string, number>();
	for (const p of posts) {
		const s = seriesOf(p);
		if (s) counts.set(s.name, (counts.get(s.name) ?? 0) + 1);
	}
	const entries: ListEntry[] = [];
	const groups = new Map<string, BlogPost[]>();
	for (const p of posts) {
		const s = seriesOf(p);
		if (!s || (counts.get(s.name) ?? 0) < 2) {
			entries.push({ kind: 'post', post: p });
			continue;
		}
		let group = groups.get(s.name);
		if (!group) {
			group = [];
			groups.set(s.name, group);
			entries.push({ kind: 'series', name: s.name, posts: group });
		}
		group.push(p);
	}
	for (const group of groups.values()) {
		group.sort((a, b) => seriesOf(a)!.part - seriesOf(b)!.part);
	}
	return entries;
}
