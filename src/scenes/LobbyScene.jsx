import { useGameState } from "../contexts/GameStateContext";
import styles from "./LobbyScene.module.css";

function LobbyScene() {
  const { handleStartGame, handleAddPlayer, players } = useGameState();

  return (
    <div className={styles.lobbyContainer}>
      <div className={styles.playerContainer}>
        {players.map((player) => (
          <div>{player.playerName}</div>
        ))}
        {players.length < 4 ? <button onClick={handleAddPlayer}>+</button> : ""}
      </div>
      <div className={styles.sideMenuContainer}>
        Anwsers type: written/multichoice Game type: turn based/buzz in
        <button onClick={handleAddPlayer}>back</button>
        <button onClick={handleStartGame}>Start</button>
      </div>
    </div>
  );
}

export default LobbyScene;
