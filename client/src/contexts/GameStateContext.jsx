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
  players: [], //partially server
  questions: [], //partially server only
  categories: [],
  serverInfo: {
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
        serverInfo: { ...state.serverInfo, allowedCategories: action.payload },
      };
    case "lobby/multi":
      return { ...state, gameStatus: "lobby/multi" };
    case "lobby/update":
      return { ...state, players: action.payload.players };
    case "lobby/menuData":
      return {
        ...state,
        serverInfo: { ...state.serverInfo, allowedCategories: action.payload },
      };

    case "lobby/start":
      return { ...state, gameStatus: action.payload.gameStatus };
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

  const { requestRoom, requestJoinRoom, requestGameStart, messageCourier } =
    useSocket();

  useEffect(
    function () {
      if (!messageCourier) return;
      switch (messageCourier.type) {
        case "ROOM_INFO":
          dispatch({ type: "lobby/update", payload: messageCourier.roomInfo });
          break;
        case "GAME_INIT":
          dispatch({ type: "Lobby/start", payload: messageCourier.roomInfo });
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

    dispatch({ type: "lobby/multi" });
  }

  async function handleJoinMultiplayerGame() {
    await requestJoinRoom();

    dispatch({ type: "lobby/multi" });
  }

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
    //we pass allowed categories in here
    requestGameStart(serverInfo);
  }

  //finished rewrite here for now
  // Lobby functions
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
        handleJoinMultiplayerGame,
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
