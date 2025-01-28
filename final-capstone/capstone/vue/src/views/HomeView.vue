<template>
  <div class="home">
    <h1>All Pokemon</h1>

    <section id="display">
      <div class="results">
        <h2>Results per page:</h2>
        <select name="result" id="result-dropdown" v-model="limit">
          <!-- review video#2 -->
          <option value="20" :class="{ selected: limit === '20' }">20</option>
          <option value="40" :class="{ selected: limit === '40' }">40</option>
          <option value="60" :class="{ selected: limit === '60' }">60</option>
          <option value="80" :class="{ selected: limit === '80' }">80</option>
        </select>
      </div>
      <!-- <div>
        Results per page:
        <ul>
          <li v-for="opt in "></li>
        </ul>
        <select name="result" id="result-dropdown" v-model="limit">
          <option value="20" :class="{ selected: limit === '20' }">20</option>
          <option value="40" :class="{ selected: limit === '40' }">40</option>
          <option value="60" :class="{ selected: limit === '60' }">60</option>
          <option value="80" :class="{ selected: limit === '80' }">80</option>
        </select> -->
      <!-- </div> -->

      <div class="btns">
        <a @click="getPrevPokemon">Prev</a>
        <a @click="getNextPokemon">Next</a>
      </div>
    </section>

    <section id="pokemon-list">
      <router-link :to="{ name: 'pokemon-details', params: { pokemonId: pokemon.id } }" v-for="pokemon in pokemonArray"
        :key="pokemon.name" class="pokemon-card">
        <p><i class="hashtag">#</i> {{ formatId(pokemon.id) }}</p>
        <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" />
        <h3>{{ pokemon.name }}</h3>
      </router-link>
    </section>
  </div>
</template>

<script>
import PokeApiService from "../services/PokeApiService";

export default {
  data() {
    return {
      pokemonArray: [],
      limit: 20,
      offset: 0,
    };
  },
  methods: {
    formatId(id) {
      while (id.length < 4) {
        id = "0" + id; //ex: 01 -> 001 -> 0001
      }
      return id;
    },
    getPokemon() {
      PokeApiService.getPokemon(this.limit, this.offset).then((response) => {
        this.pokemonArray = response.data.results.map((result) => {
          const indexOfPokemon = result.url.lastIndexOf("pokemon/");
          const indexOfLastSlash = result.url.lastIndexOf("/");
          const id = result.url.substring(indexOfPokemon + 8, indexOfLastSlash);

          return {
            id: id,
            name: result.name,
          };
        });
      });
    },
    getPrevPokemon() {
      if (this.offset - parseInt(this.limit) > 0) {
        this.offset -= parseInt(this.limit);
      } else {
        this.offset = 0;
      }
      this.getPokemon();
    },
    getNextPokemon() {
      this.offset += parseInt(this.limit);
      this.getPokemon();
    },
  },
  created() {
    PokeApiService.getMore().then((response) => {
      this.pokemonArray = response.data.results.map((result) => {
        const indexOfPokemon = result.url.lastIndexOf("pokemon/");
        const indexOfLastSlash = result.url.lastIndexOf("/");
        const id = result.url.substring(indexOfPokemon + 8, indexOfLastSlash);

        return {
          id: id,
          name: result.name,
        };
      });
    });
  },
};
</script>

<style scoped>
h1 {
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--yellow);
}

h2 {
  font-size: 2.5rem;
}

#display {
  display: flex;
  justify-content: end;
  height: 5rem;
}

.results {
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
}

#result-dropdown {
  margin: 0 1.2rem;
  height: 67%;
  width: 5.7rem;
  font-size: 1.7rem;
  border: 0.4rem solid var(--yellow);
  border-radius: 0.7rem;
  cursor: pointer;
}

#result-dropdown>option {
  font-size: 1.9rem;
}

.selected {
  background-color: var(--light-grey);
  color: var(--turquoise);
  cursor: default;
}

.btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 17rem;
  margin-right: 2rem;
  margin-bottom: 0.3rem;
}

.btns>a {
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  padding: 0.7rem 0.5rem;
  height: 70%;
  width: 7.5rem;
  min-width: fit-content;
  border: 0.4rem solid var(--blue);
  border-radius: 0.7rem;
  background-color: var(--yellow);
  cursor: pointer;
}

.btns>a:hover {
  border-color: var(--turquoise);
  color: var(--blue);
}

#pokemon-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  max-height: 30vh;
}

.pokemon-card {
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30rem;
  min-width: fit-content;
  margin: 2.5rem 1rem;
  border: 0.4rem solid black;
  border-radius: 1.8rem;
  padding: 2.5rem 1rem;
  gap: 0.7rem;
  text-transform: capitalize;
  color: var(--blue);
  background-color: var(--light-grey);
}

.pokemon-card:hover {
  color: var(--red);
}

.hashtag {
  font-size: 2rem;
  font-weight: 900;
}

.pokemon-card>img {
  height: 25rem;
}
</style>
