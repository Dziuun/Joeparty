import BoardView from "./BoardView";
import { useGameState } from "../contexts/GameStateContext";

function GameView() {
  const { handleAddPlayer, handleStartGame, gameStatus } = useGameState();

  return (
    <div>
      <button onClick={handleStartGame}>TESTER</button>
      {gameStatus === "inProgress" ? <BoardView /> : ""}
    </div>
  );
}

export default GameView;
