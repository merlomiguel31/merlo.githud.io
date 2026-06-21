"use strict"; 
 
const nombreInput = document.querySelector("#nombre"); 
const profesionInput = document.querySelector("#profesion"); 
const biografiaInput = document.querySelector("#biografia"); 
const habilidadInput = document.querySelector("#habilidad"); 
const botonAgregar = document.querySelector("#btnAgregar"); 
const botonesTema = document.querySelectorAll(".btnTema"); 
 
const tarjetaPerfil = document.querySelector("#tarjetaPerfil"); 
const vistaNombre = document.querySelector("#vistaNombre"); 
const vistaProfesion = document.querySelector("#vistaProfesion"); 
const vistaBiografia = document.querySelector("#vistaBiografia"); 
const listaHabilidades = document.querySelector("#listaHabilidades"); 
const avatar = document.querySelector(".avatar"); 
const estado = document.querySelector("#estado"); 
 
const habilidades = ["HTML", "CSS"]; 
function obtenerIniciales(nombreCompleto) { 
  return nombreCompleto 
    .trim() 
    .split(/\s+/) 
    .filter(Boolean) 
    .slice(0, 2) 
    .map((palabra) => palabra[0].toUpperCase()) 
    .join(""); 
} 
 
function renderizarHabilidades() { 
  listaHabilidades.replaceChildren(); 
 
  habilidades.forEach((habilidad) => { 
    const item = document.createElement("li"); 
    item.textContent = habilidad; 
    listaHabilidades.append(item); 
  }); 
} 
 
function actualizarPerfil() { 
  const nombre = nombreInput.value.trim() || "Nombre sin definir"; 
  const profesion = profesionInput.value.trim() || "Profesión sin definir"; 
  const biografia = biografiaInput.value.trim() || "Sin biografía"; 
 
  vistaNombre.textContent = nombre; 
  vistaProfesion.textContent = profesion; 
  vistaBiografia.textContent = biografia; 
  avatar.textContent = obtenerIniciales(nombre) || "?"; 
} 
 
[nombreInput, profesionInput, biografiaInput].forEach((control) => { 
  control.addEventListener("input", actualizarPerfil); 
}); 
 
botonAgregar.addEventListener("click", () => { 
  const nuevaHabilidad = habilidadInput.value.trim(); 
 
  if (nuevaHabilidad === "") { 
    estado.textContent = "Escriba una habilidad antes de agregarla."; 
    return; 
  } 
 
  const yaExiste = habilidades.some( 
    (habilidad) => habilidad.toLowerCase() === nuevaHabilidad.toLowerCase() 
  ); 
 
  if (yaExiste) { 
    estado.textContent = "La habilidad ya se encuentra registrada."; 
    return; 
  } 
 
  habilidades.push(nuevaHabilidad); 
  habilidadInput.value = ""; 
  estado.innerHTML = "<strong>Habilidad agregada correctamente.</strong>"; 
  renderizarHabilidades(); 
  habilidadInput.focus(); 
}); 
 
botonesTema.forEach((boton) => { 
  boton.addEventListener("click", () => { 
    const temaSeleccionado = boton.dataset.tema; 
    tarjetaPerfil.classList.remove( 
      "tema-azul", 
      "tema-verde", 
      "tema-morado" 
    ); 
    tarjetaPerfil.classList.add(`tema-${temaSeleccionado}`); 
  }); 
}); 
 
actualizarPerfil(); 
renderizarHabilidades(); 
