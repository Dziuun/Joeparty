import { randomUUID } from "node:crypto";
import { getRandomIndexNumber } from "../utils.js";

export function createPlayer(socket) {
  const id = randomUUID();
  const playerName = createPlayerName();
  const player = {
    socket,
    id,
    playerName,
    score: 0,
    isHost: false,
    connected: true,
  };

  return player;
}

function createPlayerName() {
  const adjectives = [
    "Silly",
    "Smart",
    "Dirty",
    "Sloppy",
    "Happy",
    "Arrogant",
    "Mighty",
    "Dum",
  ];
  const names = [
    "Joe",
    "Joel",
    "Joenas",
    "Joeshua",
    "Joeseph",
    "Joelle",
    "Joesephina",
    "Joelyn",
    "Joelly",
    "Joeanna",
  ];
  const name = `${adjectives[getRandomIndexNumber(adjectives.length)]} ${names[getRandomIndexNumber(names.length)]}`;
  return name;
}
