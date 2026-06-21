"use strict"; 
 
const formTarea = document.querySelector("#formTarea"); 
const tituloInput = document.querySelector("#titulo"); 
const responsableInput = document.querySelector("#responsable"); 
const prioridadSelect = document.querySelector("#prioridad"); 
const estadoSelect = document.querySelector("#estado"); 
const mensaje = document.querySelector("#mensaje"); 
const cuerpoTabla = document.querySelector("#cuerpoTabla"); 
const sinTareas = document.querySelector("#sinTareas"); 
const filtroResponsable = document.querySelector("#filtroResponsable"); 
const filtroEstado = document.querySelector("#filtroEstado"); 
const botonDatosDemo = document.querySelector("#btnDatosDemo"); 
 
const totalTareas = document.querySelector("#totalTareas"); 
const totalPendientes = document.querySelector("#totalPendientes"); 
const totalProceso = document.querySelector("#totalProceso"); 
const totalCompletadas = document.querySelector("#totalCompletadas"); 
 
const tareas = []; 
 
function crearTarea(titulo, responsable, prioridad, estado) { 
  return { 
    id: crypto.randomUUID(), 
    titulo, 
    responsable, 
    prioridad, 
    estado 
  }; 
} 
 
function obtenerTareasFiltradas() { 
  const responsable = filtroResponsable.value; 
  const estado = filtroEstado.value; 
 
  return tareas.filter((tarea) => { 
    const coincideResponsable = 
      responsable === "todos" || tarea.responsable === responsable; 
    const coincideEstado = estado === "todos" || tarea.estado === estado; 
    return coincideResponsable && coincideEstado; 
  }); 
} 
 
function crearCelda(texto) { 
  const celda = document.createElement("td"); 
  celda.textContent = texto; 
  return celda; 
} 
 
function crearFilaTarea(tarea) { 
  const fila = document.createElement("tr"); 
  fila.dataset.id = tarea.id; 
  fila.append( 
    crearCelda(tarea.titulo), 
    crearCelda(tarea.responsable) 
  ); 
 
  const celdaPrioridad = document.createElement("td"); 
  const etiquetaPrioridad = document.createElement("span"); 
  etiquetaPrioridad.className = "etiqueta"; 
  etiquetaPrioridad.textContent = tarea.prioridad; 
  celdaPrioridad.append(etiquetaPrioridad); 
 
  fila.append(celdaPrioridad, crearCelda(tarea.estado)); 
 
  const celdaAcciones = document.createElement("td"); 
  celdaAcciones.className = "acciones"; 
 
  const botonCompletar = document.createElement("button"); 
  botonCompletar.type = "button"; 
  botonCompletar.className = "btnCompletar"; 
  botonCompletar.dataset.accion = "completar"; 
  botonCompletar.textContent = "Completar"; 
  botonCompletar.disabled = tarea.estado === "Completada"; 
 
  const botonEliminar = document.createElement("button"); 
  botonEliminar.type = "button"; 
  botonEliminar.className = "btnEliminar"; 
  botonEliminar.dataset.accion = "eliminar"; 
  botonEliminar.textContent = "Eliminar"; 
 
  celdaAcciones.append(botonCompletar, botonEliminar); 
  fila.append(celdaAcciones); 
  return fila; 
} 
 
function actualizarEstadisticas() { 
  const cantidades = tareas.reduce( 
    (resumen, tarea) => { 
      resumen.total += 1; 
      if (tarea.estado === "Pendiente") resumen.pendientes += 1; 
      if (tarea.estado === "En proceso") resumen.proceso += 1; 
      if (tarea.estado === "Completada") resumen.completadas += 1; 
      return resumen; 
    }, 
    { total: 0, pendientes: 0, proceso: 0, completadas: 0 } 
  ); 
 
  totalTareas.textContent = cantidades.total; 
  totalPendientes.textContent = cantidades.pendientes; 
  totalProceso.textContent = cantidades.proceso; 
  totalCompletadas.textContent = cantidades.completadas; 
} 
 
