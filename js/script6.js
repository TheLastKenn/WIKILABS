window.addEventListener('DOMContentLoaded', () => {
    // Animación de header y contenedor principal
    const header = document.querySelector('.header');
    const container = document.querySelector('.math-container');
    if (header) header.style.animation = 'fadeDown 1s ease forwards';
    if (container) setTimeout(() => { container.style.opacity = '1'; }, 200);

    // Animación escalonada de secciones
    const sections = document.querySelectorAll('.math-section');
    sections.forEach((section, i) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 400 + i * 400);
    });

    // Dibujo de figuras geométricas en canvas (más pequeño)
    const geoCanvas = document.getElementById('geometryCanvas');
    if (geoCanvas && geoCanvas.getContext) {
        const ctxG = geoCanvas.getContext('2d');
        // Círculo
        ctxG.beginPath();
        ctxG.arc(40, 40, 20, 0, 2 * Math.PI);
        ctxG.strokeStyle = '#36e2f6';
        ctxG.lineWidth = 2;
        ctxG.stroke();
        // Triángulo
        ctxG.beginPath();
        ctxG.moveTo(80, 60);
        ctxG.lineTo(110, 20);
        ctxG.lineTo(140, 60);
        ctxG.closePath();
        ctxG.strokeStyle = '#43e97b';
        ctxG.lineWidth = 2;
        ctxG.stroke();
        // Cuadrado
        ctxG.beginPath();
        ctxG.rect(160, 30, 30, 30);
        ctxG.strokeStyle = '#f6c736';
        ctxG.lineWidth = 2;
        ctxG.stroke();
    }

    // Gráfico de pastel para estadística (media, moda, probabilidad) - tamaño grande y proporcionado
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Media', 'Moda', 'Probabilidad'],
            datasets: [{
                data: [6, 8, 16.67],
                backgroundColor: ['#36e2f6', '#43e97b', '#f6c736']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: true } }
        }
    });

    document.querySelectorAll('.check-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const exDiv = btn.closest('.math-example');
            const input = exDiv.querySelector('.ex-input');
            const feedback = exDiv.querySelector('.ex-feedback');
            const showSolBtn = exDiv.querySelector('.show-solution-btn');
            const solution = exDiv.querySelector('.ex-solution');
            const exKey = exDiv.getAttribute('data-ex');
            let userVal = input.value.trim();

            // Fracciones y porcentajes
            if (Array.isArray(answers[exKey])) {
                let correct = false;
                const userNorm = normalizeFraction(userVal);
                for (const ans of answers[exKey]) {
                    if (normalizeFraction(ans) === userNorm) {
                        correct = true;
                        break;
                    }
                }
                if (correct) {
                    feedback.textContent = "¡Correcto!";
                    feedback.style.color = "#43e97b";
                    showSolBtn.style.display = "none";
                    solution.style.display = "none";
                } else {
                    feedback.textContent = "Incorrecto.";
                    feedback.style.color = "#e74c3c";
                    showSolBtn.style.display = "inline-block";
                }
            } else {
                // Números
                let correct = false;
                if (userVal !== "") {
                    let userNum = Number(userVal.replace(',', '.'));
                    let ansNum = Number(answers[exKey]);
                    // Permitir margen para decimales
                    if (Math.abs(userNum - ansNum) < 0.01) correct = true;
                }
                if (correct) {
                    feedback.textContent = "¡Correcto!";
                    feedback.style.color = "#43e97b";
                    showSolBtn.style.display = "none";
                    solution.style.display = "none";
                } else {
                    feedback.textContent = "Incorrecto.";
                    feedback.style.color = "#e74c3c";
                    showSolBtn.style.display = "inline-block";
                }
            }
        });
    });

    document.querySelectorAll('.show-solution-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const exDiv = btn.closest('.math-example');
            const solution = exDiv.querySelector('.ex-solution');
            solution.style.display = "block";
        });
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