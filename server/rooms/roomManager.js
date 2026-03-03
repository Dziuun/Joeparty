import { randomUUID } from "crypto";

const rooms = new Map();

export function createRoom(player) {
  //create a player id function
  const roomId = randomUUID();
  console.log("I work");

  player.roomId = roomId;

  rooms.set(roomId, {
    roomId,
    host: player.id,
    players: [player],
    questions: [],
    curQuestion: {},
    activePlayer: null,
    roomSettings: { allowedCategories: [], gameType: "", anwserType: "" },
  });
}

export function getRoom(roomId) {
  return rooms.get(roomId);
}
