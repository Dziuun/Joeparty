import styles from "./Button.module.css";

function Button({ children, type, handler = null }) {
  if (type === "menuNav")
    return (
      <div
        className={`${styles.btnWrap} ${styles.navItemWrap}`}
        onClick={handler}
      >
        <div className={styles.btnShadow}></div>
        <button className={styles.btn}>{children}</button>
      </div>
    );

  if (type === "other") return <button>{children}</button>;
}

export default Button;
