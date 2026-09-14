// Phase runner for one-shot explainer animations (LoraFlow, Nf4Levels, LikelihoodDisplacement).
//
// Markup contract:
//   [data-anim-group]            wrapper holding tabs, panels and a replay button
//   [data-anim] data-phases="0,600,…"   one animated panel; phase k adds class `p{k}` at that ms
//   [data-anim-tab="key"]        switches to the panel with matching data-key and plays it
//   [data-anim-play]             replays the visible panel
//
// Panels only hide their pre-animation state once armed (class `armed`), so without JS or with
// prefers-reduced-motion the final state is what renders. Click handling is delegated to
// `document` once (survives View Transitions); observers are re-attached on astro:page-load.

type Panel = HTMLElement & { __timers?: number[] };

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function phasesOf(panel: Panel): number[] {
	return (panel.dataset.phases ?? '0')
		.split(',')
		.map((s) => Number(s.trim()))
		.filter((n) => !Number.isNaN(n));
}

function clear(panel: Panel) {
	(panel.__timers ?? []).forEach((t) => window.clearTimeout(t));
	panel.__timers = [];
	const phases = phasesOf(panel);
	for (let i = 1; i <= phases.length; i++) panel.classList.remove(`p${i}`);
	panel.classList.remove('done');
}

function finish(panel: Panel) {
	clear(panel);
	panel.classList.remove('armed');
	phasesOf(panel).forEach((_, i) => panel.classList.add(`p${i + 1}`));
	panel.classList.add('done');
}

export function play(panel: Panel) {
	if (reduced()) {
		finish(panel);
		return;
	}
	// Rewind instantly (no reverse transitions, no delayed elements lingering), then play forward.
	panel.classList.add('ax-rewind');
	clear(panel);
	panel.classList.add('armed');
	// Force a style flush so transitions restart from the initial state.
	void panel.offsetWidth;
	panel.classList.remove('ax-rewind');
	const phases = phasesOf(panel);
	panel.__timers = phases.map((t, i) => window.setTimeout(() => panel.classList.add(`p${i + 1}`), t));
	const last = phases[phases.length - 1] ?? 0;
	panel.__timers.push(window.setTimeout(() => panel.classList.add('done'), last + 700));
}

function visiblePanel(group: HTMLElement): Panel | null {
	return group.querySelector<Panel>('[data-anim].show') ?? group.querySelector<Panel>('[data-anim]');
}

function onClick(ev: MouseEvent) {
	const target = ev.target as HTMLElement;
	const tab = target.closest<HTMLButtonElement>('[data-anim-tab]');
	const replay = target.closest<HTMLButtonElement>('[data-anim-play]');
	const group = (tab ?? replay)?.closest<HTMLElement>('[data-anim-group]');
	if (!group) return;

	if (tab) {
		const key = tab.dataset.animTab;
		group.querySelectorAll<HTMLButtonElement>('[data-anim-tab]').forEach((b) => {
			const on = b === tab;
			b.classList.toggle('on', on);
			b.setAttribute('aria-selected', String(on));
		});
		group.querySelectorAll<Panel>('[data-anim]').forEach((p) => {
			const on = p.dataset.key === key;
			p.classList.toggle('show', on);
			if (!on) clear(p);
		});
	}
	const panel = visiblePanel(group);
	if (panel) play(panel);
}

function init() {
	const panels = document.querySelectorAll<Panel>('[data-anim-group] [data-anim].show');
	if (reduced()) {
		panels.forEach(finish);
		return;
	}
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (!e.isIntersecting) return;
				io.unobserve(e.target);
				play(e.target as Panel);
			});
		},
		{ threshold: 0.35 },
	);
	panels.forEach((p) => {
		// Arm immediately so the panel does not flash its final state before scrolling into view.
		p.classList.add('armed');
		io.observe(p);
	});
}

const w = window as unknown as Record<string, boolean>;
if (!w.__animRuntimeBound) {
	w.__animRuntimeBound = true;
	document.addEventListener('click', onClick);
	document.addEventListener('astro:page-load', init);
}
