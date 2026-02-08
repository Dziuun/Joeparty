import LobbySideMenu from "../components/lobby/lobbySideMenu";
import LobbyPlayerCardsCont from "../components/LobbyPlayerCardsCont";

import styles from "./LobbyScene.module.css";

function LobbyScene() {
  return (
    <div className={styles.lobbyContainer}>
      <LobbyPlayerCardsCont />
      <LobbySideMenu />
    </div>
  );
}

export default LobbyScene;
