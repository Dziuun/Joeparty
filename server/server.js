import { connectDB } from "./db.js";
import dns from "node:dns/promises";
import express from "express";
import categoriesRouter from "./routes/categories.js";
import getQuestionsRouter from "./routes/getQuestions.js";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { createPlayer } from "./players/playerManager.js";
import { createRoom, getRoom, joinRoom } from "./rooms/roomManager.js";
import { serializePlayer, serializeRoom } from "./utils/utils.js";
import { initializeGame } from "./game/gameManager.js";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(cors());
dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function startServer() {
  const db = await connectDB();

  app.use("/api/categories", categoriesRouter(db));
  app.use("/api/getQuestions", getQuestionsRouter(db));

  wss.on("connection", (socket, request) => {
    const player = createPlayer(socket);

    socket.on("message", (rd) => {
      const rawMessage = rd.toString();
      const message = JSON.parse(rawMessage);
      let room;

      switch (message.type) {
        case "CREATE_ROOM":
          room = createRoom(player);
          sendRoomInfo(room, "ROOM_INFO");

          break;
        case "JOIN_ROOM":
          room = joinRoom(player, message.roomId);
          sendRoomInfo(room, "ROOM_INFO");
          break;
        case "GAME_INIT":
          room = initializeGame(player);
          sendRoomInfo(room, "GAME_INIT");
          break;
      }
    });

    socket.on("error", (err) => {
      console.error(`Error: ${err.message}: ${ip}`);
    });
    socket.on("close", () => {
      console.log("Client disconected");
    });
  });

  function sendRoomInfo(room, type) {
    const clientSafeRoom = serializeRoom(room);
    room.players.forEach((player) =>
      player.socket.send(
        JSON.stringify({
          type,
          roomInfo: clientSafeRoom,
        }),
      ),
    );
  }

  server.listen(8000, () =>
    console.log("server is listening on the port 8000"),
  );
}

startServer();
