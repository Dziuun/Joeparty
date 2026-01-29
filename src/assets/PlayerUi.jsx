import { useGameState } from "../contexts/GameStateContext";

function PlayerUi() {
  const { players, curPlayer } = useGameState();

  return (
    <div>
      {players.map((player) => (
        <span>{`${player.playerName} ${player.score} `}</span>
      ))}
    </div>
  );
}

export default PlayerUi;
