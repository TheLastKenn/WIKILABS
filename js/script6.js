document.addEventListener('DOMContentLoaded', () => {
    const statsKey = 'wikilabs_stats';
    const moduleKey = 'wikilabs_math_modules_v2';
    const dailyKey = 'wikilabs_daily';
    const gradeStateKey = 'wikilabs_math_grade_active';

    const practiceLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const gradeSummaries = {
        '10': {
            badge: 'Grado 10°',
            title: 'Consolidación algebraica y funciones',
            copy: 'Refuerza operaciones con fracciones algebraicas, interpreta restricciones y comunica resultados con tableros visuales.',
            tags: ['Álgebra', 'Funciones', 'Modelación'],
            heroMilestoneFallback: 'Comienza con el diagnóstico de fundamentos.'
        },
        '11': {
            badge: 'Grado 11°',
            title: 'Profundización trigonométrica y cálculo',
            copy: 'Integra trigonometría, cálculo y probabilidad para enfrentar simulacros Saber 11 con argumentos claros.',
            tags: ['Trigonometría', 'Cálculo', 'Probabilidad'],
            heroMilestoneFallback: 'Explora la ruta trigonométrica para iniciar la profundización.'
        }
    };

    const moduleBlueprint = [
        {
            id: 'g10-fundamentos',
            grade: '10',
            title: 'Grado 10° · Fundamentos y diagnóstico',
            focus: 'Refuerza operaciones con fracciones algebraicas, interpreta restricciones y planifica tu ruta personal.',
            outcomes: [
                'Consolidar operaciones con polinomios y fracciones algebraicas.',
                'Identificar restricciones de dominio en contextos reales.',
                'Organizar evidencias y hábitos de estudio con plantillas guiadas.'
            ],
            targetMinutes: 320,
            deepLink: 'math-grado10.html#g10-fundamentos',
            lessons: [
                { title: 'Sesión guiada: fracciones algebraicas esenciales', duration: 35, link: 'math-fundamentos.html', type: 'Video' },
                { title: 'Laboratorio: restricciones y dominio', duration: 28, link: 'math-dominio.html', type: 'Práctica' },
                { title: 'Guía de autodiagnóstico 10°', duration: 18, link: 'math-consejos.html', type: 'Guía' }
            ],
            checkpoints: [
                { title: 'Checklist de fundamentos 10°', type: 'Guía', duration: 15, link: 'math-fundamentos.html' },
                { title: 'Mini proyecto: narrativas con datos', type: 'Proyecto guiado', duration: 30, link: 'math-aplicaciones.html' }
            ],
            quiz: {
                title: 'Reto aplicado: fracciones en contexto',
                duration: 25,
                type: 'Reto aplicado',
                link: 'math-aplicaciones.html',
                description: 'Modela un caso con fracciones algebraicas y comunica tus hallazgos.'
            }
        },
        {
            id: 'g10-funciones',
            grade: '10',
            title: 'Grado 10° · Funciones y visualización',
            focus: 'Integra tablas, gráficas y expresiones para explicar variación y tendencias de datos.',
            outcomes: [
                'Analizar funciones lineales, cuadráticas y racionales desde múltiples representaciones.',
                'Comunicar hallazgos con storytelling y tableros interactivos.',
                'Relacionar funciones con situaciones del contexto colombiano.'
            ],
            targetMinutes: 340,
            deepLink: 'math-grado10.html#g10-funciones',
            lessons: [
                { title: 'Taller: storytelling con gráficas', duration: 28, link: 'math-suma-resta.html', type: 'Video' },
                { title: 'Práctica: comparador de funciones en GeoGebra', duration: 32, link: 'https://www.geogebra.org/classic', type: 'Práctica' },
                { title: 'Caso aplicado: crecimiento exponencial', duration: 30, link: 'math-aplicaciones.html', type: 'Caso de estudio' }
            ],
            checkpoints: [
                { title: 'Checklist de lectura de gráficas', type: 'Guía', duration: 18, link: 'math-grado10.html#gradeProgressChart' },
                { title: 'Laboratorio guiado: modela tu propio escenario', type: 'Laboratorio', duration: 35, link: 'math-aplicaciones.html#aplicaciones-interactivo' }
            ],
            quiz: {
                title: 'Reto de storytelling con funciones',
                duration: 24,
                type: 'Proyecto aplicado',
                link: 'math-aplicaciones.html#aplicaciones-interactivo',
                description: 'Integra narrativas y modelos en un caso con datos abiertos.'
            }
        },
        {
            id: 'g10-modelacion',
            grade: '10',
            title: 'Grado 10° · Modelación y proyectos',
            focus: 'Construye proyectos con datos reales, documenta procesos y comparte evidencia con tu comunidad educativa.',
            outcomes: [
                'Modelar fenómenos cotidianos con fracciones y proporciones.',
                'Sintetizar hallazgos en reportes visuales breves.',
                'Aplicar rúbricas y peer review para mejorar las soluciones.'
            ],
            targetMinutes: 360,
            deepLink: 'math-grado10.html#g10-modelacion',
            lessons: [
                { title: 'Guía de modelación con datos reales', duration: 28, link: 'math-aplicaciones.html', type: 'Video' },
                { title: 'Estrategias de optimización y planteamiento', duration: 34, link: 'math-consejos.html', type: 'Lectura' },
                { title: 'Simulador de seguimiento semanal', duration: 30, link: 'evaluacion.html', type: 'Simulación' }
            ],
            checkpoints: [
                { title: 'Checklist de modelación responsable', type: 'Autoanálisis', duration: 15, link: 'math-aplicaciones.html#aplicaciones-recursos' },
                { title: 'Peer review: solución comentada', type: 'Revisión colaborativa', duration: 20, link: 'math-consejos.html#consejos-interactivo' }
            ],
            quiz: {
                title: 'Reto final: dossier de modelación',
                duration: 32,
                type: 'Reto aplicado',
                link: 'math-aplicaciones.html#modelos-reales',
                description: 'Entrega tu reporte final con recomendaciones accionables.'
            }
        },
        {
            id: 'g11-trigonometria',
            grade: '11',
            title: 'Grado 11° · Trigonometría aplicada',
            focus: 'Domina identidades, transformaciones y aplicaciones de funciones trigonométricas en fenómenos reales.',
            outcomes: [
                'Relacionar el círculo unitario con fenómenos periódicos.',
                'Resolver identidades y ecuaciones trigonométricas relevantes para Saber 11.',
                'Modelar escenarios físicos y estadísticos con funciones trigonométricas.'
            ],
            targetMinutes: 360,
            deepLink: 'math-grado11.html#g11-trigonometria',
            lessons: [
                { title: 'Simulación: círculo unitario dinámico', duration: 30, link: '#grade11-trigonometria', type: 'Práctica' },
                { title: 'Identidades trigonométricas paso a paso', duration: 26, link: '#grade11-trigonometria', type: 'Guía' },
                { title: 'Aplicaciones en ondas y sonido', duration: 32, link: '#grade11-trigonometria', type: 'Caso de estudio' }
            ],
            checkpoints: [
                { title: 'Checklist trigonométrico Saber 11', type: 'Autoanálisis', duration: 18, link: '#grade11-trigonometria' },
                { title: 'Mini reto: modelar un fenómeno periódico', type: 'Proyecto guiado', duration: 28, link: '#grade11-trigonometria' }
            ],
            quiz: {
                title: 'Reto aplicado: funciones trigonométricas',
                duration: 26,
                type: 'Reto aplicado',
                link: '#grade11-trigonometria',
                description: 'Explica y documenta un fenómeno periódico usando trigonometría.'
            }
        },
        {
            id: 'g11-calculo',
            grade: '11',
            title: 'Grado 11° · Cálculo diferencial introductorio',
            focus: 'Explora límites, derivadas y optimización con herramientas interactivas y estudios de caso.',
            outcomes: [
                'Comprender el concepto de límite y continuidad.',
                'Interpretar la derivada como tasa de cambio y pendiente instantánea.',
                'Resolver problemas de optimización contextualizados.'
            ],
            targetMinutes: 380,
            deepLink: 'math-grado11.html#g11-calculo',
            lessons: [
                { title: 'Explorador GeoGebra de límites y derivadas', duration: 32, link: '#grade11-calculo', type: 'Práctica' },
                { title: 'Video: derivadas en contextos cotidianos', duration: 24, link: '#grade11-calculo', type: 'Video' },
                { title: 'Caso aplicado de optimización', duration: 34, link: '#grade11-calculo', type: 'Caso de estudio' }
            ],
            checkpoints: [
                { title: 'Guía de problemas de derivadas', type: 'Guía', duration: 20, link: '#grade11-calculo' },
                { title: 'Desafío: tasa de cambio vs. velocidad promedio', type: 'Laboratorio', duration: 28, link: '#grade11-calculo' }
            ],
            quiz: {
                title: 'Reto aplicado: cálculo en acción',
                duration: 30,
                type: 'Reto aplicado',
                link: '#grade11-calculo',
                description: 'Presenta un informe sobre optimización y tasas de cambio.'
            }
        },
        {
            id: 'g11-probabilidad',
            grade: '11',
            title: 'Grado 11° · Probabilidad, datos y simulacros',
            focus: 'Analiza distribuciones, simulaciones y preguntas tipo Saber 11 con retroalimentación inmediata.',
            outcomes: [
                'Aplicar principios de conteo y probabilidad condicional.',
                'Interpretar distribuciones y métricas estadísticas en contextos reales.',
                'Preparar simulacros cronometrados con retroacción guiada.'
            ],
            targetMinutes: 360,
            deepLink: 'math-grado11.html#g11-probabilidad',
            lessons: [
                { title: 'Simulador de probabilidad y datos', duration: 30, link: '#grade11-probabilidad', type: 'Práctica' },
                { title: 'Banco de situaciones aleatorias contextualizadas', duration: 28, link: '#grade11-probabilidad', type: 'Guía' },
                { title: 'Simulacro Saber 11 cronometrado', duration: 36, link: '#grade11-probabilidad', type: 'Simulación' }
            ],
            checkpoints: [
                { title: 'Checklist de análisis de datos', type: 'Guía', duration: 18, link: '#grade11-probabilidad' },
                { title: 'Peer review: interpretación de resultados', type: 'Revisión colaborativa', duration: 22, link: '#grade11-modelacion' }
            ],
            quiz: {
                title: 'Reto final: simulacro Saber 11',
                duration: 36,
                type: 'Simulación guiada',
                link: '#grade11-modelacion',
                description: 'Completa un simulacro cronometrado y documenta tus aprendizajes.'
            }
        }
    ];

    let practiceChart;
    let modules = [];
    let totalMathMinutes = 0;
    let activeGrade = localStorage.getItem(gradeStateKey) === '11' ? '11' : '10';

    try {
        const params = new URLSearchParams(window.location.search);
        const gradeParam = params.get('grade');
        if (gradeParam === '10' || gradeParam === '11') {
            activeGrade = gradeParam;
        }
    } catch (error) {
        /* noop: mantener grado almacenado si la URL no es válida */
    }

    initRevealAnimations();
    updateStreaks();

    const stats = readStats();
    totalMathMinutes = Number(stats.math) || 0;
    modules = computeModules(totalMathMinutes);

    renderPracticeChart();
    setActiveGrade(activeGrade);
    attachGradeListeners();

    const startBtn = document.getElementById('start-module-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => setActiveGrade('10', { scrollTarget: '#ruta-aprendizaje' }));
    }

    const startGrade11Btn = document.getElementById('start-grade11-btn');
    if (startGrade11Btn) {
        startGrade11Btn.addEventListener('click', () => setActiveGrade('11', { scrollTarget: '#ruta-aprendizaje' }));
    }

    const syllabusBtn = document.getElementById('view-syllabus-btn');
    if (syllabusBtn) {
        syllabusBtn.addEventListener('click', () => {
            window.location.hash = 'grade-panorama';
        });
    }

    const exportBtn = document.getElementById('export-plan-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const filtered = modules.filter((module) => module.grade === activeGrade);
            exportPlan(filtered, activeGrade);
        });
    }

    window.addEventListener('beforeunload', () => {
        if (!window.__wikilabsTimerStart) return;
        const elapsedMinutes = Math.max(0, Math.round((Date.now() - window.__wikilabsTimerStart) / 60000));
        if (elapsedMinutes <= 0) return;

        const updatedStats = readStats();
        updatedStats.math = (Number(updatedStats.math) || 0) + elapsedMinutes;
        totalMathMinutes = Number(updatedStats.math);
        modules = computeModules(totalMathMinutes);
        localStorage.setItem(statsKey, JSON.stringify(updatedStats));
        updateDaily(elapsedMinutes);
    });

    const startTracking = () => {
        if (!window.__wikilabsTimerStart) {
            window.__wikilabsTimerStart = Date.now();
        }
    };

    window.addEventListener('pointerdown', startTracking, { once: true });
    window.addEventListener('keydown', startTracking, { once: true });
    window.addEventListener('scroll', startTracking, { once: true, passive: true });

    function initRevealAnimations() {
        const targets = document.querySelectorAll('.reveal-on-scroll');
        if (!targets.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

        targets.forEach((element) => observer.observe(element));
    }

    function toYMD(date) {
        const pad = (value) => String(value).padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    }

    function daysBetween(start, end) {
        if (!start || !end) return NaN;
        const d1 = new Date(`${start}T00:00:00`);
        const d2 = new Date(`${end}T00:00:00`);
        return Math.round((d2 - d1) / 86400000);
    }

    function ensureDailyArray() {
        let stored;
        try {
            stored = JSON.parse(localStorage.getItem(dailyKey) || '[]');
        } catch (error) {
            stored = [];
        }
        if (!Array.isArray(stored) || stored.length !== 7) {
            stored = [0, 0, 0, 0, 0, 0, 0];
        }
        return stored;
    }

    function updateDaily(minutes) {
        if (!minutes || minutes <= 0) return;
        const dayIndex = (new Date().getDay() + 6) % 7;
        const daily = ensureDailyArray();
        daily[dayIndex] = Number(daily[dayIndex] || 0) + minutes;
        localStorage.setItem(dailyKey, JSON.stringify(daily));
    }

    function updateStreaks() {
        const today = toYMD(new Date());

        const lastGeneral = localStorage.getItem('wikilabs_last_active_date');
        let generalStreak = Number(localStorage.getItem('wikilabs_streak') || '0');
        if (!lastGeneral) {
            generalStreak = 1;
        } else {
            const diff = daysBetween(lastGeneral, today);
            if (diff === 1) {
                generalStreak = Math.max(1, generalStreak + 1);
            } else if (diff > 1) {
                generalStreak = 1;
            }
        }
        localStorage.setItem('wikilabs_last_active_date', today);
        localStorage.setItem('wikilabs_streak', String(generalStreak));

        const courseLastKey = 'wikilabs_course_last_active_date_math';
        const courseStreakKey = 'wikilabs_course_streak_math';
        const lastCourse = localStorage.getItem(courseLastKey);
        let courseStreak = Number(localStorage.getItem(courseStreakKey) || '0');
        if (!lastCourse) {
            courseStreak = 1;
        } else {
            const diff = daysBetween(lastCourse, today);
            if (diff === 1) {
                courseStreak = Math.max(1, courseStreak + 1);
            } else if (diff > 1) {
                courseStreak = 1;
            }
        }
        localStorage.setItem(courseLastKey, today);
        localStorage.setItem(courseStreakKey, String(courseStreak));
    }

    function formatTime(minutes) {
        const total = Number(minutes) || 0;
        if (total <= 0) return '0 min';
        if (total < 60) return `${total} min`;
        const hours = Math.floor(total / 60);
        const mins = total % 60;
        return mins ? `${hours}h ${mins}min` : `${hours}h`;
    }

    function readStats() {
        try {
            return JSON.parse(localStorage.getItem(statsKey) || '{}');
        } catch (error) {
            return {};
        }
    }

    function storeModuleData(data) {
        localStorage.setItem(moduleKey, JSON.stringify(data));
    }

    function computeModules(totalMinutesValue) {
        let storedModules = [];
        try {
            const stored = JSON.parse(localStorage.getItem(moduleKey) || '[]');
            if (Array.isArray(stored)) storedModules = stored;
        } catch (error) {
            storedModules = [];
        }

        let remainingMinutes = totalMinutesValue;
        const mapped = moduleBlueprint.map((blueprint) => {
            const saved = storedModules.find((item) => item?.id === blueprint.id) || {};
            const target = Number(blueprint.targetMinutes) || 0;
            const minutesForModule = target > 0 ? Math.min(remainingMinutes, target) : 0;
            const computedProgress = target > 0 ? minutesForModule / target : 0;
            const storedProgress = typeof saved.progress === 'number' ? saved.progress : null;
            const progressValue = storedProgress !== null ? Math.max(storedProgress, computedProgress) : computedProgress;
            remainingMinutes = Math.max(0, remainingMinutes - minutesForModule);

            return {
                ...blueprint,
                ...saved,
                progress: Math.min(Math.max(progressValue, 0), 1),
                lessons: Array.isArray(saved.lessons) && saved.lessons.length ? saved.lessons : blueprint.lessons,
                outcomes: Array.isArray(saved.outcomes) && saved.outcomes.length ? saved.outcomes : blueprint.outcomes,
                checkpoints: Array.isArray(saved.checkpoints) && saved.checkpoints.length ? saved.checkpoints : blueprint.checkpoints,
                quiz: { ...blueprint.quiz, ...(saved.quiz || {}) }
            };
        });

        storeModuleData(mapped);
        return mapped;
    }

    function renderProgressSummary(allModules, totalMinutesValue, grade) {
        const filtered = allModules.filter((module) => module.grade === grade);
        const donutEl = document.getElementById('math-progress-donut');
        const percentEl = document.getElementById('math-progress-percent');
        const badgeEl = document.getElementById('math-progress-badge');
        const minutesEl = document.getElementById('math-total-minutes');
        const milestoneEl = document.getElementById('math-next-milestone');
        const heroProgressEl = document.getElementById('math-progress-hero');
        const heroMinutesEl = document.getElementById('math-minutes-hero');
        const heroMilestoneEl = document.getElementById('math-hero-milestone');
        const heroTrackLabelEl = document.getElementById('hero-track-label');

        const avgProgress = filtered.length
            ? Math.round((filtered.reduce((sum, module) => sum + (Number(module.progress) || 0), 0) / filtered.length) * 100)
            : 0;

        if (donutEl) donutEl.style.setProperty('--progress', String(avgProgress));
        if (percentEl) percentEl.textContent = `${avgProgress}%`;
        if (heroProgressEl) heroProgressEl.textContent = `${avgProgress}%`;
        if (minutesEl) minutesEl.textContent = `${formatTime(totalMinutesValue)} de práctica`;
        if (heroMinutesEl) heroMinutesEl.textContent = formatTime(totalMinutesValue);
        if (heroTrackLabelEl) heroTrackLabelEl.textContent = grade === '11' ? 'Grado 11°' : 'Grado 10°';

        const totalLessons = filtered.reduce((sum, module) => sum + ((module.lessons && module.lessons.length) || 0), 0);
        const completedLessons = filtered.reduce((sum, module) => {
            const lessonCount = (module.lessons && module.lessons.length) || 0;
            const ratio = Math.min(Math.max(Number(module.progress) || 0, 0), 1);
            return sum + Math.round(lessonCount * ratio);
        }, 0);

        if (badgeEl) {
            badgeEl.textContent = totalLessons > 0
                ? `${completedLessons}/${totalLessons} lecciones completadas`
                : '0 lecciones completadas';
        }

        let milestoneText = gradeSummaries[grade]?.heroMilestoneFallback || 'Selecciona un módulo para comenzar.';
        const nextModule = filtered.find((module) => (Number(module.progress) || 0) < 1);
        if (!filtered.length) {
            milestoneText = 'No hay módulos configurados para este grado.';
        } else if (!nextModule) {
            milestoneText = '¡Ruta completada! Refuerza tus temas favoritos o repite un reto aplicado.';
        } else {
            const moduleProgress = Math.min(Math.max(Number(nextModule.progress) || 0, 0), 1);
            if (moduleProgress >= 0.72 && nextModule.quiz?.title) {
                milestoneText = `Próximo hito: realiza ${nextModule.quiz.title}.`;
            } else if (moduleProgress >= 0.35 && Array.isArray(nextModule.checkpoints) && nextModule.checkpoints.length) {
                const position = Math.min(
                    nextModule.checkpoints.length - 1,
                    Math.floor(moduleProgress * nextModule.checkpoints.length)
                );
                const checkpoint = nextModule.checkpoints[position] || nextModule.checkpoints[0];
                milestoneText = checkpoint?.title
                    ? `Próximo hito: completa ${checkpoint.title}.`
                    : 'Próximo hito: revisa el siguiente checkpoint.';
            } else {
                const firstLesson = Array.isArray(nextModule.lessons) && nextModule.lessons.length
                    ? nextModule.lessons[0]
                    : null;
                milestoneText = firstLesson?.title
                    ? `Próximo hito: inicia ${firstLesson.title}.`
                    : 'Próximo hito: comienza la siguiente sesión.';
            }
        }

        if (milestoneEl) milestoneEl.textContent = milestoneText;
        if (heroMilestoneEl) heroMilestoneEl.textContent = milestoneText;
    }

    function renderModules(allModules, grade) {
        const container = document.getElementById('module-list');
        if (!container) return;

        const filtered = allModules.filter((module) => module.grade === grade);
        if (!filtered.length) {
            container.innerHTML = '<p class="module-empty">Todavía no hay módulos configurados para este grado.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();
        filtered.forEach((module, index) => {
            const outcomes = Array.isArray(module.outcomes) ? module.outcomes : [];
            const lessons = Array.isArray(module.lessons) ? module.lessons : [];
            const checkpoints = Array.isArray(module.checkpoints) ? module.checkpoints : [];
            const progressPercent = Math.round((Number(module.progress) || 0) * 100);
            const statusLabel = progressPercent >= 100 ? 'Completado' : progressPercent >= 15 ? 'En progreso' : 'Sin iniciar';
            const statusClass = progressPercent >= 100 ? 'status-pill completed' : 'status-pill';

            const card = document.createElement('article');
            card.className = 'module-card';
            card.innerHTML = `
                <div class="module-header">
                    <h4>${module.title}</h4>
                    <div class="module-status">
                        <span>${progressPercent}%</span>
                        <span class="${statusClass}">${statusLabel}</span>
                    </div>
                </div>
                <p>${module.focus}</p>
                <div class="module-content">
                    <strong>Resultados clave</strong>
                    <ul class="module-objectives">
                        ${outcomes.map((item) => `<li>${item}</li>`).join('')}
                    </ul>
                    <strong>Sesiones sugeridas</strong>
                    <ul class="module-lessons">
                        ${lessons.map((lesson) => `<li>${lesson.type} · ${lesson.title} (${lesson.duration} min)</li>`).join('')}
                    </ul>
                    <strong>Checkpoints</strong>
                    <ul class="module-checkpoints">
                        ${checkpoints.map((checkpoint) => `<li>${checkpoint.type} · ${checkpoint.title}</li>`).join('')}
                    </ul>
                </div>
                <div class="module-footer">
                    <a class="cta" href="${module.deepLink}" target="_self" rel="noopener">Ir al módulo ${index + 1}</a>
                    ${module.quiz?.link ? `<a class="ghost" href="${module.quiz.link}" target="_self" rel="noopener">Reto aplicado</a>` : ''}
                </div>
            `;
            fragment.appendChild(card);
        });

        container.innerHTML = '';
        container.appendChild(fragment);
    }

    function renderPracticeChart() {
        const canvas = document.getElementById('mathProgressChart');
        const placeholder = document.getElementById('math-progress-placeholder');
        if (!canvas) return;

        const daily = ensureDailyArray();
        const hasData = daily.some((value) => Number(value) > 0);

        if (!hasData) {
            if (practiceChart) {
                practiceChart.destroy();
                practiceChart = undefined;
            }
            canvas.setAttribute('hidden', '');
            if (placeholder) placeholder.removeAttribute('hidden');
            return;
        }

        canvas.removeAttribute('hidden');
        if (placeholder) placeholder.setAttribute('hidden', '');

        const context = canvas.getContext('2d');
        if (practiceChart) {
            practiceChart.destroy();
        }

        practiceChart = new Chart(context, {
            type: 'line',
            data: {
                labels: practiceLabels,
                datasets: [{
                    label: 'Minutos de práctica',
                    data: daily,
                    borderColor: 'rgba(47,49,146,0.8)',
                    backgroundColor: 'rgba(47,49,146,0.15)',
                    tension: 0.35,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: 'rgba(255,97,166,0.9)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: 'rgba(47,49,146,0.8)' },
                        grid: { color: 'rgba(47,49,146,0.1)' }
                    },
                    x: {
                        ticks: { color: 'rgba(47,49,146,0.8)' },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    function exportPlan(modulesForGrade, grade) {
        if (!modulesForGrade.length) return;
        const gradeLabel = grade === '11' ? '11°' : '10°';
        const lines = [`Plan semanal - Grado ${gradeLabel}`, ''];

        modulesForGrade.forEach((module, index) => {
            const outcomes = Array.isArray(module.outcomes) ? module.outcomes : [];
            const lessons = Array.isArray(module.lessons) ? module.lessons : [];
            const checkpoints = Array.isArray(module.checkpoints) ? module.checkpoints : [];
            lines.push(
                `Módulo ${index + 1}: ${module.title}\n${module.focus}\nObjetivos:\n${outcomes.map((outcome) => `  - ${outcome}`).join('\n')}\nSesiones recomendadas:\n${lessons.map((lesson) => `  - ${lesson.type}: ${lesson.title} (${lesson.duration} min)`).join('\n')}\nCheckpoints:\n${checkpoints.map((checkpoint) => `  - ${checkpoint.type}: ${checkpoint.title}`).join('\n')}\nReto clave: ${module.quiz?.title || 'N/A'} (${module.quiz?.duration || 0} min)`
            );
            lines.push('');
        });

        const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `plan-grado-${gradeLabel.replace('°', '')}.txt`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
    }

    function updateCourseSummary(grade) {
        const summary = gradeSummaries[grade] || gradeSummaries['10'];
        const badge = document.getElementById('grade-active-badge');
        const title = document.getElementById('course-summary-title');
        const copy = document.getElementById('course-summary-copy');
        const tagsContainer = document.getElementById('course-tags');

        if (badge) badge.textContent = summary.badge;
        if (title) title.textContent = summary.title;
        if (copy) copy.textContent = summary.copy;
        if (tagsContainer) {
            const tags = Array.isArray(summary.tags) ? summary.tags : [];
            tagsContainer.innerHTML = tags.map((tag) => `<span class="meta-tag">${tag}</span>`).join('');
        }
    }

    function syncGradeBlocks(grade) {
        document.querySelectorAll('[data-grade-block]').forEach((block) => {
            const isActive = block.dataset.gradeBlock === grade;
            block.classList.toggle('is-hidden', !isActive);
            block.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        });

        document.querySelectorAll('.grade-card').forEach((card) => {
            const isActive = card.dataset.grade === grade;
            card.classList.toggle('is-active', isActive);
        });
    }

    function setActiveGrade(grade, options = {}) {
        if (grade !== '10' && grade !== '11') return;
        activeGrade = grade;
        localStorage.setItem(gradeStateKey, grade);

        document.querySelectorAll('.grade-toggle').forEach((button) => {
            const isActive = button.dataset.grade === grade;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        document.querySelectorAll('.grade-trigger').forEach((button) => {
            const isActive = button.dataset.grade === grade;
            button.classList.toggle('is-active', isActive);
        });

        updateCourseSummary(grade);
        renderModules(modules, grade);
        renderProgressSummary(modules, totalMathMinutes, grade);
        syncGradeBlocks(grade);

        if (options.scrollTarget) {
            const target = document.querySelector(options.scrollTarget);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function attachGradeListeners() {
        document.querySelectorAll('.grade-toggle').forEach((button) => {
            button.addEventListener('click', () => setActiveGrade(button.dataset.grade === '11' ? '11' : '10'));
        });

        document.querySelectorAll('.grade-trigger').forEach((button) => {
            button.addEventListener('click', () => {
                const grade = button.dataset.grade === '11' ? '11' : '10';
                const scrollTarget = button.dataset.scrollTarget;
                setActiveGrade(grade, { scrollTarget });
            });
        });
    }
});
