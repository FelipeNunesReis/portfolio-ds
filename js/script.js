/* -------------------------
   REVEAL ANIMATIONS
------------------------- */
const revealElements = document.querySelectorAll('.reveal, .reveal-card, .reveal-del, .reveal-del-2, .reveal-del-3, .reveal-del-4');
const revealDelays = { 'reveal-del': '120ms', 'reveal-del-2': '220ms', 'reveal-del-3': '340ms', 'reveal-del-4': '460ms' };

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const cls = Object.keys(revealDelays).find(c => el.classList.contains(c));
      el.style.transitionDelay = cls ? revealDelays[cls] : '0ms';
      el.classList.add('revealed');
      io.unobserve(el);
    });
  }, { threshold: 0.12 });
  revealElements.forEach(el => io.observe(el));
} else {
  revealElements.forEach(el => el.classList.add('revealed'));
}

/* -------------------------
   KEYBOARD FOCUS OUTLINE
------------------------- */
document.addEventListener('keydown', e => {
  if (e.key === 'Tab') document.body.classList.add('show-focus');
});

/* -------------------------
   MOBILE NAV
------------------------- */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.querySelector('.mobile-nav');

function setMobileNav(open) {
  if (!mobileNav || !mobileMenuBtn) return;
  mobileNav.classList.toggle('show', open);
  mobileMenuBtn.setAttribute('aria-expanded', String(open));
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => setMobileNav(!mobileNav.classList.contains('show')));
}
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => setMobileNav(false));
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') setMobileNav(false);
});
