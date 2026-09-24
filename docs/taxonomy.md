---
title: Samla taxonomy
---
The brief's inventory, rationalised. Many listed items are variants or
compositions of one underlying element, so the system is smaller than the
list it serves. Use this table to find what already solves a requirement.

Status: **built** = its own CSS; **variant** = a `data-*` value on another
element; **composition** = existing parts arranged in markup, no new CSS.

## Layers


| Layer | Contents |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Foundations | tokens, surfaces, fonts, reset, base, typography roles, accessibility helpers |
| Primitives | container, grid, stack, cluster, button, button-group, link, icon, media, tag, badge, avatar, divider, label, breadcrumb, pagination, field and form controls, accordion, tabs, prose, table |
| Components | section-header, card, feature, quote, stat, logo, meta-list, link-list, social-links, notice, site-header (+ site-nav), site-footer, dropdown, dialog, cookie-banner, carousel, tooltip, code-block, subscribe |
| Sections | section, hero, split, media-content, cta, logo-rail, gallery |
| Patterns | page-header, listing, article-layout (+ toc), profile |
| Templates | home, content, landing, about, services, service, case-studies, case-study, articles, article, contact, team, person, 404 |


## Navigation and structure


| Brief item | Samla | Status |
| ------------------- | ----------------------------------------------------------- | ------- |
| Header | `site-header` | built |
| Primary navigation | `site-nav` inside `site-header` | built |
| Dropdown navigation | `site-nav__menu[data-variant="dropdown"]` | variant |
| Mega menu | `site-nav__menu[data-variant="mega"]` | variant |
| Mobile navigation | `site-header[data-mobile="dropdown / drawer / fullscreen"]` | variant |
| Breadcrumbs | `breadcrumb` | built |
| Footer | `site-footer[data-layout="simple / columns"]` | built |
| Pagination | `pagination` | built |


## Typography and content


| Brief item | Samla | Status |
| ------------------------------------ | ----------------------------------------------------------- | ---------- |
| Heading | any `h1` to `h6` + a `text-*` role | foundation |
| Lead | `text-lead` | foundation |
| Rich text, lists, inline links, code | `prose` | built |
| Blockquote | `prose blockquote`, or `quote[data-variant="rule"]` | variant |
| Pull quote | `quote[data-size="large / display"]` | variant |
| Tables | `table` in `table-scroll` (also bare tables inside `prose`) | built |
| Code block | `code-block` | built |


## Actions


| Brief item | Samla | Status |
| ------------ | ----------------------------------------------------------------- | ------- |
| Button | `button[data-variant="primary / secondary / text"][data-size]` | built |
| Button group | `button-group[data-stack="mobile"]` | built |
| Text link | `link` | built |
| Icon link | `link[data-variant="arrow / external"]`, `button[data-icon-only]` | variant |


## Forms


| Brief item | Samla | Status |
| ------------------------------------------------- | ----------------------------------------------------- | ----------- |
| Text, email, tel, number, search inputs; textarea | `input` (by `type`) | built |
| Select | `select` | built |
| Checkbox, radio | `check` | built |
| Toggle | `switch` | built |
| File upload | `file` | built |
| Form group | `field`, `fieldset`, `form-grid` | built |
| Validation message | `field__error`, `form-summary`, `form[data-validate]` | built |
| Search | `input-group` + `input[type=search]` + icon button | composition |
| Newsletter form | `subscribe` (field + input-group + note) | built |
| Contact form | `form` + `form-grid` + fields | composition |


## Content components


| Brief item | Samla | Status |
| -------------------------- | ------------------------------------------------------ | ----------- |
| Card, media card | `card` | built |
| Article card | `card` with meta and optional person | composition |
| Case study card | `card` with meta and tags | composition |
| Profile card | `card` with portrait media, meta after title | composition |
| Feature card, feature item | `feature` (`data-variant`, `data-size`, `data-layout`) | built |
| Testimonial, quote | `quote` | built |
| Stat | `stat` in `stat-list` | built |
| Tag | `tag`, `tag-list` | built |
| Badge | `badge[data-status]`, `badge[data-variant="pill"]` | built |
| Avatar | `avatar`, `avatar-group` | built |
| Logo | `logo` in `logo-list` | built |
| Icon | inline SVG `.icon` | built |
| Image, video | `media` (`data-ratio`, `media__play`) | built |
| Contact details | `meta-list[data-layout="stacked"]` + `social-links` | composition |
| Social links | `social-links` | built |


