<template>
    <div>
        <h1>{{pokemon.name}}</h1>

        <img :src="pokemon.sprites.front_default" alt="Front Image">

        <section>
            <p>Height:{{ pokemon.height }}</p>
            <p>Weight:{{ pokemon.weight }}</p>
        </section>

        <section>
            <!-- evolution section? -->
            <div>
                <img src="" alt="">
                <p>Name:</p>
            </div>
        </section>
    </div>
</template>

<script>
import PokeApiService from '../services/PokeApiService';

export default {
    data() {
        return {
            pokemon: {}
        }
    },
    computed: {
        pokemonId() {
            return this.$route.params.pokemonId;
        }
    },
    created() {
        PokeApiService.getDetailsByIdOrName(this.pokemonId).then(response => {
            this.pokemon = response.data;
        })
    }
}
</script>