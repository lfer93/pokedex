const pokemonList = document.querySelector("#pokemonList");
const botonesHeader = document.querySelectorAll(".btn-header")
let URL = ("https://pokeapi.co/api/v2/pokemon/");

for (let i = 1; i <= 200; i++){
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke){

    let types = poke.types.map((type) => `<p class="type ${type.type.name}" tipo> ${type.type.name}</p>`);
    types = types.join('');

    let pokeId = poke.id.toString();
        if (pokeId.length === 1) {
            pokeId = "00" + pokeId;
        } else if (pokeId.length === 2){
            pokeId ="0" + pokeId;
        }



    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
                    <p class="pokemon-id-back">#${pokeId}</p>
                    <div class="pokemon-image">
                        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="containter-name">
                            <p class="pokemon-id">#${pokeId}</p>
                            <h2 class="pokemon-name">${poke.name}</h2>
                        </div>
                        <div class="pokemon-types">
                            ${types}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">Height: ${poke.height} ft</p>
                            <p class="stat">Weight: ${poke.weight} lb</p>
                        </div>
                    </div>
                
`;
pokemonList.append(div);
}


botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    pokemonList.innerHTML = "";

    for (let i = 1; i <= 200; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                if(botonId === "see-all") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}))