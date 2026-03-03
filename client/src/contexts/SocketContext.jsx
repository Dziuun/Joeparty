import { createContext, useContext, useRef, useState } from "react";

const SocketContext = createContext();

function SocketProvider({ children }) {
  const socket = useRef(null);
  const [connected, setConnected] = useState(false);

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
        // handleMessage(data);
      };
    });
  }

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

  function disconnect() {
    socket.current?.close();
    socket.current = null;
  }

  return (
    <SocketContext.Provider value={{ connect, requestRoom }}>
      {children}
    </SocketContext.Provider>
  );
}

function useSocket() {
  return useContext(SocketContext);
}

export { SocketProvider, useSocket };
