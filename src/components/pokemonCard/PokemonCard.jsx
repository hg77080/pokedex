import React, { useEffect, useState } from "react";
import "./PokemonCard.css";
import { getPokemonDetails } from "../../services/homepage.service";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { toast } from "react-toastify";
export const CommonTextBox = ({ label, value }) => {
  return (
    <>
      <div>
        <div className="card_text_label">{label}</div>
        <div className="card_text_value">{value}</div>
      </div>
    </>
  );
};
export const PokemonCard = ({
  name,
  height,
  weight,
  type,
  id,
  favListData,
  setFavListData,
  pathname,
}) => {
  // const [pokemonData, setPokemonData] = useState();
  // useEffect(() => {
  //   getPokemonDetails({ url: url }).then((res) => {
  //     setPokemonData(res);
  //   });
  // }, []);
  return (
    <div className="card_box">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
      />
      <div className="card_content">
        <CommonTextBox label={"Name"} value={name} />
        <CommonTextBox label={"Height"} value={height} />
        <CommonTextBox label={"Weight"} value={weight} />
      </div>
      <div className="card_tag">
        {type?.split(",")?.map((ele) => (
          <Tag name={ele} />
        ))}
      </div>
      {pathname !== "/favorite" && (
        <Button
          text="Favorite"
          onClick={() => {
            let updatedFavList = [
              ...favListData,
              {
                id: id,
                height: height,
                weight: weight,
                id: id,
                type: type,
                name: name,
              },
            ];
            setFavListData(updatedFavList);
            localStorage.setItem(
              "favoriteData",
              JSON.stringify(updatedFavList)
            );
            toast.success(`Add ${name} to Favorites`);
          }}
        />
      )}
    </div>
  );
};
