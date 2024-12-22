const peticion = fetch("https://rickandmortyapi.com/api/character");

let siguientePagina = "";
let siguiente = document.getElementById("siguiente");

siguiente.addEventListener("click", () => {
    fetch(siguientePagina).then( (response) => {
        return response.json();
    }).then( (json) => {
        siguientePagina = json.info.next;
        renderizarPersonajes(json.results);
    });
});

peticion.then( (response) => {
        return response.json();
}).then( (json) => {
    siguientePagina = json.info.next;
    renderizarPersonajes(json.results);
});


// Funciones
function renderizarPersonajes(personajes) {
    const container = document.getElementById("container");
    for(const personaje of personajes) {
        container.innerHTML += `
            <div class="personaje">
                <img src="${personaje.image}" alt="${personaje.name}">
                <h3>${personaje.name}</h3>
                <h5>${personaje.species}</h5>
            </div>
        `;
    }
}
async function ejecutarRequest() {
fetch("https://rickandmortyapi.com/api/character")
    .then( (response) => {
        return response.json();
    })
    .then( (json) => {
        siguientePagina = json.info.next;
        renderizarPersonajes(json.results);
    });
}

// Inicio del programa
siguientePagina = "";
siguiente = document.getElementById("siguiente");
siguiente.addEventListener("click", () => {
    fetch(siguientePagina).then( (response) => {
        return response.json();
    }).then( (json) => {
        siguientePagina = json.info.next;
        renderizarPersonajes(json.results);
    });
});
ejecutarRequest();