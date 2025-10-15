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
                alert('Las contraseñas no coinciden.');
                return;
            }

            // Obtener usuarios existentes o crear array vacío
            let usuarios = JSON.parse(localStorage.getItem('wikilabs_usuarios') || '[]');

            // Verificar si el email ya está registrado
            if (usuarios.some(u => u.email === email)) {
                alert('Este correo ya está registrado.');
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
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            window.location.href = "login.html";
        });
    }

    document.getElementById('tipo').addEventListener('change', function() {
        const materiaContainer = document.getElementById('materia-container');
        if (this.value === 'profesor') {
            materiaContainer.style.display = 'block';
            document.getElementById('materia').setAttribute('required', 'required');
        } else {
            materiaContainer.style.display = 'none';
            document.getElementById('materia').removeAttribute('required');
        }
    });
});