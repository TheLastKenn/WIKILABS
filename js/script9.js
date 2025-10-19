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
    const studentDashboard = document.getElementById('student-dashboard');
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
    const emoji = localStorage.getItem('wikilabs_emoji') || "🦉";
    const tipo = localStorage.getItem('wikilabs_tipo') || "alumno";
    const usuarios = JSON.parse(localStorage.getItem('wikilabs_usuarios') || '[]');
    const usuario = usuarios.find(u => u.name === username);

    // Mostrar datos básicos
    document.getElementById('username').textContent = username;
    document.getElementById('profile-emoji').textContent = emoji;
    document.getElementById('user-type').textContent = tipo ? `Tipo: ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}` : '';
    if (tipo === "profesor" && usuario && usuario.materia) {
        const materiaMap = { matematicas: 'Matemáticas', historia: 'Historia', biologia: 'Biología' };
        document.getElementById('user-materia').textContent = `Materia: ${materiaMap[usuario.materia] || ''}`;
    } else {
        document.getElementById('user-materia').textContent = "";
    }

    // Actualizar racha (uso diario de la app)
    updateStreakOnVisit();

    if (tipo === "profesor") {
        // PROFESOR
        if (profesorSection) {
            profesorSection.style.display = "block";
            profesorSection.classList.add('animated-fadeInUp');
        }
        if (studentDashboard) {
            studentDashboard.hidden = true;
        }

        // Botón para ir al curso correspondiente
        const goCursoBtn = document.getElementById('go-curso-btn');
        if (usuario && usuario.materia) {
            if (usuario.materia === "matematicas") {
                goCursoBtn.onclick = () => window.location.href = "math-portal.html";
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

        const contentKey = `wikilabs_contenidos_${usuario?.materia || "general"}`;
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
        if (profesorSection) {
            profesorSection.style.display = "none";
        }
        if (studentDashboard) {
            studentDashboard.hidden = false;
            studentDashboard.classList.add('animated-fadeInUp');
        }

        const stats = JSON.parse(localStorage.getItem('wikilabs_stats') || '{}');
        const totalMathMinutes = Number(stats.math) || 0;

        const openCourseBtn = document.getElementById('open-math-course');
        if (openCourseBtn) {
            openCourseBtn.addEventListener('click', () => {
                window.location.href = 'math-portal.html';
            });
        }

        const syllabusBtn = document.getElementById('download-syllabus');
        if (syllabusBtn) {
            syllabusBtn.addEventListener('click', () => {
                window.location.href = 'math-grado10.html#temas';
            });
        }

        function formatTime(mins) {
            const minutes = Number(mins) || 0;
            if (minutes <= 0) return '0 min';
            if (minutes < 60) return `${minutes} min`;
            const h = Math.floor(minutes / 60);
            const m = minutes % 60;
            return m > 0 ? `${h}h ${m}min` : `${h}h`;
        }

        const mathTimeEl = document.getElementById('math-total-minutes');
        if (mathTimeEl) {
            mathTimeEl.textContent = `${formatTime(totalMathMinutes)} de práctica`;
        }

        const moduleBlueprint = [
            {
                id: 'mate-diagnostico',
                title: 'Semana 1 · Fundamentos y diagnóstico',
                focus: 'Reestablece los conceptos base y obtén un plan personal con retroalimentación inmediata.',
                outcomes: [
                    'Consolidar operaciones con fracciones, potencias y expresiones algebraicas.',
                    'Aplicar razonamiento lógico para estructurar soluciones paso a paso.',
                    'Interpretar tu diagnóstico inicial para ajustar el ritmo de la ruta.'
                ],
                targetMinutes: 180,
                deepLink: 'math-grado10.html#g10-fundamentos',
                lessons: [
                    { title: 'Sesión guiada: números y expresiones algebraicas', duration: 30, link: 'math-fundamentos.html', type: 'Video' },
                    { title: 'Laboratorio de fracciones interactivo', duration: 25, link: 'math-fracciones-complejas.html#complejas-interactivo', type: 'Práctica' },
                    { title: 'Refuerzo en ecuaciones lineales', duration: 20, link: 'math-fundamentos.html#interactivo-fundamentos', type: 'Lectura' }
                ],
                checkpoints: [
                    { title: 'Checkpoint: test adaptativo de álgebra', type: 'Quiz', duration: 15, link: 'evaluacion.html#checkpoint-algebra', description: 'Preguntas graduales para medir tu punto de partida.' },
                    { title: 'Mini proyecto: interpretar tendencias de datos', type: 'Proyecto guiado', duration: 25, link: 'math-aplicaciones.html#modelos-reales', description: 'Aplica fracciones y porcentajes con un conjunto de datos reales.' }
                ],
                quiz: {
                    title: 'Diagnóstico de fundamentos matemáticos',
                    duration: 12,
                    type: 'Evaluación final',
                    link: 'evaluacion.html#diagnostico-mate',
                    description: 'Calibra el ritmo recomendado y activa el módulo de funciones.'
                }
            },
            {
                id: 'mate-funciones',
                title: 'Semana 2 · Funciones y visualización',
                focus: 'Domina la narrativa de datos con funciones lineales, cuadráticas y exponenciales.',
                outcomes: [
                    'Interpretar gráficas y extraer historias con soporte cuantitativo.',
                    'Seleccionar el modelo correcto para explicar fenómenos cotidianos.',
                    'Construir visualizaciones interactivas para comunicar resultados.'
                ],
                targetMinutes: 210,
                deepLink: 'math-grado10.html#g10-funciones',
                lessons: [
                    { title: 'Taller: storytelling con gráficas', duration: 28, link: 'math-suma-resta.html#storytelling', type: 'Video' },
                    { title: 'Práctica: sistemas de ecuaciones con GeoGebra', duration: 32, link: 'https://www.geogebra.org/classic', type: 'Práctica' },
                    { title: 'Caso aplicado: crecimiento exponencial', duration: 30, link: 'math-aplicaciones.html#modelos-reales', type: 'Caso de estudio' }
                ],
                checkpoints: [
                    { title: 'Checkpoint: quiz de interpretación de gráficas', type: 'Quiz', duration: 18, link: 'evaluacion.html#quiz-funciones', description: 'Verifica tu comprensión antes de pasar a modelos avanzados.' },
                    { title: 'Laboratorio guiado: modela tu propio escenario', type: 'Laboratorio', duration: 35, link: 'math-aplicaciones.html#aplicaciones-interactivo', description: 'Construye y comparte una visualización interactiva.' }
                ],
                quiz: {
                    title: 'Sprint challenge de funciones',
                    duration: 20,
                    type: 'Proyecto aplicado',
                    link: 'evaluacion.html#reto-funciones',
                    description: 'Integra narrativas y modelos en un caso estilo Coursera.'
                }
            },
            {
                id: 'mate-modelacion',
                title: 'Semana 3 · Modelación y optimización',
                focus: 'Integra estrategias de modelación y prepara tu evidencia final.',
                outcomes: [
                    'Modelar problemas de optimización usando ecuaciones y desigualdades.',
                    'Analizar sensibilidad de modelos y justificar decisiones.',
                    'Prepararte para evaluaciones tipo ingreso universitario con simulaciones guiadas.'
                ],
                targetMinutes: 220,
                deepLink: 'math-grado10.html#g10-modelacion',
                lessons: [
                    { title: 'Modelos matemáticos con datos reales', duration: 28, link: 'math-aplicaciones.html#modelos-reales', type: 'Video' },
                    { title: 'Estrategias de optimización y planteamiento', duration: 34, link: 'math-consejos.html#consejos-plan', type: 'Lectura' },
                    { title: 'Simulador de examen tipo admisión', duration: 40, link: 'evaluacion.html', type: 'Simulación' }
                ],
                checkpoints: [
                    { title: 'Checkpoint: rúbrica de modelación', type: 'Autoevaluación', duration: 15, link: 'evaluacion.html#rubrica-modelacion', description: 'Evalúa tu razonamiento antes del reto final.' },
                    { title: 'Peer review: solución comentada', type: 'Revisión colaborativa', duration: 20, link: 'math-consejos.html#consejos-interactivo', description: 'Comparte tu modelo y recibe comentarios guiados.' }
                ],
                quiz: {
                    title: 'Reto final de modelación matemática',
                    duration: 30,
                    type: 'Evaluación final',
                    link: 'evaluacion.html#reto-modelacion',
                    description: 'Entrega tu reporte final con recomendaciones accionables.'
                }
            }
        ];

        const moduleKey = 'wikilabs_math_modules_v1';
        let storedModules = [];
        try {
            const saved = JSON.parse(localStorage.getItem(moduleKey) || '[]');
            if (Array.isArray(saved)) {
                storedModules = saved;
            }
        } catch (error) {
            console.warn('No se pudo leer el progreso de módulos:', error);
        }

        let remainingMinutes = totalMathMinutes;
        const moduleData = moduleBlueprint.map(blueprint => {
            const saved = storedModules.find(item => item.id === blueprint.id) || {};
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
        localStorage.setItem(moduleKey, JSON.stringify(moduleData));

        const capstone = {
            title: 'Capstone: tablero de decisiones matemáticas',
            description: 'Construye un dashboard con métricas clave y recomendaciones para presentar ante un comité académico.',
            duration: 45,
            type: 'Capstone',
            link: 'evaluacion.html#capstone-mate'
        };

        const donutEl = document.getElementById('math-progress-donut');
        const percentEl = document.getElementById('math-progress-percent');
        const badgeEl = document.getElementById('math-progress-badge');
        const milestoneEl = document.getElementById('math-next-milestone');

        const avgProgress = moduleData.length
            ? Math.round(
                (moduleData.reduce((sum, module) => sum + (Number(module.progress) || 0), 0) / moduleData.length) * 100
            )
            : 0;

        if (donutEl) donutEl.style.setProperty('--progress', String(avgProgress));
        if (percentEl) percentEl.textContent = `${avgProgress}%`;

        const totalLessons = moduleData.reduce((sum, module) => sum + ((module.lessons && module.lessons.length) || 0), 0);
        const completedLessons = moduleData.reduce((sum, module) => {
            const lessonCount = (module.lessons && module.lessons.length) || 0;
            const ratio = Math.min(Math.max(Number(module.progress) || 0, 0), 1);
            return sum + Math.round(lessonCount * ratio);
        }, 0);

        if (badgeEl) {
            badgeEl.textContent = totalLessons > 0
                ? `${completedLessons}/${totalLessons} lecciones completadas`
                : '0 lecciones completadas';
        }

        if (milestoneEl) {
            const nextModule = moduleData.find(mod => (Number(mod.progress) || 0) < 1);
            if (nextModule) {
                const moduleProgress = Math.min(Math.max(Number(nextModule.progress) || 0, 0), 1);
                const lessons = nextModule.lessons || [];
                if (moduleProgress >= 0.72 && nextModule.quiz?.title) {
                    milestoneEl.textContent = `Próximo hito: realiza ${nextModule.quiz.title}.`;
                } else if (moduleProgress >= 0.35 && Array.isArray(nextModule.checkpoints) && nextModule.checkpoints.length) {
                    const checkpointIndex = Math.min(nextModule.checkpoints.length - 1, Math.floor(moduleProgress * nextModule.checkpoints.length));
                    const checkpoint = nextModule.checkpoints[checkpointIndex] || nextModule.checkpoints[0];
                    milestoneEl.textContent = checkpoint?.title
                        ? `Próximo hito: completa ${checkpoint.title}.`
                        : `Próximo hito: revisa el siguiente checkpoint.`;
                } else if (lessons.length > 0) {
                    const nextIndex = Math.min(lessons.length - 1, Math.floor(moduleProgress * lessons.length));
                    const nextLesson = lessons[nextIndex] || lessons[lessons.length - 1];
                    milestoneEl.textContent = nextLesson?.title
                        ? `Próximo hito: trabaja en "${nextLesson.title}".`
                        : `Próximo hito: completa ${nextModule.title}.`;
                } else {
                    milestoneEl.textContent = `Próximo hito: completa ${nextModule.title}.`;
                }
            } else {
                milestoneEl.textContent = '¡Excelente! Has completado todos los módulos planificados.';
            }
        }

        function moduleState(percent) {
            if (percent >= 100) return { label: 'Completado', className: 'status-completed' };
            if (percent >= 50) return { label: 'En progreso', className: 'status-progress' };
            return { label: 'Disponible', className: 'status-pending' };
        }

        const moduleList = document.getElementById('module-list');
        if (moduleList) {
            moduleList.innerHTML = '';
            const defaultModuleLink = 'math-grado10.html';

            moduleData.forEach((module, index) => {
                const percent = Math.round(Math.min(Math.max(Number(module.progress) || 0, 0), 1) * 100);
                const state = moduleState(percent);
                const outcomesHtml = (module.outcomes || []).map(outcome => `
                        <li>
                            <span class="outcome-bullet"></span>
                            <span>${outcome}</span>
                        </li>
                    `).join('');
                const lessonsHtml = (module.lessons || []).map(lesson => {
                    const metaParts = [];
                    if (lesson?.type) metaParts.push(`<span class="lesson-pill">${lesson.type}</span>`);
                    if (lesson?.duration) metaParts.push(`<span class="lesson-duration">${lesson.duration} min</span>`);
                    if (lesson?.link) metaParts.push(`<a href="${lesson.link}" class="lesson-link">Abrir</a>`);
                    const metaHtml = metaParts.join('');
                    return `
                        <li>
                            <div class="lesson-title"><span class="lesson-dot"></span>${lesson?.title || 'Lección'}</div>
                            <div class="lesson-meta">${metaHtml}</div>
                        </li>
                    `;
                }).join('');
                const quiz = module.quiz || {};
                const quizMeta = [];
                if (quiz.type) quizMeta.push(`<span class="lesson-pill">${quiz.type}</span>`);
                if (quiz.duration) quizMeta.push(`<span class="lesson-duration">${quiz.duration} min</span>`);
                if (quiz.link) quizMeta.push(`<a href="${quiz.link}" class="lesson-link">Resolver</a>`);
                const quizMetaHtml = quizMeta.join('');
                const checkpointsHtml = (module.checkpoints || []).map(checkpoint => {
                    const checkpointMeta = [];
                    if (checkpoint?.type) checkpointMeta.push(`<span class="lesson-pill">${checkpoint.type}</span>`);
                    if (checkpoint?.duration) checkpointMeta.push(`<span class="lesson-duration">${checkpoint.duration} min</span>`);
                    if (checkpoint?.link) checkpointMeta.push(`<a href="${checkpoint.link}" class="lesson-link">Abrir</a>`);
                    const metaHtml = checkpointMeta.join('');
                    const description = checkpoint?.description ? `<p class="checkpoint-description">${checkpoint.description}</p>` : '';
                    return `
                        <div class="checkpoint-item">
                            <div class="checkpoint-title"><span class="lesson-dot checkpoint"></span>${checkpoint?.title || 'Checkpoint'}</div>
                            <div class="lesson-meta">${metaHtml}</div>
                            ${description}
                        </div>
                    `;
                }).join('');
                const card = document.createElement('article');
                card.className = `module-card ${state.className}`.trim();
                card.innerHTML = `
                    <div class="module-head">
                        <span class="module-index">Módulo ${index + 1}</span>
                        <h4>${module.title}</h4>
                        <span class="module-status ${state.className}">${state.label}</span>
                    </div>
                    <p class="module-focus">${module.focus}</p>
                    ${outcomesHtml ? `<ul class="module-outcomes">${outcomesHtml}</ul>` : ''}
                    <div class="module-progress-bar"><span style="width:${percent}%;"></span></div>
                    <ul class="module-lessons">
                        ${lessonsHtml}
                        <li class="module-assessment">
                            <div class="lesson-title"><span class="lesson-dot quiz"></span>${quiz.title || 'Evaluación del módulo'}</div>
                            <div class="lesson-meta">${quizMetaHtml}</div>
                        </li>
                    </ul>
                    ${checkpointsHtml ? `<div class="module-checkpoints">${checkpointsHtml}</div>` : ''}
                    <div class="module-actions">
                        <button class="module-continue" type="button" data-link="${module.deepLink || defaultModuleLink}">Continuar módulo</button>
                        <button class="module-test" type="button" data-link="${quiz.link || 'evaluacion.html'}">Ir a la prueba</button>
                    </div>
                `;
                moduleList.appendChild(card);
            });

            moduleList.querySelectorAll('.module-continue, .module-test').forEach(btn => {
                btn.addEventListener('click', () => {
                    const href = btn.getAttribute('data-link');
                    if (href) {
                        window.location.href = href;
                    }
                });
            });
        }

        const assessmentGrid = document.getElementById('assessment-grid');
        if (assessmentGrid) {
            assessmentGrid.innerHTML = '';
            const assessments = [];
            moduleData.forEach(module => {
                const percent = Math.round(Math.min(Math.max(Number(module.progress) || 0, 0), 1) * 100);
                const state = moduleState(percent);
                (module.checkpoints || []).forEach(checkpoint => {
                    assessments.push({
                        ...checkpoint,
                        moduleTitle: module.title,
                        state,
                        scope: 'checkpoint'
                    });
                });
                if (module.quiz) {
                    assessments.push({
                        ...module.quiz,
                        moduleTitle: module.title,
                        state,
                        scope: 'quiz'
                    });
                }
            });
            const capstoneState = moduleState(avgProgress);
            assessments.push({
                ...capstone,
                moduleTitle: 'Ruta completa',
                state: capstoneState,
                scope: 'capstone'
            });

            assessments.forEach(item => {
                const classes = ['assessment-card', item.state?.className];
                if (item.scope === 'capstone') classes.push('capstone');
                const card = document.createElement('article');
                card.className = classes.filter(Boolean).join(' ').trim();
                const metaParts = [];
                if (item.type) metaParts.push(`<span class="assessment-type">${item.type}</span>`);
                if (item.duration) metaParts.push(`<span class="lesson-duration">${item.duration} min</span>`);
                if (item.state?.label) metaParts.push(`<span class="assessment-progress">${item.state.label}</span>`);
                card.innerHTML = `
                    <span class="assessment-module">${item.moduleTitle}</span>
                    <strong>${item.title}</strong>
                    <div class="assessment-meta">${metaParts.join('')}</div>
                    <span>${item.description || 'Refuerza los conceptos antes de avanzar al siguiente módulo.'}</span>
                    <a href="${item.link || 'evaluacion.html'}">Resolver ahora</a>
                `;
                assessmentGrid.appendChild(card);
            });
        }

        const streakNow = Number(localStorage.getItem('wikilabs_streak') || '0');
        const streakEl = document.getElementById('user-streak');
        if (streakEl && !streakEl.textContent) {
            streakEl.textContent = `Racha: ${streakNow} ${streakNow === 1 ? 'día' : 'días'}`;
        }

        const chartCanvas = document.getElementById('progressChart');
        const chartPlaceholder = document.getElementById('progress-placeholder');
        let daily = JSON.parse(localStorage.getItem('wikilabs_daily') || '[]');
        if (Array.isArray(daily) && daily.length > 7) {
            daily = daily.slice(-7);
        }
        const labels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        const hasDaily = Array.isArray(daily) && daily.length > 0 && daily.some(v => Number(v) > 0);

        if (!hasDaily) {
            if (chartCanvas) chartCanvas.style.display = 'none';
            if (chartPlaceholder) chartPlaceholder.hidden = false;
        } else if (chartCanvas && typeof Chart !== 'undefined') {
            chartCanvas.style.display = 'block';
            if (chartPlaceholder) chartPlaceholder.hidden = true;
            chartCanvas.width = chartCanvas.width;
            const data = Array(7).fill(0);
            for (let i = 0; i < daily.length && i < 7; i++) {
                data[i] = Number(daily[i]) || 0;
            }
            const initChart = () => {
                const ctx = chartCanvas.getContext('2d');
                chartCanvas.height = 260;
                chartCanvas.style.height = '260px';
                chartCanvas.style.width = '100%';
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
                        layout: { padding: { top: 10, bottom: 10, left: 0, right: 0 } },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: { color: '#2F3192', font: { size: 13, family: "'Montserrat', Arial, sans-serif" } },
                                grid: { color: 'rgba(47,49,146,0.10)', borderDash: [4, 4] }
                            },
                            x: {
                                ticks: { color: '#2F3192', font: { size: 13, family: "'Montserrat', Arial, sans-serif" } },
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
        } else if (chartPlaceholder) {
            chartPlaceholder.hidden = false;
        }

        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.onclick = () => {
                document.getElementById('logout-message').style.display = 'block';
                setTimeout(() => {
                    localStorage.removeItem('wikilabs_user');
                    localStorage.removeItem('wikilabs_emoji');
                    localStorage.removeItem('wikilabs_tipo');
                    localStorage.removeItem('wikilabs_materia');
                    window.location.href = 'index.html';
                }, 1800);
            };
        }
    }
});