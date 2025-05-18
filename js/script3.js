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

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            let users = JSON.parse(localStorage.getItem('wikilabs_users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                alert('¡Bienvenido, ' + user.name + '!');
                window.location = 'cursos.html';
            } else {
                alert('Correo o contraseña incorrectos');
            }
        });
    }
});
// ...tu código de login...
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Simulación: obtener el nombre del usuario (puedes cambiarlo por el real)
    const email = document.getElementById('email').value;
    // Ejemplo: nombre de usuario a partir del email
    const username = email.split('@')[0].replace('.', ' ').replace('_', ' ');
    localStorage.setItem('wikilabs_user', username.charAt(0).toUpperCase() + username.slice(1));
    // Inicializar estadísticas si no existen
    if (!localStorage.getItem('wikilabs_stats')) {
        localStorage.setItem('wikilabs_stats', JSON.stringify({
            math: 0,
            ciencia: 0,
            history: 0
        }));
    }
    window.location.href = "user.html";
});