## Interactive


| Brief item | Samla | Status |
| --------------------- | ------------------------------- | ------------- |
| Accordion, disclosure | `accordion` on native `details` | built |
| Tabs | `tabs` | built |
| Modal | `dialog[data-variant="modal"]` | built |
| Drawer | `dialog[data-variant="drawer"]` | variant |
| Carousel | `carousel` | built |
| Dropdown | `dropdown` | built |
| Tooltip | `tooltip` | built |
| Cookie banner | `cookie-banner` | built |
| Notice / alert | `notice[data-status]` | built (added) |


## Sections


| Brief item | Samla | Status |
| -------------------------- | ------------------------------------------------------------------------------------------ | ----------- |
| Hero | `hero[data-layout][data-align][data-width][data-surface]` | built |
| Intro, rich content | `section` + `section-header` + `section__body[data-indent]` + `prose` | composition |
| Media + content | `media-content[data-media]` | built |
| Feature grid | `section` + `grid[data-columns]` of `feature` | composition |
| Card grid, related content | `section` + `section-header` + `grid[data-columns]` of `card` | composition |
| Logo rail | `logo-rail` | built |
| Logo grid | `logo-list[data-layout="grid"]` | variant |
| Stats | `section` + `stat-list` | composition |
| Testimonials, quotes | `section[data-surface="dark"]` + `quote[data-size="large"]`, or `carousel` of quote panels | composition |
| Gallery | `gallery[data-layout="grid / mosaic"]` | built |
| Video | `section` + `media[data-ratio="video"]` + `media__play` | composition |
| FAQ | `section` + `split` + `accordion` | composition |
| CTA | `cta[data-layout="stacked / inline / centered"]` | built |
| Newsletter | `cta` + `subscribe` | composition |
| Contact | `section` + `split` + `meta-list` + `form` | composition |


## Domain patterns


| Brief item | Samla | Status |
| ---------------------- | -------------------------------------------------------------------------------- | ----------- |
| Services index | `page-header` + grid of bordered `card`s, or `feature-list` rows | composition |
| Service detail content | `page-header[data-layout="split"]` + `split[data-sticky]` + `prose` | composition |
| Case studies index | `listing` (filters, card grid, pagination) | built |
| Case study header | `page-header` with `meta-list` facts and cinema media | built |
| Case study results | `stat-list` + `quote` on a dark section | composition |
| Team index | `listing` or `tabs` of profile `card`s | composition |
| Person profile | `profile` | built |
| Article index | `listing` with link filters + featured horizontal `card` | composition |
| Article header | `page-header` | built |
| Article body | `article-layout` + `toc` + `prose` | built |
| Related articles | `section` + grid of `card`s | composition |
| Events index | `link-list` with `time` meta | composition |
| Event detail | `page-header[data-layout="centered"]` + `article-layout` | composition |
| Careers index | `link-list` with location meta | composition |
| Job detail | `page-header[data-layout="split"]` with meta and apply action + `article-layout` | composition |
| Locations | bordered `card`s with `meta-list` and map media | composition |


## Deliberately not built

- Separate card, hero or header components per content type. Variants cover them.
- Utility classes beyond the type roles.
- Autoplaying carousels.
- A JavaScript framework, bundler or build step for the reference
implementation (bundling CSS is optional: `scripts/build-css.mjs`).
- CMS schemas or content models (out of scope for v1).

## Deviations from the design file

- The design's hero said "Built with Astro". The v1 reference is plain HTML,
so the copy says what is true of this implementation.
- `--surface-line-strong` on dark is `#75736D` (3.9:1 on ink) rather than
`#5C5B57` (2.9:1), so input and secondary button borders meet 3:1.
- Status colours (`positive`, `warning`) and `--color-error` exist as tokens
as the brief asks; the design's rule that errors use the brand colour is
kept as the default value (`--color-error: #C4331A`).

