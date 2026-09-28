// Shared runner for the CHZZK portfolio figures.
//
// Each figure registers a setup that returns three controls: `arm` puts it in its starting pose,
// `play` runs it, `finish` jumps to the end. The server renders the finished pose, so the figure
// reads correctly without JS and under prefers-reduced-motion; `arm` is only called when motion
// is allowed. A figure plays once when it scrolls into view and again from any [data-cz-replay].
// Setup runs on load and on astro:page-load, so figures keep working after View Transitions; the
// data-cz-bound flag keeps a figure from being wired twice.

export {};

export type Ctl = { arm: () => void; play: () => void; finish: () => void };

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function mount(selector: string, setup: (root: HTMLElement) => Ctl) {
	const init = () => {
		document.querySelectorAll<HTMLElement>(selector).forEach((root) => {
			if (root.dataset.czBound) return;
			root.dataset.czBound = '1';
			const ctl = setup(root);
			root.querySelectorAll<HTMLElement>('[data-cz-replay]').forEach((b) =>
				b.addEventListener('click', () => (reduced() ? ctl.finish() : ctl.play())),
			);
			if (reduced()) {
				ctl.finish();
				return;
			}
			ctl.arm();
			const io = new IntersectionObserver(
				(entries) => {
					if (entries.some((e) => e.isIntersecting)) {
						io.disconnect();
						ctl.play();
					}
				},
				{ threshold: 0.3 },
			);
			io.observe(root);
		});
	};
	init();
	document.addEventListener('astro:page-load', init);
}
