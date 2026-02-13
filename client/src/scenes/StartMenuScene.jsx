import { useGameState } from "../contexts/GameStateContext";
import styles from "./StartMenuScene.module.css";
import joeparty from "../assets/Joeparty.png";

function StartMenu() {
  const { handleCreateLobby } = useGameState();

  return (
    <div className={styles.menuContainer} onClick={handleCreateLobby}>
      <img src={joeparty} className={styles.title} />
      <span className={styles.gameStartButton}>
        - Click anywhere! to start! -
      </span>
    </div>
  );
}

export default StartMenu;
