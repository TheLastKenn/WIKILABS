window.addEventListener('DOMContentLoaded', () => {
    // Obtener usuario y emoji reales
    const username = localStorage.getItem('wikilabs_user') || "Usuario";
    const emoji = localStorage.getItem('wikilabs_emoji') || "🦉";
    const tipo = localStorage.getItem('wikilabs_tipo') || "alumno";
    const usuarios = JSON.parse(localStorage.getItem('wikilabs_usuarios') || '[]');
    const usuario = usuarios.find(u => u.name === username);

    // Mostrar datos básicos
    document.getElementById('username').textContent = username;
    document.getElementById('profile-emoji').textContent = emoji;
    document.getElementById('user-type').textContent = tipo ? `Tipo: ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}` : '';

    // Mostrar materia si es profesor
    if (tipo === "profesor" && usuario && usuario.materia) {
        let materiaTxt = "";
        if (usuario.materia === "matematicas") materiaTxt = "Matemáticas";
        else if (usuario.materia === "historia") materiaTxt = "Historia";
        else if (usuario.materia === "biologia") materiaTxt = "Biología";
        document.getElementById('user-materia').textContent = `Materia: ${materiaTxt}`;
    } else {
        document.getElementById('user-materia').textContent = "";
    }

    // Mostrar sección según tipo de usuario
    if (tipo === "profesor") {
        document.getElementById('profesor-section').style.display = "block";
        document.getElementById('alumno-section').style.display = "none";
        // Botón para ir al curso correspondiente
        const goCursoBtn = document.getElementById('go-curso-btn');
        if (usuario && usuario.materia) {
            if (usuario.materia === "matematicas") {
                goCursoBtn.onclick = () => window.location.href = "math.html";
                goCursoBtn.textContent = "Ir a Matemáticas";
            } else if (usuario.materia === "historia") {
                goCursoBtn.onclick = () => window.location.href = "history.html";
                goCursoBtn.textContent = "Ir a Historia";
            } else if (usuario.materia === "biologia") {
                goCursoBtn.onclick = () => window.location.href = "ciencia.html";
                goCursoBtn.textContent = "Ir a Biología";
            }
        }
        // Logout para profesor con mensaje animado
        document.getElementById('logout-btn-prof').onclick = () => {
            const msg = document.getElementById('logout-message-prof');
            msg.style.display = "block";
            setTimeout(() => {
                localStorage.removeItem('wikilabs_user');
                localStorage.removeItem('wikilabs_emoji');
                localStorage.removeItem('wikilabs_tipo');
                localStorage.removeItem('wikilabs_materia');
                window.location.href = "index.html";
            }, 1800);
        };

        const contentKey = `wikilabs_contenidos_${usuario.materia || "general"}`;
        const contentPanel = document.getElementById('profesor-content-panel');
        const contentForm = document.getElementById('add-content-form');
        const contentList = document.getElementById('curso-contenidos');

        // Cargar contenidos guardados
        function renderContents() {
            contentList.innerHTML = "";
            let contenidos = JSON.parse(localStorage.getItem(contentKey) || "[]");
            contenidos.forEach((item, idx) => {
                const div = document.createElement('div');
                div.className = "curso-content-item";
                div.innerHTML = `
                    <div class="curso-content-title">${item.titulo}</div>
                    <div class="curso-content-body">${renderContentBody(item)}</div>
                    <div class="curso-content-actions">
                        <button class="edit-btn" title="Editar" data-idx="${idx}">Editar</button>
                        <button class="delete-btn" title="Eliminar" data-idx="${idx}">Eliminar</button>
                    </div>
                `;
                contentList.appendChild(div);
            });
        }

        function renderContentBody(item) {
            if (item.tipo === "texto") {
                return `<div style="white-space:pre-line;color:#232526;">${item.datos}</div>`;
            } else if (item.tipo === "imagen") {
                return `<img src="${item.datos}" alt="Imagen del curso" style="max-width:100%;border-radius:8px;margin:8px 0;">`;
            } else if (item.tipo === "video") {
                return `<video src="${item.datos}" controls style="max-width:100%;border-radius:8px;margin:8px 0;"></video>`;
            } else if (item.tipo === "grafica") {
                if (item.datos.startsWith("<iframe") || item.datos.startsWith("<svg")) {
                    return item.datos;
                } else {
                    return `<iframe src="${item.datos}" style="width:100%;min-height:220px;border:none;border-radius:8px;margin:8px 0;"></iframe>`;
                }
            }
            return "";
        }

        // Agregar contenido
        contentForm.onsubmit = function(e) {
            e.preventDefault();
            let contenidos = JSON.parse(localStorage.getItem(contentKey) || "[]");
            const titulo = document.getElementById('content-title').value.trim();
            const tipo = document.getElementById('content-type').value;
            const datos = document.getElementById('content-data').value.trim();
            if (!titulo || !tipo || !datos) return;

            contenidos.push({ titulo, tipo, datos });
            localStorage.setItem(contentKey, JSON.stringify(contenidos));
            contentForm.reset();
            renderContents();
        };

        // Editar o eliminar contenido
        contentList.onclick = function(e) {
            if (e.target.classList.contains('delete-btn')) {
                const idx = e.target.getAttribute('data-idx');
                let contenidos = JSON.parse(localStorage.getItem(contentKey) || "[]");
                if (confirm("¿Seguro que deseas eliminar este contenido?")) {
                    contenidos.splice(idx, 1);
                    localStorage.setItem(contentKey, JSON.stringify(contenidos));
                    renderContents();
                }
            }
            if (e.target.classList.contains('edit-btn')) {
                const idx = e.target.getAttribute('data-idx');
                let contenidos = JSON.parse(localStorage.getItem(contentKey) || "[]");
                const item = contenidos[idx];
                document.getElementById('content-title').value = item.titulo;
                document.getElementById('content-type').value = item.tipo;
                document.getElementById('content-data').value = item.datos;
                // Al guardar, reemplaza el contenido editado
                contentForm.onsubmit = function(ev) {
                    ev.preventDefault();
                    contenidos[idx] = {
                        titulo: document.getElementById('content-title').value.trim(),
                        tipo: document.getElementById('content-type').value,
                        datos: document.getElementById('content-data').value.trim()
                    };
                    localStorage.setItem(contentKey, JSON.stringify(contenidos));
                    contentForm.reset();
                    renderContents();
                    // Restaurar función original
                    contentForm.onsubmit = arguments.callee.caller;
                };
            }
        };

        renderContents();
    } else {
        // ALUMNO
        document.getElementById('profesor-section').style.display = "none";
        document.getElementById('alumno-section').style.display = "block";
        // Estadísticas reales
        const stats = JSON.parse(localStorage.getItem('wikilabs_stats') || '{}');
        function formatTime(mins) {
            if (!mins || mins <= 0) return "0 min";
            if (mins < 60) return `${mins} min`;
            const h = Math.floor(mins / 60);
            const m = mins % 60;
            return m > 0 ? `${h}h ${m}min` : `${h}h`;
        }
        document.getElementById('math-time').textContent = formatTime(stats.math);
        document.getElementById('science-time').textContent = formatTime(stats.ciencia);
        document.getElementById('history-time').textContent = formatTime(stats.history);

        // Gráfico de progreso diario (puedes personalizar los datos)
        const progressData = {
            labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
            data: [stats.math || 0, stats.ciencia || 0, stats.history || 0, 0, 0, 0, 0]
        };

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

        // Logout para alumno
        document.getElementById('logout-btn').onclick = () => {
            document.getElementById('logout-message').style.display = "block";
            setTimeout(() => {
                localStorage.removeItem('wikilabs_user');
                localStorage.removeItem('wikilabs_emoji');
                localStorage.removeItem('wikilabs_tipo');
                localStorage.removeItem('wikilabs_materia');
                window.location.href = "index.html";
            }, 1800);
        };
    }
});