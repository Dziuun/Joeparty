import { connectDB } from "./db.js";
import dns from "node:dns/promises";
import express from "express";
import categoriesRouter from "./routes/categories.js";
import getQuestionsRouter from "./routes/getQuestions.js";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });
const rooms = new Map();

app.use(express.json());
app.use(cors());
dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function startServer() {
  const db = await connectDB();

  app.use("/api/categories", categoriesRouter(db));
  app.use("/api/getQuestions", getQuestionsRouter(db));

  app.listen(8000, () => console.log("server is listening on the port 8000"));

  // wss.on("connection", (socket) => {
  //   // socket.on("error", (err) => {
  //   //   console.error(`Error: ${err.message}: ${ip}`);
  //   // });
  //   // socket.on("close", () => {
  //   //   console.log("Client disconected");
  //   // });
  // });
}

startServer();
