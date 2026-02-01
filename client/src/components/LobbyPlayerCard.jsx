import styles from "./LobbyPlayerCard.module.css";

function LobbyPlayerCard({ player }) {
  return <div className={styles.lobbyCard}>{player.playerName}</div>;
}

export default LobbyPlayerCard;
