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

function reducer() {}

function GameStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, gameState);

  return (
    <GameStateContext.Provider value={{ x }}>
      {children}
    </GameStateContext.Provider>
  );
}

function useGameState() {
  const context = useContext(GameStateContext);

  return context;
}

export { GameStateProvider, useGameState };
