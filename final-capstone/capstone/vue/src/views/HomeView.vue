<template>
  <div class="home">
    <h1>All Pokemon</h1>
    
    <section>
      <button>Prev</button>
      <button>Next</button>

      <div>
        <h2>Results per page:</h2>
        <ul>
          <li class="selected">10</li>
          <li>20</li>
          <li>50</li>
        </ul>
      </div>
    </section>
    <section id="pokemon-list">
      <router-link :to="{name: 'pokemon-details', params: {pokemonId: pokemon.id}}" class="pokemon-card" v-for="pokemon in pokemonArray" :key="pokemon.name">
        <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}`">
      {{ pokemon.name }}
    </router-link>
    </section>
  </div>
</template>

<script>
import PokeApiService from '../services/PokeApiService';

export default {
  data() {
    return {
      pokemonArray: []
    }
  },
  created() {
    PokeApiService.getMore().then(response => {
      this.pokemonArray = response.data.results.map(result => {
        const indexOfPokemon = result.url.lastIndexOf('/pokemon/');
        const indexOfLastSlash = result.url.lastIndexOf('/');
        const id = result.url.substring(indexOfLastSlash - 1, indexOfLastSlash)
        console.log(id)

        return {
          id: id,
          name:result.name,
        }
      })
    })
  }

};
</script>

<style scoped>

#pokemon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.pokemon-card {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 8px;
  padding: 10px;
  gap: 4px;
}

</style>
