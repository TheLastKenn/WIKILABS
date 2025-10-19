const TOAST_DURATION = 4600;

function showToast(type, title, message) {
    let container = document.querySelector('.wikitoast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'wikitoast-container';
        document.body.appendChild(container);
    }

    const escapeHTML = (value) => String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const icons = {
        success: '🌟',
        error: '⚠️'
    };
    const badges = {
        success: 'ACCESO CONCEDIDO',
        error: 'REVISAR DATOS'
    };

    const safeTitle = escapeHTML(title);
    const safeMessage = escapeHTML(message);

    const toast = document.createElement('div');
    toast.className = `wikitoast ${type}`;
    toast.innerHTML = `
        <div class="wikitoast__icon">${icons[type] || 'ℹ️'}</div>
        <div class="wikitoast__content">
            <span class="wikitoast__badge">${badges[type] || 'INFORMACIÓN'}</span>
            <h3 class="wikitoast__title">${safeTitle}</h3>
            <p class="wikitoast__message">${safeMessage}</p>
        </div>
        <span class="wikitoast__progress"></span>
    `;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('is-visible'));

    const removeToast = () => {
        toast.classList.add('is-hiding');
        setTimeout(() => toast.remove(), 320);
    };

    setTimeout(removeToast, TOAST_DURATION);
    toast.addEventListener('click', removeToast);
}

window.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const container = document.querySelector('.register-container');

    if (header) {
        header.style.opacity = '1';
        header.style.animation = 'fadeDown 1s ease forwards';
    }
    if (container) {
        setTimeout(() => {
            container.style.opacity = '1';
            container.style.animation = 'fadeUp 1s ease forwards';
        }, 300);
    }

    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;

            let usuarios = JSON.parse(localStorage.getItem('wikilabs_usuarios') || '[]');
            const usuario = usuarios.find(u => u.email === email && u.password === password);

            if (usuario) {
                localStorage.setItem('wikilabs_user', usuario.name);
                localStorage.setItem('wikilabs_emoji', usuario.emoji);
                localStorage.setItem('wikilabs_tipo', usuario.tipo);
                localStorage.setItem('wikilabs_materia', usuario.materia || "");

                showToast('success', '¡Bienvenido de nuevo!', `Hola ${usuario.name}. Tus cursos se abrirán en un instante.`);

                setTimeout(() => {
                    window.location.href = "cursos.html";
                }, 1400);
            } else {
                showToast('error', 'Acceso no válido', 'Revisa tu correo y contraseña o regístrate si aún no tienes cuenta.');
            }
        });
    }
});