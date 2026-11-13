/* Theme, navigation, reveal animations and project filters. No dependencies. */
(() => {
  'use strict';

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle (dark / light) ---------- */
  const themeBtn = document.querySelector('.theme-toggle');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)');
  const currentTheme = () => root.dataset.theme || (prefersLight.matches ? 'light' : 'dark');
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch (_) { /* storage blocked */ }
    if (themeBtn) themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  };
  if (themeBtn) {
    themeBtn.setAttribute('aria-label', currentTheme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    themeBtn.addEventListener('click', () => applyTheme(currentTheme() === 'dark' ? 'light' : 'dark'));
  }

  /* ---------- Mobile navigation ---------- */
  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const setMenu = (open) => {
    if (!menuBtn || !mobileNav) return;
    mobileNav.classList.toggle('show', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  };
  if (menuBtn) menuBtn.addEventListener('click', () => setMenu(!mobileNav.classList.contains('show')));
  document.querySelectorAll('.mobile-nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('revealed'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 6, 4) * 60}ms`;
      io.observe(el);
    });
  }

  /* ---------- Current section in the header nav ---------- */
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => a.setAttribute('aria-current', a.getAttribute('href') === `#${entry.target.id}` ? 'true' : 'false'));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Case study table of contents highlight ---------- */
  const tocLinks = [...document.querySelectorAll('.cs-toc a[href^="#"]')];
  const tocTargets = tocLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (tocTargets.length && 'IntersectionObserver' in window) {
    const tocSpy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        tocLinks.forEach((a) => a.setAttribute('aria-current', a.getAttribute('href') === `#${entry.target.id}` ? 'true' : 'false'));
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    tocTargets.forEach((s) => tocSpy.observe(s));
  }

  /* ---------- Project filters (tablist) ---------- */
  const filterBar = document.querySelector('.filters');
  if (filterBar) {
    const tabs = [...filterBar.querySelectorAll('button')];
    const cards = [...document.querySelectorAll('#all-projects .project-card')];
    const empty = document.querySelector('.filters-empty');

    const apply = (key, { updateHash = true, focus = false } = {}) => {
      const tab = tabs.find((t) => t.dataset.filter === key) || tabs[0];
      const active = tab.dataset.filter;
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
      });
      let shown = 0;
      cards.forEach((c) => {
        const cats = (c.dataset.category || '').split(/\s+/);
        const show = active === 'all' || cats.includes(active);
        c.classList.toggle('is-hidden', !show);
        if (show) shown++;
      });
      if (empty) empty.classList.toggle('show', shown === 0);
      if (updateHash) history.replaceState(null, '', active === 'all' ? '#projects' : `#projects=${active}`);
      if (focus) tab.focus();
    };

    tabs.forEach((t) => t.addEventListener('click', () => apply(t.dataset.filter)));
    filterBar.addEventListener('keydown', (e) => {
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      const step = { ArrowRight: 1, ArrowLeft: -1, Home: -i, End: tabs.length - 1 - i }[e.key];
      if (step === undefined) return;
      e.preventDefault();
      apply(tabs[(i + step + tabs.length) % tabs.length].dataset.filter, { focus: true });
    });

    const fromHash = () => {
      const m = location.hash.match(/^#projects=([\w-]+)/);
      apply(m ? m[1] : 'all', { updateHash: false });
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
  }
})();
