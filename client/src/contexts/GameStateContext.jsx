import { createContext, useContext, useEffect, useReducer } from "react";
import { useSocket } from "./SocketContext";

const GameStateContext = createContext();

const gameState = {
  gameStatus: "title",
  isLoadingQuestions: false,
  isLoading: false,
  qWindowActive: false /*local state */,
  curQuestion: {},
  curPlayer: 1,
  players: [{ id: 1, playerName: "Dziun", score: 0 }], //partially server
  questions: [], //partially server only
  categories: [],
  serverInfo: {
    allowedCategories: [],
    gameType: "standard",
    answerType: "multichoice",
  },
};

function reducer(state, action) {
  // Router? PHP Router?
  switch (action.type) {
    case "setLoading":
      return { ...state, isLoading: action.payload };
    case "menu/fetching":
      return {
        ...state,
        isLoading: true,
      };
    case "menu/dataLoaded":
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
        serverInfo: { ...state.serverInfo, allowedCategories: action.payload },
      };
    case "lobby/multi":
      return { ...state, gameStatus: "lobby/multi" };
    case "lobby/addPlayer":
      return { ...state, players: [...state.players, action.payload] };
    case "lobby/menuData":
      return {
        ...state,
        serverInfo: { ...state.serverInfo, allowedCategories: action.payload },
      };
    case "lobby/start":
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
      categories,
      questions,
      serverInfo,
    },
    dispatch,
  ] = useReducer(reducer, gameState);

  const { connect, requestRoom } = useSocket();

  //menu functions

  async function handlePressStart() {
    dispatch({ type: "menu/fetching" });
    const res = await fetch("http://localhost:8000/api/categories");
    const data = await res.json();
    console.log(data);

    dispatch({ type: "menu/dataLoaded", payload: data });
  }

  //finished rewrite here for now

  function handleCreateMultiplayerLobby() {
    requestRoom();
    dispatch({ type: "lobby/multi" });
    // dispatch({ type: "setLoading", payload: true });
    // create a room on the server
  }

  // Lobby functions

  function handleAddPlayer() {
    const id = players.length + 1;
    const newPlayer = { id: id, playerName: `Joe${id}`, score: 0 };

    dispatch({ type: "lobby/addPlayer", payload: newPlayer });
  }

  function handleMenuSelection(e) {
    console.log(e.target.value);
    let selection = serverInfo.allowedCategories;

    if (selection.includes(e.target.value))
      selection = selection.filter((cat) => cat != e.target.value);
    else selection.push(e.target.value);

    if (selection.length < 6) return;

    dispatch({ type: "lobby/menuData", payload: selection });
  }

  function handleStartGame() {
    dispatch({ type: "lobby/start" });
  }

  //Gametime functions

  useEffect(
    function () {
      async function getQuestions() {
        if (!isLoadingQuestions) return;

        const res = await fetch("http://localhost:8000/api/getQuestions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestedCategories: serverInfo.allowedCategories,
          }),
        });
        const data = await res.json();

        dispatch({ type: "game/loaded", payload: data });
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
        gameStatus,
        curQuestion,
        isLoadingQuestions,
        curPlayer,
        qWindowActive,
        players,
        categories,
        handlePressStart,
        handleCreateMultiplayerLobby,
        handleAddPlayer,
        handleStartGame,
        handleQuestionPopup,
        handleQuestionAnswer,
        handleMenuSelection,
        serverInfo,
        questions,
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
