window.addEventListener('DOMContentLoaded', () => {
    // Animar la aparición de los bloques de cursos
    const cursosContainer = document.querySelector('.cursos-container');
    if (cursosContainer) {
        setTimeout(() => {
            cursosContainer.style.opacity = '1';
        }, 200);
    }
    // Los bloques de cursos ya tienen animación CSS con delay
});