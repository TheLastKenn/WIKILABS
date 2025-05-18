window.addEventListener('DOMContentLoaded', () => {
    // Animación de header y contenedor principal
    const header = document.querySelector('.header');
    const container = document.querySelector('.history-container');
    if (header) header.style.animation = 'fadeDown 1s ease forwards';
    if (container) setTimeout(() => { container.style.opacity = '1'; }, 200);

    // Animación escalonada de secciones
    const sections = document.querySelectorAll('.history-section');
    sections.forEach((section, i) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 400 + i * 400);
    });

    // Gráfico de barras: avances y eventos de la Edad Contemporánea
    const ctx = document.getElementById('historiaChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Revolución Francesa', 'Independencias', 'Guerras Mundiales', 'Tecnología'],
            datasets: [{
                label: 'Impacto',
                data: [8, 7, 9, 10],
                backgroundColor: [
                    '#f6c736', '#43e97b', '#36e2f6', '#a67c1a'
                ],
                borderRadius: 8
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 10 }
            }
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