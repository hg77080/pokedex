import React, { useEffect, useState } from "react";
import "./Home.css";
import { getPokemonList } from "../../services/homepage.service";
import { PokemonCard } from "../../components/pokemonCard/PokemonCard";
import { Button } from "../../components/Button/Button";

export const Home = () => {
  const [OriginalListData, setOriginalListData] = useState([]);
  const [currentListData, setCurrentListData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [favListData, setFavListData] = useState(
    localStorage.getItem("favoriteData")
      ? JSON.parse(localStorage.getItem("favoriteData"))
      : []
  );
  const [inputValue, setInputValue] = useState();
  useEffect(() => {
    getPokemonList().then((res) => {
      setOriginalListData(res);
      setCurrentListData(res.slice(0, limit));
    });
  }, []);
  const loadPokemon = () => {
    setCurrentListData(OriginalListData.slice(0, limit + 10));
    setLimit((prev) => prev + 10);
  };
  const handleSearch = (e) => {
    setInputValue(e.target.value);
  };

  // Search bar functionality
  useEffect(() => {
    if (inputValue?.length > 0) {
      const results = OriginalListData.filter((item) =>
        item.pokemon_name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setCurrentListData(results);
    } else if (inputValue?.length === 0) {
      setCurrentListData(OriginalListData.slice(0, 10));
    }
  }, [inputValue]);
  // sort functionality
  const handleSort = ({ name, type }) => {
    if (type === "asc") {
      setCurrentListData((prev) => {
        prev.sort((a, b) => {
          return a[name] < b[name] ? -1 : 1;
        });
        return [...prev];
      });
    } else {
      setCurrentListData((prev) => {
        prev.sort((a, b) => {
          return b[name] < a[name] ? -1 : 1;
        });
        return [...prev];
      });
    }
  };
  return (
    <>
      <div className="home_container">
        <div className="heading">POKEDEX</div>
        <div className="sort_filter">
          <div className="search_bar">
            <i class="fa fa-search search_icon" aria-hidden="true" />
            <input
              placeholder="Search by name"
              type="text"
              value={inputValue}
              onChange={handleSearch}
              autoComplete="off"
            />
          </div>
          <div className="sort_select">
            <a href="/favorite">Favorite</a>
            <select
              onChange={(e) => {
                let name = e.target.value.split(" ")[0];
                let type = e.target.value.split(" ")[1];
                handleSort({ name: name, type: type });
              }}
            >
              <option disabled selected value>
                {" "}
                -- select an option --{" "}
              </option>
              <option value="pokemon_name asc"> Name(Asc) </option>
              <option value="pokemon_name desc"> Name(Desc) </option>
              <option value="height asc"> Height(Asc)</option>
              <option value="height desc"> Height(Desc)</option>
              <option value="weight asc"> Weight(Asc) </option>
              <option value="weight desc"> Weight(Desc) </option>
            </select>
          </div>
        </div>
        <div className="pokemon_container">
          {currentListData?.map((ele, index) => {
            return (
              <PokemonCard
                id={parseInt(ele?.zukan_id, 10)}
                name={ele?.pokemon_name}
                height={ele.height}
                weight={ele.weight}
                type={ele.pokemon_type_name}
                favListData={favListData}
                setFavListData={setFavListData}
              />
            );
          })}
        </div>
        {currentListData?.length > 0 && (
          <Button text="Load More Pokemon" onClick={loadPokemon} />
        )}
      </div>
    </>
  );
};
