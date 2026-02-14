import { createContext, useContext, useEffect, useReducer } from "react";

const GameStateContext = createContext();

const gameState = {
  gameStatus: "title",
  isLoadingQuestions: false,
  qWindowActive: false,
  curQuestion: {},
  curPlayer: 1,
  players: [{ id: 1, playerName: "Dziun", score: 0 }],
  questions: [],
  categories: [],
  serverInfo: {
    allowedCategories: [],
    gameType: "standard",
    answerType: "multichoice",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "menu/enter":
      return { state, gameStatus: "menu" };
    case "lobby/dataLoaded":
      return {
        ...state,
        categories: action.payload,
        serverInfo: { ...state, allowedCategories: action.payload },
      };
    case "lobby/local":
      return { ...state, gameStatus: "lobby/local" };
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

  //menu functions

  function handleEnterMenu() {}

  // Lobby functions

  useEffect(function () {
    async function getCategories() {
      const res = await fetch("http://localhost:8000/api/questions/categories");
      const data = await res.json();

      dispatch({ type: "lobby/dataLoaded", payload: data });
    }

    getCategories();
  }, []);

  function handleCreateLobby() {
    dispatch({ type: "lobby/local" });
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
    dispatch({ type: "lobby/start" });
  }

  //Gametime functions

  useEffect(
    function () {
      async function getQuestions() {
        if (!isLoadingQuestions) return;

        const res = await fetch("http://localhost:8000/api/startGame", {
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
        curQuestion,
        isLoadingQuestions,
        curPlayer,
        qWindowActive,
        players,
        categories,
        handleCreateLobby,
        handleAddPlayer,
        handleStartGame,
        handleQuestionPopup,
        handleQuestionAnswer,
        handleMenuSelection,
        serverInfo,
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
