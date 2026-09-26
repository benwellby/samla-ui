---
title: Accessibility
---
Accessibility is part of each component's contract, not a later pass. Target:
WCAG 2.2 AA.

## Built into the system


| Area | How Samla handles it |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Semantics | Landmarks on every page (`header`, `nav[aria-label]`, `main#main`, `footer`), one `h1`, levels from the outline, `dl` for facts and stats, `figure`/`figcaption`, `time`. |
| Skip link | `.skip-link` is the first focusable element and targets `#main`. |
| Focus | 2px outline, 2px offset, in `--focus` (the surface's text colour). Never removed; `:focus:not(:focus-visible)` hides it only for pointer clicks. |
| Contrast | Ink on paper 17.3:1, muted on paper 6.3:1, muted on stone 5.7:1, on-dark 16.6:1, muted on dark 6.7:1, white on brand ≥ 4.5:1. Control borders ≥ 3:1. Text over imagery sits on a scrim. |
| Targets | Controls 48px, small controls 44px, links in lists and nav ≥ 44px tall. Interactive tags extend their hit area. |
| Forms | Visible labels; help and errors linked with `aria-describedby`; `aria-invalid`; error text plus icon; error summary receives focus; `autocomplete` on personal fields; 16px inputs. |
| Keyboard | Everything interactive is reachable and operable: menus (Escape, outside click), tabs (arrows, Home, End), dialogs (native focus trap, Escape), carousel (focusable track, buttons), accordion (native). |
| Screen readers | `aria-expanded`/`aria-controls` on toggles, `aria-current` for location, `aria-live` for filter counts and carousel position, `role="status"` for confirmations, visually hidden names for icon links. |
| Motion | Durations drop to 0 with `prefers-reduced-motion`; no autoplay; no parallax. |
| Progressive enhancement | Without JavaScript: navigation is a list, accordions work, all tab panels show, carousels scroll, dropdown options are inline links. |
| Forced colours | Buttons, tags and inputs keep a visible border in Windows High Contrast. |


## Checklist for new work

- Uses existing components; no new interaction pattern without reason.
- Correct element first (`button` acts, `a` navigates); no `div` buttons.
- Heading level fits the outline; size comes from a `text-*` role.
- Works with keyboard only; focus visible and in a logical order.
- Works on every surface, including brand and dark.
- Images have meaningful `alt`, or `alt=""` if decorative.
- Nothing relies on colour alone.
- Usable at 320px wide and at 200% zoom; no horizontal scrolling.
- Usable without JavaScript, or clearly hidden until it runs.
- Checked with a screen reader (VoiceOver or NVDA) for new interactive parts.

## Changing the brand colour

Check white text on the new `--color-brand` reaches 4.5:1. The Style Guide's
accent switcher shows three compliant examples: `#C4331A` (5.5:1),
`#2B45C9` (7.5:1), `#1F6B4F` (6.4:1).