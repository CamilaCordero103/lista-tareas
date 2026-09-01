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
        const url = "https://api.open-meteo.com/v1/forecast?latitude=-33.4569&longitude=-70.6483&current_weather=true&daily=temperature_2m_max&timezone=auto";
        
        const respuesta = await fetch(url);
        const datosClima = await respuesta.json();

        //Imprimimos el clima actual
        const temperaturaActual = datosClima.current_weather.temperature;
        textoClima.textContent = `Santiago: ${temperaturaActual}°C 🌡️`;

        //Atrapamos la repisa vacía del HTML
        const contenedorPronostico = document.querySelector ("#pronostico-dias");
        contenedorPronostico.innerHTML = ""; //La limpiamos por si acaso

        //Un bucle para fabricar los 3 cuadritos del futuro (Mañana, Pasado y el siguiente)
        //Usamos índices 1, 2 y 3 porque el 0 es el día de hoy
        const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

        for (let i = 1; i <= 3;i ++){
            const tempMax = datosClima.daily.temperature_2m_max[i];

            //Transformamos la fecha que nos da la API a un día de la semana real
            const fechaString = datosClima.daily.time[i];
            const fecha = new Date(fechaString + "T00:00:00"); // T00:00:00 evita saltos de zona horaria
            const nombreDia = diasSemana[fecha.getDay()];

            //Fabricamos el cuadrito
            const cuadrito = document.createElement("div");
            cuadrito.classList.add("cuadrito-clima");

            //Le inyectamos el HTML por dentro (Día arriba, temperatura abajo)
            cuadrito.innerHTML = `<strong>${nombreDia}</strong> ${tempMax}°C`;

            //Lo ponemos en la repisa
            contenedorPronostico.appendChild(cuadrito);
        }

    }
    catch (error){
        textoClima.textContent = "No se pudo cargar el clima 🌧️";
    }
}
obtenerClima();

// ==========================================
// MÓDULO: RASTREADOR DE HÁBITOS
// ==========================================

let arregloHabitos = JSON.parse(localStorage.getItem("misHabitos")) || [];
const listaHabitos = document.querySelector("#lista-habitos");
const inputHabito = document.querySelector("#input-habito");

// 1. Función para dibujar los hábitos en pantalla
function dibujarHabitos() {
    listaHabitos.innerHTML = ""; // Limpiamos la lista visual

    for (let i = 0; i < arregloHabitos.length; i++) {
        const habito = arregloHabitos[i];
        
        const itemHabito = document.createElement("li");
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = habito.completado;
        
        const spanTexto = document.createElement("span");
        spanTexto.textContent = habito.nombre;
        spanTexto.style.flexGrow = "1";
        
        // Si está completado, lo tachamos suavemente
        if (habito.completado) {
            spanTexto.style.textDecoration = "line-through";
            spanTexto.style.color = "#a4b0be";
        }

        // El vigilante del checkbox
        checkbox.addEventListener("change", function() {
            habito.completado = checkbox.checked;
            localStorage.setItem("misHabitos", JSON.stringify(arregloHabitos));
            dibujarHabitos(); // Redibujamos para actualizar el tachado
        });

        // Botón mini para borrar el hábito
        const botonBorrar = document.createElement("button");
        botonBorrar.textContent = "✖";
        botonBorrar.style.background = "none";
        botonBorrar.style.border = "none";
        botonBorrar.style.color = "#e74c3c";
        botonBorrar.style.cursor = "pointer";
        
        botonBorrar.addEventListener("click", function() {
            arregloHabitos.splice(i, 1); // Lo borramos del arreglo
            localStorage.setItem("misHabitos", JSON.stringify(arregloHabitos));
            dibujarHabitos(); // Redibujamos la pantalla
        });

        itemHabito.appendChild(checkbox);
        itemHabito.appendChild(spanTexto);
        itemHabito.appendChild(botonBorrar);
        
        listaHabitos.appendChild(itemHabito);
    }
}

// 2. Despertar la app: Dibujamos lo que haya en la memoria
dibujarHabitos();

// 3. Agregar un hábito nuevo al presionar la tecla "Enter"
inputHabito.addEventListener("keypress", function(evento) {
    if (evento.key === "Enter" && inputHabito.value.trim() !== "") {
        const nuevoHabito = {
            nombre: inputHabito.value,
            completado: false
        };
        
        arregloHabitos.push(nuevoHabito);
        localStorage.setItem("misHabitos", JSON.stringify(arregloHabitos));
        
        inputHabito.value = ""; // Limpiamos el input
        dibujarHabitos(); // Redibujamos
    }
});
// ==========================================
// MÓDULO: SONIDOS AMBIENTALES
// ==========================================

const botonesSonido = document.querySelectorAll(".btn-sonido");

// Ahora llamamos a tus archivos locales, ¡adiós a los bloqueos de internet!
const audios = {
    lluvia: new Audio("sonidos/lluvia.mp3"),
    bosque: new Audio("sonidos/bosque.mp3"),
    prado: new Audio("sonidos/prado.mp3") // <- El cambio está aquí
};

// 2. Hacemos que los audios se repitan infinitamente (loop)
for (let clave in audios) {
    audios[clave].loop = true;
}

let sonidoActual = null; // Variable para recordar qué está sonando

// 3. Le damos vida a los botones
botonesSonido.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const tipoSonido = boton.getAttribute("data-sonido");

        // Caso A: Haces clic en el sonido que YA está sonando (Lo apagamos)
        if (sonidoActual === tipoSonido) {
            audios[tipoSonido].pause();
            boton.classList.remove("activo");
            sonidoActual = null;
        } 
        // Caso B: Haces clic en un sonido nuevo
        else {
            // Si había un sonido diferente sonando, lo pausamos primero
            if (sonidoActual !== null) {
                audios[sonidoActual].pause();
                // Le quitamos el color verde al botón anterior
                document.querySelector(".btn-sonido.activo").classList.remove("activo");
            }
            
            // Le damos play al nuevo sonido y pintamos el botón
            audios[tipoSonido].play();
            boton.classList.add("activo");
            sonidoActual = tipoSonido; // Memorizamos qué está sonando ahora
        }
    });
});