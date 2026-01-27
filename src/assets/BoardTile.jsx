import styles from "./BoardTile.module.css";

function BoardTile({ children }) {
  return <div className={styles.boardTile}>{children}</div>;
}

export default BoardTile;
