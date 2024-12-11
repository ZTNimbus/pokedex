/* eslint-disable react/prop-types */
import { useState } from "react";
import { first151Pokemon, getFullPokedexNumber } from "../utils";

function SideNav({
  selectedPoke,
  setSelectedPoke,
  handleToggleMenu,
  showSideMenu,
  handleCloseMenu,
}) {
  const [searchValue, setSearchValue] = useState("");

  const filteredPokemon = first151Pokemon.filter((el, i) => {
    if (getFullPokedexNumber(i).includes(searchValue)) return true;
    if (el.toLowerCase().includes(searchValue)) return true;

    return false;
  });

  return (
    <nav className={showSideMenu ? "open" : ""}>
      <div className={`header ${showSideMenu ? "open" : ""}`}>
        <button className={"open-nav-button"} onClick={handleToggleMenu}>
          <i className="fa-solid fa-arrow-left-long" />
        </button>

        <h1 className={"text-gradient"}>Pokédex</h1>
      </div>

      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={"Eg. 001 or Bulbasaur..."}
      />

      {filteredPokemon.map((poke, pokeIndex) => {
        const originalIndex = first151Pokemon.indexOf(poke);

        return (
          <button
            key={pokeIndex}
            className={`nav-card ${
              pokeIndex === selectedPoke ? "nav-card-selected" : ""
            }`}
            onClick={() => {
              setSelectedPoke(originalIndex);
              handleCloseMenu();
            }}
          >
            <p>{getFullPokedexNumber(originalIndex)}</p>
            <p>{poke}</p>
          </button>
        );
      })}
    </nav>
  );
}

export default SideNav;
