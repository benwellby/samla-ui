# Component contracts

The portable part of Samla. Any implementation (Astro, Antlers, Twig, React)
keeps these names, variants, content shapes and accessibility behaviour.
Markup details for each block are in the header comment of its CSS file;
live examples are in `/style-guide/`.

Content fields are conceptual. `?` marks optional fields; `[]` marks lists.

---

## Primitives

### Button — `button`
- **Purpose:** trigger an action (`<button>`) or navigate (`<a>`).
- **Content:** `label`, `href?`, `icon?`
- **Variants:** `data-variant` primary | secondary | text · `data-size` default | small · `data-width` full · `data-icon-only`
- **Accessibility:** min 44px; icon-only requires `aria-label`; disabled links use `aria-disabled="true"`.
- **Composition:** group with `button-group` (`data-stack="mobile"` for full-width phone stacks).

```html
<a class="button" href="/contact">Start a project</a>
<button class="button" type="button" data-variant="secondary">Cancel</button>
```

### Link — `link`
- **Purpose:** a standalone text action (section actions, "Learn more"). Inline links in text need no class.
- **Content:** `label`, `href`
- **Variants:** `data-variant` default | arrow | external
- **Accessibility:** always underlined at rest; external links should say so in text or icon label.

### Media — `media`
- **Purpose:** image, video or embed with optional caption.
- **Content:** `src`, `alt`, `width`, `height`, `caption?`, `videoUrl?`
- **Variants:** `data-ratio` square | portrait | standard | photo | video | cinema · `data-fit` cover | contain
- **Accessibility:** meaningful `alt` or `alt=""` when decorative; the play button has a label including the duration; video loads only on request.

### Tag — `tag`
- **Content:** `label`, `href?` · **Variants:** `data-selected`, `aria-pressed`, `aria-current`
- **Accessibility:** filter buttons use `aria-pressed`; current filter links use `aria-current="page"`.

### Badge — `badge`
- **Content:** `label`, `status` · **Variants:** `data-status` stable | positive | review | warning | error | planned | neutral · `data-variant` pill
- **Accessibility:** the text carries the meaning; the dot is decoration.

### Avatar — `avatar`
- **Content:** `image?` or `initials` · **Variants:** `data-size` small | medium | large

### Divider — `divider`
- **Variants:** `data-weight` strong · `data-spacing` 5–8

### Breadcrumb — `breadcrumb`
- **Content:** `items[] { label, href }`
- **Accessibility:** `<nav aria-label="Breadcrumb">` + `<ol>`; last item `aria-current="page"`.

### Pagination — `pagination`
- **Content:** `current`, `pages[] { number, href }`, `prev?`, `next?`
- **Accessibility:** `<nav aria-label="Pagination">`; current `aria-current="page"`; unavailable prev/next `aria-disabled="true"`.

### Form controls — `field`, `input`, `select`, `check`, `switch`, `file`, `input-group`, `fieldset`, `form-grid`
- **Content (field):** `label`, `name`, `type`, `required?`, `help?`, `error?`, `optional?`
- **Validation:** `form[data-validate]` adds inline errors (`field__error` with icon), `aria-invalid`, `aria-describedby` and an error summary for 2+ errors. Custom messages via `data-error`.
- **Accessibility:** visible `<label>` for every control; groups in `fieldset` + `legend`; 16px text; errors are text plus icon.

### Accordion — `accordion`
- **Content:** `items[] { question, answer (rich text) }`
- **Variants:** `data-size` default | small · shared `name` = one open at a time
- **Accessibility:** native `<details>`/`<summary>`; works without JS.

### Tabs — `tabs`
- **Content:** `tabs[] { label, meta?, panel }`
- **Variants:** `data-orientation` horizontal | vertical · `data-variant` line | contained
- **Accessibility:** without JS all panels show with headings; with JS: `tablist`, `tab`, `tabpanel`, roving tabindex, arrow keys, Home/End.

### Prose — `prose`
- **Purpose:** CMS rich text. Styles bare elements; no classes required from editors.

### Table — `table`
- **Accessibility:** `<caption>`, `scope` on headers, wrap in `table-scroll`. Numbers use `data-align="end"`.

