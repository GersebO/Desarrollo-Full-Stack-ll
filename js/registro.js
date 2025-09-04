// js/registro.js
document.addEventListener('DOMContentLoaded', () => {
  // ---------- NODOS ----------
  const form    = document.getElementById('registerForm');

  const run     = document.getElementById('run');
  const nombre  = document.getElementById('nom');
  const ape     = document.getElementById('ape');
  const correo  = document.getElementById('correo');
  const fecha   = document.getElementById('fecha');   // (opcional)
  const dir     = document.getElementById('dir');

  const region  = document.getElementById('region');
  const comuna  = document.getElementById('comuna');

  const pass    = document.getElementById('pass');
  const pass2   = document.getElementById('pass2');

  const btnReset = document.getElementById('limpiar');

  // ---------- DATA: REGIONES / COMUNAS ----------
  // Puedes ampliar o ajustar libremente
  const regiones = [
    {
      nombre: 'Región Metropolitana de Santiago',
      comunas: [
        'Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque', 'Estación Central',
        'Huechuraba', 'Independencia', 'La Cisterna', 'La Florida', 'La Granja',
        'La Pintana', 'La Reina', 'Las Condes', 'Lo Barnechea', 'Lo Espejo',
        'Lo Prado', 'Macul', 'Maipú', 'Ñuñoa', 'Pedro Aguirre Cerda',
        'Peñalolén', 'Providencia', 'Pudahuel', 'Quilicura', 'Quinta Normal',
        'Recoleta', 'Renca', 'San Joaquín', 'San Miguel', 'San Ramón',
        'Santiago', 'Vitacura'
      ]
    },
    {
      nombre: 'Valparaíso',
      comunas: [
        'Valparaíso','Viña del Mar','Concón','Quilpué','Villa Alemana','Quintero',
        'Puchuncaví','Limache','Olmué','Casablanca'
      ]
    },
    {
      nombre: 'Biobío',
      comunas: [
        'Concepción','Talcahuano','Hualpén','San Pedro de la Paz','Chiguayante',
        'Penco','Tomé','Coronel','Lota'
      ]
    }
  ];

  // ---------- HELPERS ----------
  const onlyLetters = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
  const emailAllowed = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

  function normalizaRun(value) {
    // quita puntos y guion; mayúscula para K
    return (value || '').replace(/[\.\-]/g, '').toUpperCase();
  }

  function validarRUN(runStr) {
    // acepta si el usuario puso guion o puntos, los removemos
    const clean = normalizaRun(runStr);

    if (clean.length < 7 || clean.length > 9) return false;

    const cuerpo = clean.slice(0, -1);
    const dv = clean.slice(-1); // dígito verificador

    if (!/^\d+$/.test(cuerpo)) return false;

    // cálculo dv
    let suma = 0;
    let mult = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i], 10) * mult;
      mult = mult === 7 ? 2 : mult + 1;
    }
    const resto = 11 - (suma % 11);
    let dvCalc = '';
    if (resto === 11) dvCalc = '0';
    else if (resto === 10) dvCalc = 'K';
    else dvCalc = String(resto);

    return dv === dvCalc;
  }

  function setInvalid(input) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
  }
  function setValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }

  // ---------- POBLAR REGIONES ----------
  function poblarRegiones() {
    regiones.forEach((r, idx) => {
      const op = document.createElement('option');
      op.value = idx;                  // índice como value
      op.textContent = r.nombre;
      region.appendChild(op);
    });
  }

  // ---------- POBLAR COMUNAS SEGÚN REGIÓN ----------
  function poblarComunas(idxRegion) {
    comuna.innerHTML = '<option value="">Seleccione comuna</option>';
    if (idxRegion === '') {
      comuna.disabled = true;
      return;
    }
    const arr = regiones[Number(idxRegion)].comunas;
    arr.forEach(c => {
      const op = document.createElement('option');
      op.value = c;
      op.textContent = c;
      comuna.appendChild(op);
    });
    comuna.disabled = false;
  }

  // Inicializamos selects
  poblarRegiones();
  poblarComunas(''); // deja comuna deshabilitada

  region.addEventListener('change', (e) => {
    poblarComunas(e.target.value);
    comuna.classList.remove('is-valid','is-invalid');
  });

  // ---------- SUBMIT ----------
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // limpiamos estados
    [run, nombre, ape, correo, dir, region, comuna, pass, pass2].forEach(el => {
      el.classList.remove('is-invalid', 'is-valid');
    });

    let ok = true;

    // RUN
    const runVal = run.value.trim();
    if (!validarRUN(runVal)) {
      setInvalid(run); ok = false;
    } else setValid(run);

    // Nombre
    const nomVal = nombre.value.trim();
    if (nomVal.length < 2 || nomVal.length > 50 || !onlyLetters.test(nomVal)) {
      setInvalid(nombre); ok = false;
    } else setValid(nombre);

    // Apellidos
    const apeVal = ape.value.trim();
    if (apeVal.length < 2 || apeVal.length > 100 || !onlyLetters.test(apeVal)) {
      setInvalid(ape); ok = false;
    } else setValid(ape);

    // Correo
    const mailVal = correo.value.trim();
    if (!mailVal || mailVal.length > 100 || !emailAllowed.test(mailVal)) {
      setInvalid(correo); ok = false;
    } else setValid(correo);

    // Dirección
    const dirVal = dir.value.trim();
    if (!dirVal || dirVal.length > 300) {
      setInvalid(dir); ok = false;
    } else setValid(dir);

    // Región
    if (region.value === '') {
      setInvalid(region); ok = false;
    } else setValid(region);

    // Comuna
    if (comuna.disabled || comuna.value === '') {
      setInvalid(comuna); ok = false;
    } else setValid(comuna);

    // Password
    const p1 = (pass.value || '').trim();
    if (p1.length < 4 || p1.length > 10) {
      setInvalid(pass); ok = false;
    } else setValid(pass);

    // Confirmación
    const p2 = (pass2.value || '').trim();
    if (p2 !== p1 || p2.length < 4 || p2.length > 10) {
      setInvalid(pass2); ok = false;
    } else setValid(pass2);

    if (!ok) return;

    // Si todo OK: simulación de registro
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    window.location.href = 'Login.html';
  });

  // ---------- RESET ----------
  btnReset?.addEventListener('click', () => {
    [run, nombre, ape, correo, fecha, dir, region, comuna, pass, pass2].forEach(el => {
      el.classList.remove('is-valid','is-invalid');
    });
    region.value = '';
    poblarComunas(''); // deshabilita comuna
  });
});
