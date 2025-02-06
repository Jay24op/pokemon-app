import axios from "axios";

const http = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export default {
  getMore() {
    return http.get("/pokemon");
  },

  getPokemon(offset = 0, limit = 4) {
    return http.get(`pokemon?offset=${offset}&limit=${limit}`);
  },

  getDetailsByIdOrName(idOrName) {
    return http.get(`/pokemon/${idOrName}`);
  },

  getEvolutions(evolutionId) {
    return http.get(`/evolution-chain/${evolutionId}`);
  },

  getSpeciesById(id) {
    return http.get(`/pokemon-species/${id}`);
  },
};
