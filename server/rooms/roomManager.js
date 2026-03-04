import { randomUUID } from "crypto";

const rooms = new Map();

export function createRoom(player) {
  //create a player id function
  const roomId = "room_" + randomUUID();

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

export function joinRoom(player, roomId) {
  // should probably have a room browser at some point

  const room = getRoom(roomId);

  room.players.push(player);

  return room;
}

export function getRoom(roomId) {
  return rooms.get(roomId);
}
