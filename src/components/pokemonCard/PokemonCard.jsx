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
  let IsFav = favListData?.some((ele) => ele.id === id);

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
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg";
        }}
      ></img>

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
          text={!IsFav ? "Favorite" : "Favorited"}
          onClick={() => {
            if (IsFav) {
              let updatedFavList = favListData.filter((ele) => ele.id !== id);
              setFavListData(updatedFavList);
              localStorage.setItem(
                "favoriteData",
                JSON.stringify(updatedFavList)
              );
              toast.error(`Remove ${name} from Favorites`);
            } else {
              let updatedFavList = [
                ...favListData,
                {
                  id: id,
                  height: height,
                  weight: weight,
                  type: type,
                  name: name,
                  like: true,
                },
              ];
              setFavListData(updatedFavList);
              localStorage.setItem(
                "favoriteData",
                JSON.stringify(updatedFavList)
              );
              toast.success(`Add ${name} to Favorites`);
            }
          }}
        />
      )}
    </div>
  );
};
