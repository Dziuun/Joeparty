import { useGameState } from "../contexts/GameStateContext";

import styles from "./PopupBoardAnwsers.module.css";

function PopupBoardAwsers({ answers }) {
  const { handleQuestionAnswer } = useGameState();

  return (
    <div className={styles.answersContainer}>
      {answers.map((a, i) => (
        <span className={styles.answer} onClick={() => handleQuestionAnswer(i)}>
          {a}
        </span>
      ))}
    </div>
  );
}

export default PopupBoardAwsers;
