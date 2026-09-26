# Performance and SEO

Samla pages are static HTML with one stylesheet and one small deferred
script. These are defaults, not tuning to do later.

## Performance

| Area | Default |
| --- | --- |
| JavaScript | One file, `samla.js`, ~20 KB unminified, `defer`, no dependencies. Nothing blocks rendering. |
| CSS | Layered source files for development. For production, bundle with `node scripts/build-css.mjs` (or any bundler) to remove the `@import` waterfall, then minify. |
| Fonts | Self-hosted WOFF2, subset to Latin and Latin Extended, `font-display: swap`. Instrument Sans is one variable file. Preload the Latin sans file in `<head>`. |
| Images | Always `width` and `height` (no layout shift). `loading="lazy"` below the fold; `fetchpriority="high"` on the largest image above it. Use `srcset`/`sizes` and AVIF/WebP in real projects. |
| Video | Poster image plus `media__play[data-src]`: the third-party player loads only when requested. |
| Layout stability | Aspect ratios via `data-ratio`; fonts with metric-compatible fallbacks; no content injected above existing content. |
| Interaction | No JS on scroll except a passive listener for the sticky header state. Transitions use `transform`, `opacity` and colour only. |

## SEO

| Area | Default |
| --- | --- |
| Document | `lang`, unique `<title>` ("Page | Site"), meta description on every template, one `h1`, logical heading outline. |
| Links | Real `<a href>` for navigation, filters and pagination, so every listing state has a crawlable URL. |
| Content | Server-rendered text; nothing important hidden behind JavaScript. Tab panels and accordions are in the HTML. |
| Structure | Breadcrumbs on inner pages; `<time datetime>` for dates; `<article>` for articles and case studies. |
| Errors | `404.html` is `noindex` and offers search and popular links. |

Add per project: canonical URLs, Open Graph and Twitter metadata, JSON-LD
(`Organization`, `BreadcrumbList`, `Article`, `Event`, `JobPosting`), an XML
sitemap and `robots.txt`. These depend on the CMS and hosting, so they are
not part of the v1 reference.
