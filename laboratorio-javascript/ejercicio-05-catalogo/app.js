"use strict"; 
 
const productos = [ 
  { id: 1, nombre: "Laptop Atlas 14", categoria: "Laptop", precio: 3499, stock: 8 }, 
  { id: 2, nombre: "Laptop Nova 15", categoria: "Laptop", precio: 4299, stock: 5 }, 
  { id: 3, nombre: "Monitor Vision 24", categoria: "Monitor", precio: 799, stock: 12 }, 
  { id: 4, nombre: "Monitor Studio 27", categoria: "Monitor", precio: 1499, stock: 4 }, 
  { id: 5, nombre: "Teclado Mecánico K1", categoria: "Accesorio", precio: 289, stock: 18 }, 
  { id: 6, nombre: "Mouse Inalámbrico M2", categoria: "Accesorio", precio: 149, stock: 0 } 
]; 
 
const busquedaInput = document.querySelector("#busqueda"); 
const categoriaSelect = document.querySelector("#categoria"); 
const precioMaximoInput = document.querySelector("#precioMaximo"); 
const valorPrecio = document.querySelector("#valorPrecio"); 
const ordenSelect = document.querySelector("#orden"); 
const botonLimpiar = document.querySelector("#btnLimpiar"); 
const listaProductos = document.querySelector("#listaProductos"); 
const resumenCatalogo = document.querySelector("#resumenCatalogo"); 
 
const formatearMoneda = (monto) => 
  new Intl.NumberFormat("es-PE", { 
    style: "currency", 
    currency: "PEN", 
    maximumFractionDigits: 0 
  }).format(monto); 
 
function obtenerProductosVisibles() { 
  const texto = busquedaInput.value.trim().toLowerCase(); 
  const categoria = categoriaSelect.value; 
  const precioMaximo = Number(precioMaximoInput.value); 
 
  const filtrados = productos.filter((producto) => { 
    const coincideTexto = producto.nombre.toLowerCase().includes(texto); 
    const coincideCategoria = 
      categoria === "todas" || producto.categoria === categoria; 
    const coincidePrecio = producto.precio <= precioMaximo; 
 
    return coincideTexto && coincideCategoria && coincidePrecio; 
  }); 
 
  return [...filtrados].sort((a, b) => { 
    if (ordenSelect.value === "precio-asc") return a.precio - b.precio; 
    if (ordenSelect.value === "precio-desc") return b.precio - a.precio; 
    return a.nombre.localeCompare(b.nombre, "es"); 
  }); 
} 
 
function crearTarjetaProducto(producto) { 
  const tarjeta = document.createElement("article"); 
  tarjeta.className = "producto"; 
 
  const categoria = document.createElement("p"); 
  categoria.className = "categoria"; 
  categoria.textContent = producto.categoria; 
 const titulo = document.createElement("h2"); 
  titulo.textContent = producto.nombre; 
 
  const precio = document.createElement("p"); 
  precio.className = "precio"; 
  precio.textContent = formatearMoneda(producto.precio); 
 
  const stock = document.createElement("p"); 
  stock.textContent = producto.stock > 0 
    ? `Stock disponible: ${producto.stock}` 
    : "Sin stock"; 
 
  tarjeta.append(categoria, titulo, precio, stock); 
  return tarjeta; 
} 
 
function renderizarCatalogo() { 
  const visibles = obtenerProductosVisibles(); 
  listaProductos.replaceChildren(); 
 
  visibles.forEach((producto) => { 
    listaProductos.append(crearTarjetaProducto(producto)); 
  }); 
 
  if (visibles.length === 0) { 
    const aviso = document.createElement("p"); 
    aviso.className = "sin-resultados"; 
    aviso.textContent = "No se encontraron productos con esos filtros."; 
    listaProductos.append(aviso); 
  } 
 
  const valorInventario = visibles.reduce( 
    (total, producto) => total + producto.precio * producto.stock, 
    0 
  ); 
 
  resumenCatalogo.textContent = 
    `${visibles.length} producto(s) · ` + 
    `Inventario visible: ${formatearMoneda(valorInventario)}`; 
 
  valorPrecio.textContent = formatearMoneda(Number(precioMaximoInput.value)); 
} 
 
[busquedaInput, categoriaSelect, precioMaximoInput, ordenSelect].forEach( 
  (control) => control.addEventListener("input", renderizarCatalogo) 
); 
 
botonLimpiar.addEventListener("click", () => { 
  busquedaInput.value = ""; 
  categoriaSelect.value = "todas"; 
  precioMaximoInput.value = "6000"; 
  ordenSelect.value = "nombre"; 
  renderizarCatalogo(); 
}); 
 
renderizarCatalogo(); 
