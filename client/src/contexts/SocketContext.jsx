import { createContext, useRef, useState } from "react";

const SocketContext = createContext();

function SocketProvider({ children }) {
  const socket = useRef(null);
  const [connected, setConnected] = useState(false);

  function connect() {
    socket.current = new WebSocket("ws://Localhost:8000");

    socket.current.onopen = () => setConnected(true);
    socket.current.onclose = () => setConnected(false);
    socket.current.onerror = (e) => console.error("WS error", e);
    socket.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      handleMessage(data);
    };
  }

  function disconnect() {
    socket.current?.close();
    socket.current = null;
  }

  return (
    <SocketContext.Provider value={{ connect }}>
      {children}
    </SocketContext.Provider>
  );
}

function useSocket() {
  return useContext(SocketContext);
}

export { SocketProvider, useSocket };
