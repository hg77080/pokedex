import axios from "axios";

export const getPokemonList = async ({ limit }) => {
  const data = await axios.get(
    `api/v1?limit=${limit}`
  );
  return data?.data?.pokemons;
};
export const getPokemonDetails = async ({ url }) => {
  const data = await axios.get(url);
  return data.data;
};
