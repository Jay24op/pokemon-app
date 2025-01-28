<template>
    <div id="pokemon-details">
        <section id="pokemon-card">
            <div class="header">
                <h1>{{ pokemon.name }}</h1>
                <p><i class="hashtag">#</i>{{ formatId(pokemon.id) }}</p>
            </div>

            <section id="pokemon-info">
                <div class="photo">
                    <img :src="pokemon.sprites.front_default" alt="Front Image" />
                </div>
                <div class="information">
                    <p>Height:{{ pokemon.height }}</p>
                    <p>Weight:{{ pokemon.weight }}</p>
                </div>
            </section>

            <!-- evolution section? -->
            <section id="evolution-details">
                <h2>Evolutions</h2>
                <section class="evolution-list">
                    <div class="evolution" v-for="evolution in pokemonEvolutions" :key="evolution.id">
                        <img :src="evolution.photoUrl" :alt="`${evolution.name} photo`" />
                        <div class="header">
                            <h3>{{ evolution.name }}</h3>
                            <p><i class="hashtag">#</i>{{ formatId(evolution.id) }}</p>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    </div>
</template>

<script>
import PokeApiService from "../services/PokeApiService";

export default {
    data() {
        return {
            pokemon: {},
            pokemonEvolutions: [],
            listOfEvolutions: []
        };
    },
    methods: {
        getIdFromUrl(url, firstIndexWord) {
            const wordLength = firstIndexWord.length;
            const startIndex = url.lastIndexOf(firstIndexWord);
            return url.substring(startIndex + wordLength, url.length - 1);
        },
        formatId(id) {
            let idString = String(id); //console shows error? but function still works

            while (idString.length < 4) {
                idString = "0" + idString; //ex: 01 -> 001 -> 0001
            }
            return idString;
        },
        getSpeciesDetails() {
            PokeApiService.getSpeciesById(this.pokemonId).then(response => {
                //retrieve evolution id
                this.pokemon.evolutionId = this.getIdFromUrl(
                    response.data.evolution_chain.url,
                    "chain/"
                );

                //retrieve list of flavor text
                let textId = 0;
                this.pokemon.flavorTextList = response.data.flavor_text_entries.map(flavorObject => {
                    textId++;
                    return {
                        textId: textId,
                        text: flavorObject.flavor_text
                    };
                });

                //retrieve list of evolutions
                this.getEvolutionDetails();
            })
        },
        getEvolutionDetails() {
            PokeApiService.getEvolutions(this.pokemon.evolutionId).then(response => {
                let path = response.data.chain; // store origin path
                const id = this.getIdFromUrl(path.species.url, "species/"); //store id
                this.addEvolution(id, path.species.name); //base pokemon

                //while the pokemon has a next evolution
                while (path.evolves_to.length > 0) {
                    path = path.evolves_to[0]; //store new evolution path
                    const id = this.getIdFromUrl(path.species.url, "species/"); //store id
                    this.addEvolution(id, path.species.name) //evolution pokemon
                }
            });
        },
        addEvolution(id, name) {
            PokeApiService.getDetailsByIdOrName(id).then((response) => {
                this.pokemonEvolutions.push({
                    id: id,
                    name: name,
                    photoUrl: response.data.sprites.front_default
                });
            })
        },
    },
    computed: {
        pokemonId() {
            return this.$route.params.pokemonId;
        },
    },
    created() {
        PokeApiService.getDetailsByIdOrName(this.pokemonId).then((response) => {
            //retrieve data of pokemon
            this.pokemon = response.data;
        });
        this.getSpeciesDetails();
    },
};
</script>

<style scoped>
#pokemon-details {
    height: 90%;
}

#pokemon-card {
    height: 75%;
    margin: 0 5rem;
    display: flex;
    flex-direction: column;
    font-size: 2.4rem;
    /* set default font-size */
}

.header {
    height: fit-content;
    padding-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    font-size: 2rem;
    text-transform: capitalize;
}

.header>h1,
.hashtag {
    padding: 1rem;
}

.hashtag {
    padding-right: 0.7rem;
    font-weight: 900;
}

#pokemon-info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    height: 30rem;
    margin: 0 auto;
}

#pokemon-info>.photo {
    height: 100%;
    margin: 0 auto;
}

#pokemon-info>.photo>img {
    border: 0.3rem solid red;
    border-radius: 1.2rem;
    height: 100%;
}

#pokemon-info>.information {
    margin-left: 2rem;
}
</style>
