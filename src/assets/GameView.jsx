import BoardView from "./BoardView";
import { useGameState } from "../contexts/GameStateContext";
import styles from "./GameView.module.css";
import PopupBoard from "./PopupBoard";

function GameView() {
  const { qWindowActive, handleStartGame, gameStatus, curQuestion } =
    useGameState();

  return (
    <div className={styles.gameContainer}>
      <button onClick={handleStartGame}>TESTER</button>
      {gameStatus === "inProgress" ? <BoardView /> : ""}
      <PopupBoard />
    </div>
  );
}

export default GameView;
