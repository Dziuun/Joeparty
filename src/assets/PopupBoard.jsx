import styles from "./PopupBoard.module.css";
import { useGameState } from "../contexts/GameStateContext";

import PopupBoardAwsers from "./PopupBoardAwsers";

function PopupBoard() {
  const { qWindowActive, curQuestion } = useGameState();

  return (
    <div
      className={`${styles.displayedQuestion} ${!qWindowActive ? styles.hidden : ""}`}
    >
      {curQuestion?.answers?.length > 0 ? (
        <>
          {curQuestion.question}

          <PopupBoardAwsers answers={curQuestion.answers} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default PopupBoard;
