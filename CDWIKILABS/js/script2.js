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
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirm = document.getElementById('confirm-password').value;

            if (password !== confirm) {
                alert('Las contraseñas no coinciden');
                return;
            }

            // Guardar usuario en localStorage
            let users = JSON.parse(localStorage.getItem('wikilabs_users') || '[]');
            if (users.some(u => u.email === email)) {
                alert('El correo ya está registrado.');
                return;
            }
            users.push({ name, email, password });
            localStorage.setItem('wikilabs_users', JSON.stringify(users));

            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            window.location = 'login.html';
        });
    }

    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const emoji = document.getElementById('emoji').value;
        // ...guardar otros datos si es necesario...
        localStorage.setItem('wikilabs_user', name);
        localStorage.setItem('wikilabs_emoji', emoji);
        // Inicializa estadísticas si no existen
        if (!localStorage.getItem('wikilabs_stats')) {
            localStorage.setItem('wikilabs_stats', JSON.stringify({
                math: 0,
                ciencia: 0,
                history: 0
            }));
        }
        window.location.href = "login.html";
    });
});