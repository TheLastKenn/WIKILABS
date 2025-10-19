document.addEventListener('DOMContentLoaded', () => {
    const grade = document.body.dataset.grade === '11' ? '11' : '10';
    const statsKey = 'wikilabs_stats';
    const moduleKey = 'wikilabs_math_modules_v2';

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
            deepLink: 'math-grado11-trigonometria.html',
            lessons: [
                { title: 'Simulación: círculo unitario dinámico', duration: 30, link: 'math-grado11-trigonometria.html#laboratorios', type: 'Práctica' },
                { title: 'Identidades trigonométricas paso a paso', duration: 26, link: 'math-grado11-trigonometria.html#mapa', type: 'Guía' },
                { title: 'Aplicaciones en ondas y sonido', duration: 32, link: 'math-grado11-trigonometria.html#mapa', type: 'Caso de estudio' }
            ],
            checkpoints: [
                { title: 'Checklist trigonométrico Saber 11', type: 'Autoanálisis', duration: 18, link: 'math-grado11-trigonometria.html#evaluaciones' },
                { title: 'Mini reto: modelar un fenómeno periódico', type: 'Proyecto guiado', duration: 28, link: 'math-grado11-trigonometria.html#evaluaciones' }
            ],
            quiz: {
                title: 'Reto aplicado: funciones trigonométricas',
                duration: 26,
                type: 'Reto aplicado',
                link: 'math-grado11-trigonometria.html#evaluaciones',
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
            deepLink: 'math-grado11-calculo.html',
            lessons: [
                { title: 'Explorador GeoGebra de límites y derivadas', duration: 32, link: 'math-grado11-calculo.html#recursos', type: 'Práctica' },
                { title: 'Video: derivadas en contextos cotidianos', duration: 24, link: 'math-grado11-calculo.html#ruta', type: 'Video' },
                { title: 'Caso aplicado de optimización', duration: 34, link: 'math-grado11-calculo.html#ruta', type: 'Caso de estudio' }
            ],
            checkpoints: [
                { title: 'Guía de problemas de derivadas', type: 'Guía', duration: 20, link: 'math-grado11-calculo.html#evaluaciones' },
                { title: 'Desafío: tasa de cambio vs. velocidad promedio', type: 'Laboratorio', duration: 28, link: 'math-grado11-calculo.html#evaluaciones' }
            ],
            quiz: {
                title: 'Reto aplicado: cálculo en acción',
                duration: 30,
                type: 'Reto aplicado',
                link: 'math-grado11-calculo.html#evaluaciones',
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
            deepLink: 'math-grado11-probabilidad.html',
            lessons: [
                { title: 'Simulador de probabilidad y datos', duration: 30, link: 'math-grado11-probabilidad.html#recursos', type: 'Práctica' },
                { title: 'Banco de situaciones aleatorias contextualizadas', duration: 28, link: 'math-grado11-probabilidad.html#trayecto', type: 'Guía' },
                { title: 'Simulacro Saber 11 cronometrado', duration: 36, link: 'math-grado11-probabilidad.html#evaluaciones', type: 'Simulación' }
            ],
            checkpoints: [
                { title: 'Checklist de análisis de datos', type: 'Guía', duration: 18, link: 'math-grado11-probabilidad.html#evaluaciones' },
                { title: 'Peer review: interpretación de resultados', type: 'Revisión colaborativa', duration: 22, link: 'math-grado11-probabilidad.html#evaluaciones' }
            ],
            quiz: {
                title: 'Reto final: simulacro Saber 11',
                duration: 36,
                type: 'Simulación guiada',
                link: 'math-grado11-probabilidad.html#evaluaciones',
                description: 'Completa un simulacro cronometrado y documenta tus aprendizajes.'
            }
        }
    ];

    const capstoneByGrade = {
        '10': {
            title: 'Capstone: tablero de decisiones matemáticas',
            description: 'Construye un dashboard con métricas clave y recomendaciones para presentar en tu proyecto final.',
            duration: 45,
            type: 'Capstone',
            link: 'evaluacion.html#capstone-mate'
        },
        '11': {
            title: 'Capstone: investigación numérica Saber 11',
            description: 'Integra trigonometría, cálculo y probabilidad en un informe comparativo con presentación oral.',
            duration: 50,
            type: 'Capstone',
            link: 'evaluacion.html#reto-modelacion'
        }
    };

    const stats = readStats();
    const totalMinutes = Number(stats.math) || 0;
    const modules = computeModules(totalMinutes);
    const gradeModules = modules.filter((module) => module.grade === grade);

    renderHero(gradeModules, grade, stats);
    renderModules(gradeModules);
    renderAssessments(gradeModules, capstoneByGrade[grade]);
    renderChart(gradeModules);
    setupModuleButtons();
    initSmoothScroll();
    initReveal();
    document.documentElement.classList.remove('no-js');

    function readStats() {
        try {
            return JSON.parse(localStorage.getItem(statsKey) || '{}');
        } catch (error) {
            return {};
        }
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
                progress: clamp(progressValue),
                lessons: Array.isArray(saved.lessons) && saved.lessons.length ? saved.lessons : blueprint.lessons,
                outcomes: Array.isArray(saved.outcomes) && saved.outcomes.length ? saved.outcomes : blueprint.outcomes,
                checkpoints: Array.isArray(saved.checkpoints) && saved.checkpoints.length ? saved.checkpoints : blueprint.checkpoints,
                quiz: { ...blueprint.quiz, ...(saved.quiz || {}) }
            };
        });

        localStorage.setItem(moduleKey, JSON.stringify(mapped));
        return mapped;
    }

    function clamp(value) {
        return Math.min(Math.max(Number(value) || 0, 0), 1);
    }

    function formatTime(minutes) {
        const total = Number(minutes) || 0;
        if (total <= 0) return '0 min';
        if (total < 60) return `${total} min`;
        const hours = Math.floor(total / 60);
        const mins = total % 60;
        return mins ? `${hours}h ${mins}min` : `${hours}h`;
    }

    function moduleState(percent) {
        if (percent >= 100) return { label: 'Completado', className: 'is-complete' };
        if (percent >= 40) return { label: 'En progreso', className: 'is-progress' };
        return { label: 'Disponible', className: 'is-pending' };
    }

    function renderHero(gradeModules, currentGrade, rawStats) {
        const heroProgress = document.getElementById('hero-progress');
        const heroMinutes = document.getElementById('hero-minutes');
        const heroMilestone = document.getElementById('hero-milestone');
        const heroStreak = document.getElementById('hero-streak');

        const average = gradeModules.length
            ? Math.round(
                (gradeModules.reduce((sum, module) => sum + clamp(module.progress), 0) / gradeModules.length) * 100
            )
            : 0;

        const minutes = gradeModules.reduce((sum, module) => {
            const target = Number(module.targetMinutes) || 0;
            return sum + Math.round(clamp(module.progress) * target);
        }, 0);

        const streak = Number(localStorage.getItem('wikilabs_course_streak_math') || '0');

        if (heroProgress) heroProgress.textContent = `${average}%`;
        if (heroMinutes) heroMinutes.textContent = formatTime(minutes);
        if (heroStreak) heroStreak.textContent = String(streak);

        if (!heroMilestone) return;

        const nextModule = gradeModules.find((module) => clamp(module.progress) < 1);
        if (!nextModule) {
            heroMilestone.textContent = '¡Excelente! Completaste todos los módulos planificados del grado.';
            return;
        }

        const progress = clamp(nextModule.progress);
        if (progress >= 0.75 && nextModule.quiz?.title) {
            heroMilestone.textContent = `Prepárate para ${nextModule.quiz.title}.`;
            return;
        }

        const checkpoints = Array.isArray(nextModule.checkpoints) ? nextModule.checkpoints : [];
        if (progress >= 0.4 && checkpoints.length) {
            const checkpoint = checkpoints[Math.min(checkpoints.length - 1, Math.floor(progress * checkpoints.length))] || checkpoints[0];
            heroMilestone.textContent = checkpoint?.title
                ? `Completa ${checkpoint.title} para consolidar el módulo.`
                : `Completa el siguiente checkpoint.`;
            return;
        }

        const lessons = Array.isArray(nextModule.lessons) ? nextModule.lessons : [];
        if (lessons.length) {
            const lesson = lessons[Math.min(lessons.length - 1, Math.floor(progress * lessons.length))] || lessons[0];
            heroMilestone.textContent = lesson?.title
                ? `Trabaja en "${lesson.title}" para avanzar.`
                : `Profundiza en las sesiones sugeridas.`;
            return;
        }

        heroMilestone.textContent = `Explora ${nextModule.title} para mantener tu ritmo.`;
    }

    function renderModules(gradeModules) {
        const track = document.getElementById('module-track');
        if (!track) return;

        track.innerHTML = '';

        const defaultModuleLink = grade === '11' ? 'math-grado11.html' : 'math-grado10.html';

        gradeModules.forEach((module, index) => {
            const percent = Math.round(clamp(module.progress) * 100);
            const state = moduleState(percent);
            const card = document.createElement('article');
            card.className = 'module-card reveal-on-scroll';
            card.dataset.stage = String(index + 1).padStart(2, '0');
            card.id = module.id;

            const outcomesList = (module.outcomes || [])
                .map((outcome) => `<li>${outcome}</li>`)
                .join('');

            const lessonsList = (module.lessons || [])
                .map((lesson) => {
                    const parts = [];
                    if (lesson.type) parts.push(`<strong>${lesson.type}</strong>`);
                    if (lesson.duration) parts.push(`${lesson.duration} min`);
                    return `<li>${lesson.title || 'Lección'} · ${parts.join(' · ')}</li>`;
                })
                .join('');

            const quizLink = module.quiz?.link || 'evaluacion.html';
            const quizTitle = module.quiz?.title || 'Evaluación del módulo';

            card.innerHTML = `
                <div class="module-head">
                    <h3>${module.title}</h3>
                    <span class="module-status ${state.className}">${state.label}</span>
                </div>
                <p class="module-summary">${module.focus}</p>
                ${outcomesList ? `<ul class="module-meta">${outcomesList}</ul>` : ''}
                <div class="module-progress"><span style="width:${percent}%"></span></div>
                ${lessonsList ? `<ul class="module-meta module-lessons">${lessonsList}</ul>` : ''}
                <div class="module-actions">
                    <button class="module-button primary" type="button" data-link="${module.deepLink || defaultModuleLink}">Ir al módulo</button>
                    <button class="module-button" type="button" data-link="${quizLink}">Prueba clave</button>
                </div>
            `;

            track.appendChild(card);
        });
    }

    function renderAssessments(gradeModules, capstone) {
        const container = document.getElementById('assessment-grid');
        if (!container) return;
        container.innerHTML = '';

        const cards = [];

        gradeModules.forEach((module) => {
            const percent = Math.round(clamp(module.progress) * 100);
            const state = moduleState(percent);
            const quiz = module.quiz || {};
            const checkpoints = Array.isArray(module.checkpoints) ? module.checkpoints : [];

            const checkpointList = checkpoints
                .map((checkpoint) => {
                    const parts = [];
                    if (checkpoint.type) parts.push(checkpoint.type);
                    if (checkpoint.duration) parts.push(`${checkpoint.duration} min`);
                    return `<li>${checkpoint.title || 'Checkpoint'}${parts.length ? ` · ${parts.join(' · ')}` : ''}</li>`;
                })
                .join('');

            cards.push(`
                <article class="assessment-card reveal-on-scroll">
                    <span class="assessment-module">${module.title}</span>
                    <strong>${quiz.title || 'Evaluación del módulo'}</strong>
                    <div class="assessment-meta">
                        ${quiz.type ? `<span>${quiz.type}</span>` : ''}
                        ${quiz.duration ? `<span>${quiz.duration} min</span>` : ''}
                        <span class="assessment-progress">${state.label}</span>
                    </div>
                    <p>${quiz.description || 'Completa la evaluación para consolidar tus aprendizajes.'}</p>
                    ${checkpointList ? `<ul>${checkpointList}</ul>` : ''}
                    <a href="${quiz.link || 'evaluacion.html'}">Resolver ahora</a>
                </article>
            `);
        });

        if (capstone) {
            cards.push(`
                <article class="assessment-card capstone reveal-on-scroll">
                    <span class="assessment-module">Ruta completa</span>
                    <strong>${capstone.title}</strong>
                    <div class="assessment-meta">
                        <span>${capstone.type}</span>
                        <span>${capstone.duration} min</span>
                    </div>
                    <p>${capstone.description}</p>
                    <a href="${capstone.link || 'evaluacion.html'}">Presentar capstone</a>
                </article>
            `);
        }

        container.innerHTML = cards.join('');
    }

    function renderChart(gradeModules) {
        const canvas = document.getElementById('gradeProgressChart');
        if (!canvas || typeof Chart === 'undefined') return;

        const average = gradeModules.length
            ? Math.round(
                (gradeModules.reduce((sum, module) => sum + clamp(module.progress), 0) / gradeModules.length) * 100
            )
            : 0;

        const remaining = Math.max(0, 100 - average);
        const styles = getComputedStyle(document.body);
        const accent = styles.getPropertyValue('--grade-secondary').trim() || '#ffd966';
        const accent2 = styles.getPropertyValue('--grade-accent').trim() || '#36e2f6';
        const base = styles.getPropertyValue('--grade-primary').trim() || '#2f3192';

        new Chart(canvas.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Avance', 'Pendiente'],
                datasets: [
                    {
                        data: [average, remaining],
                        backgroundColor: [accent, 'rgba(255, 255, 255, 0.18)'],
                        borderColor: [accent2, 'rgba(255, 255, 255, 0.12)'],
                        borderWidth: [3, 1],
                        hoverOffset: 6,
                        cutout: '68%'
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.label}: ${context.parsed}%`
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    function setupModuleButtons() {
        document.querySelectorAll('.module-button').forEach((button) => {
            button.addEventListener('click', () => {
                const link = button.getAttribute('data-link');
                if (link) {
                    window.location.href = link;
                }
            });
        });
    }

    function initSmoothScroll() {
        document.querySelectorAll('[data-scroll="true"], .panel-cta, .hero-pill').forEach((element) => {
            element.addEventListener('click', (event) => {
                const target = element.dataset.scroll || element.getAttribute('href');
                if (!target || !target.startsWith('#')) return;

                const section = document.querySelector(target);
                if (section) {
                    event.preventDefault();
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    function initReveal() {
        const targets = document.querySelectorAll('.reveal-on-scroll');
        if (!targets.length) return;

        if (!('IntersectionObserver' in window)) {
            targets.forEach((element) => element.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

        const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;

        targets.forEach((element) => {
            const rect = element.getBoundingClientRect();
            if (rect.top <= viewportHeight * 0.9 && rect.bottom >= 0) {
                element.classList.add('is-visible');
            }
            observer.observe(element);
        });
    }
});
