import { registerUser } from "../../firebase.js";

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

    // Registro conectado a Firebase
    const form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
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

            try {
                await registerUser({
                    name,
                    email,
                    password,
                    emoji,
                    tipo,
                    materia,
                    source: 'paginaexte-web'
                });
                alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
                window.location.href = "login.html";
            } catch (error) {
                if (error.code === 'EMAIL_ALREADY_IN_USE') {
                    alert('Este correo ya está registrado.');
                } else {
                    console.error('Error registrando usuario en Firebase', error);
                    alert('Ocurrió un error registrando al usuario. Revisa la consola para más detalles.');
                }
            }
        });
    }

    const tipoSelect = document.getElementById('tipo');
    if (tipoSelect) {
        tipoSelect.addEventListener('change', function() {
            const materiaContainer = document.getElementById('materia-container');
            if (this.value === 'profesor') {
                materiaContainer.style.display = 'block';
                document.getElementById('materia').setAttribute('required', 'required');
            } else {
                materiaContainer.style.display = 'none';
                document.getElementById('materia').removeAttribute('required');
            }
        });
    }
});