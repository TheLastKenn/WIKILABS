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
    // ===== Uso y tiempo del curso (solo tras interacción) =====
    function toYMD(d){ const z=n=>String(n).padStart(2,'0'); return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}`; }
    function daysBetween(d1Str, d2Str){ if(!d1Str||!d2Str) return NaN; const d1=new Date(d1Str+'T00:00:00'); const d2=new Date(d2Str+'T00:00:00'); return Math.round((d2-d1)/86400000); }
    function updateStreakOnVisit(){
        const today = toYMD(new Date());
        const last = localStorage.getItem('wikilabs_last_active_date');
        let streak = Number(localStorage.getItem('wikilabs_streak')||'0');
        if(!last){ streak = 1; }
        else {
            const diff = daysBetween(last, today);
            if(diff === 0){} else if(diff === 1){ streak = Math.max(1, streak+1);} else if(diff>1){ streak = 1; }
        }
        localStorage.setItem('wikilabs_last_active_date', today);
        localStorage.setItem('wikilabs_streak', String(streak));
        // Racha por curso (historia)
        const keyLast = 'wikilabs_course_last_active_date_history';
        const keyStreak = 'wikilabs_course_streak_history';
        const lastC = localStorage.getItem(keyLast);
        let streakC = Number(localStorage.getItem(keyStreak)||'0');
        if(!lastC){ streakC = 1; }
        else {
            const diffC = daysBetween(lastC, today);
            if(diffC === 0){} else if(diffC === 1){ streakC = Math.max(1, streakC+1);} else if(diffC>1){ streakC = 1; }
        }
        localStorage.setItem(keyLast, today);
        localStorage.setItem(keyStreak, String(streakC));
    }
    function ensureDaily(){
        let arr = JSON.parse(localStorage.getItem('wikilabs_daily')||'[]');
        if(!Array.isArray(arr) || arr.length!==7) arr = [0,0,0,0,0,0,0];
        return arr;
    }
    function updateDaily(minutes){
        if(!minutes || minutes<=0) return;
        const day = new Date().getDay();
        const idx = (day + 6) % 7; // L..D
        const arr = ensureDaily();
        arr[idx] = Number(arr[idx]||0) + minutes;
        localStorage.setItem('wikilabs_daily', JSON.stringify(arr));
    }

    updateStreakOnVisit();

    let trackingStarted = false;
    let startTime = 0;
    const startTracking = () => { if(!trackingStarted){ trackingStarted = true; startTime = Date.now(); }};
    window.addEventListener('pointerdown', startTracking, { once: true });
    window.addEventListener('keydown', startTracking, { once: true });
    window.addEventListener('scroll', startTracking, { once: true, passive: true });

    window.addEventListener('beforeunload', () => {
        if(!trackingStarted) return;
        const elapsed = Math.max(0, Math.round((Date.now() - startTime) / 60000));
        if(elapsed > 0){
            const stats = JSON.parse(localStorage.getItem('wikilabs_stats') || '{}');
            stats.history = (Number(stats.history)||0) + elapsed;
            localStorage.setItem('wikilabs_stats', JSON.stringify(stats));
            updateDaily(elapsed);
        }
    });
});