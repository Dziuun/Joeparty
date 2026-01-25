import GameView from "./assets/GameView";
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
