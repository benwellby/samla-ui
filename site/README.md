# Samla site

The public Samla website: homepage, Philosophy docs, Style Guide and
Fieldwork examples. An Astro application, and the first real consumer of
[the Samla framework](../README.md) — it renders the framework's own
`assets/css/samla.css` and `assets/js/samla.js` directly (via a symlink at
`public/assets`, so there is exactly one implementation of Samla, never a
copy inside this app) and reads the framework's canonical documentation
(`../docs/*.md`, `../AGENTS.md`, `../README.md`) straight from its source
through an Astro content collection — see `src/content.config.ts`.

## Quick start

```bash
npm install
npm run dev
```

Then open:

- `http://localhost:4321/` — the Samla homepage
- `http://localhost:4321/docs/` — Philosophy: the working agreement, taxonomy, accessibility and performance notes
- `http://localhost:4321/style-guide/` — every token, component and variant, live
- `http://localhost:4321/templates/` — the Fieldwork examples gallery

## Build

```bash
npm run build    # writes static output to dist/
npm run preview  # serve that output locally
```

Output is fully static (`output: 'static'` in `astro.config.mjs`) — the
build folds the framework's real assets into `dist/assets/`, so the result
deploys as plain files to any static host.

## Structure

```
src/
  layouts/          SamlaHeader/Footer/Layout (the real Samla site chrome),
                     FieldworkHeader/Footer/Layout (the fictional client's
                     chrome — deliberately separate, never shared with the
                     real Samla site), DocsPage (the six Philosophy pages)
  pages/
    index.astro      Homepage
    404.astro
    style-guide/     The specimen library
    templates/       Fieldwork examples + the listing page
    docs/            Philosophy pages, rendered from ../../docs/*.md etc.
  data/              docsNav.ts (explicit Philosophy nav order),
                     docsMeta.ts (title/description extraction from markdown)
  content.config.ts  The two content collections reading the framework's
                     canonical markdown from outside this folder
public/
  assets -> ../../assets   symlink to the framework, not a copy
  css/, js/                site-only presentation (sg-* classes): never
                           part of the framework, never shipped to a
                           project consuming Samla
  _headers                 Cloudflare Pages config for this deployment
```

## Hosting

Deploys as-is to any static host from `dist/`. This repository happens to
deploy on Cloudflare Pages, connected with this site folder as the build
root:

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Root directory | `site` |
| Build command | `npm run build` |
| Build output directory | `dist` |

`public/_headers` is Cloudflare's own header syntax; translate it to your
host's equivalent (or drop it) elsewhere. None of this is a Samla
requirement — the framework itself has no hosting opinion at all; only
this site does.
