import { verifyUserCredentials } from "../../firebase.js";

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

    // Login con Firebase
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;

            try {
                const usuario = await verifyUserCredentials(email, password);
                if (usuario) {
                    localStorage.setItem('wikilabs_user', usuario.name || "");
                    localStorage.setItem('wikilabs_email', usuario.email || "");
                    localStorage.setItem('wikilabs_emoji', usuario.emoji || "");
                    localStorage.setItem('wikilabs_tipo', usuario.tipo || "");
                    localStorage.setItem('wikilabs_materia', usuario.materia || "");
                    window.location.href = "user.html";
                } else {
                    alert('Correo o contraseña incorrectos, o el usuario no está registrado.');
                }
            } catch (error) {
                console.error('Error verificando credenciales en Firebase', error);
                alert('No se pudo iniciar sesión. Revisa la consola para más detalles.');
            }
        });
    }
});