import { useGameState } from "../../contexts/GameStateContext";
import styles from "./LobbySideMenu.module.css";

function LobbySideMenu() {
  const { handleStartGame, handleMenuSelection, categories, gameSettings } =
    useGameState();

  return (
    <div className={styles.sideMenuContainer}>
      <label>
        Question anwsering style:
        <select>
          <option>Write</option>
          <option>Multichoice</option>
        </select>
      </label>
      Game type:
      <label>
        <select>
          <option>Turn Based</option>
          <option>Buzz in</option>
        </select>
      </label>
      Anwsers type: written/multichoice Game type: turn based/buzz in
      <div>
        {categories.map((cat) => (
          <span>
            {cat}
            <input
              type="checkbox"
              value={cat}
              onChange={(e) => handleMenuSelection(e)}
              checked={gameSettings.allowedCategories.includes(cat)}
            ></input>
          </span>
        ))}
      </div>
      <button>back</button>
      <button onClick={handleStartGame}>Start</button>
    </div>
  );
}

export default LobbySideMenu;
