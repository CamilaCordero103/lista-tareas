// let arregloTareas = [];
let arregloTareas = JSON.parse(localStorage.getItem("listaTareas")) || [];

const tarea = document.querySelector ("#nueva-tarea");
const boton = document.querySelector ("#btn-agregar");
const listaTrabajo = document.querySelector("#lista-trabajo");
const listaCasa = document.querySelector("#lista-casa");
const listaPersonal = document.querySelector("#lista-personal")
const selectCategoria = document.querySelector("#categoria-tarea");
const selectPrioridad = document.querySelector("#prioridad-tarea");

for (const tareaGuardada of arregloTareas) {
    // 1. Fabricamos el post-it
    const itemTarea = document.createElement ("li");
    itemTarea.classList.add(tareaGuardada.categoria.toLowerCase());
    
    // 2. Fabricamos el checkbox y su vigilante
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function (){
        tareaGuardada.completada = checkbox.checked;
        localStorage.setItem("listaTareas", JSON.stringify(arregloTareas));
        if (checkbox.checked) {
            spanTexto.style.textDecoration = "line-through";
            spanTexto.style.color = "#a4b0be";
        } else {
            spanTexto.style.textDecoration = "none";
            spanTexto.style.color = "#333";
        }
    });

    // 3. El texto en su span
    const spanTexto = document.createElement("span");
    spanTexto.textContent = tareaGuardada.texto;

    // (Ejemplo para el bucle for...of)
    const spanEstrellas = document.createElement("span");
    spanEstrellas.textContent = ` ${tareaGuardada.prioridad}`; 

    // 4. Fabricamos el botón de editar
    const botonEditar = document.createElement("button");
    botonEditar.textContent = "✏️";
    botonEditar.addEventListener("click", function (){
        const nuevoTexto = prompt ("Edita tu tarea:", spanTexto.textContent);
        if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
            spanTexto.textContent = nuevoTexto; // Cambia en la pantalla
            tareaGuardada.texto = nuevoTexto; // Cambia en la memoria
            localStorage.setItem("listaTareas",JSON.stringify(arregloTareas));
        }
    });

    // 5. Fabricamos el botón borrar
    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "❌";
    botonBorrar.addEventListener("click", function (){
        itemTarea.remove();
        arregloTareas = arregloTareas.filter(function (tarea){
            return tarea.texto !== tareaGuardada.texto;
        })
        localStorage.setItem("listaTareas", JSON.stringify(arregloTareas));
    });

    // 6. Ensamblamos todo ADENTRO del bucle (VERSIÓN ACTUALIZADA)
    itemTarea.appendChild(checkbox);
    itemTarea.appendChild(spanTexto);
    itemTarea.appendChild(spanEstrellas);

    const cajaBotones = document.createElement("div");
    cajaBotones.classList.add("caja-botones");

    cajaBotones.appendChild(botonEditar);
    cajaBotones.appendChild(botonBorrar);

    itemTarea.appendChild(cajaBotones);

    // Leemos la categoría y decidimos a qué tablero enviarla
    if (tareaGuardada.categoria === "Trabajo") {
        listaTrabajo.appendChild(itemTarea);
    } else if (tareaGuardada.categoria === "Casa") {
        listaCasa.appendChild(itemTarea);
    } else if (tareaGuardada.categoria === "Personal") {
        listaPersonal.appendChild(itemTarea);
    }

    // 7. Verificamos si estaba completada
    if (tareaGuardada.completada === true) {
        checkbox.checked = true;
        spanTexto.style.textDecoration = "line-through";
        spanTexto.style.color = "#a4b0be";
    }
}
boton.addEventListener("click", function () {
    const textoUsuario = tarea.value;
    

    if (textoUsuario === "") {
        alert("Debes escribir una tarea primero");
        return;
    }

    // Guardamos el objeto en la memoria
    const nuevaTarea = {
        texto: textoUsuario,
        completada: false,
        categoria: selectCategoria.value,
        prioridad: selectPrioridad.value // <- LO NUEVO
    };
    arregloTareas.push(nuevaTarea);
    localStorage.setItem("listaTareas", JSON.stringify(arregloTareas));

    // 1. Fabricamos el post-it
    const itemTarea = document.createElement("li");
    itemTarea.classList.add(nuevaTarea.categoria.toLowerCase());

    // 2. Fabricamos el checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function (){
        nuevaTarea.completada = checkbox.checked;
        localStorage.setItem("listaTareas", JSON.stringify(arregloTareas));
        if (checkbox.checked) {
            spanTexto.style.textDecoration = "line-through";
            spanTexto.style.color = "#a4b0be";
        } else {
            spanTexto.style.textDecoration = "none";
            spanTexto.style.color = "#333";
        }
    });

    // 3. AQUÍ ESTÁ LO NUEVO: El texto en su span
    const spanTexto = document.createElement("span");
    spanTexto.textContent = nuevaTarea.texto;

    const spanEstrellas = document.createElement("span");
    spanEstrellas.textContent = ` ${nuevaTarea.prioridad}`;

    // 4. AQUÍ ESTÁ LO NUEVO: El botón de editar
    const botonEditar = document.createElement("button");
    botonEditar.textContent = "✏️";
    botonEditar.addEventListener("click", function (){
        const nuevoTexto = prompt("Edita tu tarea:", spanTexto.textContent);
        if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
            spanTexto.textContent = nuevoTexto; // Cambia en la pantalla
            nuevaTarea.texto = nuevoTexto;      // Cambia en la memoria
            localStorage.setItem("listaTareas", JSON.stringify(arregloTareas));
        }
    });

    // 5. Fabricamos el botón de borrar (Actualizado para usar nuevaTarea.texto)
    const botonBorrar = document.createElement("button");
    botonBorrar.textContent = "❌";
    botonBorrar.addEventListener("click", function (){
        itemTarea.remove();
        arregloTareas = arregloTareas.filter(function (tarea){
            return tarea.texto !== nuevaTarea.texto; // <- Así no falla si lo editaste
        });
        localStorage.setItem("listaTareas", JSON.stringify(arregloTareas));
    });

    // Metemos el checkbox y el texto al post-it
    itemTarea.appendChild(checkbox);
    itemTarea.appendChild(spanTexto);
    itemTarea.appendChild(spanEstrellas);

    //Creamos la cajita protectora y le ponemos su clase CSS
    const cajaBotones = document.createElement("div");
    cajaBotones.classList.add("caja-botones");
    
    //Metemos los botones ADENTRO de la cajita
    cajaBotones.appendChild(botonEditar);
    cajaBotones.appendChild(botonBorrar);

    //Metemos la cajita terminada al post-it
    itemTarea.appendChild(cajaBotones);

    // Lo pegamos en la lista visual
    if (nuevaTarea.categoria === "Trabajo") {
        listaTrabajo.appendChild(itemTarea);
    } else if (nuevaTarea.categoria === "Casa") {
        listaCasa.appendChild(itemTarea);
    } else if (nuevaTarea.categoria === "Personal") {
        listaPersonal.appendChild(itemTarea);
    }
    
    // Limpiamos el input
    tarea.value = "";
});


// Atrapamos el elemento HMTL de clima
const textoClima = document.querySelector("#texto-clima");
// Creamos la función asíncrona

async function obtenerClima(){

    try {
            // La dirección de la API (El menú del mesero)
    const url = "https://api.open-meteo.com/v1/forecast?latitude=-33.4569&longitude=-70.6483&current_weather=true";

    //Mandamos al mesero y esperamos (await)
    const respuesta = await fetch(url);

    //Desempacamos la caja de datos
    const datosClima = await respuesta.json();

    // //Imprimimos la caja copmleta en la consola para ver qué trajo
    // console.log (datosClima);

    //Temperatura!
    const temperatura = datosClima.current_weather.temperature;

    textoClima.textContent = `Clima actual en Santiago: ${temperatura}°C 🌡️`;
    }
    catch (error){
        textoClima.textContent = "No se pudo cargar el clima 🌧️";
    }
}
obtenerClima();
