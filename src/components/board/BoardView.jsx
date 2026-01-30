import BoardColumns from "./BoardColumns";
import { useGameState } from "../../contexts/GameStateContext";
import styles from "./BoardView.module.css";

const QUESTIONS_PER_CATEGORY = 1;

function BoardView() {
  const { gameStatus, questions } = useGameState();

  const categories = [...new Set(questions.map((q) => q.category))];

  return (
    <div className={styles.boardContainer}>
      {categories.map((cat) => (
        <BoardColumns catName={cat} />
      ))}
    </div>
  );
}

export default BoardView;
