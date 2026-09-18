// Keeps shared markup (headers, footers) identical across the static pages.
//
// In any .html file, content between
//   <!-- partial:NAME -->   and   <!-- /partial:NAME -->
// is replaced with partials/NAME.html. Optional current="/path.html" marks
// that link with aria-current="page" (defaults to the file's own URL).
//
// Run after editing a partial: node scripts/sync-partials.mjs

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const skip = new Set(['node_modules', 'partials', 'dist', '.git', '.claude']);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (skip.has(name)) return [];
    if (statSync(path).isDirectory()) return walk(path);
    return name.endsWith('.html') ? [path] : [];
  });
}

const pattern = /<!-- partial:([\w-]+)((?:\s+[\w-]+="[^"]*")*)\s*-->[\s\S]*?<!-- \/partial:\1 -->/g;
let changed = 0;

for (const file of walk(root)) {
  const url = '/' + relative(root, file).split(sep).join('/');
  const src = readFileSync(file, 'utf8');
  const next = src.replace(pattern, (match, name, attrs) => {
    const current = (attrs.match(/current="([^"]*)"/) || [])[1] || url;
    let body = readFileSync(join(root, 'partials', `${name}.html`), 'utf8').trim();
    body = body.replace(
      new RegExp(`(<a class="site-nav__link" href="${current.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}")`),
      '$1 aria-current="page"',
    );
    return `<!-- partial:${name}${attrs} -->\n${body}\n<!-- /partial:${name} -->`;
  });
  if (next !== src) {
    writeFileSync(file, next);
    changed += 1;
  }
}

console.log(`Partials synced in ${changed} file(s).`);
