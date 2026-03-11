import { createContext, useContext, useEffect, useReducer } from "react";
import { useSocket } from "./SocketContext";

const GameStateContext = createContext();

const gameState = {
  //local
  isLoadingQuestions: false,
  isLoading: false,
  qWindowActive: false,
  isHost: false,
  //api
  categories: [], //consider change to available categories or all categories
  //multi
  roomdId: "",
  gameStatus: "title",
  host: "",
  players: [],
  // current round categories and current round must be added
  curPlayer: 1,
  questions: [],
  curQuestion: {},
  //game type info for server (sent only at game init)
  gameSettings: {
    allowedCategories: [],
    gameType: "standard",
    answerType: "multichoice",
  },
};

function reducer(state, action) {
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
        gameSettings: {
          ...state.gameSettings,
          allowedCategories: action.payload,
        },
      };
    case "lobby/update":
      return { ...state, players: action.payload.players };
    case "lobby/menuData":
      return {
        ...state,
        gameSettings: {
          ...state.gameSettings,
          allowedCategories: action.payload,
        },
      };
    case "question/popup":
      return { ...state, qWindowActive: true };
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
    case "gameState/synchronize":
      return {
        ...state,
        roomId: action.payload.roomId,
        gameStatus: action.payload.gameStatus,
        host: action.payload.host,
        players: action.payload.players,
        questions: action.payload.questions,
        curQuestion: action.payload.curQuestion,
        curPlayer: action.payload.activePlayer,
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
      gameSettings,
    },
    dispatch,
  ] = useReducer(reducer, gameState);

  const {
    requestRoom,
    requestJoinRoom,
    requestGameStart,
    requestQuestion,
    messageCourier,
  } = useSocket();

  useEffect(
    function () {
      if (!messageCourier) return;
      switch (messageCourier.type) {
        case "ROOM_INFO":
          dispatch({
            type: "gameState/synchronize",
            payload: messageCourier.roomInfo,
          });
          break;
        case "GAME_INIT":
          dispatch({
            type: "gameState/synchronize",
            payload: messageCourier.roomInfo,
          });
          break;
        case "QUESTION_SELECTED":
          dispatch({
            type: "gameState/synchronize",
            payload: messageCourier.roomInfo,
          });
          dispatch({ type: "question/popup" });
      }
    },
    [messageCourier],
  );

  //menu functions

  async function handlePressStart() {
    dispatch({ type: "menu/fetching" });
    const res = await fetch("http://localhost:8000/api/categories");
    const data = await res.json();

    dispatch({ type: "menu/dataLoaded", payload: data });
  }

  async function handleCreateMultiplayerLobby() {
    await requestRoom();
  }

  async function handleJoinMultiplayerGame() {
    await requestJoinRoom();
  }

  function handleMenuSelection(e) {
    console.log(e.target.value);
    let selection = gameSettings.allowedCategories;

    if (selection.includes(e.target.value))
      selection = selection.filter((cat) => cat != e.target.value);
    else selection.push(e.target.value);

    if (selection.length < 6) return;

    dispatch({ type: "lobby/menuData", payload: selection });
  }

  function handleStartGame() {
    requestGameStart(gameSettings);
  }

  //Game functions

  function handleSelectQuestion(_id) {
    requestQuestion(_id);
  }

  function handleQuestionAnswer()

  //finished rewrite here for now

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
        handleJoinMultiplayerGame,

        handleStartGame,
        handleSelectQuestion,
        handleQuestionAnswer,
        handleMenuSelection,
        gameSettings,
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
