import styles from "./GameView.module.css";
import { useGameState } from "../contexts/GameStateContext";

import BoardView from "../components/board/BoardView";
import PopupBoard from "../components/PopupBoard";
import PlayerUi from "../components/PlayerUi";
import StartMenu from "./StartMenuScene";
import LobbyScene from "./LobbyScene";

function GameView() {
  const { gameStatus } = useGameState();

  return (
    <div className={styles.gameContainer}>
      {gameStatus === "inactive" ? <StartMenu /> : ""}
      {gameStatus === "lobby/local" ? <LobbyScene /> : ""}
      {gameStatus === "inProgress" ? (
        <>
          <BoardView />
          <PopupBoard />
          <PlayerUi />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default GameView;
