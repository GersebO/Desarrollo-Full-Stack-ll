// js/login.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    [email, password].forEach(el => {
      el.classList.remove('is-invalid', 'is-valid');
    });

    let valid = true;

    // Validar email
    const emailVal = email.value.trim();
    const emailRegex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    if (!emailVal || emailVal.length > 100 || !emailRegex.test(emailVal)) {
      email.classList.add('is-invalid');
      valid = false;
    } else {
      email.classList.add('is-valid');
    }

    // Validar contraseña
    const passVal = (password.value || '').trim();
    if (!passVal || passVal.length < 4 || passVal.length > 10) {
      password.classList.add('is-invalid');
      valid = false;
    } else {
      password.classList.add('is-valid');
    }

    if (!valid) return;

    // Simulación de login OK
    alert("Inicio de sesión exitoso. Bienvenido!");
    window.location.href = 'PaginaPrincipal.html';
  });
});
