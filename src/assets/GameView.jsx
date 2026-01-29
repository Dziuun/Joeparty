import styles from "./GameView.module.css";
import { useGameState } from "../contexts/GameStateContext";

import BoardView from "./BoardView";
import PopupBoard from "./PopupBoard";
import PlayerUi from "./PlayerUi";

function GameView() {
  const { qWindowActive, handleStartGame, gameStatus, curQuestion } =
    useGameState();

  return (
    <div className={styles.gameContainer}>
      <button onClick={handleStartGame}>TESTER</button>
      {gameStatus === "inProgress" ? <BoardView /> : ""}
      <PopupBoard />
      <PlayerUi />
    </div>
  );
}

export default GameView;
