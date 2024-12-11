import Header from "./components/Header";
import SideNav from "./components/SideNav";
import PokeCard from "./components/PokeCard";
import { useState } from "react";

function App() {
  const [selectedPoke, setSelectedPoke] = useState(0);
  const [showSideMenu, setShowSideMenu] = useState(false);

  function handleToggleMenu() {
    setShowSideMenu((menu) => !menu);
  }

  function handleCloseMenu() {
    setShowSideMenu(false);
  }

  return (
    <>
      <Header handleToggleMenu={handleToggleMenu} />

      <SideNav
        selectedPoke={selectedPoke}
        setSelectedPoke={setSelectedPoke}
        handleToggleMenu={handleToggleMenu}
        showSideMenu={showSideMenu}
        handleCloseMenu={handleCloseMenu}
      />

      <PokeCard selectedPoke={selectedPoke} />
    </>
  );
}

export default App;
