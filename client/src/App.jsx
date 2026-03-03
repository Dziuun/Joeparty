import GameView from "./scenes/GameView";
import { GameStateProvider } from "./contexts/GameStateContext";
import { SocketProvider } from "./contexts/SocketContext";

function App() {
  return (
    <SocketProvider>
      <GameStateProvider>
        <div>
          <GameView />
        </div>
      </GameStateProvider>
    </SocketProvider>
  );
}

export default App;
