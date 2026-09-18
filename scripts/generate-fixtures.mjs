// Generates the static fixture imagery in assets/img/fixtures.
// Flat, muted landscape and architecture compositions: stand-ins for
// photography so templates can be judged with realistic image weight.
// Run: node scripts/generate-fixtures.mjs

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'assets/img/fixtures');
mkdirSync(out, { recursive: true });

function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const palettes = [
  { sky: '#DAD6CA', far: '#B3B7A6', mid: '#8A957C', near: '#5E6B52', accent: '#C4907A', ground: '#CBC3B0', ink: '#2F332B' },
  { sky: '#CFD5D2', far: '#A8B4B0', mid: '#7F918C', near: '#4F615D', accent: '#D8C39B', ground: '#BFC4BA', ink: '#27302E' },
  { sky: '#E3DDD0', far: '#C9BBA6', mid: '#A68F74', near: '#6F5E4B', accent: '#8FA08A', ground: '#D6CCB9', ink: '#352E26' },
  { sky: '#D5D3CB', far: '#B9B6AC', mid: '#8E8B80', near: '#5C5A52', accent: '#B8664E', ground: '#C8C4B8', ink: '#262522' },
];

function hills(r, y, amp, color, w = 1600, h = 1200) {
  let d = `M0 ${h} L0 ${y}`;
  const steps = 6;
  for (let i = 1; i <= steps; i++) {
    const x = (w / steps) * i;
    const cx = x - w / steps / 2;
    const cy = y - amp * (r() * 1.4 - 0.2);
    const ny = y + amp * (r() - 0.5) * 0.6;
    d += ` Q${cx.toFixed(0)} ${cy.toFixed(0)} ${x.toFixed(0)} ${ny.toFixed(0)}`;
  }
  return `<path d="${d} L${w} ${h} Z" fill="${color}"/>`;
}

function trees(r, count, baseY, color, spread = 1600) {
  let s = '';
  for (let i = 0; i < count; i++) {
    const x = r() * spread;
    const size = 26 + r() * 46;
    const y = baseY + r() * 60;
    s += `<rect x="${(x - 3).toFixed(0)}" y="${y.toFixed(0)}" width="6" height="${(size * 0.9).toFixed(0)}" fill="${color}"/>`;
    s += `<circle cx="${x.toFixed(0)}" cy="${(y - size * 0.35).toFixed(0)}" r="${size.toFixed(0)}" fill="${color}"/>`;
  }
  return s;
}

function landscape(seed, p) {
  const r = rng(seed);
  const sun = r() > 0.5
    ? `<circle cx="${(300 + r() * 1000).toFixed(0)}" cy="${(180 + r() * 160).toFixed(0)}" r="${(60 + r() * 50).toFixed(0)}" fill="${p.ground}" opacity="0.9"/>`
    : '';
  return [
    `<rect width="1600" height="1200" fill="${p.sky}"/>`,
    sun,
    hills(r, 560, 120, p.far),
    hills(r, 700, 90, p.mid),
    trees(r, 9, 690, p.near),
    hills(r, 860, 60, p.near),
    `<rect y="980" width="1600" height="220" fill="${p.ground}"/>`,
    `<path d="M0 1040 C 400 1000, 800 1100, 1600 1030 L1600 1060 C 800 1130, 400 1030, 0 1070 Z" fill="${p.accent}" opacity="0.7"/>`,
  ].join('');
}

function architecture(seed, p) {
  const r = rng(seed);
  let s = `<rect width="1600" height="1200" fill="${p.sky}"/>`;
  s += `<rect y="860" width="1600" height="340" fill="${p.ground}"/>`;
  let x = -40;
  while (x < 1600) {
    const w = 140 + r() * 260;
    const h = 260 + r() * 460;
    const col = [p.far, p.mid, p.accent, p.near][Math.floor(r() * 4)];
    s += `<rect x="${x.toFixed(0)}" y="${(860 - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${col}"/>`;
    const rows = Math.floor(h / 70);
    const cols = Math.max(1, Math.floor(w / 60));
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (r() > 0.35) {
          s += `<rect x="${(x + 18 + j * (w - 24) / cols).toFixed(0)}" y="${(860 - h + 30 + i * 70).toFixed(0)}" width="${((w - 24) / cols - 18).toFixed(0)}" height="34" fill="${p.ink}" opacity="0.18"/>`;
        }
      }
    }
    x += w + 12 + r() * 30;
  }
  s += trees(r, 7, 840, p.near);
  s += `<rect y="1000" width="1600" height="8" fill="${p.ink}" opacity="0.12"/>`;
  return s;
}

