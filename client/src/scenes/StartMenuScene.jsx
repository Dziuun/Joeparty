import { useState } from "react";
import { useGameState } from "../contexts/GameStateContext";
import styles from "./StartMenuScene.module.css";

function StartMenu() {
  const { handleCreateLobby } = useGameState();
  const [menuPosition, setMenuPosition] = useState("title");
  //handlClickTitle, then another state because this is ehere the app will do the fetching of data anyway ye

  //css clip path is a thing

  function handleClickStart() {
    //THIS IS TEMPORARY BROTHER
    setMenuPosition("menu/enter");
  }

  return (
    <div className={styles.menuContainer} onClick={handleClickStart}>
      {menuPosition === "title" && (
        <span className={styles.gameStartButton}>
          - Click anywhere to start! -
        </span>
      )}
      {menuPosition === "menu/enter" && (
        <div>
          <span onClick={handleCreateLobby}>Start a Game</span>
          <span>Shop</span>
          <span>Options</span>
        </div>
      )}
    </div>
  );
}

export default StartMenu;
