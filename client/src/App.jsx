import GameView from "./scenes/GameView";
import { GameStateProvider } from "./contexts/GameStateContext";

function App() {
  return (
    <GameStateProvider>
      <div>
        <GameView />
      </div>
    </GameStateProvider>
  );
}

export default App;
