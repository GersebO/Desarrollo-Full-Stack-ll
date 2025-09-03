// Toggle menú hamburguesa (móvil)
const btnMenu = document.getElementById('btnMenu');
const menuPrincipal = document.getElementById('menuPrincipal');

if (btnMenu && menuPrincipal) {
  btnMenu.addEventListener('click', function () {
    const abierto = menuPrincipal.classList.toggle('abierto');
    btnMenu.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  });

  // Cerrar el menú al hacer clic en un enlace (móvil)
  menuPrincipal.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && menuPrincipal.classList.contains('abierto')) {
      menuPrincipal.classList.remove('abierto');
      btnMenu.setAttribute('aria-expanded', 'false');
    }
  });
}

/* (ya lo tenías) Año dinámico en footer */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();