import { randomUUID } from "crypto";
import { getRandomIndexNumber } from "../utils.js";

const rooms = new Map();

export function createRoom(player) {
  //create a player id function
  const roomId = "room_" + randomUUID();

  player.roomId = roomId;

  rooms.set(roomId, {
    roomId,
    gameStatus: "lobby",
    host: player.id,
    players: [player],
    questions: [],
    curQuestion: {},
    activePlayer: null,
    gameSettings: { allowedCategories: [], gameType: "", anwserType: "" },
  });

  return getRoom(roomId);
}

export function joinRoom(player, roomId) {
  // should probably have a room browser at some point

  if (roomId === "random") {
    const joinableRooms = [...rooms.values()].filter(
      (room) => room.players.length < 4,
    );
    const randomRoom =
      joinableRooms[getRandomIndexNumber(joinableRooms.length)];

    randomRoom.players.push(player);

    return randomRoom;
  }

  const room = getRoom(roomId);

  room.players.push(player);

  return room;
}

export function getRoom(roomId) {
  return rooms.get(roomId);
}
