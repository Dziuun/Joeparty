import BoardRow from "./BoardRow";
import { useGameState } from "../contexts/GameStateContext";

const QUESTIONS_PER_CATEGORY = 1;

function BoardView() {
  const { gameStatus, questions } = useGameState();

  const categories = [...new Set(questions.map((q) => q.category))];

  return (
    <div>
      <p>I am working</p>
      {categories.map((cat) => (
        <BoardRow catName={cat} />
      ))}
    </div>
  );
}

export default BoardView;
