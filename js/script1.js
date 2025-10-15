// Selecciona todos los enlaces de la barra de navegación
const navLinks = document.querySelectorAll('.nav-menu-item');

// Agrega eventos para cada enlace
navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.transform = 'scale(1.1)'; // Aumenta ligeramente el tamaño
        link.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'; // Agrega una sombra
        link.style.transition = 'all 0.3s ease'; // Suaviza la animación
    });

    link.addEventListener('mouseout', () => {
        link.style.transform = 'scale(1)'; // Restaura el tamaño original
        link.style.boxShadow = 'none'; // Elimina la sombra
    });
});

// Animación de entrada para los bloques de materias
function animateStemCards() {
    const cards = document.querySelectorAll('.animate-stem');
    cards.forEach((card, i) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 200 + i * 200);
    });
}

// Animación de hover para los bloques y botones
function addStemCardHover() {
    const cards = document.querySelectorAll('.animate-stem');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 8px 24px rgba(47,49,146,0.12)';
            card.style.transform = 'scale(1.03)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
            card.style.transform = '';
        });
    });
    const btns = document.querySelectorAll('.stem-btn');
    btns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.background = '#FFD966';
            btn.style.color = '#2F3192';
            btn.style.transform = 'scale(1.12)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = '#FF61A6';
            btn.style.color = '#fff';
            btn.style.transform = '';
        });
    });
}

// Animaciones de entrada para header, secciones, footer y botones
function animatePageSections() {
    // Header
    const header = document.querySelector('.header');
    if (header) header.classList.add('animated-fadeInScale');
    // Secciones principales con animaciones distintas
    const sections = document.querySelectorAll('section');
    sections.forEach((sec, i) => {
        if (i === 0) {
            sec.classList.add('animated-fadeInLeft'); // Sección 1
        } else if (i === 1) {
            sec.classList.add('animated-fadeInRight'); // Sección 2
        } else if (i === 2) {
            sec.classList.add('animated-fadeInRotate'); // Sección 3
        } else {
            sec.classList.add('animated-fadeInUp'); // Por si hay más secciones
        }
    });
    // Footer
    const footer = document.querySelector('.main-footer');
    if (footer) footer.classList.add('animated-fadeIn');
    // Botones principales
    const mainBtns = document.querySelectorAll('.main-register-btn, .stem-btn');
    mainBtns.forEach((btn, i) => {
        btn.classList.add('animated-fadeInScale');
    });
}

window.addEventListener('DOMContentLoaded', () => {
    animatePageSections();
    animateStemCards();
    addStemCardHover();
    // Animación de scroll suave para los botones de navegación a secciones
    document.querySelectorAll('a.nav-menu-link[href^="#section-"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').replace('#', '');
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Responsive navigation hamburger menu
// Muestra/oculta el menú en pantallas pequeñas

document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navMenu.classList.toggle('open');
    });
    // Cierra el menú si se hace clic fuera
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
  }
});