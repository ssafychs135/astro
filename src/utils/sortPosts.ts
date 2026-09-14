import type { CollectionEntry } from 'astro:content';

type BlogPost = CollectionEntry<'blog'>;

// Newest first. Posts published on the same day that both carry `seriesOrder` are shown with the
// latest part first (… 3, 2, 1), consistent with the newest-first list. Every other tie returns 0,
// so Array.prototype.sort (stable) keeps the existing order and posts outside a series are unaffected.
export function byPubDateDesc(a: BlogPost, b: BlogPost): number {
	const diff = b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
	if (diff !== 0) return diff;
	const ao = a.data.seriesOrder;
	const bo = b.data.seriesOrder;
	if (ao !== undefined && bo !== undefined) return bo - ao;
	return 0;
}