function plan(seed, p) {
  // Aerial site plan: paths, planting beds, a pond.
  const r = rng(seed);
  let s = `<rect width="1600" height="1200" fill="${p.ground}"/>`;
  for (let i = 0; i < 9; i++) {
    const x = r() * 1400;
    const y = r() * 1000;
    const w = 160 + r() * 420;
    const h = 120 + r() * 300;
    s += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${[p.far, p.mid, p.accent][i % 3]}"/>`;
  }
  s += `<ellipse cx="${(500 + r() * 600).toFixed(0)}" cy="${(400 + r() * 400).toFixed(0)}" rx="220" ry="140" fill="#9FB0B3"/>`;
  s += `<path d="M0 ${(300 + r() * 600).toFixed(0)} C 500 200, 900 1000, 1600 ${(400 + r() * 400).toFixed(0)}" stroke="${p.sky}" stroke-width="44" fill="none"/>`;
  s += trees(r, 26, 0, p.near, 1600).replace(/<rect[^>]+>/g, '');
  return s;
}

function portrait(seed, p) {
  const r = rng(seed);
  const bg = [p.sky, p.ground, p.far][Math.floor(r() * 3)];
  const skin = ['#C9A58B', '#8C6A55', '#E1C3A8', '#6E5244', '#B98F74'][Math.floor(r() * 5)];
  const cloth = [p.near, p.ink, p.accent, p.mid][Math.floor(r() * 4)];
  return `<rect width="1200" height="1500" fill="${bg}"/>
<path d="M150 1500 C 170 1120, 380 1010, 600 1010 C 820 1010, 1030 1120, 1050 1500 Z" fill="${cloth}"/>
<rect x="530" y="820" width="140" height="230" fill="${skin}"/>
<ellipse cx="600" cy="640" rx="210" ry="260" fill="${skin}"/>
<path d="M390 600 C 380 380, 520 330, 610 340 C 740 345, 830 420, 815 610 C 780 470, 640 440, 520 470 C 450 490, 410 540, 390 600 Z" fill="${p.ink}" opacity="${(0.55 + r() * 0.4).toFixed(2)}"/>`;
}

const images = [
  ['park-01', 1, landscape, 0],
  ['park-02', 7, landscape, 1],
  ['park-03', 19, landscape, 2],
  ['park-04', 31, landscape, 3],
  ['street-01', 5, architecture, 0],
  ['street-02', 11, architecture, 1],
  ['street-03', 23, architecture, 2],
  ['street-04', 41, architecture, 3],
  ['plan-01', 13, plan, 0],
  ['plan-02', 29, plan, 2],
  ['plan-03', 37, plan, 1],
  ['plan-04', 53, plan, 3],
];

for (const [name, seed, fn, pi] of images) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200" width="1600" height="1200" preserveAspectRatio="xMidYMid slice">${fn(seed, palettes[pi])}</svg>\n`;
  writeFileSync(join(out, `${name}.svg`), svg);
}

for (let i = 1; i <= 8; i++) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1500" width="1200" height="1500" preserveAspectRatio="xMidYMid slice">${portrait(i * 97, palettes[i % 4])}</svg>\n`;
  writeFileSync(join(out, `portrait-0${i}.svg`), svg);
}

// Client logos: neutral wordmarks in currentColor-like grey.
const logos = [
  ['halden', '<text x="0" y="30" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="-1">Halden</text>', 110],
  ['oakmere', '<text x="0" y="30" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="500" letter-spacing="3">OAKMERE</text>', 150],
  ['northgate', '<text x="0" y="30" font-family="Georgia, serif" font-size="30" font-style="italic">Northgate</text>', 140],
  ['parallel', '<text x="0" y="30" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="400" letter-spacing="-0.5">parallel/</text>', 120],
  ['linden', '<text x="0" y="30" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="700">Linden &amp; Co</text>', 160],
  ['aster', '<circle cx="14" cy="20" r="12" fill="none" stroke="#8A8881" stroke-width="4"/><text x="36" y="30" font-family="Helvetica, Arial, sans-serif" font-size="27" font-weight="600">Aster</text>', 110],
];

for (const [name, body, w] of logos) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 40" width="${w}" height="40" fill="#8A8881">${body}</svg>\n`;
  writeFileSync(join(out, `logo-${name}.svg`), svg);
}

console.log(`Fixtures written to ${out}`);
