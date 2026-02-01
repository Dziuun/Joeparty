import GameView from "./scenes/GameView";
import { GameStateProvider } from "./contexts/GameStateContext";

function App() {
  return (
    <GameStateProvider>
      <div>
        {/* <p>{testQuestions[0].category}</p> */}
        <GameView />
      </div>
    </GameStateProvider>
  );
}

export default App;
