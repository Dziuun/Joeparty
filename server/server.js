import { connectDB } from "./db.js";
import dns from "node:dns/promises";
import express from "express";
import categoriesRouter from "./routes/categories.js";
import getQuestionsRouter from "./routes/getQuestions.js";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { createPlayer } from "./players/playerManager.js";
import { createRoom, getRoom } from "./rooms/roomManager.js";

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
    console.log(player.playerName);

    socket.on("message", (rd) => {
      const rawMessage = rd.toString();
      const message = JSON.parse(rawMessage);
      console.log(message);

      switch (message.type) {
        case "CREATE_ROOM":
          createRoom(player);
          console.log(getRoom(player.roomId));
      }
    });

    socket.on("error", (err) => {
      console.error(`Error: ${err.message}: ${ip}`);
    });
    socket.on("close", () => {
      console.log("Client disconected");
    });
  });

  server.listen(8000, () =>
    console.log("server is listening on the port 8000"),
  );
}

startServer();
