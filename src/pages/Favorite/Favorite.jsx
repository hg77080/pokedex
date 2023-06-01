import React from "react";
import "./Favorite.css"
import { PokemonCard } from "../../components/pokemonCard/PokemonCard";
import { useLocation } from "react-router-dom";

export const Favorite = () => {
  const data = JSON.parse(localStorage.getItem("favoriteData"));
  const location=useLocation();
  return (
    <div className="home_container">
      <div className="heading">Favorites</div>
      <div className="pokemon_container">
        {data?.length > 0 ? (
          data?.map((ele) => {
            if (ele) {
              return (
                <PokemonCard
                  id={parseInt(ele?.id, 10)}
                  name={ele?.name}
                  height={ele.height}
                  weight={ele.weight}
                  type={ele.type}
                  pathname={location.pathname}
                />
              );
            }
          })
        ) : (
          <div className="no_text">No Data Found</div>
        )}
      </div>
    </div>
  );
};
