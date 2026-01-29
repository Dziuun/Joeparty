import BoardView from "./BoardView";
import { useGameState } from "../contexts/GameStateContext";
import styles from "./GameView.module.css";

function GameView() {
  const { qWindowActive, handleStartGame, gameStatus, curQuestion } =
    useGameState();

  return (
    <div className={styles.gameContainer}>
      <button onClick={handleStartGame}>TESTER</button>
      {gameStatus === "inProgress" ? <BoardView /> : ""}
      <div
        className={`${styles.displayedQuestion} ${!qWindowActive ? styles.hidden : ""}`}
      >
        {curQuestion?.answers?.length > 0 ? (
          <>
            {curQuestion.question}
            {curQuestion.answers.map((anw) => (
              <span>{`${anw} `}</span>
            ))}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default GameView;
