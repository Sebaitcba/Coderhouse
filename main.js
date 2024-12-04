class Jugador {
    constructor(dni,nombre,apellido,edad,sexo) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.sexo = sexo;
        
        this.element = this.crearTr();
    }

crearTr() {
    // Crear TR
    const tr = document.createElement("tr");

    // Crear TDs
    const tdDNI = document.createElement("td");
    const tdNombre = document.createElement("td");
    const tdApellido = document.createElement("td");
    const tdEdad = document.createElement("td");
    const tdSexo = document.createElement("td");
    const tdAcciones = document.createElement("td");
    tdDNI.innerText = `${this.dni}`;
    tdNombre.innerText = `${this.nombre}`;
    tdApellido.innerText = `${this.apellido}`;

    const spanEdad = document.createElement("span");
    spanEdad.innerText = `${this.edad}`;
    spanEdad.addEventListener("click", () => {
        clickSpanEdadJugador(tdEdad, spanEdad, this);
    });
    
    tdEdad.append(spanEdad);
    tdSexo.innerText = `${this.sexo}`;

    // TD Acciones
    const botonEliminar = document.createElement("button");
    botonEliminar.innerText = "Eliminar";
    botonEliminar.addEventListener("click", () => {
        eliminarJugador(this);
    });
    tdAcciones.append(botonEliminar);

    // Agregar TDs
    tr.append(tdDNI,tdNombre,tdApellido,tdEdad,tdSexo,tdAcciones);

    return tr;
    }
}

// Funciones
function buscarJugador() {
    const value = inputBuscarJugador.value;
    // Filtrar
    jugadoresFiltrados = jugadores.filter( (el) => {
        return el.apellido.toLowerCase().includes(value.toLowerCase());
    });
    // Renderizar tabla
    renderizarTablaJugadores();
}

function guardarEnLS() {
    const jugadoresJSON = JSON.stringify(jugadores);

    localStorage.setItem("jugadores", jugadoresJSON);
}

function transformarJugadoresLocalStorage(jugadoresJSON) {
    if(jugadoresJSON === null) {
        return null;
    }

    const jugadores = [];

    for(const jugadorLiteral of jugadoresJSON) {
        jugadores.push(
            new Jugador(
                jugadorLiteral.dni,
                jugadorLiteral.nombre,
                jugadorLiteral.apellido,
                jugadorLiteral.edad,
                jugadorLiteral.sexo,
            )
        )
    }

    return jugadores;
}

function obtenerDeLS() {
    return transformarJugadoresLocalStorage(
        JSON.parse(
            localStorage.getItem("jugadores")
        )
    ) || [
        new Jugador(25455497,"Maria","Anca", 20, "femenino"),
        new Jugador(26455992,"Mario","Capo",26, "masculino"),
        new Jugador(25455498,"Joan Manuel","Serrat",14, "masculino"),
    ];
}

function obtenerEdadPromedio() {
    return jugadores.reduce( (acc, el) => {
        return acc + el.obtenerSubtotal();
    }, 0);
}

function dniJugadorExiste(dni) {
    return jugadores.some( (el) => {
        return el.dni === dni;
    });
}

function crearJugador(e) {
    e.preventDefault();

    // Obtener inputs
    const inputDNIJugador = document.getElementById("DNIJugador");
    const inputNombreJugador = document.getElementById("nombreJugador");
    const inputApellidoJugador = document.getElementById("apellidoJugador");
    const inputEdadJugador = document.getElementById("edadJugador");
    const inputSexoJugador = document.getElementById("sexoJugador");

    // Pedir datos
    const dniJugador = parseFloat(inputDNIJugador.value);
    const nombreJugador = inputNombreJugador.value;
    const apellidoJugador = inputApellidoJugador.value;
    const edadJugador = parseFloat(inputEdadJugador.value);
    const sexoJugador = inputSexoJugador.value;

    // Limpiar inputs
    inputDNIJugador.value = "";
    inputNombreJugador.value = "";
    inputApellidoJugador.value = "";
    inputEdadJugador.value = "";
    inputSexoJugador.value = "";

    // Chequeamos si el DNI no existe
    if(dniJugadorExiste(dniJugador)) {
        alert("El DNI del jugador ingresado, ya existe. Ingrese uno diferente");
        return;
    }

    // Creamos el Jugador
    const jugador = new Jugador(
        dniJugador,
        nombreJugador,
        apellidoJugador,
        edadJugador,
        sexoJugador
    );

    // Agregar jugador
    jugadores.push(jugador);

    // Guardar en local
    guardarEnLS();

    alert("El jugador fue cargado exitosamente");

    renderizarTablaJugadores();
}

function obtenerCantidadJugadores() {
    let cantidadJugadores = 0;
    for(const jugador of jugadoresFiltrados) {
        cantidadJugadores = cantidadJugadores + 1;
    }
    return cantidadJugadores;
}

function obtenerEdadPromedio() {
    let sumaEdad = 0;
    let cantidadJugadores = 0;
    for(const jugador of jugadoresFiltrados) {
        sumaEdad = sumaEdad + jugador.edad;
        cantidadJugadores = cantidadJugadores + 1;
    }
    if (cantidadJugadores > 0) {
        return Number((sumaEdad/cantidadJugadores).toFixed(2)); 
    } else {
        return 0;
    }
}

function renderizarInformacion() {
    spanCantidadJugadores.innerText = obtenerCantidadJugadores();
    spanEdadPromedio.innerText = obtenerEdadPromedio();
}

function clickSpanEdadJugador(tdEdad, spanEdad, jugador) {
    // Crear input

    spanEdad.className = "ocultar-elemento";
    const inputEdad = document.createElement("input");
    inputEdad.type = "text";
    inputEdad.value = jugador.edad; 

    inputEdad.addEventListener("change", () => {
        jugador.edad = parseFloat(inputEdad.value);
        guardarEnLS();
        //Renderizar la tabla
        renderizarTablaJugadores();
    });

    // Agregar input al td
    tdEdad.append(inputEdad);

    // Ocultar span
    //spanEdad.className = "ocultar-elemento";
}

function eliminarJugador(jugador) {
    const indiceElemento = jugadores.findIndex( (el) => {
        return el.dni === jugador.dni;
    });
    jugadores.splice(indiceElemento, 1);
    // Guardar en el LS
    guardarEnLS();
    // Renderizar tabla
    renderizarTablaJugadores();
}

function renderizarTablaJugadores() {
    tbodyJugadores.innerHTML = "";
    for(const jugador of jugadoresFiltrados) {
        // Obtener TR
        const tr = jugador.element;
        tbodyJugadores.append(tr);
    }
    // Renderizamos informacion
    renderizarInformacion();
}

// Inicio del programa
const formCargarJugador = document.getElementById("formCargarJugador");
const tbodyJugadores = document.getElementById("tbodyJugadores");
const spanEdadPromedio = document.getElementById("edadPromedio");
const spanCantidadJugadores = document.getElementById("cantidadJugadores");
const inputBuscarJugador = document.getElementById("buscarJugador");

let jugadores = obtenerDeLS();
let jugadoresFiltrados = [...jugadores];

renderizarTablaJugadores();

// Eventos
formCargarJugador.addEventListener("submit", crearJugador);
inputBuscarJugador.addEventListener("input", buscarJugador);