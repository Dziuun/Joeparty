import { useGameState } from "../contexts/GameStateContext";
import BoardTile from "./BoardTile";

function BoardRow({ catName }) {
  const { questions } = useGameState();

  return (
    <div>
      {catName}
      {/* {questions.map((question) =>
        question.category === catName ? (
          <BoardTile key={question.questionId}>
            {question.questionValue}
          </BoardTile>
        ) : (
          ""
        ),
      )} */}
    </div>
  );
}

export default BoardRow;
