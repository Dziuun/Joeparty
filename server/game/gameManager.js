import { getRoom } from "../rooms/roomManager.js";

export function initializeGame(player) {
  const room = getRoom(player.roomId);
  if (room.host !== player.id) return;

  room.gameStatus = "inProgress";

  return room;
}