### Layout — `container`, `grid`, `stack`, `cluster`
- **container:** `data-width` narrow | standard | wide | full
- **grid:** `data-columns` 2 | 3 | 4 | 6 · children `data-span` 3–9, 12 and `data-start` 1–10 · `data-divided` · `data-gap` tight
- **stack:** `data-gap` 1–8 · `data-align` start
- **cluster:** `data-gap` 1–6 · `data-justify` start | between | end | center

---

## Components

### Section header — `section-header`
- **Content:** `label`, `title`, `intro?`, `action? { label, href }`
- **Variants:** `data-align` hang | stack | center · `data-rule` strong | none
- **Composition:** opens most sections; title level from the outline, size from `text-section-heading` (or another role).

### Card — `card`
- **Purpose:** one card for articles, case studies, services, people, locations, products.
- **Content:** `title`, `url?`, `media?`, `meta[]?`, `summary?`, `tags[]?`, `person? { name, avatar }`, `actionLabel?`
- **Variants:** `data-layout` stacked | horizontal | overlay · `data-variant` plain | panel | bordered · `data-size` default | large
- **Accessibility:** `card__link` on the title stretches over the card: one tab stop, one accessible name. The visual action is `aria-hidden`. Don't nest other links in a linked card.

```html
<article class="card">
  <figure class="card__media media" data-ratio="photo"><img src="…" alt="" width="1600" height="1200"></figure>
  <p class="card__meta"><span>Parks</span><span>2025</span></p>
  <h3 class="card__title"><a class="card__link" href="/work/millbrook">Millbrook Riverside Park</a></h3>
  <p class="card__summary">Eleven hectares returned to the river.</p>
</article>
```

### Feature — `feature`
- **Purpose:** a point, step, value, principle or service summary. Not a link as a whole.
- **Content:** `title`, `text?`, `index?` or `icon?`, `link?`, `tags[]?`
- **Variants:** `data-variant` rule | plain | panel · `data-size` default | large | xlarge · `data-layout` stacked | row · `data-accent`
- **Composition:** `grid[data-columns]` for grids; `feature-list` for rows.

### Quote — `quote`
- **Content:** `text`, `name?`, `role?`, `avatar?`
- **Variants:** `data-size` default | large | display · `data-variant` plain | rule | panel
- **Accessibility:** `<figure>` + `<blockquote>` + `<figcaption>`.

### Stat — `stat`
- **Content:** `value`, `label`, `text?`
- **Variants:** `data-size` default | small · `stat-list[data-columns]` 2 | 3 | 4
- **Accessibility:** `<dl>`: label is `<dt>`, value `<dd>` (shown first visually).

### Logo — `logo`, `logo-list`
- **Content:** `logos[] { name, image, href? }` · **Variants:** `logo-list[data-layout]` rail | grid
- **Accessibility:** alt text is the organisation's name.

### Meta list — `meta-list`
- **Content:** `items[] { key, value (may contain links) }`
- **Variants:** `data-layout` inline | stacked | columns (group pairs in `<div>`s)

### Link list — `link-list`
- **Content:** `items[] { title, href, meta? }` · **Variants:** `data-size` default | small
- **Used for:** documentation nav, careers, events, "popular pages".

### Social links — `social-links`
- **Content:** `items[] { network, href }` · **Accessibility:** visually hidden network name in each link.

### Notice — `notice`
- **Content:** `title?`, `text`, `status` · **Variants:** `data-status` info | positive | warning | error
- **Accessibility:** `role="status"` or `role="alert"`; icon plus text.

### Site header — `site-header`, `site-nav`
- **Content:** `brand { name, href, logo? }`, `items[] { label, href } | { label, menu: { variant, groups[] { heading?, links[] { label, href, description? } }, feature? } }`, `action? { label, href }`
- **Variants:** `data-logo` left | center · `data-behaviour` static | sticky | overlay · `data-mobile` dropdown | drawer | fullscreen · menu `data-variant` dropdown | mega
- **Accessibility:** `nav[aria-label="Primary"]`; toggles use `aria-expanded` and `aria-controls`; Escape closes and returns focus; drawer and fullscreen trap focus; current page `aria-current="page"`. Without JS: wrapped list, menus on hover/focus.

