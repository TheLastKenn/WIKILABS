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
window.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const container = document.querySelector('.container');

    if (header) {
        header.style.animation = 'fadeDown 1s ease forwards';
    }
    if (container) {
        setTimeout(() => {
            container.style.animation = 'fadeUp 1s ease forwards';
        }, 300);
    }
});