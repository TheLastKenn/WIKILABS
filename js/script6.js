window.addEventListener('DOMContentLoaded', () => {
    // Solo muestra el panel si es profesor de matemáticas
    const tipo = localStorage.getItem('wikilabs_tipo');
    const materia = localStorage.getItem('wikilabs_materia');
    if (tipo === "profesor" && materia === "matematicas") {
        document.getElementById('profesor-panel-math').style.display = "block";
    }

    // Menú desplegable
    const toggleBtn = document.getElementById('toggle-menu-btn');
    const menu = document.getElementById('menu-contenido');
    toggleBtn.onclick = () => {
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    };

    // Mostrar campo de media solo si se selecciona tipo
    const mediaType = document.getElementById('media-type');
    const mediaUrl = document.getElementById('media-url');
    const mediaFile = document.getElementById('media-file');
    const mediaSizeFields = document.getElementById('media-size-fields');
    const mediaWidth = document.getElementById('media-width');
    const mediaHeight = document.getElementById('media-height');

    mediaType.onchange = () => {
        // Mostrar campos según tipo
        if (mediaType.value === "imagen" || mediaType.value === "video") {
            mediaFile.style.display = "block";
            mediaUrl.style.display = "block";
            mediaUrl.placeholder = mediaType.value === "imagen" ? "URL de imagen (opcional)" : "URL de video (opcional)";
            mediaSizeFields.style.display = "flex";
        } else if (mediaType.value === "grafica") {
            mediaFile.style.display = "none";
            mediaUrl.style.display = "block";
            mediaUrl.placeholder = "URL o embed de gráfica";
            mediaSizeFields.style.display = "none";
        } else {
            mediaFile.style.display = "none";
            mediaUrl.style.display = "none";
            mediaSizeFields.style.display = "none";
        }
    };

    // Guardar archivo local como DataURL
    let mediaDataUrl = "";
    mediaFile.onchange = function() {
        const file = mediaFile.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            mediaDataUrl = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    // CRUD de contenidos
    const form = document.getElementById('contenido-form');
    const lista = document.getElementById('contenidos-math');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    let editIdx = null;
    const key = "wikilabs_contenidos_matematicas";

    function renderContenidos() {
        lista.innerHTML = "";
        const datos = JSON.parse(localStorage.getItem(key) || "[]");
        datos.forEach((item, idx) => {
            let mediaHtml = "";
            if (item.mediaType === "imagen" && item.mediaUrl) {
                mediaHtml = `<img src="${item.mediaUrl}" style="max-width:100%;border-radius:8px;margin:8px 0; width:${item.mediaWidth || 480}px; height:${item.mediaHeight || 320}px;">`;
            } else if (item.mediaType === "video" && item.mediaUrl) {
                mediaHtml = `<video src="${item.mediaUrl}" controls style="max-width:100%;border-radius:8px;margin:8px 0; width:${item.mediaWidth || 480}px; height:${item.mediaHeight || 320}px;"></video>`;
            } else if (item.mediaType === "grafica" && item.mediaUrl) {
                if (item.mediaUrl.startsWith("<iframe") || item.mediaUrl.startsWith("<svg")) {
                    mediaHtml = item.mediaUrl;
                } else {
                    mediaHtml = `<iframe src="${item.mediaUrl}" style="width:100%;min-height:220px;border:none;border-radius:8px;margin:8px 0;"></iframe>`;
                }
            }
            const div = document.createElement('div');
            div.className = "contenido-item";
            div.innerHTML = `
                <div class="contenido-title" style="font-family:${item.tituloFont};font-size:${item.tituloSize}px;">
                    ${item.titulo}
                </div>
                <div class="contenido-texto" style="font-family:${item.textoFont};font-size:${item.textoSize}px;white-space:pre-line;">
                    ${item.texto}
                </div>
                ${mediaHtml}
                <div class="contenido-actions">
                    <button class="edit-btn" data-idx="${idx}">Editar</button>
                    <button class="delete-btn" data-idx="${idx}">Eliminar</button>
                </div>
            `;
            lista.appendChild(div);
        });
    }

    form.onsubmit = function(e) {
        e.preventDefault();
        const datos = JSON.parse(localStorage.getItem(key) || "[]");
        let mediaSrc = "";
        if (mediaType.value === "imagen" || mediaType.value === "video") {
            // Si hay archivo local, usa DataURL, si no, usa URL
            mediaSrc = mediaDataUrl || mediaUrl.value.trim();
        } else if (mediaType.value === "grafica") {
            mediaSrc = mediaUrl.value.trim();
        }
        const nuevo = {
            titulo: document.getElementById('titulo-contenido').value,
            tituloFont: document.getElementById('titulo-font').value,
            tituloSize: document.getElementById('titulo-size').value,
            texto: document.getElementById('texto-contenido').value,
            textoFont: document.getElementById('texto-font').value,
            textoSize: document.getElementById('texto-size').value,
            mediaType: mediaType.value,
            mediaUrl: mediaSrc,
            mediaWidth: mediaWidth.value,
            mediaHeight: mediaHeight.value
        };
        if (editIdx !== null) {
            datos[editIdx] = nuevo;
            editIdx = null;
            cancelEditBtn.style.display = "none";
        } else {
            datos.push(nuevo);
        }
        localStorage.setItem(key, JSON.stringify(datos));
        form.reset();
        mediaUrl.style.display = "none";
        mediaFile.style.display = "none";
        mediaSizeFields.style.display = "none";
        mediaDataUrl = "";
        renderContenidos();
    };

    lista.onclick = function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const idx = e.target.getAttribute('data-idx');
            let datos = JSON.parse(localStorage.getItem(key) || "[]");
            if (confirm("¿Seguro que deseas eliminar este contenido?")) {
                datos.splice(idx, 1);
                localStorage.setItem(key, JSON.stringify(datos));
                renderContenidos();
            }
        }
        if (e.target.classList.contains('edit-btn')) {
            const idx = e.target.getAttribute('data-idx');
            let datos = JSON.parse(localStorage.getItem(key) || "[]");
            const item = datos[idx];
            document.getElementById('titulo-contenido').value = item.titulo;
            document.getElementById('titulo-font').value = item.tituloFont;
            document.getElementById('titulo-size').value = item.tituloSize;
            document.getElementById('texto-contenido').value = item.texto;
            document.getElementById('texto-font').value = item.textoFont;
            document.getElementById('texto-size').value = item.textoSize;
            document.getElementById('media-type').value = item.mediaType;
            document.getElementById('media-url').value = item.mediaUrl;
            document.getElementById('media-url').style.display = item.mediaType ? "block" : "none";
            editIdx = idx;
            cancelEditBtn.style.display = "inline-block";
            menu.style.display = "block";
        }
    };

    cancelEditBtn.onclick = function() {
        editIdx = null;
        form.reset();
        document.getElementById('media-url').style.display = "none";
        cancelEditBtn.style.display = "none";
    };

    renderContenidos();

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