function actualizarFiltroResponsables() { 
  const seleccionActual = filtroResponsable.value; 
  const responsables = [ 
    ...new Set(tareas.map((tarea) => tarea.responsable)) 
  ].sort((a, b) => a.localeCompare(b, "es")); 
 
  filtroResponsable.replaceChildren(); 
 
  const opcionTodos = document.createElement("option"); 
  opcionTodos.value = "todos"; 
  opcionTodos.textContent = "Todos"; 
  filtroResponsable.append(opcionTodos); 
 
  responsables.forEach((responsable) => { 
    const opcion = document.createElement("option"); 
    opcion.value = responsable; 
    opcion.textContent = responsable; 
    filtroResponsable.append(opcion); 
  }); 
 
  const seleccionExiste = responsables.includes(seleccionActual); 
  filtroResponsable.value = seleccionExiste ? seleccionActual : "todos"; 
  } 
 
function renderizarTareas() { 
  const visibles = obtenerTareasFiltradas(); 
  cuerpoTabla.replaceChildren(); 
 
  visibles.forEach((tarea) => { 
    cuerpoTabla.append(crearFilaTarea(tarea)); 
  }); 
 
  sinTareas.hidden = visibles.length > 0; 
  actualizarEstadisticas(); 
} 
 
function agregarTareaDesdeFormulario() { 
  const titulo = tituloInput.value.trim(); 
  const responsable = responsableInput.value.trim(); 
 
  if (titulo === "" || responsable === "") { 
    mensaje.textContent = "Título y responsable son obligatorios."; 
    return; 
  } 
 
  const tituloDuplicado = tareas.some( 
    (tarea) => tarea.titulo.toLowerCase() === titulo.toLowerCase() 
  ); 
 
  if (tituloDuplicado) { 
    mensaje.textContent = "Ya existe una tarea con el mismo título."; 
    return; 
  } 
 
  tareas.push( 
    crearTarea( 
      titulo, 
      responsable, 
      prioridadSelect.value, 
      estadoSelect.value 
    ) 
  ); 
 
  formTarea.reset(); 
  mensaje.textContent = "Tarea agregada correctamente."; 
  actualizarFiltroResponsables(); 
  renderizarTareas(); 
  tituloInput.focus(); 
} 
 
formTarea.addEventListener("submit", (evento) => { 
  evento.preventDefault(); 
  agregarTareaDesdeFormulario(); 
}); 
 
cuerpoTabla.addEventListener("click", (evento) => { 
  const boton = evento.target.closest("button[data-accion]"); 
  if (!boton) return; 
 
  const fila = boton.closest("tr"); 
  const id = fila.dataset.id; 
  const tarea = tareas.find((item) => item.id === id); 
  if (!tarea) return; 
 
  if (boton.dataset.accion === "completar") { 
    tarea.estado = "Completada"; 
  } 
 
  if (boton.dataset.accion === "eliminar") { 
    const confirmar = confirm(`¿Eliminar la tarea "${tarea.titulo}"?`); 
    if (!confirmar) return; 
 
    const indice = tareas.findIndex((item) => item.id === id); 
    tareas.splice(indice, 1); 
    actualizarFiltroResponsables(); 
  }  
  renderizarTareas(); 
}); 
 
[filtroResponsable, filtroEstado].forEach((filtro) => { 
  filtro.addEventListener("change", renderizarTareas); 
}); 
 
botonDatosDemo.addEventListener("click", () => { 
  if (tareas.length > 0) { 
    alert("Los datos de ejemplo solo se cargan cuando la lista está vacía."); 
    return; 
  } 
 
  tareas.push( 
    crearTarea("Diseñar la interfaz", "Ana", "Alta", "En proceso"), 
    crearTarea("Validar formulario", "Luis", "Media", "Pendiente"), 
    crearTarea("Preparar demostración", "Ana", "Baja", "Completada") 
  ); 
 
  actualizarFiltroResponsables(); 
  renderizarTareas(); 
}); 
 
actualizarFiltroResponsables(); 
renderizarTareas(); 
