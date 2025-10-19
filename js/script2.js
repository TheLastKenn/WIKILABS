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
        success: 'ACCIÓN EXITOSA',
        error: 'ATENCIÓN'
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
    const register = document.querySelector('.register-container');

    if (header) {
        header.style.animation = 'fadeDown 1s ease forwards';
    }
    if (register) {
        setTimeout(() => {
            register.style.animation = 'fadeUp 1s ease forwards';
        }, 300);
    }

    // Registro sin base de datos
    const form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const emoji = document.getElementById('emoji').value;
            const tipo = document.getElementById('tipo').value;
            const materia = tipo === 'profesor' ? document.getElementById('materia').value : '';

            if (password !== confirmPassword) {
                showToast('error', 'Las contraseñas no coinciden', 'Verifica que ambas contraseñas coincidan antes de continuar con tu registro.');
                return;
            }

            // Obtener usuarios existentes o crear array vacío
            let usuarios = JSON.parse(localStorage.getItem('wikilabs_usuarios') || '[]');

            // Verificar si el email ya está registrado
            if (usuarios.some(u => u.email === email)) {
                showToast('error', 'Correo ya registrado', `Ya existe una cuenta vinculada al correo <strong>${email}</strong>. Intenta iniciar sesión o recupera tu contraseña.`);
                return;
            }

            // Guardar nuevo usuario
            usuarios.push({
                name,
                email,
                password,
                emoji,
                tipo,
                materia
            });
            localStorage.setItem('wikilabs_usuarios', JSON.stringify(usuarios));
            showToast('success', '¡Registro completado!', `Bienvenido/a ${name}. Tu perfil de ${tipo === 'profesor' ? 'docente' : 'estudiante'} quedó registrado con el emoji ${emoji}.`);
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        });
    }

    const tipoSelect = document.getElementById('tipo');
    if (tipoSelect) {
        tipoSelect.addEventListener('change', function() {
            const materiaContainer = document.getElementById('materia-container');
            if (!materiaContainer) return;
            if (this.value === 'profesor') {
                materiaContainer.style.display = 'flex';
                document.getElementById('materia').setAttribute('required', 'required');
            } else {
                materiaContainer.style.display = 'none';
                document.getElementById('materia').removeAttribute('required');
            }
        });
    }
});