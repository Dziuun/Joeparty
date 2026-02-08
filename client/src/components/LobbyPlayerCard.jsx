import styles from "./LobbyPlayerCard.module.css";
import userImg from "../assets/User_Icon.png";

function LobbyPlayerCard({ player }) {
  return (
    <div className={styles.lobbyCard}>
      <img src={userImg} className={styles.image} />
      <span className={styles.nickname}>{player.playerName}</span>
      <div>a bunch of menu buttons</div>
    </div>
  );
}

export default LobbyPlayerCard;
