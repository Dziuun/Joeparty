import { createContext, useContext, useEffect, useReducer } from "react";

const GameStateContext = createContext();

const gameState = {
  gameStatus: "inactive",
  isLoadingQuestions: false,
  qWindowActive: false,
  curQuestion: {},
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
    case "question/popup":
      return { ...state, curQuestion: action.payload, qWindowActive: true };
    case "question/answered":
      if (action.payload === "correct")
        return {
          ...state,
          players: state.players.map((p) =>
            p.id === state.curPlayer
              ? {
                  ...p,
                  score: p.score + Number(state.curQuestion.questionValue),
                }
              : p,
          ),
          qWindowActive: false,
          curPlayer:
            state.curPlayer < state.players.length ? state.curPlayer + 1 : 1,
          questions: state.questions.map((q) =>
            q.id === state.curQuestion.id ? { ...q, answered: true } : q,
          ),
        };
      else
        return {
          ...state,
          qWindowActive: false,
          curPlayer:
            state.curPlayer < state.players.length ? state.curPlayer + 1 : 1,
          questions: state.questions.map((q) =>
            q.id === state.curQuestion.id ? { ...q, answered: true } : q,
          ),
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
      qWindowActive,
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

  function handleQuestionPopup(question) {
    dispatch({ type: "question/popup", payload: question });
  }

  function handleQuestionAnswer(i) {
    if (curQuestion.correctAnswerIndex === i) {
      dispatch({ type: "question/answered", payload: "correct" });
    } else dispatch({ type: "question/answered", payload: "false" });
  }

  return (
    <GameStateContext.Provider
      value={{
        curQuestion,
        isLoadingQuestions,
        curPlayer,
        qWindowActive,
        players,
        handleAddPlayer,
        handleStartGame,
        handleQuestionPopup,
        handleQuestionAnswer,
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
