import React from "react";
import "./PokemonCard.css";
import { Tag } from "../Tag/Tag";
import { toast } from "react-toastify";
import { AiOutlineHeart,AiFillHeart } from "react-icons/ai";
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
  const IsFav = favListData?.some((ele) => ele.id === id);
  const favHandler = () => {
    if (IsFav) {
      let updatedFavList = favListData.filter((ele) => ele.id !== id);
      setFavListData(updatedFavList);
      localStorage.setItem("favoriteData", JSON.stringify(updatedFavList));
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
      localStorage.setItem("favoriteData", JSON.stringify(updatedFavList));
      toast.success(`Add ${name} to Favorites`);
    }
  };

  return (
    <div className="card_box">
      {pathname !== "/favorite" && (
        <div className="fav_icon" onClick={favHandler}>
          {!IsFav ? <AiOutlineHeart /> : <AiFillHeart />}
        </div>
      )}

      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg";
        }}
        alt="name"
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
    </div>
  );
};
