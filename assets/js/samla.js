/* ==========================================================================
   Samla Frontend v1 / behaviour
   --------------------------------------------------------------------------
   Vanilla, dependency-free, progressive enhancement. Every module:
   - binds to a component's class or a data-* hook,
   - sets data-enhanced on the root once it has taken over,
   - leaves the page usable if it never runs.

   Load with: <script src="/assets/js/samla.js" defer></script>
   Re-run on injected markup: Samla.init(container)
   ========================================================================== */

(function () {
  'use strict';

  const ESC = 'Escape';
  const mqDesktop = window.matchMedia('(min-width: 64em)');
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  let uid = 0;
  const ensureId = (el, prefix) => el.id || (el.id = `${prefix}-${++uid}`);

  /* ---- Site header ------------------------------------------------------- */

  function initHeader(header) {
    const toggle = header.querySelector('.site-header__toggle');
    const nav = header.querySelector('.site-nav');
    const menuToggles = $$('.site-nav__toggle', header);
    header.setAttribute('data-enhanced', '');

    const setHeaderBottom = () => {
      const rect = header.getBoundingClientRect();
      header.style.setProperty('--_header-bottom', `${Math.max(rect.bottom, 0)}px`);
    };

    // Mobile panel
    const isModal = () => ['drawer', 'fullscreen'].includes(header.dataset.mobile);

    function openPanel() {
      setHeaderBottom();
      header.setAttribute('data-open', '');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', toggle.dataset.labelClose || 'Close menu');
      document.documentElement.setAttribute('data-scroll-locked', '');
      const first = nav && nav.querySelector('a, button');
      if (first) first.focus();
    }

    function closePanel(returnFocus = true) {
      header.removeAttribute('data-open');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', toggle.dataset.labelOpen || 'Open menu');
        if (returnFocus) toggle.focus();
      }
      document.documentElement.removeAttribute('data-scroll-locked');
    }

    if (toggle && nav) {
      toggle.setAttribute('aria-controls', ensureId(nav, 'site-nav'));
      toggle.setAttribute('aria-expanded', 'false');
      toggle.addEventListener('click', () => {
        header.hasAttribute('data-open') ? closePanel() : openPanel();
      });

      // Close the drawer when its backdrop (the header ::after) is clicked.
      header.addEventListener('click', (event) => {
        if (event.target === header && header.hasAttribute('data-open')) closePanel();
      });

      // Keep focus inside modal panels.
      header.addEventListener('keydown', (event) => {
        if (event.key !== 'Tab' || !header.hasAttribute('data-open') || !isModal()) return;
        const focusables = [toggle, ...$$('a[href], button:not([disabled])', nav)]
          .filter((el) => el.offsetParent !== null);
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      });

      mqDesktop.addEventListener('change', (e) => {
        if (e.matches && header.hasAttribute('data-open')) closePanel(false);
      });
    }

    // Dropdown and mega menus
    function closeMenus(except) {
      menuToggles.forEach((btn) => {
        if (btn !== except) btn.setAttribute('aria-expanded', 'false');
      });
    }

    menuToggles.forEach((btn) => {
      const menu = btn.nextElementSibling;
      if (menu) btn.setAttribute('aria-controls', ensureId(menu, 'site-menu'));
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') === 'true';
        closeMenus(btn);
        btn.setAttribute('aria-expanded', String(!open));
      });
    });

    document.addEventListener('click', (event) => {
      if (!mqDesktop.matches) return;
      if (!event.target.closest('.site-nav__item')) closeMenus();
    });

    header.addEventListener('keydown', (event) => {
      if (event.key !== ESC) return;
      const openBtn = menuToggles.find((b) => b.getAttribute('aria-expanded') === 'true');
      if (openBtn) {
        closeMenus();
        openBtn.focus();
      } else if (header.hasAttribute('data-open')) {
        closePanel();
      }
    });

    // Close a desktop menu when focus leaves it.
    header.addEventListener('focusout', (event) => {
      if (!mqDesktop.matches) return;
      const item = event.target.closest('.site-nav__item');
      if (item && !item.contains(event.relatedTarget)) {
        const btn = item.querySelector('.site-nav__toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Sticky: mark once the page has scrolled.
    if (header.dataset.behaviour === 'sticky') {
      const onScroll = () => header.toggleAttribute('data-scrolled', window.scrollY > 8);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  /* ---- Tabs -------------------------------------------------------------- */

  function initTabs(root) {
    const list = root.querySelector('.tabs__list');
    const tabs = $$('.tabs__tab', list);
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));
    if (!list || !tabs.length || panels.some((p) => !p)) return;

    const vertical = root.dataset.orientation === 'vertical';
    list.setAttribute('role', 'tablist');
    if (vertical) list.setAttribute('aria-orientation', 'vertical');

    tabs.forEach((tab, i) => {
      tab.setAttribute('role', 'tab');
      ensureId(tab, 'tab');
      panels[i].setAttribute('role', 'tabpanel');
      panels[i].setAttribute('aria-labelledby', tab.id);
      panels[i].setAttribute('tabindex', '0');
    });

    function select(index, focus) {
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[i].hidden = !selected;
      });
      if (focus) tabs[index].focus();
      root.dispatchEvent(new CustomEvent('samla:tabchange', { detail: { index } }));
    }

    list.addEventListener('click', (event) => {
      const tab = event.target.closest('.tabs__tab');
      if (tab) select(tabs.indexOf(tab), false);
    });

    list.addEventListener('keydown', (event) => {
      const current = tabs.indexOf(document.activeElement);
      if (current < 0) return;
      const next = vertical ? 'ArrowDown' : 'ArrowRight';
      const prev = vertical ? 'ArrowUp' : 'ArrowLeft';
      let target = null;
      if (event.key === next) target = (current + 1) % tabs.length;
      if (event.key === prev) target = (current - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = tabs.length - 1;
      if (target !== null) {
        event.preventDefault();
        select(target, true);
      }
    });

    const initial = Math.max(0, tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true'));
    select(initial, false);
    root.setAttribute('data-enhanced', '');
  }

  /* ---- Dialogs ----------------------------------------------------------- */

  function initDialogs(scope) {
    $$('[data-dialog-open]', scope).forEach((trigger) => {
      const dialog = document.getElementById(trigger.dataset.dialogOpen);
      if (!dialog || typeof dialog.showModal !== 'function') return;
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        dialog.showModal();
        document.documentElement.setAttribute('data-scroll-locked', '');
      });
    });

    $$('dialog.dialog', scope).forEach((dialog) => {
      if (dialog.hasAttribute('data-enhanced')) return;
      dialog.setAttribute('data-enhanced', '');
      dialog.addEventListener('click', (event) => {
        if (event.target.closest('[data-dialog-close]')) dialog.close();
        // A click on the dialog element itself is a click on the backdrop.
        if (event.target === dialog) dialog.close();
      });
      dialog.addEventListener('close', () => {
        document.documentElement.removeAttribute('data-scroll-locked');
      });
      // Native Escape handling can be skipped for synthetic or unusual key
      // events; close explicitly as a fallback.
      dialog.addEventListener('keydown', (event) => {
        if (event.key === ESC && dialog.open) {
          event.preventDefault();
          dialog.close();
        }
      });
    });
  }

  /* ---- Dropdown ---------------------------------------------------------- */

  function initDropdown(root) {
    const btn = root.querySelector('[data-dropdown-toggle]');
    const menu = btn && document.getElementById(btn.getAttribute('aria-controls'));
    if (!menu) return;
    const set = (open) => {
      btn.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
    };
    set(false);
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('click', (e) => { if (!root.contains(e.target)) set(false); });
    root.addEventListener('keydown', (e) => {
      if (e.key === ESC && btn.getAttribute('aria-expanded') === 'true') {
        set(false);
        btn.focus();
      }
    });
    root.setAttribute('data-enhanced', '');
  }

  /* ---- Carousel ---------------------------------------------------------- */

  function initCarousel(root) {
    const track = root.querySelector('.carousel__track');
    const slides = $$('.carousel__slide', track);
    const prev = root.querySelector('[data-carousel="prev"]');
    const next = root.querySelector('[data-carousel="next"]');
    const status = root.querySelector('.carousel__status');
    if (!track || !slides.length) return;

    slides.forEach((slide, i) => {
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
    });

    const step = () => slides[0].getBoundingClientRect().width +
      parseFloat(getComputedStyle(track).columnGap || 0);

    function update() {
      const max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
      if (status) {
        const first = Math.round(track.scrollLeft / step()) + 1;
        const visible = Math.max(1, Math.round(track.clientWidth / step()));
        const last = Math.min(slides.length, first + visible - 1);
        status.textContent = first === last
          ? `${first} of ${slides.length}`
          : `${first} to ${last} of ${slides.length}`;
      }
    }

    if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -step() }));
    if (next) next.addEventListener('click', () => track.scrollBy({ left: step() }));
    let raf;
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener('resize', update);
    root.setAttribute('data-enhanced', '');
    update();
  }

  /* ---- Copy to clipboard ------------------------------------------------- */

  function initCopy(btn) {
    btn.addEventListener('click', async () => {
      const target = btn.dataset.copyTarget
        ? document.getElementById(btn.dataset.copyTarget)
        : btn.closest('.code-block')?.querySelector('pre');
      if (!target) return;
      const label = btn.querySelector('[data-copy-label]') || btn;
      const original = label.textContent;
      try {
        await navigator.clipboard.writeText(target.innerText.replace(/ /g, ' '));
        label.textContent = 'Copied';
      } catch (err) {
        label.textContent = 'Press ⌘C';
      }
      clearTimeout(btn._t);
      btn._t = setTimeout(() => { label.textContent = original; }, 1600);
    });
  }

  /* ---- Tooltip ----------------------------------------------------------- */

  function initTooltip(root) {
    root.addEventListener('keydown', (e) => {
      if (e.key === ESC) root.setAttribute('data-dismissed', '');
    });
    root.addEventListener('focusout', () => root.removeAttribute('data-dismissed'));
    root.addEventListener('mouseleave', () => root.removeAttribute('data-dismissed'));
  }

  /* ---- Accordion: exclusive groups for browsers without details[name] --- */

  function initAccordion(root) {
    if ('name' in HTMLDetailsElement.prototype) return;
    const items = $$('details[name]', root);
    items.forEach((item) => item.addEventListener('toggle', () => {
      if (!item.open) return;
      items.forEach((other) => {
        if (other !== item && other.getAttribute('name') === item.getAttribute('name')) other.open = false;
      });
    }));
  }

  /* ---- Cookie banner ----------------------------------------------------- */

  function initCookieBanner(banner) {
    if (banner.hasAttribute('data-static')) return;
    const KEY = 'samla-consent';
    let stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) { /* storage blocked */ }
    if (stored) return;
    banner.hidden = false;
    banner.addEventListener('click', (event) => {
      const choice = event.target.closest('[data-consent]');
      if (!choice) return;
      try { localStorage.setItem(KEY, choice.dataset.consent); } catch (e) { /* ignore */ }
      banner.hidden = true;
      document.dispatchEvent(new CustomEvent('samla:consent', { detail: choice.dataset.consent }));
    });
  }

  /* ---- Forms: inline validation ------------------------------------------ */

  const ERROR_ICON = '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M8 4.5v4M8 10.5v1"/></svg>';

  function messageFor(control) {
    const v = control.validity;
    const label = control.dataset.label ||
      (control.labels && control.labels[0] ? control.labels[0].textContent.replace(/\(.*\)/, '').trim() : 'This field');
    if (control.dataset.error) return control.dataset.error;
    if (v.valueMissing && control.tagName === 'SELECT') return `Choose a ${label.toLowerCase()}`;
    if (v.valueMissing) return control.type === 'checkbox' ? 'Tick this box to continue' : `Enter your ${label.toLowerCase()}`;
    if (v.typeMismatch && control.type === 'email') return 'Enter an email address like name@company.com';
    if (v.typeMismatch && control.type === 'url') return 'Enter a full address, including https://';
    if (v.tooShort) return `${label} must be at least ${control.minLength} characters`;
    if (v.rangeUnderflow) return `${label} must be ${control.min} or more`;
    if (v.rangeOverflow) return `${label} must be ${control.max} or less`;
    if (v.patternMismatch) return control.title || `Check the format of ${label.toLowerCase()}`;
    return control.validationMessage;
  }

  function errorEl(control) {
    const field = control.closest('.field, .fieldset, .check');
    const host = control.closest('.field, .fieldset') || field;
    if (!host) return null;
    let el = host.querySelector(':scope > .field__error');
    if (!el) {
      el = document.createElement('p');
      el.className = 'field__error';
      host.appendChild(el);
    }
    ensureId(el, 'error');
    return el;
  }

  function setError(control, message) {
    const el = errorEl(control);
    if (!el) return;
    const described = (control.getAttribute('aria-describedby') || '').split(' ').filter((id) => id && id !== el.id);
    if (message) {
      el.innerHTML = `${ERROR_ICON}<span>${message}</span>`;
      control.setAttribute('aria-invalid', 'true');
      control.setAttribute('aria-describedby', [...described, el.id].join(' '));
    } else {
      el.innerHTML = '';
      control.removeAttribute('aria-invalid');
      if (described.length) control.setAttribute('aria-describedby', described.join(' '));
      else control.removeAttribute('aria-describedby');
    }
  }

  function initForm(form) {
    form.setAttribute('novalidate', '');
    const controls = () => $$('input, select, textarea', form).filter((c) => c.willValidate);

    form.addEventListener('submit', (event) => {
      const invalid = controls().filter((c) => !c.checkValidity());
      controls().forEach((c) => setError(c, c.checkValidity() ? '' : messageFor(c)));
      let summary = form.querySelector('.form-summary');
      if (!invalid.length) {
        if (summary) summary.remove();
        if (form.hasAttribute('data-demo')) {
          event.preventDefault();
          const done = form.querySelector('[data-form-success]');
          if (done) {
            done.hidden = false;
            done.focus();
          }
          form.reset();
        }
        return;
      }
      event.preventDefault();
      if (invalid.length > 1) {
        if (!summary) {
          summary = document.createElement('div');
          summary.className = 'form-summary';
          summary.setAttribute('role', 'alert');
          summary.tabIndex = -1;
          form.prepend(summary);
        }
        summary.innerHTML = `<p class="form-summary__title">There ${invalid.length === 1 ? 'is a problem' : `are ${invalid.length} problems`}</p><ul>${invalid.map((c) => `<li><a href="#${ensureId(c, 'field')}">${messageFor(c)}</a></li>`).join('')}</ul>`;
        summary.focus();
      } else {
        invalid[0].focus();
      }
    });

    // Re-validate once a field has been marked invalid.
    form.addEventListener('input', (event) => {
      const c = event.target;
      if (c.getAttribute('aria-invalid') === 'true') setError(c, c.checkValidity() ? '' : messageFor(c));
    });
    form.addEventListener('change', (event) => {
      const c = event.target;
      if (c.getAttribute('aria-invalid') === 'true') setError(c, c.checkValidity() ? '' : messageFor(c));
    });
  }

  function initFile(input) {
    const out = input.closest('.file')?.querySelector('.file__name');
    if (!out) return;
    input.addEventListener('change', () => {
      out.textContent = Array.from(input.files).map((f) => f.name).join(', ');
    });
  }

  /* ---- Video poster: swap in the player on demand ------------------------ */

  function initVideo(btn) {
    btn.addEventListener('click', () => {
      const frame = btn.closest('.media__frame');
      const src = btn.dataset.src;
      if (!frame || !src) return;
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = btn.getAttribute('aria-label') || 'Video';
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.allowFullscreen = true;
      frame.replaceChildren(iframe);
      iframe.focus();
    });
  }

  /* ---- Listing: client-side filter (optional) ---------------------------- */

  function initFilter(root) {
    const buttons = $$('[data-filter]', root);
    const items = $$('[data-tags]', root);
    const count = root.querySelector('.listing__count');
    const noun = count ? count.dataset.noun || 'items' : '';
    buttons.forEach((btn) => btn.addEventListener('click', () => {
      const value = btn.dataset.filter;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      let shown = 0;
      items.forEach((item) => {
        const match = value === 'all' || item.dataset.tags.split(' ').includes(value);
        item.hidden = !match;
        if (match) shown += 1;
      });
      if (count) count.textContent = `${shown} ${noun}`;
    }));
    root.setAttribute('data-enhanced', '');
  }

  /* ---- Init -------------------------------------------------------------- */

  function init(scope = document) {
    $$('.site-header', scope).forEach(initHeader);
    $$('.tabs', scope).forEach(initTabs);
    $$('.dropdown', scope).forEach(initDropdown);
    $$('.carousel', scope).forEach(initCarousel);
    $$('[data-copy]', scope).forEach(initCopy);
    $$('.tooltip', scope).forEach(initTooltip);
    $$('.accordion', scope).forEach(initAccordion);
    $$('.cookie-banner', scope).forEach(initCookieBanner);
    $$('form[data-validate]', scope).forEach(initForm);
    $$('.file__input', scope).forEach(initFile);
    $$('.media__play[data-src]', scope).forEach(initVideo);
    $$('[data-filter-root]', scope).forEach(initFilter);
    initDialogs(scope);
  }

  window.Samla = { init };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }
})();
