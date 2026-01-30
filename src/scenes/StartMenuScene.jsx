import { useGameState } from "../contexts/GameStateContext";
import styles from "./StartMenuScene.module.css";
function StartMenu() {
  const { handleCreateLobby } = useGameState();

  return (
    <div className={styles.menuContainer}>
      <h1 className={styles.title}>JOEPARTY!!!</h1>
      <button onClick={handleCreateLobby}>Click here to start!</button>
    </div>
  );
}

export default StartMenu;
