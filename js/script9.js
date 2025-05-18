window.addEventListener('DOMContentLoaded', () => {
    // Obtener usuario y emoji reales
    const username = localStorage.getItem('wikilabs_user') || "Usuario";
    const emoji = localStorage.getItem('wikilabs_emoji') || "🦉";
    const stats = JSON.parse(localStorage.getItem('wikilabs_stats') || '{}');

    // Formatear tiempo
    function formatTime(mins) {
        if (!mins || mins <= 0) return "0 min";
        if (mins < 60) return `${mins} min`;
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return m > 0 ? `${h}h ${m}min` : `${h}h`;
    }

    document.getElementById('username').textContent = username;
    document.getElementById('profile-emoji').textContent = emoji;
    document.getElementById('math-time').textContent = formatTime(stats.math);
    document.getElementById('science-time').textContent = formatTime(stats.ciencia);
    document.getElementById('history-time').textContent = formatTime(stats.history);

    // Progreso diario simulado (puedes mejorarlo para hacerlo real)
    const progressData = {
        labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
        data: [stats.math || 0, stats.ciencia || 0, stats.history || 0, 0, 0, 0, 0]
    };

    // Gráfico de progreso diario
    const ctx = document.getElementById('progressChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: progressData.labels,
            datasets: [{
                label: 'Minutos de estudio',
                data: progressData.data,
                backgroundColor: [
                    'rgba(54, 226, 246, 0.35)',
                    'rgba(67, 233, 123, 0.35)',
                    'rgba(246, 199, 54, 0.35)',
                    'rgba(54, 226, 246, 0.35)',
                    'rgba(67, 233, 123, 0.35)',
                    'rgba(246, 199, 54, 0.35)',
                    'rgba(54, 226, 246, 0.35)'
                ],
                borderColor: [
                    '#36e2f6', '#43e97b', '#f6c736',
                    '#36e2f6', '#43e97b', '#f6c736', '#36e2f6'
                ],
                borderWidth: 2,
                borderRadius: 14,
                barPercentage: 0.65,
                categoryPercentage: 0.6,
                hoverBackgroundColor: [
                    'rgba(54, 226, 246, 0.65)',
                    'rgba(67, 233, 123, 0.65)',
                    'rgba(246, 199, 54, 0.65)',
                    'rgba(54, 226, 246, 0.65)',
                    'rgba(67, 233, 123, 0.65)',
                    'rgba(246, 199, 54, 0.65)',
                    'rgba(54, 226, 246, 0.65)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(34, 34, 34, 0.92)',
                    titleColor: '#36e2f6',
                    bodyColor: '#fff',
                    borderColor: '#43e97b',
                    borderWidth: 1,
                    padding: 12,
                    caretSize: 7,
                    cornerRadius: 8,
                    displayColors: false
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#232526",
                        font: { size: 15, family: "'Montserrat', Arial, sans-serif" },
                        stepSize: 10
                    },
                    grid: {
                        color: "rgba(54,226,246,0.10)",
                        borderDash: [4, 4]
                    }
                },
                x: {
                    ticks: {
                        color: "#232526",
                        font: { size: 15, family: "'Montserrat', Arial, sans-serif" }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 1100,
                easing: 'easeOutQuart'
            }
        }
    });

    // Cerrar sesión
    document.getElementById('logout-btn').addEventListener('click', () => {
        const msg = document.getElementById('logout-message');
        msg.style.display = "block";
        setTimeout(() => {
            localStorage.removeItem('wikilabs_user');
            localStorage.removeItem('wikilabs_stats');
            window.location.href = "index.html";
        }, 1800);
    });
});