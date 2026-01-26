import { act, createContext, useContext, useEffect, useReducer } from "react";

const GameStateContext = createContext();

const gameState = {
  gameStatus: "inactive",
  isLoadingQuestions: false,
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
    case "game/loading":
      return { ...state, isLoadingQuestions: true };
    case "game/loaded":
      return {
        ...state,
        questions: action.payload,
        isLoadingQuestions: false,
        gameStatus: "inProgress",
      };
  }
}

function GameStateProvider({ children }) {
  const [
    {
      gameStatus,
      isLoadingQuestions,
      curQuestion,
      curPlayer,
      players,
      questions,
    },
    dispatch,
  ] = useReducer(reducer, gameState);

  // Lobby functions

  function handleStartGame() {
    dispatch({ type: "game/loading" });
  }

  function handleAddPlayer(playerName) {
    const newPlayer = { id: 3, playerName: playerName, score: 0 };

    dispatch({ type: "lobby/addPlayer", payload: newPlayer });
  }

  //Gametime functions

  useEffect(
    function () {
      async function getQuestions() {
        if (!isLoadingQuestions) return;

        const res = await fetch("http://localhost:3000/qustions");
        const data = await res.json();

        return dispatch({ type: "game/loaded", payload: data });
      }

      getQuestions();
    },
    [isLoadingQuestions],
  );

  return (
    <GameStateContext.Provider
      value={{
        curQuestion,
        isLoadingQuestions,
        curPlayer,
        players,
        handleAddPlayer,
        handleStartGame,
        questions,
        gameStatus,
      }}
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
