// ─── AOS ───
AOS.init({
  duration: 420,
  once: true,
  easing: 'ease-out-cubic',
  offset: 56,
});

// ─── DOM references (all declared before any function is called) ───
const header     = document.getElementById('header');
const navToggle  = document.getElementById('nav-toggle');
const navList    = document.getElementById('nav-list');
const toggleIcon = navToggle.querySelector('i');
const sections   = Array.from(document.querySelectorAll('section[id]'));
const navLinks   = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));

// ─── Functions ───
function updateActiveNav() {
  const scrollY = window.scrollY + 140;
  let current = '';
  for (const sec of sections) {
    if (scrollY >= sec.offsetTop) current = sec.id;
  }
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

function closeMobileNav() {
  if (!navList.classList.contains('nav-open')) return;
  navList.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
  toggleIcon.className = 'bx bx-menu';
}

function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 48);
  updateActiveNav();
  closeMobileNav();
}

// ─── Event listeners ───
window.addEventListener('scroll', onScroll, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navList.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  toggleIcon.className = isOpen ? 'bx bx-x' : 'bx bx-menu';
});

navLinks.forEach(link => link.addEventListener('click', closeMobileNav));

// ─── Initial call (after all declarations) ───
onScroll();
