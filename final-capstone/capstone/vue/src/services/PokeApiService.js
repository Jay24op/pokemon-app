import axios from "axios";

const http = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
});

export default {
    
    getMore() {
        return http.get('/pokemon')
    },

    get60() {
        return http.get('/pokemon?offset=0&limit=60')
    },

    getDetailsByIdOrName(idOrName) {
        return http.get(`/pokemon/${idOrName}`)
    },

    getPrev(limit, offset) {
        return http.get(`pokemon?offset=${offset}&limit=${{limit}}`)
    },

    getNext(limit, offset) {
        return http.get(`pokemon?offset=${offset}&limit=${limit}`)
    },
    
    getPokemon(limit, offset) {
        return http.get(`pokemon?offset=${offset}&limit=${limit}`)
    }
}