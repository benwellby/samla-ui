/* Samla documentation helpers (style guide only). Not part of samla.js. */
(function () {
  'use strict';

  // Accent switcher: demonstrates rebranding through one raw token.
  document.querySelectorAll('.sg-accent').forEach((group) => {
    group.addEventListener('click', (event) => {
      const btn = event.target.closest('button[data-accent]');
      if (!btn) return;
      document.documentElement.style.setProperty('--color-brand', btn.dataset.accent);
      document.documentElement.style.setProperty('--color-error', btn.dataset.accent);
      group.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      const out = document.getElementById('accent-ratio');
      if (out) out.textContent = btn.dataset.ratio;
    });
  });

  // Grid explorer: preview the real breakpoint column count, gutter and margin.
  document.querySelectorAll('[data-grid-explorer]').forEach((root) => {
    const stage = root.querySelector('[data-grid-explorer-stage]');
    const demo = root.querySelector('[data-grid-explorer-demo]');
    const caption = root.parentElement?.querySelector('[data-grid-explorer-caption]');
    const columnsOut = root.querySelector('[data-grid-explorer-columns]');
    const detailOut = root.querySelector('[data-grid-explorer-detail]');
    if (!stage || !demo) return;

    function render(btn) {
      const columns = Number(btn.dataset.columns);
      const gutter = Number(btn.dataset.gutter);
      const margin = Number(btn.dataset.margin);
      const viewport = btn.dataset.viewport;
      stage.style.paddingInline = `${margin}px`;
      demo.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
      demo.style.gap = `${gutter}px`;
      demo.innerHTML = '';
      for (let i = 0; i < columns; i += 1) {
        const bar = document.createElement('span');
        bar.className = 'sg-grid-explorer__bar';
        demo.appendChild(bar);
      }
      const summary = `${columns} columns, ${gutter}px gutter, ${margin}px margin at ${viewport}`;
      if (caption) caption.textContent = summary;
      if (columnsOut) columnsOut.textContent = `${columns} columns`;
      if (detailOut) detailOut.textContent = `, ${gutter}px gutter, ${margin}px margin at ${viewport}.`;
    }

    root.querySelectorAll('.sg-grid-explorer__tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.getAttribute('aria-pressed') === 'true') return;
        root.querySelectorAll('.sg-grid-explorer__tab').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        render(btn);
      });
    });
  });

  // Highlight the current section in the style guide nav.
  const links = Array.from(document.querySelectorAll('.sg-nav a[href^="#"]'));
  const targets = links.map((a) => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  if (!('IntersectionObserver' in window) || !targets.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.toggleAttribute('aria-current', a.getAttribute('href') === `#${entry.target.id}`));
      links.forEach((a) => { if (a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'true'); });
    });
  }, { rootMargin: '-10% 0px -80% 0px' });
  targets.forEach((t) => observer.observe(t));
})();
