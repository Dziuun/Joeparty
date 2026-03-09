// client and room transormer to send to clietn

export function serializePlayer(player) {
  const { socket, ...safePlayer } = player;

  return safePlayer;
}

export function serializeRoom(room) {
  return {
    ...room,
    players: room.players.map((player) => (player = serializePlayer(player))),
    questions: room.questions.map(
      (question) => (question = serializeQuestion(question)),
    ),
  };
}

function serializeQuestion(question) {
  const { correctAnswerIndex, correctAnswers, ...safeQuestion } = question;

  return safeQuestion;
}
