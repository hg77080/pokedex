import axios from "axios";

export const getPokemonList = async () => {
  const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=1200`);
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const arr=["Fire","Grass","Tree","Poison","bug"]
  const updatedList = data?.data?.results?.map((ele, index) => {
    return {
      zukan_id: index + 1,
      pokemon_name: ele.name,
      height: getRandomInt(100),
      weight: getRandomInt(1000),
      pokemon_type_name:arr[getRandomInt(5)],
      like: false,
    };
  });
  return updatedList;
};
