import { useGameState } from "../contexts/GameStateContext";
import styles from "./BoardTile.module.css";

function BoardTile({ children, question }) {
  const { handleQuestionPopup } = useGameState();

  return (
    <div
      className={`${styles.boardTile} ${question.answered && styles.hidden}`}
      onClick={() => handleQuestionPopup(question)}
    >
      {children}
    </div>
  );
}

export default BoardTile;
