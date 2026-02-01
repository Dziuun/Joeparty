import LobbyPlayerCardsCont from "../components/LobbyPlayerCardsCont";
import { useGameState } from "../contexts/GameStateContext";
import styles from "./LobbyScene.module.css";

function LobbyScene() {
  const { handleStartGame, handleAddPlayer, players } = useGameState();

  return (
    <div className={styles.lobbyContainer}>
      <LobbyPlayerCardsCont />
      <div className={styles.sideMenuContainer}>
        Anwsers type: written/multichoice Game type: turn based/buzz in
        <button>back</button>
        <button onClick={handleStartGame}>Start</button>
      </div>
    </div>
  );
}

export default LobbyScene;
