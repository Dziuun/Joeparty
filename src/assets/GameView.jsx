import { useContext, useReducer } from "react";
import BoardView from "./BoardView";
import { useGameState } from "../contexts/GameStateContext";

function GameView() {
  const { x } = useGameState();

  return (
    <div>
      {x}
      {x}
      {x}
      {x}
      {x}
      <BoardView />
    </div>
  );
}

export default GameView;
