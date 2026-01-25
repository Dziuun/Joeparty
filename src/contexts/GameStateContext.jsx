import { act, createContext, useContext, useEffect, useReducer } from "react";

const GameStateContext = createContext();

const gameState = {
  gameStatus: "preparing",
  curQuestion: undefined,
  curPlayer: 1,
  players: [
    { id: 1, playerName: "Dziun", score: 0 },
    { id: 2, playerName: "Nuizd", score: 0 },
  ],
  questions: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "lobby/addPlayer":
      return { ...state, players: [...state.players, action.payload] };
    case "questions/loaded":
      return { ...state, questions: action.payload };
  }
}

function GameStateProvider({ children }) {
  const [{ gameStatus, curQuestion, curPlayer, players, questions }, dispatch] =
    useReducer(reducer, gameState);

  // Lobby functions

  function handleAddPlayer(playerName) {
    const newPlayer = { id: 3, playerName: playerName, score: 0 };

    dispatch({ type: "lobby/addPlayer", payload: newPlayer });
  }

  //Gametime functions

  useEffect(
    function () {
      async function getQuestions() {
        if (gameStatus !== "preparing") return;

        const res = await fetch("http://localhost:3000/qustions");
        const data = await res.json();

        dispatch({ type: "questions/loaded", payload: data });
      }

      getQuestions();
    },
    [gameStatus],
  );

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
