"use strict"; 
 
const formEstudiante = document.querySelector("#formEstudiante"); 
const nombreInput = document.querySelector("#nombre"); 
const correoInput = document.querySelector("#correo"); 
const notaInput = document.querySelector("#nota"); 
const turnoSelect = document.querySelector("#turno"); 
const mensaje = document.querySelector("#mensaje"); 
const listaEstudiantes = document.querySelector("#listaEstudiantes"); 
const estadisticas = document.querySelector("#estadisticas"); 
const botonesFiltro = document.querySelectorAll(".btnFiltro"); 
 
const estudiantes = []; 
let filtroActual = "todos"; 
 
const crearEstudiante = (nombre, correo, nota, turno) => ({ 
  id: crypto.randomUUID(), 
  nombre, 
  correo, 
  nota, 
  turno, 
  aprobado: nota >= 11 
}); 
 
function obtenerEstudiantesFiltrados() { 
  if (filtroActual === "aprobados") { 
    return estudiantes.filter((estudiante) => estudiante.aprobado); 
  } 
 
  if (filtroActual === "desaprobados") { 
    return estudiantes.filter((estudiante) => !estudiante.aprobado); 
  } 
 
  return estudiantes; 
} 
 
function crearTarjetaEstudiante(estudiante) { 
  const tarjeta = document.createElement("article"); 
  tarjeta.className = `estudiante ${ 
    estudiante.aprobado ? "aprobado" : "desaprobado" 
  }`; 
 
  const nombre = document.createElement("h3"); 
  nombre.textContent = estudiante.nombre; 
 
  const detalle = document.createElement("p"); 
  detalle.textContent = `${estudiante.correo} · ${estudiante.turno}`; 
 
  const resultado = document.createElement("p"); 
  resultado.textContent = `Nota: ${estudiante.nota.toFixed(1)} · ${ 
    estudiante.aprobado ? "Aprobado" : "Desaprobado" 
  }`; 
 
  tarjeta.append(nombre, detalle, resultado); 
  return tarjeta; 
} 
 
function actualizarEstadisticas() { 
  if (estudiantes.length === 0) { 
    estadisticas.textContent = "Sin estudiantes registrados."; 
    return; 
  } 
 
  const sumaNotas = estudiantes.reduce( 
    (acumulado, estudiante) => acumulado + estudiante.nota, 
    0 
  ); 
  const promedio = sumaNotas / estudiantes.length; 
  const aprobados = estudiantes.filter((estudiante) => estudiante.aprobado).length; 
 
  estadisticas.textContent = 
    `Total: ${estudiantes.length} · Aprobados: ${aprobados} · ` + 
    `Promedio: ${promedio.toFixed(2)}`; 
} 
 
function renderizarEstudiantes() { 
  listaEstudiantes.replaceChildren(); 
  const filtrados = obtenerEstudiantesFiltrados(); 
 
  filtrados.forEach((estudiante) => { 
    listaEstudiantes.append(crearTarjetaEstudiante(estudiante)); 
  }); 
 
  if (filtrados.length === 0) { 
    const aviso = document.createElement("p"); 
    aviso.textContent = "No existen estudiantes para este filtro."; 
    listaEstudiantes.append(aviso); 
  } 
 
  actualizarEstadisticas(); 
} 
 
formEstudiante.addEventListener("submit", (evento) => { 
  evento.preventDefault(); 
  mensaje.textContent = ""; 
 
  const nombre = nombreInput.value.trim(); 
  const correo = correoInput.value.trim().toLowerCase(); 
  const nota = Number(notaInput.value); 
  const turno = turnoSelect.value; 
 
  const correoDuplicado = estudiantes.find( 
    (estudiante) => estudiante.correo === correo 
  ); 
 
  if (correoDuplicado) { 
    mensaje.textContent = "El correo ya se encuentra registrado."; 
    return; 
  } 
 
  if (nombre === "" || correo === "" || !Number.isFinite(nota)) { 
    mensaje.textContent = "Complete todos los datos correctamente."; 
    return; 
  } 
 
  if (nota < 0 || nota > 20) { 
    mensaje.textContent = "La nota debe estar entre 0 y 20."; 
    return; 
  } 
 
  estudiantes.push(crearEstudiante(nombre, correo, nota, turno)); 
  formEstudiante.reset(); 
  mensaje.textContent = "Estudiante registrado correctamente."; 
  renderizarEstudiantes(); 
}); // CORRECCIÓN: Se cambió el ");" por "});" para cerrar la función del formulario.
 
botonesFiltro.forEach((boton) => { 
  boton.addEventListener("click", () => { 
    filtroActual = boton.dataset.filtro; 
    botonesFiltro.forEach((item) => item.classList.remove("activo")); 
    boton.classList.add("activo"); 
    renderizarEstudiantes(); 
  }); 
}); 

renderizarEstudiantes();