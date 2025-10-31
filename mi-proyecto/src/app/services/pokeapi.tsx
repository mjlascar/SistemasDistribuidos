import axios from "axios";

export async function fetchPokemon(id: number) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error al buscar el Pokémon con ID ${id}:`, error);
      throw error;
    }
  };