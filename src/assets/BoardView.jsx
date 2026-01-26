import BoardRow from "./BoardRow";
import { useGameState } from "../contexts/GameStateContext";

const QUESTIONS_PER_CATEGORY = 1;

function BoardView() {
  const { gameStatus, questions } = useGameState();

  return (
    <div>
      {/* this cannot stay as is loading */}
      <p>I am working</p>
      {questions.map((cat, i) =>
        i % QUESTIONS_PER_CATEGORY === 0 ? (
          <BoardRow catName={cat.category} />
        ) : (
          ""
        ),
      )}
    </div>
  );
}

export default BoardView;
