import { useGameState } from "../contexts/GameStateContext";
import BoardTile from "./BoardTile";

function BoardRow({ catName }) {
  const { questions } = useGameState();
  const catQuestions = questions.filter((q) => q.category.includes(catName));

  return (
    <div>
      {catName}
      {catQuestions.map((q) => (
        <span>{q.questionValue}</span>
      ))}
    </div>
  );
}

export default BoardRow;
