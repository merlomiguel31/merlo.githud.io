"use strict"; 
 
const botonIniciar = document.querySelector("#btnIniciar"); 
const salida = document.querySelector("#salida"); 
 
// Función declarada: puede invocarse antes o después de su declaración. 
function calcularPromedio(nota1, nota2, nota3) { 
  return (nota1 + nota2 + nota3) / 3; 
} 
 
// Función anónima asignada a una constante. 
const clasificarPromedio = function (promedio) { 
  if (promedio >= 18) return "Excelente"; 
  if (promedio >= 14) return "Aprobado"; 
  if (promedio >= 11) return "En proceso"; 
  return "Desaprobado"; 
}; 
 
// Función flecha. 
const construirMensaje = (nombre, promedio, estado) => 
  `${nombre}, tu promedio es ${promedio.toFixed(2)}: ${estado}.`; 
 
botonIniciar.addEventListener("click", () => { 
  const nombreIngresado = prompt("Ingrese el nombre del estudiante:"); 
 
  if (nombreIngresado === null || nombreIngresado.trim() === "") { 
  salida.textContent = "Operación cancelada: debe ingresar un nombre."; 
    return; 
  } 
 
  const nota1 = Number(prompt("Ingrese la primera nota (0 a 20):")); 
  const nota2 = Number(prompt("Ingrese la segunda nota (0 a 20):")); 
  const nota3 = Number(prompt("Ingrese la tercera nota (0 a 20):")); 
 
  const notasValidas = [nota1, nota2, nota3].every( 
    (nota) => Number.isFinite(nota) && nota >= 0 && nota <= 20 
  ); 
 
  if (!notasValidas) { 
    alert("Las tres notas deben ser números entre 0 y 20."); 
    salida.textContent = "No se pudo calcular el promedio."; 
    return; 
  } 
 
  const deseaContinuar = confirm("¿Desea calcular y mostrar el promedio?"); 
 
  if (!deseaContinuar) { 
    salida.textContent = "El usuario decidió no mostrar el resultado."; 
    return; 
  } 
 
  const promedio = calcularPromedio(nota1, nota2, nota3); 
  const estado = clasificarPromedio(promedio); 
  const mensaje = construirMensaje(nombreIngresado.trim(), promedio, estado); 
 
  salida.textContent = mensaje; 
  alert("Cálculo completado correctamente."); 
});
