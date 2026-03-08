import { useState } from "react";
import { useGameState } from "../contexts/GameStateContext";
import styles from "./StartMenuScene.module.css";
import Button from "../components/Button";
import ButtonContainer from "../components/ButtonContainer";

function StartMenu() {
  const {
    handlePressStart,
    handleCreateMultiplayerLobby,
    handleJoinMultiplayerGame,
  } = useGameState();
  const [menuPosition, setMenuPosition] = useState("title");

  // needs a popup for loading data from server

  async function handleClickStart() {
    handlePressStart();
    setMenuPosition("menu/enter");
  }

  function handleClickPlay(e) {
    e.preventDefault();
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
        <ButtonContainer>
          <Button type="menuNav" handler={handleClickPlay}>
            Play
          </Button>
          <Button type="menuNav">Shop</Button>
          <Button type="menuNav">Options</Button>
        </ButtonContainer>
      )}
      {menuPosition === "menu/gameSelect" && (
        <ButtonContainer>
          <Button type="menuNav" handler={handleJoinMultiplayerGame}>
            Quick play
          </Button>
          <Button type="menuNav" handler={handleCreateMultiplayerLobby}>
            Create a room
          </Button>
          <Button type="menuNav" handler={handleJoinMultiplayerGame}>
            Join a room
          </Button>
        </ButtonContainer>
      )}
    </div>
  );
}

export default StartMenu;
