// Event-delegation runtime for embedded troubleshooting widgets.
// Bound once to `document`, which survives View Transitions, so the
// guard below keeps it from double-binding if the module re-executes
// after a client-side swap.

function animateBars(panel: Element) {
	panel.querySelectorAll<HTMLElement>('.ts-bar > i').forEach((bar) => {
		const w = bar.dataset.w;
		if (!w) return;
		bar.style.width = '0';
		requestAnimationFrame(() => requestAnimationFrame(() => (bar.style.width = w)));
	});
}

function onClick(ev: MouseEvent) {
	const target = ev.target as HTMLElement;

	// Tabs (Before/After toggle) and Cards (method selector) share data-ts-tab.
	const tab = target.closest<HTMLElement>('[data-ts-tab]');
	if (tab) {
		const group = tab.closest<HTMLElement>('[data-ts-group]');
		if (!group) return;
		const key = tab.dataset.tsTab;
		group.querySelectorAll<HTMLElement>('[data-ts-tab]').forEach((b) => b.classList.toggle('on', b === tab));
		group.querySelectorAll<HTMLElement>('[data-ts-panel]').forEach((p) => {
			const show = p.dataset.key === key;
			p.classList.toggle('show', show);
			if (show) animateBars(p);
		});
		return;
	}

	// Flow replay: sequentially highlight .ts-node inside the target.
	const replay = target.closest<HTMLElement>('[data-ts-replay]');
	if (replay) {
		const wrap = document.getElementById(replay.dataset.tsReplay ?? '');
		if (!wrap) return;
		const nodes = [...wrap.querySelectorAll<HTMLElement>('.ts-node')];
		nodes.forEach((n) => n.classList.remove('hot'));
		(async () => {
			for (const n of nodes) {
				n.classList.add('hot');
				await new Promise((r) => setTimeout(r, 420));
			}
		})();
	}
}

if (!(window as any).__tsBound) {
	(window as any).__tsBound = true;
	document.addEventListener('click', onClick);
}
