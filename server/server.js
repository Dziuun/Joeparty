import { connectDB } from "./db.js";
import dns from "node:dns/promises";
import express from "express";
import categoriesRouter from "./routes/categories.js";
import getQuestionsRouter from "./routes/getQuestions.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function startServer() {
  const db = await connectDB();

  app.use("/api/categories", categoriesRouter(db));
  app.use("/api/getQuestions", getQuestionsRouter(db));

  app.listen(8000, () => console.log("server is listening on the port 8000"));
}

startServer();

// await getQuestions();

// function getQuestions(allowedCategories) {
//   if (allowedCategories.length > 6) getRandomCategories(allowedCategories);

//   getRandomQuestions(allowedCategories);
//   // randomly select categories
//   // form the categories, randomly select 30 questions in order
// }

// app.post("/api/getQuestions", async (req, res) => {
//   const allowedCategories = req.body;
//   const allowedQuestions = getQuestions(allowedCategories);

//   console.log(allowedCategories);
// });

// 1) get categories only, get questions from submited catgory
