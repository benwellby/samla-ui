// Inlines the @import graph of assets/css/samla.css into dist/samla.css,
// preserving cascade layers. No dependencies.
// Run: node scripts/build-css.mjs

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const entry = join(root, 'assets/css/samla.css');
const src = readFileSync(entry, 'utf8');

const output = src.replace(
  /@import url\("([^"]+)"\) layer\(([a-z-]+)\);/g,
  (_, file, layer) => {
    let css = readFileSync(join(dirname(entry), file), 'utf8');
    // Fonts are referenced relative to their source file; rebase for dist/.
    css = css.replace(/url\('\.\.\/\.\.\/fonts\//g, "url('../assets/fonts/");
    return `@layer ${layer} {\n/* ${file} */\n${css}\n}`;
  },
);

mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist/samla.css'), output);
console.log(`dist/samla.css written (${(output.length / 1024).toFixed(1)} KB)`);