### Site footer — `site-footer`
- **Content:** `brand`, `intro?`, `groups[] { heading, links[] }`, `newsletter?`, `social?`, `legal { copyright, links[] }`
- **Variants:** `data-layout` simple | columns; any surface.

### Dropdown — `dropdown`
- **Content:** `label`, `items[] { label, href | action, current? }` · **Variants:** `data-align` start | end
- **Accessibility:** `aria-expanded`/`aria-controls`; Escape and outside click close; without JS the options render inline.

### Dialog — `dialog`
- **Content:** `title`, `body`, `actions[]?`
- **Variants:** `data-variant` modal | drawer · `data-size` default | large
- **Accessibility:** native `<dialog>` with `showModal()`: focus trap, inert background, Escape; `aria-labelledby` the title; triggers get `aria-haspopup="dialog"`; focus returns to the trigger.

### Cookie banner — `cookie-banner`
- **Content:** `text`, `policyUrl`, `acceptLabel`, `rejectLabel`, `manageUrl?`
- **Behaviour:** non-modal; reject equally prominent; stores choice in `localStorage` (`samla-consent`) and fires `samla:consent`.

### Carousel — `carousel`
- **Content:** `label`, `slides[]` (usually cards or quotes)
- **Variants:** `data-per-view` 1 | 2 | 3 | auto
- **Accessibility:** scroll-snap track is focusable and scrollable without JS; prev/next buttons labelled; live position text; no autoplay.

### Tooltip — `tooltip`
- **Content:** `trigger label`, `text` · **Variants:** `data-position` top | bottom
- **Accessibility:** trigger is focusable and `aria-describedby` the tooltip; Escape dismisses; supplementary only.

### Code block — `code-block`
- **Content:** `code`, `filename?`, `language?`, `lineNumbers?` · copy button via `data-copy`.

### Subscribe — `subscribe`
- **Content:** `label`, `buttonLabel`, `note?`, `successMessage`
- **Composition:** field + `input-group` + note + success `notice`; used in CTAs and footers.

---

## Sections

### Section — `section`
- **Content:** `surface?`, `spacing?`, then a header and one layout block.
- **Variants:** `data-surface` default | light | alternate | brand | dark · `data-spacing` default | compact | none
- **Behaviour:** consecutive same-surface sections that open with a ruled `section-header` share one gap.

### Hero — `hero`
- **Content:** `title`, `eyebrow?`, `lead?`, `actions[]?`, `facts[]? { key, value }`, `media?`
- **Variants:** `data-layout` text | split | media | centered · `data-align` left | center · `data-width` narrow | standard | wide · `data-surface` default | alternate | brand | dark | image
- **Accessibility:** one `h1` (size via `text-display` or `text-page-title`); media layout uses a scrim for 4.5:1.

### Split — `split`
- **Content:** `aside` (usually a section header), `main`
- **Variants:** `data-ratio` 4-8 | 3-9 | 5-7 | 6-6 · `data-sticky`

### Media + content — `media-content`
- **Content:** `media`, `label?`, `title`, `text`, `actions[]?`
- **Variants:** `data-media` start | end · `data-align` center | start

### CTA — `cta`
- **Content:** `title`, `text?`, `actions[]` or `form`
- **Variants:** `data-layout` stacked | inline | centered

### Logo rail — `logo-rail`
- **Content:** `label`, `logos[]`

### Gallery — `gallery`
- **Content:** `images[] { src, alt, caption? }` · **Variants:** `data-layout` grid | mosaic

---

## Patterns

### Page header — `page-header`
- **Content:** `title`, `breadcrumb[]?`, `label?`, `lead?`, `facts[]?`, `actions[]?`, `media?`
- **Variants:** `data-layout` stacked | split | centered · any surface
- **Used for:** articles, case studies, services, jobs, events, index pages.

### Listing — `listing`
- **Content:** `filters[] { label, href | value, current }`, `count`, `results[]`, `pagination`
- **Behaviour:** link filters by default; client-side with `[data-filter-root]`, `data-filter` buttons and `data-tags` on results (hidden until JS runs).

### Article layout — `article-layout`, `toc`
- **Content:** `aside` (author, contents, share, tags), `body` (prose)

### Profile — `profile`
- **Content:** `name`, `role`, `portrait`, `bio`, `facts[]`, `social[]`
