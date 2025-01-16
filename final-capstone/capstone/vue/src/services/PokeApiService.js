import axios from "axios";

const http = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
});

export default {
    
    getMore() {
        return http.get('/pokemon')
    },

    getDetailsByIdOrName(idOrName) {
        return http.get(`pokemon/${idOrName}`)
    }
}