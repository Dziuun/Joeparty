import { getRoom } from "../rooms/roomManager.js";
import { getQuestions } from "./questionHandling.js";

export async function initializeGame(player, settings, db) {
  const room = getRoom(player.roomId);

  if (room.host !== player.id) return;
  const { allowedCategories, gameType, answerType } = settings;

  room.gameSettings = settings;

  room.questions = await getQuestions(allowedCategories, db);

  room.gameStatus = "inProgress";

  room.activePlayer = 0;
  return room;
}

export function handleAnswer(answerIndex, player) {
  const room = getRoom(player.roomId);
  console.log(player);
  const curPlayer = room.players[room.activePlayer];
  if (curPlayer.id !== player.id) return;

  if (room.curQuestion.correctAnswerIndex === answerIndex) {
    curPlayer.score += room.curQuestion.questionValue;

    room.questions = room.questions.filter(
      (quest) => quest._id != room.curQuestion._id,
    );

    room.curQuestion = {};
    // anwser is correct.
    // add the points to the cur, delete the question from the questions array, change player
    room.activePlayer < room.players.length - 1
      ? room.activePlayer++
      : (room.activePlayer = 0);
  } else {
    room.activePlayer < room.players.length - 1
      ? room.activePlayer++
      : (room.activePlayer = 0);
  }
  console.log(typeof room.activePlayer);
  return room;
}
