# Samla

> Design once. Implement anywhere.

Samla is a stack-agnostic frontend framework for building high-quality
marketing websites. It holds the visual language, primitives, components,
sections, patterns and page templates that a new site starts from, as plain
HTML, CSS and a little vanilla JavaScript. Astro, Statamic, WordPress or
React implementations keep the same names, variants and contracts. They are
an integration exercise, not a redesign.

This repository holds two things:

- **The framework** — everything at the root: `assets/`, `docs/*.md`,
  `AGENTS.md`. This is Samla itself.
- **`site/`** — the public Samla website (homepage, Philosophy docs, Style
  Guide, Fieldwork examples), an Astro application and the first real
  consumer of the framework. See `site/README.md` to run or deploy it.

## What's here

```
AGENTS.md                 Working agreement for developers and coding agents (start here)
assets/
  css/samla.css           Entry point: imports every layer in cascade-layer order
  css/foundations/        tokens, surfaces, fonts, reset, base, typography, a11y
  css/primitives/         layout, button, link, media, tag, navigation, form, accordion, tabs, prose
  css/components/         section-header, card, feature, quote, stat, logo, lists, notice,
                          site-header, site-footer, dropdown, dialog, cookie-banner,
                          carousel, tooltip, code-block
  css/sections/           section, hero, layout blocks (split, media-content, cta, logo-rail, gallery)
  css/patterns/           page-header, listing, article-layout, profile
  css/theme.example.css   How a project rebrands: raw tokens only, in @layer project
  js/samla.js             All behaviour, progressive enhancement
  fonts/                  Instrument Sans (variable), IBM Plex Mono 400/500, WOFF2
docs/
  taxonomy.md             The brief's inventory rationalised into Samla elements
  components.md           Content contracts and variants for every element
  accessibility.md        Built-in accessibility and the checklist for new work
  performance.md          Performance and SEO defaults
scripts/
  build-css.mjs           Bundle CSS to dist/samla.css (keeps layers)
site/                     The public Samla website (Astro) — see site/README.md
```

## The system in one paragraph

Six layers, each composed from the one below: **foundations** (tokens,
surfaces, type roles) → **primitives** (generic UI) → **components**
(combinations) → **sections** (page bands) → **patterns** (domain
arrangements) → **templates** (example pages). Classes say what something
is, BEM-style; `data-*` attributes say how it varies, from a finite list.
Components read semantic tokens only, so `data-surface="dark"` on a section
restyles everything inside it without per-component overrides. Visual
type roles (`text-display` … `text-caption`) are independent of heading
levels.

## Using the framework

Reference `assets/css/samla.css` and `assets/js/samla.js` from any project.
No build step is required — `samla.css` is a plain `@import` chain; run
`node scripts/build-css.mjs` if you'd rather ship one bundled file
(writes `dist/samla.css`, keeping the cascade layers intact).

No install step and no dependencies (Node 18+ only for `build-css.mjs`).

## Rebranding a project

Load a theme after `samla.css` and override raw tokens only:

```css
@layer project {
  :root {
    --color-brand: #2B45C9;
    --font-sans: 'Inter', system-ui, sans-serif;
  }
}
```

Every component, surface and template follows. The Style Guide (in `/site`)
has a live brand switcher.

## Status

v1 reference implementation. See `docs/taxonomy.md` for what is built,
what is a variant and what is a composition, and for the small deliberate
deviations from the original homepage design.

The brief's first steps (audit the Astro + Sanity prototype and extract its
methodology) were not possible here, because that codebase was not supplied.
The methodology follows the brief itself (BEM, data-attribute variants,
semantic tokens, surfaces) and the Samla homepage design file.
