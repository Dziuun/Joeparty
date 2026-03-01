import styles from "./ButtonContainer.module.css";

function ButtonContainer({ children }) {
  return <div className={styles.buttonContainer}>{children}</div>;
}

export default ButtonContainer;
