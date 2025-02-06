<template>
  <div class="home">
    <h1>All Pokemon</h1>

    <section id="paging-section">
      <div class="results">
        <h2>Results per page:</h2>
        <select
          name="results-per-page"
          id="results-dropdown"
          v-model.number="paging.resultsPerPage.selectedOption"
          @change="updateurl()"
        >
          <option
            v-for="opt in paging.resultsPerPage.options"
            :key="`results-per-page-opt-${opt}`"
            :class="{ selected: opt == paging.resultsPerPage.selectedOption }"
          >
            {{ opt }}
          </option>
        </select>
      </div>

      <div class="btns">
        <a @click="getPrevPokemon">Prev</a>
        <a @click="getNextPokemon">Next</a>
      </div>
    </section>

    <section id="pokemon-list">
      <router-link
        :to="{ name: 'pokemon-details', params: { pokemonId: pokemon.id } }"
        v-for="pokemon in pokemonArray"
        :key="pokemon.name"
        class="pokemon-card"
      >
        <p><i class="hashtag">#</i> {{ formatId(pokemon.id) }}</p>
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
        />
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
      paging: {
        offset: 0,
        resultsPerPage: {
          options: [12, 24, 48],
          selectedOption: 12,
        },
      },
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
      PokeApiService.getPokemon(
        this.paging.offset,
        this.paging.resultsPerPage.selectedOption
      ).then((response) => {
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
      this.paging.offset -= this.paging.resultsPerPage.selectedOption;
      if (this.paging.offset < 0) {
        this.paging.offset = 0;
      }
      this.updateurl();
    },
    getNextPokemon() {
      this.paging.offset += this.paging.resultsPerPage.selectedOption;
      this.updateurl();
    },
    updateurl() {
      this.getPokemon();

      const queryObj = {
        ...this.$route.query,
        resultsPerPage: this.paging.resultsPerPage.selectedOption,
        offset: this.paging.offset,
      };
      this.$router.replace({
        name: this.$route.name,
        query: queryObj,
      });
    },
  },
  created() {
    if (this.$route.query.resultsPerPage != null) {
      this.paging.resultsPerPage.selectedOption = Number(
        this.$route.query.resultsPerPage
      );
    }

    if (this.$route.query.offset != null) {
      this.paging.offset = Number(this.$route.query.offset);
    }

    this.getPokemon();
  },
};
</script>

<style scoped>
h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  padding-left: 2rem;
  padding-top: 1rem;
  color: var(--yellow);
}
h2 {
  font-size: 1.75rem;
  margin-right: 0.5rem;
}

#paging-section {
  display: flex;
  justify-content: end;
  align-items: baseline;
}
.results {
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
}
#results-dropdown {
  margin: 0 1.2rem;
  height: 67%;
  width: 5.7rem;
  font-size: 1.7rem;
  border: 0.4rem solid var(--yellow);
  border-radius: 0.7rem;
  cursor: pointer;
}
#results-dropdown > option {
  font-size: 1.9rem;
}
.selected {
  background-color: var(--blue);
  color: var(--yellow);
  cursor: default;
}
.btns {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 17rem;
  margin-right: 2rem;
  margin-bottom: 0.25rem;
}
.btns > a {
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
.btns > a:hover {
  border-color: var(--turquoise);
  color: var(--blue);
}

#pokemon-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1.5rem 0;
  margin: 1.5rem auto 0;
  height: 42rem;
  max-width: 85%;
  border: 1.25rem ridge var(--turquoise);
  background-color: var(--grey);
  overflow-y: auto;
  scrollbar-color: var(--yellow) var(--blue);
  scrollbar-width: thin;
}
.pokemon-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.25rem inset var(--yellow);
  border-radius: 1rem;
  padding: 1.75rem;
  width: 18rem;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: capitalize;
  background-color: var(--light-grey);
  color: var(--blue);
}
.hashtag {
  font-size: 2rem;
}
.pokemon-card:hover {
  color: var(--red);
}
</style>
