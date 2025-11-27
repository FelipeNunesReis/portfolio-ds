// Theme persistence fallback
const saved = localStorage.getItem('theme');
if(saved === 'light') {
  document.documentElement.classList.add('light');
}

// Reveal animations
const revealElements = document.querySelectorAll('.reveal, .reveal-card, .reveal-del, .reveal-del-2, .reveal-del-3, .reveal-del-4');
const options = {threshold: 0.12};
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('revealed');
      entry.target.style.transitionDelay = (() => {
        if(entry.target.classList.contains('reveal-del')) return '120ms';
        if(entry.target.classList.contains('reveal-del-2')) return '220ms';
        if(entry.target.classList.contains('reveal-del-3')) return '340ms';
        if(entry.target.classList.contains('reveal-del-4')) return '460ms';
        return '0ms';
      })();
      io.unobserve(entry.target);
    }
  });
}, options);
revealElements.forEach(el => io.observe(el));

// Skills bar animation
const progressBars = document.querySelectorAll('.progress');
const animateSkills = () => {
  progressBars.forEach(bar => {
    const val = bar.getAttribute('data-value') || 80;
    bar.style.width = val + '%';
  });
};
const skillsSection = document.getElementById('habilidades');
if(skillsSection){
  const sIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        animateSkills();
        sIo.unobserve(e.target);
      }
    });
  }, {threshold: 0.2});
  sIo.observe(skillsSection);
}

// Keyboard focus
document.addEventListener('keydown', (e) => {
  if(e.key === 'Tab') document.body.classList.add('show-focus');
});

// Lottie animations
window.addEventListener('load', () => {
  if(window.lottie){
    document.querySelectorAll('[data-lottie]').forEach(el => {
      const path = el.getAttribute('data-lottie');
      lottie.loadAnimation({container: el, renderer: 'svg', loop: true, autoplay: true, path});
    });
  }
});

// === MODAL IMAGEM ===
function openImageModal(src) {
  const modal = document.getElementById("imageModal");
  const img = document.getElementById("modalImage");
  img.src = src;
  modal.classList.add("show");
}
function closeImageModal() {
  document.getElementById("imageModal").classList.remove("show");
}

// === MODAL PDF ===
function openPdfModal(src) {
  const modal = document.getElementById("pdfModal");
  const pdf = document.getElementById("modalPdf");
  pdf.src = src;
  modal.classList.add("show");
}
function closePdfModal() {
  document.getElementById("pdfModal").classList.remove("show");
}
