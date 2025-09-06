// js/carrito.js

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ✅ Cargar productos desde productos.json
async function cargarProductos() {
  try {
    const res = await fetch("data/productos.json");
    const productos = await res.json();

    const contenedor = document.getElementById("productos-container");
    if (contenedor) {
      contenedor.innerHTML = "";
      productos.forEach(prod => {
        contenedor.innerHTML += `
          <div class="col-md-3 mb-4">
            <div class="card h-100">
              <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}">
              <div class="card-body text-center">
                <h5 class="card-title">${prod.nombre}</h5>
                <p class="card-text">${prod.descripcion}</p>
                <p class="fw-bold">$${prod.precio.toLocaleString()}</p>
                <button class="btn btn-primary" onclick="agregarAlCarrito(${prod.id})">Añadir al carrito</button>
              </div>
            </div>
          </div>
        `;
      });
    }
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

// ✅ Agregar al carrito
function agregarAlCarrito(id) {
  fetch("data/productos.json")
    .then(res => res.json())
    .then(productos => {
      const producto = productos.find(p => p.id === id);

      // Buscar si ya existe en el carrito
      const existente = carrito.find(p => p.id === producto.id);
      if (existente) {
        existente.cantidad++;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarContador();
      alert(`${producto.nombre} añadido al carrito 🛒`);
    });
}

// ✅ Actualizar numerito en el navbar
function actualizarContador() {
  const count = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  const badge = document.querySelector(".cart-count");
  if (badge) badge.textContent = count;
}

// ✅ Mostrar productos en carrito.html
// ✅ Finalizar compra
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío 🛒");
    return;
  }

  alert("¡Gracias por tu compra! 🎉");
  carrito = []; // Vaciar carrito
  guardarCarrito();
  mostrarCarrito();
}

// ✅ Mostrar productos en carrito.html con total
function mostrarCarrito() {
  const contenedor = document.getElementById("carrito-container");
  if (contenedor) {
    contenedor.innerHTML = "";
    if (carrito.length === 0) {
      contenedor.innerHTML = "<p>El carrito está vacío 🛒</p>";
      return;
    }

    let total = 0;

    carrito.forEach(prod => {
      const subtotal = prod.precio * prod.cantidad;
      total += subtotal;

      contenedor.innerHTML += `
        <div class="card mb-3">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5>${prod.nombre}</h5>
              <p>Cantidad: ${prod.cantidad}</p>
              <p>Subtotal: $${subtotal.toLocaleString()}</p>
            </div>
            <button class="btn btn-danger" onclick="eliminarDelCarrito(${prod.id})">Eliminar</button>
          </div>
        </div>
      `;
    });

    // 🔥 Agregar total + botón de finalizar compra
    contenedor.innerHTML += `
      <div class="card mt-3">
        <div class="card-body text-end">
          <h4>Total: $${total.toLocaleString()}</h4>
          <button class="btn btn-success" onclick="finalizarCompra()">Finalizar compra</button>
        </div>
      </div>
    `;
  }
}


// ✅ Eliminar producto del carrito
function eliminarDelCarrito(id) {
  carrito = carrito.filter(prod => prod.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  actualizarContador();
}

// ✅ Ejecutar al cargar
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  actualizarContador();
  mostrarCarrito();
});
