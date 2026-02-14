import styles from "./GameView.module.css";
import { useGameState } from "../contexts/GameStateContext";
import bg from "../assets/bg.png";

import BoardView from "../components/board/BoardView";
import PopupBoard from "../components/PopupBoard";
import PlayerUi from "../components/PlayerUi";
import StartMenu from "./StartMenuScene";
import LobbyScene from "./LobbyScene";

import joeparty from "../assets/Joeparty.png";

function GameView() {
  const { gameStatus } = useGameState();

  return (
    <div className={styles.gameContainer}>
      <img
        src={joeparty}
        className={`${gameStatus === "title" ? styles.title : styles.titleMin}`}
      />
      {gameStatus === "title" ? <StartMenu /> : ""}
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
      <div className={styles.scrollWrapper}>
        <div className={styles.scrollTrack}>
          <img src={bg} />
          <img src={bg} />
        </div>
      </div>
    </div>
  );
}

export default GameView;
