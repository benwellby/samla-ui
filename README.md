# Samla Frontend v1

> Design once. Implement anywhere.

Samla is a stack-agnostic frontend system for building high-quality marketing
websites. It holds the visual language, primitives, components, sections,
patterns and page templates that a new site starts from, as plain HTML, CSS
and a little vanilla JavaScript. Astro, Statamic, WordPress or React
implementations keep the same names, variants and contracts. They are an
integration exercise, not a redesign.

## Quick start

```bash
node scripts/serve.mjs
```

Then open:

- `http://localhost:4321/` — the Samla homepage, built from the system
- `http://localhost:4321/docs/` — this documentation, rendered
- `http://localhost:4321/style-guide/` — every token, component and variant, live
- `http://localhost:4321/templates/` — 14 reference templates for a fictional practice, "Fieldwork"

No install step and no dependencies (Node 18+ only for the helper scripts).

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
  css/docs.css            Style Guide presentation only (sg-*), never shipped
  js/samla.js             All behaviour, progressive enhancement
  fonts/                  Instrument Sans (variable), IBM Plex Mono 400/500, WOFF2
  img/fixtures/           Generated placeholder imagery and client logos
docs/
  taxonomy.md             The brief's inventory rationalised into Samla elements
  components.md           Content contracts and variants for every element
  accessibility.md        Built-in accessibility and the checklist for new work
  performance.md          Performance and SEO defaults
partials/                 Shared headers and footers, stamped into pages
scripts/
  serve.mjs               Zero-dependency static server
  sync-partials.mjs       Refresh shared markup across pages
  build-css.mjs           Bundle CSS to dist/samla.css (keeps layers)
  build-docs.mjs          Render the Markdown docs to docs/*.html
  generate-fixtures.mjs   Regenerate placeholder imagery
style-guide/              The Style Guide
templates/                Reference page templates
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

## Hosting

Deploys as-is to any static host. On Cloudflare Pages: connect the GitHub
repo, framework preset **None**, no build command, output directory `/`.
`_headers` sets caching and serves the Markdown sources as text; `404.html`
handles unknown URLs.

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

Every component, surface and template follows. The Style Guide has a live
brand switcher.

## Status

v1 reference implementation. See `docs/taxonomy.md` for what is built,
what is a variant and what is a composition, and for the small deliberate
deviations from the original homepage design.

The brief's first steps (audit the Astro + Sanity prototype and extract its
methodology) were not possible here, because that codebase was not supplied.
The methodology follows the brief itself (BEM, data-attribute variants,
semantic tokens, surfaces) and the Samla homepage design file.
