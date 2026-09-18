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
