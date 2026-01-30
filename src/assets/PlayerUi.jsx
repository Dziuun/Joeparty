import { useGameState } from "../contexts/GameStateContext";

import styles from "./PlayerUi.module.css";

function PlayerUi() {
  const { players, curPlayer } = useGameState();

  return (
    <div className={styles.uiContainer}>
      {players.map((player) => (
        <div className={styles.playerCard}>
          <span>{player.playerName}</span>
          <span>{player.score}</span>
        </div>
      ))}
    </div>
  );
}

export default PlayerUi;
