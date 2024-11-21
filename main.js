// Clases
class Jugador {
    constructor(dni,nombre, apellido, edad, sexo) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.sexo = sexo;
    }
}

//Funciones
function obtenerDNIUnico() {
    let dni = parseInt(prompt("Ingrese su número de DNI"));
    let jugadorExiste = jugadores.some( (el) => {
        return el.dni === dni;
    });
    while(jugadorExiste) {
        alert("El DNI ingresado ya exíste!");
        dni = prompt("Ingrese un número de DNI diferente");
        jugadorExiste = jugadores.some( (el) => {
            return el.dni === dni;
        });
    }
    return dni;
}

function crearJugador() {
    const dni = obtenerDNIUnico();
    const nombre = prompt("Nombre su Nombre");
    const apellido = prompt("Nombre su Apellido");
    const edad = parseInt(prompt("Ingrese su edad"));
    const sexo = prompt("Ingrese su sexo");

    const jugador = new Jugador(dni, nombre, apellido, edad, sexo);
    jugadores.push(jugador);

    alert("El jugador fue agregado satisfactoriamente!");
    for(let i = 0; i < jugadores.length; i++) {
        console.log(jugadores[i].dni + ", " + jugadores[i].nombre + ", " + jugadores[i].apellido + ", " + jugadores[i].edad + ", " + jugadores[i].sexo);
    }

    
}

function eliminarJugador() {
    let dniJugador = parseInt(prompt("Ingrese el número de DNI del jugador a eliminar"));
    let indiceJugador = buscarIndiceDeJugador(dniJugador);
    while(indiceJugador === -1) {
        alert("El jugador no existe");
        dniJugador = prompt("Ingrese un número de DNI diferente");
        indiceJugador = buscarIndiceDeJugador(dniJugador);
    }
    jugadores.splice(indiceJugador, 1);
    alert("Eljugador fue eliminado");
}

function buscarIndiceDeJugador(dniJugador) {
    let indice = -1;
    for(let i = 0; i < jugadores.length; i++) {
        const jugador = jugadores[i];
        if(jugador.dni === dniJugador) {
            indice = i;
            break;
        }
    }
    return indice;
}

function opcionValida() {
    // Chequeamos si la opción es menor a 0 o mayor a 3
    while(opcion < 0 || opcion > 3) {
        alert("Opción invalida, por favor ingrese una nueva opción.");
        opcion = parseInt(prompt(opciones));
    }
    if(opcion === 0) {
        alert("Salir");
        return false;
    }
    return true;
}

function mostrarInformacion(){
    let sumaEdades = 0;
    let edadPromedio = 0;
    let cantidadJugadores = 0;
    for(let i = 0; i < jugadores.length; i++) {
        cantidadJugadores = cantidadJugadores + 1;
        sumaEdades = sumaEdades + jugadores[i].edad;
        edadPromedio = sumaEdades / cantidadJugadores;
    }
    console.log("La edad promedio de los jugadores registrados es: " + edadPromedio);
}

// Main
alert("Bienvenido!");
const opciones = "1- Crear un Jugador, 2- Mostrar información de jugadores, 3- Modificar Jugador, 0- Salir";
let opcion = parseInt(prompt(opciones));

let jugadores = [
    new Jugador(25455390,"Martin","Fontana",34,"masculino"),
    new Jugador(25455391,"Cacho","Garay",23,"masculino"),
    new Jugador(25455392,"Maria Antonieta","de las Nieves",15,"femenino"),
];

while(opcionValida()) {
    switch(opcion) {
        case 1:
            crearJugador();
            break;
        case 2:
            mostrarInformacion();
            break;
        case 3:
            eliminarJugador();
            break;
    }
    opcion = parseInt(prompt(opciones));
}