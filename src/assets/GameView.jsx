import { useReducer } from "react";
import BoardView from "./BoardView";
const gameState = {
  curQuestion: undefined,
  curPlayer: 1,
  players: [
    { id: 1, playerName: "Dziun", score: 0 },
    { id: 2, playerName: "Nuizd", score: 0 },
  ],
};

function reducer(state, action) {
    switch(action.type){
        case "addPlayer": return {...state, state.players.push(action.payload) };

        default "siema": return state;
    }
}

function GameView() {
  const [{curQuestion,curPlayer,players}, dispatch] = useReducer(reducer, gameState);


  return (
    <div>
      <BoardView />
    </div>
  );
}

export default GameView;
