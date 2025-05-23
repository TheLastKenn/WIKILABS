window.addEventListener('DOMContentLoaded', () => {
    // Animación de entrada
    const header = document.querySelector('.header');
    const container = document.querySelector('.contact-container');
    if (header) header.style.animation = 'fadeDown 1s ease forwards';
    if (container) setTimeout(() => { container.style.animation = 'fadeUp 1s ease forwards'; }, 200);

    // Copiar correo
    const copyBtn = document.getElementById('copyEmailBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const email = "stiven.rojas.vargas.26@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                copyBtn.textContent = "¡Correo copiado exitosamente!";
                setTimeout(() => {
                    copyBtn.innerHTML = '<span>📧</span> stiven.rojas.vargas.26@gmail.com';
                }, 1800);
            });
        });
    }
});