import { getRoom } from "../rooms/roomManager.js";
import { getQuestions } from "./questionHandling.js";

export async function initializeGame(player, settings, db) {
  const room = getRoom(player.roomId);
  const { allowedCategories, gameType, answerType } = settings;

  if (room.host !== player.id) return;

  room.questions = await getQuestions(allowedCategories, db);

  room.gameStatus = "inProgress";

  return room;
}
