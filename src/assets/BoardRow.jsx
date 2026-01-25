import BoardTile from "./BoardTile";

function BoardRow({ catName }) {
  return (
    <div>
      {catName}
      {testQuestions.map((question) =>
        question.category === catName ? (
          <BoardTile
            key={question.questionId}
            onClick={() => handleChooseQuestion(question)}
          >
            {question.questionValue}
          </BoardTile>
        ) : (
          ""
        ),
      )}
    </div>
  );
}

export default BoardRow;
