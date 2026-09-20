import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// Canonical framework specification lives at the repo root, not inside
// /site. These collections read it directly rather than duplicating it —
// see AGENTS.md section 9 of the refactor guide: one canonical source,
// the site renders it.
const docs = defineCollection({
  loader: glob({ pattern: '*.md', base: '../docs' }),
});

const rootDocs = defineCollection({
  loader: glob({ pattern: ['README.md', 'AGENTS.md'], base: '..' }),
});

export const collections = { docs, rootDocs };
