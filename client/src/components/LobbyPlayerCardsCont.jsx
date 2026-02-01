import { useGameState } from "../contexts/GameStateContext";
import styles from "./LobbyPlayerCardsCont.module.css";

import LobbyPlayerCard from "./LobbyPlayerCard";

function LobbyPlayerCardsCont() {
  const { players, handleAddPlayer } = useGameState();

  return (
    <div className={styles.playerContainer}>
      {players.map((player) => (
        <LobbyPlayerCard player={player}>{player.playerName}</LobbyPlayerCard>
      ))}
      {players.length < 4 ? (
        <button className={styles.addPlayerButton} onClick={handleAddPlayer}>
          +
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default LobbyPlayerCardsCont;
