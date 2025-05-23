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

    // Login sin base de datos
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;

            // Obtener usuarios registrados desde localStorage
            let usuarios = JSON.parse(localStorage.getItem('wikilabs_usuarios') || '[]');
            const usuario = usuarios.find(u => u.email === email && u.password === password);

            if (usuario) {
                // Guardar datos de sesión
                localStorage.setItem('wikilabs_user', usuario.name);
                localStorage.setItem('wikilabs_emoji', usuario.emoji);
                localStorage.setItem('wikilabs_tipo', usuario.tipo);
                localStorage.setItem('wikilabs_materia', usuario.materia || "");
                window.location.href = "user.html";
            } else {
                alert('Correo o contraseña incorrectos, o el usuario no está registrado.');
            }
        });
    }
});