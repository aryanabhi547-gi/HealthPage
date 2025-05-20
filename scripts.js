// Elements references
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navItems = navLinks.querySelectorAll('a.nav-item');
const navbar = document.querySelector('.navbar');
let navOpen = false;

// Toggle mobile menu
function toggleMenu() {
  navOpen = !navOpen;
  navLinks.classList.toggle('open', navOpen);
  hamburger.classList.toggle('open', navOpen);
  hamburger.setAttribute('aria-expanded', navOpen.toString());
}

hamburger.addEventListener('click', toggleMenu);
hamburger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  }
});

// Close mobile menu when a nav link is clicked
navItems.forEach(link => {
  link.addEventListener('click', () => {
    if (navOpen) {
      toggleMenu();
    }
  });
});

// Smooth scroll fallback (optional) - most browsers support CSS scroll-behavior
navItems.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetElem = document.getElementById(targetId);
    if (targetElem) {
      targetElem.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  });
});

// Highlight active nav item on scroll
const sections = document.querySelectorAll('main section');
function onScroll() {
  const scrollPos = window.scrollY + navbar.offsetHeight + 5;
  let currentIndex = 0;
  sections.forEach((section, i) => {
    if (section.offsetTop <= scrollPos) {
      currentIndex = i;
    }
    // Reveal animation for sections
    if (section.getBoundingClientRect().top < window.innerHeight * 0.8) {
      section.classList.add('visible');
    }
  });
  navItems.forEach((link, i) => {
    if (i === currentIndex) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Navbar shadow and background change on scroll
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', onScroll);
window.addEventListener('load', () => {
  onScroll();
  // Reveal any sections in viewport initially
  sections.forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight * 0.8) {
      section.classList.add('visible');
    }
  });
});