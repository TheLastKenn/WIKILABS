window.addEventListener('DOMContentLoaded', () => {
    // Utilidades de fecha/racha
    function toYMD(d){ const z=n=>String(n).padStart(2,'0'); return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}`; }
    function daysBetween(d1Str, d2Str){
        if(!d1Str||!d2Str) return NaN;
        const d1=new Date(d1Str+'T00:00:00'); const d2=new Date(d2Str+'T00:00:00');
        const ms= d2 - d1; return Math.round(ms/86400000);
    }
    function updateStreakOnVisit(){
        const today = toYMD(new Date());
        const last = localStorage.getItem('wikilabs_last_active_date');
        let streak = Number(localStorage.getItem('wikilabs_streak')||'0');
        if(!last){ streak = 1; }
        else {
            const diff = daysBetween(last, today);
            if(diff === 0){ /* mismo día: no cambia */ }
            else if(diff === 1){ streak = Math.max(1, streak+1); }
            else if(diff > 1){ streak = 1; }
        }
        localStorage.setItem('wikilabs_last_active_date', today);
        localStorage.setItem('wikilabs_streak', String(streak));
        const el = document.getElementById('user-streak');
        if(el) el.textContent = `Racha: ${streak} ${streak===1?'día':'días'}`;
    }

    // Animaciones de entrada estilo style1
    const header = document.querySelector('.header');
    if (header) header.classList.add('animated-fadeInScale');
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) profileCard.classList.add('animated-fadeInUp');
    const alumnoSection = document.getElementById('alumno-section');
    const profesorSection = document.getElementById('profesor-section');

    // Smooth scroll para links de navegación a secciones (si existieran)
    document.querySelectorAll('a.nav-menu-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e){
            const id = this.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (target) { e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
        });
    });

    // Obtener usuario y emoji reales
    const username = localStorage.getItem('wikilabs_user') || "Usuario";
    const email = localStorage.getItem('wikilabs_email') || "";
    const emoji = localStorage.getItem('wikilabs_emoji') || "🦉";
    const tipo = localStorage.getItem('wikilabs_tipo') || "alumno";
    const materiaSeleccionada = localStorage.getItem('wikilabs_materia') || "";

    // Mostrar datos básicos
    document.getElementById('username').textContent = username;
    document.getElementById('profile-emoji').textContent = emoji;
    document.getElementById('user-type').textContent = tipo ? `Tipo: ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}` : '';
    if (email) {
        const emailNode = document.getElementById('user-email');
        if (emailNode) {
            emailNode.textContent = email;
        }
    }

    if (tipo === "profesor" && materiaSeleccionada) {
        const materiaMap = { matematicas: 'Matemáticas', historia: 'Historia', biologia: 'Biología' };
        document.getElementById('user-materia').textContent = `Materia: ${materiaMap[materiaSeleccionada] || ''}`;
    } else {
        document.getElementById('user-materia').textContent = "";
    }

    // Actualizar racha (uso diario de la app)
    updateStreakOnVisit();

    if (tipo === "profesor") {
        // PROFESOR
        profesorSection.style.display = "block";
        alumnoSection.style.display = "none";
        profesorSection.classList.add('animated-fadeInUp');

        // Botón para ir al curso correspondiente
        const goCursoBtn = document.getElementById('go-curso-btn');
        if (materiaSeleccionada) {
            if (materiaSeleccionada === "matematicas") {
                goCursoBtn.onclick = () => window.location.href = "math.html";
                goCursoBtn.textContent = "Ir a Matemáticas";
            } else if (materiaSeleccionada === "historia") {
                goCursoBtn.onclick = () => window.location.href = "history.html";
                goCursoBtn.textContent = "Ir a Historia";
            } else if (materiaSeleccionada === "biologia") {
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

    const contentKey = `wikilabs_contenidos_${materiaSeleccionada || "general"}`;
        const contentForm = document.getElementById('add-content-form');
        const contentList = document.getElementById('curso-contenidos');

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

        // Agregar contenido
        if (contentForm) {
            contentForm.onsubmit = function(e) {
                e.preventDefault();
                let contenidos = JSON.parse(localStorage.getItem(contentKey) || "[]");
                const titulo = document.getElementById('content-title').value.trim();
                const tipoSel = document.getElementById('content-type').value;
                const datos = document.getElementById('content-data').value.trim();
                if (!titulo || !tipoSel || !datos) return;

                contenidos.push({ titulo, tipo: tipoSel, datos });
                localStorage.setItem(contentKey, JSON.stringify(contenidos));
                contentForm.reset();
                renderContents();
            };
        }

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
        profesorSection.style.display = "none";
        alumnoSection.style.display = "block";
        alumnoSection.classList.add('animated-fadeInUp');

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

        // Mostrar racha en tarjeta por si no se actualizó aún
        const streakNow = Number(localStorage.getItem('wikilabs_streak')||'0');
        const streakEl = document.getElementById('user-streak');
        if(streakEl && !streakEl.textContent){
            streakEl.textContent = `Racha: ${streakNow} ${streakNow===1?'día':'días'}`;
        }

        // Gráfico de progreso diario: solo si hay datos reales
        const chartCanvas = document.getElementById('progressChart');
        const existingPlaceholder = document.getElementById('progress-placeholder');
        const daily = JSON.parse(localStorage.getItem('wikilabs_daily') || '[]'); // array de 7 valores [L..D]
        const labels = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        const hasDaily = Array.isArray(daily) && daily.length > 0 && daily.some(v => Number(v) > 0);

        if (!hasDaily) {
            if (chartCanvas) chartCanvas.style.display = 'none';
            if (!existingPlaceholder && chartCanvas && chartCanvas.parentElement) {
                const ph = document.createElement('div');
                ph.id = 'progress-placeholder';
                ph.className = 'chart-placeholder';
                ph.textContent = 'Aún no hay datos de progreso.';
                chartCanvas.parentElement.insertBefore(ph, chartCanvas.nextSibling);
            }
        } else {
            if (chartCanvas) chartCanvas.style.display = 'block';
            if (existingPlaceholder) existingPlaceholder.remove();

            const data = daily.slice(0, 7);
            const initChart = () => {
                const ctx = chartCanvas.getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels,
                        datasets: [{
                            label: 'Minutos de estudio',
                            data,
                            backgroundColor: data.map(() => 'rgba(47,49,146,0.25)'),
                            borderColor: data.map(() => '#2F3192'),
                            borderWidth: 2,
                            borderRadius: 14,
                            barPercentage: 0.65,
                            categoryPercentage: 0.6,
                            hoverBackgroundColor: data.map(() => 'rgba(255,97,166,0.45)')
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: { color: "#2F3192", font: { size: 13, family: "'Montserrat', Arial, sans-serif" } },
                                grid: { color: "rgba(47,49,146,0.10)", borderDash: [4, 4] }
                            },
                            x: {
                                ticks: { color: "#2F3192", font: { size: 13, family: "'Montserrat', Arial, sans-serif" } },
                                grid: { display: false }
                            }
                        },
                        animation: { duration: 700, easing: 'easeOutQuart' }
                    }
                });
            };
            if ('requestIdleCallback' in window) {
                requestIdleCallback(initChart, { timeout: 800 });
            } else {
                setTimeout(initChart, 80);
            }
        }

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