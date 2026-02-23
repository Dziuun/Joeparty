import { connectDB } from "./db.js";
import dns from "node:dns/promises";
import express from "express";

const app = express();
dns.setServers(["1.1.1.1", "8.8.8.8"]);
let db;

async function connectplz() {
  db = await connectDB();
}

// async function getQuestions() {
//   try {
//     const questions = db.collection("questions");
//     const allQuestions = await questions.find({}).toArray();
//     console.log(allQuestions);
//   } catch (err) {
//     console.error(err);
//   }
// }

await connectplz();
// await getQuestions();

app.get("/api/categories", async (req, res) => {
  console.log("I WORK");
  const cats = await db.collection("questions").distinct("category");

  console.log(cats);
  res.json(cats);
});

app.listen(8000, () => console.log("server is listening on the port 8000"));
// 1) get categories only, get questions from submited catgory
