import { useGameState } from "../../contexts/GameStateContext";
import styles from "./BoardTile.module.css";

function BoardTile({ children, question }) {
  const { handleSelectQuestion } = useGameState();

  return (
    <div
      className={`${styles.boardTile} ${question.answered && styles.hidden}`}
      onClick={() => handleSelectQuestion(question._id)}
    >
      {children}
    </div>
  );
}

export default BoardTile;
