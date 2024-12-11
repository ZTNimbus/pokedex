/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getFullPokedexNumber, getPokedexNumber } from "../utils";
import TypeCard from "./TypeCard";
import Modal from "./Modal";

function PokeCard({ selectedPoke }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [skill, setSkill] = useState(null);
  const [isloadingSkill, setIsLoadingSkill] = useState(false);

  const { name, height, abilities, stats, types, moves, sprites } = data || {};

  //Filters out empty and unnecessary entries in sprites obj
  const imgList = Object.keys(sprites || {}).filter((val) => {
    if (!sprites[val]) return false;
    if (["versions", "other"].includes(val)) return false;

    return true;
  });

  async function fetchMoveData(move, moveUrl) {
    if (isloadingSkill || !localStorage || !moveUrl) return;

    let cache = {};
    if (localStorage.getItem("pokemon-moves")) {
      cache = JSON.parse(localStorage.getItem("pokemon-moves"));
    }

    if (move in cache) {
      setSkill(cache[move]);
      console.log("found skill in cache");

      return;
    }

    setIsLoadingSkill(true);

    try {
      const res = await fetch(moveUrl);
      const data = await res.json();
      console.log("fetched skill from API", data);

      const description = data?.flavor_text_entries?.filter((val) => {
        return val.version_group.name === "firered-leafgreen";
      })[0]?.flavor_text;

      const skillData = {
        name: move,
        description,
      };
      setSkill(skillData);

      cache[move] = skillData;
      localStorage.setItem("pokemon-moves", JSON.stringify(cache));
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingSkill(false);
    }
  }

  useEffect(() => {
    if (isLoading || !localStorage) return;

    //Check if data exists in cache(localStorage)
    let cache = {};

    if (localStorage.getItem("pokedex")) {
      cache = JSON.parse(localStorage.getItem("pokedex"));
    }

    if (selectedPoke in cache) {
      setData(cache[selectedPoke]);
      console.log("found pokemon in cache");

      return;
    }

    //If above cache checks are null, fetch the data and save to cache
    async function fetchData() {
      const baseUrl = "https://pokeapi.co/api/v2/";
      const suffix = `pokemon/${getPokedexNumber(selectedPoke)}`;

      setIsLoading(true);

      try {
        const res = await fetch(baseUrl + suffix);
        const data = await res.json();

        console.log("fetched pokemon");

        setData(data);
        cache[selectedPoke] = data;
        localStorage.setItem("pokedex", JSON.stringify(cache));
        //
      } catch (error) {
        console.log(error.message);
        //
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [selectedPoke, isLoading]);

  if (isLoading || !data)
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );

  return (
    <div className={"poke-card"}>
      {skill && (
        <Modal
          handleCloseModal={() => {
            setSkill(null);
          }}
        >
          <div>
            <h6>Name</h6>
            <h2 className={"skill-name"}>{skill.name.replaceAll("-", " ")}</h2>
          </div>

          <div>
            <h6>Description</h6>
            <p>{skill.description}</p>
          </div>
        </Modal>
      )}

      <div>
        <h4>{`#${getFullPokedexNumber(selectedPoke)}`}</h4>
        <h2>{name}</h2>
      </div>

      <div className={"type-container"}>
        {types.map((typeObj, typeIndex) => (
          <TypeCard type={typeObj?.type?.name} key={typeIndex} />
        ))}
      </div>

      <img
        className={"default-img"}
        src={`/pokemon/${getFullPokedexNumber(selectedPoke)}.png`}
        alt={`${name}-img`}
      />

      <div className={"img-container"}>
        {imgList.map((img, imgIndex) => {
          const url = sprites[img];

          return <img key={imgIndex} alt={`${name}-img-${img}`} src={url} />;
        })}
      </div>

      <h3>Stats</h3>

      <div className={"stats-card"}>
        {stats.map(({ stat, base_stat }, statIndex) => {
          return (
            <div key={statIndex} className={"stat-item"}>
              <p>{stat?.name.replaceAll("-", " ")}</p>
              <h4>{base_stat}</h4>
            </div>
          );
        })}
      </div>

      <h3>Moves</h3>
      <div className={"pokemon-move-grid"}>
        {moves.map((moveObj, moveIndex) => {
          return (
            <button
              className={"pokemon-move button-card"}
              key={moveIndex}
              onClick={() => {
                console.log("trig");

                fetchMoveData(moveObj?.move?.name, moveObj?.move?.url);

                console.log("done");
              }}
            >
              <p>{moveObj?.move.name.replaceAll("-", " ")}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PokeCard;
