/* -------------------------
   THEME PERSISTENCE
------------------------- */
const saved = localStorage.getItem('theme');
if (saved === 'light') {
  document.documentElement.classList.add('light');
}

/* -------------------------
   REVEAL ANIMATIONS
------------------------- */
const revealElements = document.querySelectorAll('.reveal, .reveal-card, .reveal-del, .reveal-del-2, .reveal-del-3, .reveal-del-4');
const options = { threshold: 0.12 };
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      entry.target.style.transitionDelay = (() => {
        if (entry.target.classList.contains('reveal-del')) return '120ms';
        if (entry.target.classList.contains('reveal-del-2')) return '220ms';
        if (entry.target.classList.contains('reveal-del-3')) return '340ms';
        if (entry.target.classList.contains('reveal-del-4')) return '460ms';
        return '0ms';
      })();
      io.unobserve(entry.target);
    }
  });
}, options);
revealElements.forEach(el => io.observe(el));

/* -------------------------
   SKILLS BAR ANIMATION
------------------------- */
const progressBars = document.querySelectorAll('.progress');
const animateSkills = () => {
  progressBars.forEach(bar => {
    const val = bar.getAttribute('data-value') || 80;
    bar.style.width = val + '%';
  });
};
const skillsSection = document.getElementById('habilidades');
if (skillsSection) {
  const sIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateSkills();
        sIo.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  sIo.observe(skillsSection);
}

/* -------------------------
   KEYBOARD FOCUS OUTLINE
------------------------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') document.body.classList.add('show-focus');
});

/* -------------------------
   LOTTIE ANIMATION SUPPORT
------------------------- */
window.addEventListener('load', () => {
  if (window.lottie) {
    document.querySelectorAll('[data-lottie]').forEach(el => {
      const path = el.getAttribute('data-lottie');
      lottie.loadAnimation({ container: el, renderer: 'svg', loop: true, autoplay: true, path });
    });
  }
});

/* -------------------------
   MOBILE NAV
------------------------- */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

function toggleMobileNav() {
  mobileNav.classList.toggle('show');
  mobileMenuBtn.classList.toggle('open');
}
function closeMobileNav() {
  mobileNav.classList.remove('show');
  mobileMenuBtn.classList.remove('open');
}
mobileMenuBtn && mobileMenuBtn.addEventListener('click', toggleMobileNav);

/* -------------------------
   LOCK BODY SCROLL
------------------------- */
function lockBodyScroll(lock) {
  if (lock) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

/* -------------------------
   MODAL IMAGE
------------------------- */
function openImageModal(src) {
  const modal = document.getElementById('imageModal');
  const img = document.getElementById('modalImage');

  img.src = src;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  img.style.maxWidth = Math.min(vw * 0.94, 1400) + 'px';
  img.style.maxHeight = Math.min(vh * 0.9, 1100) + 'px';

  modal.classList.add('show');
  lockBodyScroll(true);
}
function closeImageModal() {
  const modal = document.getElementById('imageModal');
  const img = document.getElementById('modalImage');
  modal.classList.remove('show');
  setTimeout(() => { img.src = ''; img.style.maxWidth = ''; img.style.maxHeight = ''; }, 300);
  lockBodyScroll(false);
}

/* -------------------------
   MODAL PDF
------------------------- */
function openPdfModal(src) {
  const modal = document.getElementById('pdfModal');
  const pdf = document.getElementById('modalPdf');

  pdf.src = src + '#view=FitH';
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  pdf.style.width = Math.min(Math.max(vw * 0.9, 300), 1200) + 'px';
  pdf.style.height = Math.min(Math.max(vh * 0.85, 300), 1400) + 'px';

  modal.classList.add('show');
  lockBodyScroll(true);
}
function closePdfModal() {
  const modal = document.getElementById('pdfModal');
  const pdf = document.getElementById('modalPdf');
  modal.classList.remove('show');
  setTimeout(() => { pdf.src = ''; pdf.style.width = ''; pdf.style.height = ''; }, 300);
  lockBodyScroll(false);
}

/* -------------------------
   CLOSE MODAL ON BACKDROP OR ESC
------------------------- */
function onBackdropClick(e, type) {
  const modal = (type === 'pdf') ? document.getElementById('pdfModal') : document.getElementById('imageModal');
  if (e.target === modal) {
    if (type === 'pdf') closePdfModal();
    else closeImageModal();
  }
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeImageModal();
    closePdfModal();
    closeMobileNav();
  }
});

/* -------------------------
   RESIZE MODALS RESPONSIVE
------------------------- */
window.addEventListener('resize', () => {
  const imgModal = document.getElementById('imageModal');
  if (imgModal && imgModal.classList.contains('show')) {
    const img = document.getElementById('modalImage');
    if (img && img.src) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      img.style.maxWidth = Math.min(vw * 0.94, 1400) + 'px';
      img.style.maxHeight = Math.min(vh * 0.9, 1100) + 'px';
    }
  }
  const pModal = document.getElementById('pdfModal');
  if (pModal && pModal.classList.contains('show')) {
    const pdf = document.getElementById('modalPdf');
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    pdf.style.width = Math.min(Math.max(vw * 0.9, 300), 1200) + 'px';
    pdf.style.height = Math.min(Math.max(vh * 0.85, 300), 1400) + 'px';
  }
});

/* -------------------------
   PROJECTS OPEN / CLOSE
------------------------- */
document.querySelectorAll('.open-project').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-project');
    const container = document.getElementById(id);

    // Cada projeto abre de forma independente, sem fechar os outros
    if (!container.classList.contains('show')) {
      container.style.display = 'block';
      setTimeout(() => { container.classList.add('show'); }, 10);
      container.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.querySelectorAll('.close-project').forEach(btn => {
  btn.addEventListener('click', () => {
    const container = btn.parentElement;
    container.classList.remove('show');
    setTimeout(() => { container.style.display = 'none'; }, 400);
  });
});
