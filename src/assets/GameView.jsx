import { useContext, useReducer } from "react";
import BoardView from "./BoardView";
import { useGameState } from "../contexts/GameStateContext";

function GameView() {
  const { handleAddPlayer } = useGameState();
  const x = "josh";
  return (
    <div>
      <button>TESTER</button>
      <BoardView />
    </div>
  );
}

export default GameView;
