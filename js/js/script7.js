window.addEventListener('DOMContentLoaded', () => {
    // Animación de header y contenedor principal
    const header = document.querySelector('.header');
    const container = document.querySelector('.ciencias-container');
    if (header) header.style.animation = 'fadeDown 1s ease forwards';
    if (container) setTimeout(() => { container.style.opacity = '1'; }, 200);

    // Animación escalonada de secciones
    const sections = document.querySelectorAll('.ciencias-section');
    sections.forEach((section, i) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 400 + i * 400);
    });

    // Gráfico de física: velocidad de un objeto en distintos tiempos
    const ctxFisica = document.getElementById('fisicaChart').getContext('2d');
    new Chart(ctxFisica, {
        type: 'line',
        data: {
            labels: ['0s', '1s', '2s', '3s', '4s'],
            datasets: [{
                label: 'Velocidad (m/s)',
                data: [0, 2, 4, 6, 8],
                borderColor: '#43e97b',
                backgroundColor: 'rgba(67,233,123,0.15)',
                tension: 0.3,
                pointBackgroundColor: '#36e2f6',
                pointRadius: 5
            }]
        },
        options: {
            plugins: { legend: { display: true } },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Gráfico de química: proporción de elementos en el agua
    const ctxQuimica = document.getElementById('quimicaChart').getContext('2d');
    new Chart(ctxQuimica, {
        type: 'doughnut',
        data: {
            labels: ['Hidrógeno', 'Oxígeno'],
            datasets: [{
                data: [2, 1],
                backgroundColor: ['#43e97b', '#36e2f6']
            }]
        },
        options: {
            plugins: { legend: { display: true } }
        }
    });
});

// Medición de tiempo en la página
let startTime = Date.now();
window.addEventListener('beforeunload', () => {
    const stats = JSON.parse(localStorage.getItem('wikilabs_stats') || '{}');
    const elapsed = Math.round((Date.now() - startTime) / 60000); // minutos
    stats.math = (stats.math || 0) + elapsed;
    localStorage.setItem('wikilabs_stats', JSON.stringify(stats));
});

document.addEventListener('DOMContentLoaded', function() {
    // Simulación: ¿Está logeado? (puedes cambiar esto por tu lógica real)
    const isLogged = localStorage.getItem('logged') === 'true';

    // Botón de menú "Contáctanos"
    const contactBtn = document.querySelector('.nav-menu-link[href="contact.html"]');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            if (isLogged) {
                e.preventDefault();
                document.getElementById('contact-modal').style.display = 'flex';
            }
            // Si no está logeado, sigue el enlace normal
        });
    }

    // Cerrar modal
    document.getElementById('close-contact-modal').onclick = function() {
        document.getElementById('contact-modal').style.display = 'none';
    };

    // Volver a cursos
    document.getElementById('back-to-courses').onclick = function() {
        window.location.href = "cursos.html";
    };
});