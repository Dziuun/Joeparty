import { useGameState } from "../../contexts/GameStateContext";
import BoardTile from "./BoardTile";
import styles from "./BoardColumns.module.css";

function BoardRow({ catName }) {
  const { questions } = useGameState();
  const catQuestions = questions.filter((q) => q.category.includes(catName));

  return (
    <div className={styles.boardRow}>
      <span>{catName}</span>
      {catQuestions.map((q) => (
        <BoardTile question={q}>{q.questionValue}</BoardTile>
      ))}
    </div>
  );
}

export default BoardRow;
