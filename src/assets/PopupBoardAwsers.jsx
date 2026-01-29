import { useGameState } from "../contexts/GameStateContext";

function PopupBoardAwsers({ answers }) {
  const { handleQuestionAnswer } = useGameState();

  return (
    <div>
      {answers.map((a, i) => (
        <span onClick={() => handleQuestionAnswer(i)}>{a}</span>
      ))}
    </div>
  );
}

export default PopupBoardAwsers;
