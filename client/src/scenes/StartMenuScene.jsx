import { useGameState } from "../contexts/GameStateContext";
import styles from "./StartMenuScene.module.css";
import joeparty from "../assets/Joeparty.png";

function StartMenu() {
  const { handleCreateLobby } = useGameState();

  return (
    <div className={styles.menuContainer}>
      <img src={joeparty} className={styles.title} />
      <button onClick={handleCreateLobby}>Click here to start!</button>
    </div>
  );
}

export default StartMenu;
