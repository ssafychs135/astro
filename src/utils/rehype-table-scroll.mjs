// Wraps every markdown <table> in <div class="table-scroll">. The wrapper owns horizontal scrolling,
// so the table can stay `display: table; width: 100%` and fill the column at every width.
// Applies to .md and .mdx (MDX inherits markdown.rehypePlugins).
export default function rehypeTableScroll() {
	return (tree) => {
		const walk = (node) => {
			if (!node.children) return;
			node.children = node.children.map((child) => {
				if (child.type === 'element' && child.tagName === 'table') {
					return {
						type: 'element',
						tagName: 'div',
						properties: { className: ['table-scroll'] },
						children: [child],
					};
				}
				walk(child);
				return child;
			});
		};
		walk(tree);
	};
}
