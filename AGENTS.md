# Building with Samla

Samla is a stack-agnostic frontend system for marketing websites: tokens, primitives, components, sections, patterns and templates in plain HTML, CSS and a little vanilla JavaScript. This file is the working agreement for
anyone (human or agent) building with it or extending it.

**Rule zero: before creating anything new, check whether an existing primitive, component, section, pattern or variant already solves the requirement.
** Search `docs/taxonomy.md` and `docs/components.md` first, then the live Style Guide at `/style-guide/`.

## Run it

```bash
node scripts/build-css.mjs   # optional: bundle assets/css/samla.css to dist/samla.css
```

The framework itself is no dependencies, no build step: reference
`assets/css/samla.css` and `assets/js/samla.js` directly. To see it in the
context it's built for — the public Samla site, Style Guide and Fieldwork
examples — go to `site/` and run `npm install && npm run dev`. See
`site/README.md`.

## Where things live

This table is the framework only. `site/` (the public Samla website) is a
separate Astro application and the first real consumer of the framework —
see `site/README.md` for its own structure. It never duplicates framework
code; it renders `assets/css/samla.css`/`assets/js/samla.js` directly and
reads `docs/*.md`/`AGENTS.md`/`README.md` as its content source.

| Layer | Path | What belongs there |
| --- | --- | --- |
| Foundations | `assets/css/foundations/` | Tokens, surfaces, fonts, reset, base elements, type roles |
| Primitives | `assets/css/primitives/` | Generic UI: layout, button, link, form, media, tag, accordion, tabs, prose |
| Components | `assets/css/components/` | Combinations: card, feature, quote, stat, header, footer, dialog, carousel |
| Sections | `assets/css/sections/` | Page bands and their layout blocks: section, hero, split, media-content, cta |
| Patterns | `assets/css/patterns/` | Domain arrangements: page-header, listing, article-layout, profile |
| Behaviour | `assets/js/samla.js` | All JavaScript. One file, progressive enhancement |
| Documentation | `*.md`, `docs/*.md` | Source of truth for the framework's own specification and conventions |

Reference pages for the fictional client "Fieldwork", the Style Guide, and
the `sg-*` presentation classes used only to display it, all live in
`site/` now — they are website presentation, not framework code.

Each CSS file opens with a comment block: purpose, markup example, variants.
That comment is the source of truth for the file; keep it current.

## CSS methodology

- **Classes say what something is. Data attributes say how it varies.**
  `<section class="hero" data-layout="split" data-surface="dark">`, never
  `hero--split-dark`.
- BEM for structure: `block`, `block__element`. No modifier classes; variants
  are `data-*` attributes with a finite, documented set of values.
- Components read **semantic tokens only**: `--surface-bg`, `--surface-text`,
  `--surface-muted`, `--surface-line`, `--surface-line-strong`,
  `--surface-rule`, `--surface-subtle`, `--action-bg`, `--action-text`,
  `--input-bg`, `--feedback-error`, `--focus`. Never a hex value, never a raw
  `--color-*` token.
- Sizes come from the scale: `--space-*`, `--text-*`, `--radius-*`,
  `--duration-*`. No arbitrary values. If a value is missing, the scale is
  wrong; raise it rather than inventing a one-off.
- Cascade layers: `foundations, primitives, components, sections, patterns,
  project`. A later layer always wins, so selectors stay flat and short.
  Project overrides go in `@layer project` (see `assets/css/theme.example.css`).
- No utility-class architecture. The only helper classes are the type roles
  (`text-*`), `text-muted`, `label` and `visually-hidden`.
- No deep nesting, no IDs in selectors, no `!important` outside the reset and
  the reduced-motion rule.

## Composition

- Build pages from sections. Every band is
  `<section class="section" data-surface="…">` + `.container` + a
  `section-header` + one layout block. The hero and page header are their own
  bands.
- Use the grid for placement: `grid[data-columns]` for equal columns,
  `data-span` / `data-start` on grid children for asymmetric layouts. The
  hanging label (columns 1 to 3) and content from column 4 is the house
  layout: `section-header` and `section__body[data-indent]` do it for you.
- Surfaces: `data-surface` = `default | light | alternate | brand | dark |
  image`. Put it on the section, never restyle a child for a surface.
- One accent per view. Brand surfaces take white text only.
- Many "sections" are compositions, not new CSS. A card grid is
  `section` + `section-header` + `grid[data-columns="3"]` of `card`s. See the
  table in `docs/taxonomy.md`.

## Structure and typography

- Choose heading levels from the document outline. One `h1` per page.
- Choose visual size from the eight roles: `text-display`, `text-page-title`,
  `text-section-heading`, `text-card-title`, `text-lead`, `text-body`,
  `text-small`, `text-caption`. An `h2` can be a Page Title; an `h3` can be a
  Section Heading. Never change a level to change a size.
- Semantic HTML first: `nav`, `main`, `article`, `aside`, `figure`, `dl`,
  `time`, `details`, `dialog`, `fieldset`.

## JavaScript

- Behaviour only, never layout. Every module binds to a component class or a
  `data-*` hook and sets `data-enhanced` when it takes over.
- Pages must work before JavaScript runs: accordions are `<details>`, dialogs
  are `<dialog>`, carousels are scroll-snap, tabs show all panels, dropdowns
  render inline, JS-only filters stay hidden.
- Hooks: `data-dialog-open="id"`, `data-dialog-close`, `data-dropdown-toggle`,
  `data-carousel="prev|next"`, `data-copy`, `form[data-validate]`,
  `[data-filter-root]` + `data-filter` + `data-tags`, `.media__play[data-src]`.
- Re-run on injected markup with `Samla.init(container)`.

## Accessibility (non-negotiable)

- Visible focus: 2px outline, 2px offset, surface text colour. Never remove it.
- Touch targets at least 44px. Controls are 48px, small controls 44px.
- Every form control has a `<label>`; errors use text plus an icon and
  `aria-invalid` + `aria-describedby`; never colour alone.
- Icon-only controls have `aria-label`; decorative SVGs have
  `aria-hidden="true"`.
- Linked cards use one stretched link (`card__link`) on the title.
- Respect `prefers-reduced-motion` (tokens already drop to 0ms).
- White on brand must reach 4.5:1. Check it when changing `--color-brand`.

Full checklist: `docs/accessibility.md`. Performance and SEO:
`docs/performance.md`.

## Content independence

Components take conceptual content, not CMS fields. A card needs `title`,
`summary`, `image`, `url`, `meta`, `tags`; it does not care whether those
come from Sanity, Statamic, Markdown or an API. Contracts for every component
are in `docs/components.md`. Do not add CMS-specific markup or naming.

## When something genuinely new is needed

1. Confirm no existing element or variant fits (rule zero).
2. Prefer a new **variant** (a new `data-*` value) over a new component.
3. Put it in the lowest layer that makes sense. Primitives never know about
   domain concepts; domain-specific arrangements go in `patterns/`.
4. Write the header comment (purpose, markup, variants), use semantic tokens
   only, and support every surface.
5. Add it to the Style Guide (`site/src/pages/style-guide/index.astro`)
   using the real classes, to `docs/components.md`, and to `docs/taxonomy.md`.
6. Check it at 375, 768, 1024 and 1440 wide, keyboard only, and on a dark
   surface.
