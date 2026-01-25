import { useEffect } from "react";
import BoardRow from "./BoardRow";

const QUESTIONS_PER_CATEGORY = 5;

function BoardView() {
  return (
    <div>
      {/* {testQuestions.map((cat, i) =>
        i % QUESTIONS_PER_CATEGORY === 0 ? (
          <BoardRow catName={cat.category} />
        ) : (
          ""
        ),
      )} */}
    </div>
  );
}

export default BoardView;
