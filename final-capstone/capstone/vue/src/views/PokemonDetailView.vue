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
      <section>
        <div>
          <img src="" alt="" />
          <p>Name:</p>
        </div>
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
      evolutions: [],
    };
  },
  methods: {
    getIdFromUrl(url, firstIndexWord) {
      const wordLength = firstIndexWord.length;
      const startIndex = url.lastIndexOf(firstIndexWord);
      return url.substring(startIndex + wordLength, url.length - 1);
    },
    formatId(id) {
      let idString = id.toString(); //console shows error? but function still works

      while (idString.length < 4) {
        idString = "0" + idString; //ex: 01 -> 001 -> 0001
      }
      return idString;
    },
  },
  computed: {
    pokemonId() {
      return this.$route.params.pokemonId;
    },
  },
  created() {
    PokeApiService.getDetailsByIdOrName(this.pokemonId).then((response) => {
      this.pokemon = response.data;
    });

    PokeApiService.getSpeciesById(this.pokemonId).then((response) => {
      //retrieve evolution id
      this.pokemon.evolutionId = this.getIdFromUrl(
        response.data.evolution_chain.url,
        "chain/"
      );

      PokeApiService.getEvolutions(this.pokemon.evolutionId).then(
        (response) => {
          let path = response.data.chain; // store origin path

          this.evolutions.push(
            //base pokemon
            {
              id: this.getIdFromUrl(path.species.url, "species/"),
              name: path.species.name,
            }
          );

          //while the pokemon has a next evolution
          while (path.evolves_to.length > 0) {
            path = path.evolves_to[0]; //store new evolution path

            this.evolutions.push({
              //evolution pokemon
              id: this.getIdFromUrl(path.species.url, "species/"),
              name: path.species.name,
            });
          }
        }
      );
    });
  },
};
</script>

<style scoped>
#pokemon-details {
  height: 90%;
}

#pokemon-card {
  height: 75%;
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem; /* set default font-size */
}

.header {
  height: fit-content;
  width: fit-content;
  padding-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  text-transform: capitalize;
}

.header > h1 {
  margin-right: 2.5rem;
}

.hashtag {
  padding-right: 0.7rem;
  font-weight: 900;
}

#pokemon-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
    "photo information";
    justify-content: center;
    align-items: center;
    height: 30rem;
    width: 80%;
}

#pokemon-info > .photo {
    grid-area: photo;
}

#pokemon-info > .information {
    grid-area: information;
}
</style>
