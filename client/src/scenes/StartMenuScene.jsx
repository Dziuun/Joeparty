import { useState } from "react";
import { useGameState } from "../contexts/GameStateContext";
import styles from "./StartMenuScene.module.css";

function StartMenu() {
  const { handlePressStart, handleCreateLobby } = useGameState();
  const [menuPosition, setMenuPosition] = useState("title");

  // needs a popup for loading data from server

  async function handleClickStart() {
    handlePressStart();
    setMenuPosition("menu/enter");
  }

  function handleClickPlay() {
    setMenuPosition("menu/gameSelect");
  }

  return (
    <div
      className={styles.menuContainer}
      onClick={menuPosition === "title" ? handleClickStart : null}
    >
      {menuPosition === "title" && (
        <span className={styles.gameStartButton}>
          - Click anywhere to start! -
        </span>
      )}
      {menuPosition === "menu/enter" && (
        <div>
          <span onClick={handleClickPlay}>Play</span>
          <span>Shop</span>
          <span>Options</span>
        </div>
      )}
      {menuPosition === "menu/gameSelect" && (
        <div>
          <span onClick={handleCreateLobby}>Multiplayer</span>
          <span>Local</span>
        </div>
      )}
    </div>
  );
}

export default StartMenu;
