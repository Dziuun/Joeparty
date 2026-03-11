// client and room transormer to send to clietn

export function serializePlayer(player) {
  const { socket, ...safePlayer } = player;

  return safePlayer;
}

export function serializeRoom(room) {
  return {
    ...room,
    players: room.players.map((player) => (player = serializePlayer(player))),
    questions: room.questions?.map((question) => serializeQuestion(question)),
    curQuestion: room.curQuestion
      ? serializeCurrentQuestion(room.curQuestion)
      : {},
  };
}

function serializeQuestion(questionObj) {
  const {
    correctAnswerIndex,
    correctAnswers,
    answers,
    question,
    ...safeQuestion
  } = questionObj;

  return safeQuestion;
}

function serializeCurrentQuestion(curQuestion) {
  if (!curQuestion) return;

  const { correctAnswerIndex, correctAnswers, ...safeCurQuestion } =
    curQuestion;

  return safeCurQuestion;
}
