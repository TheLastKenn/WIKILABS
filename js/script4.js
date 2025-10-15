window.addEventListener('DOMContentLoaded', () => {
    // Animar la aparición de los bloques de cursos
    const cursosContainer = document.querySelector('.cursos-container');
    if (cursosContainer) {
        setTimeout(() => { cursosContainer.style.opacity = '1'; }, 200);
    }

    // Progreso por curso basado en tiempo acumulado (wikilabs_stats)
    // Definición de una meta simple de minutos para 100% (ajustable)
    const GOAL_MIN = 120; // 2h = 100%
    const stats = JSON.parse(localStorage.getItem('wikilabs_stats') || '{}');
    const map = {
        math: Number(stats.math || 0),
        ciencia: Number(stats.ciencia || 0),
        history: Number(stats.history || 0)
    };
    function pct(mins){ return Math.max(0, Math.min(100, Math.round((mins / GOAL_MIN) * 100))); }

    // Actualizar barras de progreso
    const list = document.getElementById('cursos-lista');
    const cards = Array.from(list.querySelectorAll('.curso-bloque'));
    cards.forEach(card => {
        const course = card.getAttribute('data-course');
        if (!course) return;
        const value = pct(map[course] || 0);
        const bar = card.querySelector('.progreso-bar');
        const label = card.querySelector('.progreso-label');
        if (bar) bar.style.setProperty('--p', value + '%');
        if (label) label.textContent = value + '%';
        card.dataset.progress = String(value).padStart(3,'0');

        // Badges: "Nuevo" si 0%, "Constante" si racha curso >= 3
        const badgeOld = card.querySelector('.curso-badge');
        if (badgeOld) badgeOld.remove();
        let badgeHtml = '';
        if (value === 0) {
            badgeHtml = '<span class="curso-badge badge-nuevo">Nuevo</span>';
        } else {
            const streakKey = `wikilabs_course_streak_${course}`;
            const streakVal = Number(localStorage.getItem(streakKey) || '0');
            if (streakVal >= 3) badgeHtml = '<span class="curso-badge badge-constante">Constante</span>';
        }
        if (badgeHtml) card.insertAdjacentHTML('beforeend', badgeHtml);
    });


    // Progreso de evaluación: porcentaje de tiempo respecto al total de cursos
    const evalBar = document.getElementById('progress-evaluacion');
    if (evalBar) {
        const evalMin = Number(stats.evaluacion || 0);
        // Sumar tiempo de todos los cursos principales y evaluación
        const totalMin = (map.math || 0) + (map.ciencia || 0) + (map.history || 0) + evalMin;
        let evalPercent = 0;
        if (totalMin > 0) {
            evalPercent = Math.min(100, Math.round((evalMin / totalMin) * 100));
        }
        evalBar.style.setProperty('--p', evalPercent + '%');
        evalBar.querySelector('.progreso-label').textContent = evalPercent + '%';
    }

    // Orden descendente por progreso
    cards.sort((a,b) => Number(b.dataset.progress||0) - Number(a.dataset.progress||0))
         .forEach(c => list.appendChild(c));
});