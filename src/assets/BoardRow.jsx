import { useGameState } from "../contexts/GameStateContext";
import BoardTile from "./BoardTile";
import styles from "./BoardRow.module.css";

function BoardRow({ catName }) {
  const { questions } = useGameState();
  const catQuestions = questions.filter((q) => q.category.includes(catName));

  return (
    <div className={styles.boardRow}>
      <span>{catName}</span>
      {catQuestions.map((q) => (
        <BoardTile>{q.questionValue}</BoardTile>
      ))}
    </div>
  );
}

export default BoardRow;
