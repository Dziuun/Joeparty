import { createContext, useContext, useRef, useState } from "react";

const SocketContext = createContext();

function SocketProvider({ children }) {
  const socket = useRef(null);
  const [connected, setConnected] = useState(false);
  const [messageCourier, setMessageCourier] = useState(null);

  function connect() {
    return new Promise((resolve, reject) => {
      socket.current = new WebSocket("ws://localhost:8000");

      socket.current.onopen = () => {
        setConnected(true);
        resolve();
      };
      socket.current.onclose = () => {
        setConnected(false);
      };
      socket.current.onerror = (e) => {
        console.error("WS error", e);
        reject(e);
      };
      socket.current.onmessage = (e) => {
        const data = JSON.parse(e.data);

        handleMessage(data);
      };
    });
  }

  function handleMessage(data) {
    setMessageCourier(data);
  }

  // async function innitConnection() {
  //   socket.current.send(JSON.stringify({ type: "INIT_PLAYER" }));
  // }

  async function requestRoom() {
    try {
      await connect();
      socket.current.send(JSON.stringify({ type: "CREATE_ROOM" }));
    } catch {
      throw new Error(
        "Sorry! Failed to create game lobby. Please try again later!",
      );
    }
  }

  async function requestJoinRoom(roomId = "random") {
    await connect();
    try {
      await connect();
      socket.current.send(JSON.stringify({ type: "JOIN_ROOM", roomId }));
    } catch {
      throw new Error(
        "Sorry! Failed to find a game lobby. Please try again later!",
      );
    }
  }

  function requestGameStart(settings) {
    socket.current.send(JSON.stringify({ type: "GAME_INIT", settings })); //TODO Can it be send without Serialization?
  }

  function requestQuestion(questionId) {
    socket.current.send(
      JSON.stringify({ type: "QUESTION_SELECTED", questionId }),
    );
  }

  function requestValidation(answerIndex) {
    socket.current.send(
      JSON.stringify({ type: "QUESTION_ANSWERED", answerIndex }),
    );
  }

  function disconnect() {
    socket.current?.close();
    socket.current = null;
  }

  return (
    <SocketContext.Provider
      value={{
        connect,
        requestRoom,
        requestJoinRoom,
        requestGameStart,
        requestQuestion,
        requestValidation,
        messageCourier,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

function useSocket() {
  return useContext(SocketContext);
}

export { SocketProvider, useSocket };
