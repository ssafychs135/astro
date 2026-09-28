// Generates the site's favicon set and default share image from inline SVG.
// Run from the repo root: node scripts/brand-assets.mjs
// Korean text is rendered with a system font (Apple SD Gothic Neo), so run it on macOS.
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const BG = '#070d1f';
const PRIMARY = '#69f6b8';
const SECONDARY = '#c180ff';
const MUTED = '#a5aac2';

// Terminal prompt mark ">_" matching the HUD style of the site.
const mark = (radius) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
	<rect width="64" height="64" rx="${radius}" fill="${BG}"/>
	<rect x="1.5" y="1.5" width="61" height="61" rx="${Math.max(radius - 1.5, 0)}" fill="none" stroke="${PRIMARY}" stroke-opacity="0.35" stroke-width="3"/>
	<path d="M17 20 L31 32 L17 44" fill="none" stroke="${PRIMARY}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
	<rect x="35" y="40" width="14" height="5.5" rx="2" fill="${SECONDARY}"/>
</svg>
`;

const KO = "Apple SD Gothic Neo, AppleGothic, sans-serif";
const EN = "Helvetica Neue, Helvetica, Arial, sans-serif";

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
	<defs>
		<radialGradient id="glow" cx="0.12" cy="0.1" r="0.7">
			<stop offset="0" stop-color="${PRIMARY}" stop-opacity="0.16"/>
			<stop offset="1" stop-color="${PRIMARY}" stop-opacity="0"/>
		</radialGradient>
		<pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
			<path d="M48 0 H0 V48" fill="none" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
		</pattern>
	</defs>
	<rect width="1200" height="630" fill="${BG}"/>
	<rect width="1200" height="630" fill="url(#grid)"/>
	<rect width="1200" height="630" fill="url(#glow)"/>
	<rect x="96" y="150" width="8" height="300" rx="2" fill="${PRIMARY}"/>
	<text x="140" y="200" font-family="${EN}" font-weight="700" font-size="28" letter-spacing="6" fill="${PRIMARY}">AI-NATIVE DEVELOPER</text>
	<text x="136" y="330" font-family="${KO}" font-weight="800" font-size="120" fill="#ffffff">최형선</text>
	<text x="140" y="420" font-family="${KO}" font-weight="600" font-size="40" fill="${MUTED}">언어·음성 모델을 적용하고, 측정으로 설정을 고릅니다</text>
	<text x="140" y="540" font-family="${EN}" font-weight="500" font-size="26" fill="${MUTED}" fill-opacity="0.8">ssafychs135.github.io/astro</text>
	<text x="1104" y="540" text-anchor="end" font-family="${EN}" font-weight="700" font-size="22" letter-spacing="4" fill="${SECONDARY}">PORTFOLIO · RESEARCH</text>
</svg>
`;

const png = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();

// ICO container holding PNG-encoded images (supported by every current browser).
function ico(images) {
	const header = Buffer.alloc(6 + images.length * 16);
	header.writeUInt16LE(0, 0);
	header.writeUInt16LE(1, 2);
	header.writeUInt16LE(images.length, 4);
	let offset = header.length;
	images.forEach(({ size, data }, i) => {
		const e = 6 + i * 16;
		header.writeUInt8(size >= 256 ? 0 : size, e);
		header.writeUInt8(size >= 256 ? 0 : size, e + 1);
		header.writeUInt8(0, e + 2);
		header.writeUInt8(0, e + 3);
		header.writeUInt16LE(1, e + 4);
		header.writeUInt16LE(32, e + 6);
		header.writeUInt32LE(data.length, e + 8);
		header.writeUInt32LE(offset, e + 12);
		offset += data.length;
	});
	return Buffer.concat([header, ...images.map((im) => im.data)]);
}

await writeFile('public/favicon.svg', mark(14));
const icoImages = [];
for (const size of [16, 32, 48]) icoImages.push({ size, data: await png(mark(14), size) });
await writeFile('public/favicon.ico', ico(icoImages));
// iOS applies its own corner mask, so the touch icon is drawn square.
await writeFile('public/apple-touch-icon.png', await png(mark(0), 180));
await sharp(Buffer.from(og)).png().toFile('src/assets/og-default.png');
console.log('brand assets written');
