/* -------------------------
   THEME PERSISTENCE
------------------------- */
const saved = localStorage.getItem('theme');
if (saved === 'light') document.documentElement.classList.add('light');

/* -------------------------
   REVEAL ANIMATIONS
------------------------- */
const revealElements = document.querySelectorAll('.reveal, .reveal-card, .reveal-del, .reveal-del-2, .reveal-del-3, .reveal-del-4');
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
}, { threshold: 0.12 });
revealElements.forEach(el => io.observe(el));

/* -------------------------
   SKILLS BAR ANIMATION
------------------------- */
const progressBars = document.querySelectorAll('.progress');
const animateSkills = () => {
  progressBars.forEach(bar => {
    const val = bar.dataset.value || 80;
    bar.style.width = val + '%';
  });
};
const skillsSection = document.getElementById('habilidades');
if (skillsSection) {
  const sIo = new IntersectionObserver(entries => {
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
document.addEventListener('keydown', e => {
  if (e.key === 'Tab') document.body.classList.add('show-focus');
});

/* -------------------------
   MOBILE NAV
------------------------- */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.querySelector('.mobile-nav');

function toggleMobileNav() {
  mobileNav.classList.toggle('show');
  mobileMenuBtn.classList.toggle('open');
  // ❌ body scroll liberado mesmo com menu aberto
}

function closeMobileNav() {
  mobileNav.classList.remove('show');
  mobileMenuBtn.classList.remove('open');
  // ❌ body scroll liberado
}

mobileMenuBtn && mobileMenuBtn.addEventListener('click', toggleMobileNav);
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

/* -------------------------
   LOCK BODY SCROLL
------------------------- */
function lockBodyScroll(lock) {
  document.body.style.overflow = lock ? 'hidden' : '';
}

/* -------------------------
   PROJECTS OPEN / CLOSE
------------------------- */
document.querySelectorAll('.open-project').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.project;
    const container = document.getElementById(id);

    container.style.display = 'block';
    container.style.overflowY = 'auto';  // scroll interno
    container.style.maxHeight = '90vh';
    setTimeout(() => container.classList.add('show'), 10);
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelectorAll('.close-project').forEach(btn => {
  btn.addEventListener('click', () => {
    const container = btn.closest('.project-detail');
    container.classList.remove('show');
    setTimeout(() => {
      container.style.display = 'none';
      container.style.overflowY = '';
      container.style.maxHeight = '';
    }, 400);
  });
});

/* -------------------------
   MODALS (IMAGEM E PDF)
------------------------- */
function openImageModal(src) {
  const modal = document.getElementById('imageModal');
  const img = document.getElementById('modalImage');
  img.src = src;
  const vw = window.innerWidth, vh = window.innerHeight;
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

function openPdfModal(src) {
  const modal = document.getElementById('pdfModal');
  const pdf = document.getElementById('modalPdf');
  pdf.src = src + '#view=FitH';
  const vw = window.innerWidth, vh = window.innerHeight;
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
   ESC / BACKDROP
------------------------- */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeImageModal();
    closePdfModal();
    closeMobileNav();
    document.querySelectorAll('.project-detail.show').forEach(c => {
      c.classList.remove('show');
      setTimeout(() => {
        c.style.display = 'none';
        c.style.overflowY = '';
        c.style.maxHeight = '';
      }, 400);
    });
  }
});
