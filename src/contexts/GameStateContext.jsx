import { createContext, useContext, useReducer } from "react";

const GameStateContext = createContext();

const gameState = {
  curQuestion: undefined,
  curPlayer: 1,
  players: [
    { id: 1, playerName: "Dziun", score: 0 },
    { id: 2, playerName: "Nuizd", score: 0 },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "lobby/addPlayer":
      return { ...state, players: [...state.players, action.payload] };
  }
}

function GameStateProvider({ children }) {
  const [{ curQuestion, curPlayer, players }, dispatch] = useReducer(
    reducer,
    gameState,
  );

  function handleAddPlayer(playerName) {
    const newPlayer = { id: 3, playerName: playerName, score: 0 };

    dispatch({ type: "lobby/addPlayer", payload: newPlayer });
  }

  return (
    <GameStateContext.Provider
      value={{ curQuestion, curPlayer, players, handleAddPlayer }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

function useGameState() {
  const context = useContext(GameStateContext);

  return context;
}

export { GameStateProvider, useGameState };
