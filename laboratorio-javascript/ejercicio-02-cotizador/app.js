"use strict"; 
 
const formCotizador = document.querySelector("#formCotizador"); 
const productoInput = document.querySelector("#producto"); 
const precioInput = document.querySelector("#precio"); 
const cantidadInput = document.querySelector("#cantidad"); 
const tipoClienteSelect = document.querySelector("#tipoCliente"); 
const frecuenteCheckbox = document.querySelector("#esFrecuente"); 
const mensajeError = document.querySelector("#mensajeError"); 
 
const resProducto = document.querySelector("#resProducto"); 
const resSubtotal = document.querySelector("#resSubtotal"); 
const resDescuento = document.querySelector("#resDescuento"); 
const resIgv = document.querySelector("#resIgv"); 
const resTotal = document.querySelector("#resTotal"); 
 
const IGV = 0.18; 
 
const formatearMoneda = (monto) => 
  new Intl.NumberFormat("es-PE", { 
    style: "currency", 
    currency: "PEN" 
  }).format(monto); 
 
function calcularPorcentajeDescuento(subtotal, tipoCliente, esFrecuente) { 
  if (tipoCliente === "corporativo" && subtotal >= 500) { 
    return 0.10; 
  } 
 
  if (esFrecuente) { 
    return 0.05; 
  } 
 
  return 0; 
} 
 
formCotizador.addEventListener("submit", function (evento) { 
  evento.preventDefault(); 
  mensajeError.textContent = ""; 
 
  const producto = productoInput.value.trim(); 
  const precio = Number(precioInput.value); 
  const cantidad = Number(cantidadInput.value); 
  const tipoCliente = tipoClienteSelect.value; 
  const esFrecuente = frecuenteCheckbox.checked; 
 
  const datosValidos = 
    producto !== "" && 
    Number.isFinite(precio) && precio > 0 && 
    Number.isInteger(cantidad) && cantidad > 0; 
 
  if (!datosValidos) { 
    mensajeError.textContent = 
      "Complete el producto, un precio positivo y una cantidad entera."; 
    return; 
  } 
 
  const subtotal = precio * cantidad; 
  const porcentajeDescuento = calcularPorcentajeDescuento( 
    subtotal, 
    tipoCliente, 
    esFrecuente 
  ); 
  const descuento = subtotal * porcentajeDescuento; 
  const baseImponible = subtotal - descuento; 
  const igv = baseImponible * IGV; 
  const total = baseImponible + igv; 
 
  resProducto.textContent = producto; 
  resSubtotal.textContent = formatearMoneda(subtotal); 
  resDescuento.textContent = formatearMoneda(descuento); 
  resIgv.textContent = formatearMoneda(igv); 
  resTotal.textContent = formatearMoneda(total); 
}); 
