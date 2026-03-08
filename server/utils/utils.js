// client and room transormer to send to clietn

export function serializePlayer(player) {
  const { socket, ...safePlayer } = player;

  return safePlayer;
}

export function serializeRoom(room) {
  const safeRoom = room;

  safeRoom.players.forEach((player) => (player = serializePlayer(player)));

  return safeRoom;
}
