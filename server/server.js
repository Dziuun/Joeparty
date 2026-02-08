import { createServer } from "http";
import { connectDB, getCollection } from "./db.js";
import { getRandomIndexNumber } from "./utils.js";
import { NUMBER_OF_CATEGORIES, QUESTIONS_PER_CATEGORY } from "../config.js";

const PORT = process.env.PORT;

await connectDB();
const collection = getCollection();

const getRequiredQuestions = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const data = JSON.parse(body);
    const reqCat = data.requestedCategories;
    const reqQuestions = await selectQuestions(reqCat);

    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

    res.end(JSON.stringify(reqQuestions));
  });
};

async function selectQuestions(reqCat) {
  const questions = await collection.find({}).toArray();
  let selCat = [];
  let selQuestions = [];

  if (reqCat.length > 6) selCat = randomizeCategories(reqCat);
  else {
    selCat = reqCat;
  }

  for (let i = 0; i < selCat.length; i++) {
    // this goes over cats
    const curCat = selCat[i];

    for (let j = 1; j < 6; j++) {
      const curCatQuest = questions.filter(
        (q) => q.category === curCat && Number(q.questionValue) === j * 100,
      );

      selQuestions.push(curCatQuest[getRandomIndexNumber(curCatQuest.length)]);
    }
  }

  return selQuestions;
  // 1. Get 6 categories from provided categories 2. get 5 questions for each category 3. qustions need to be in values of 100 => 500
}

function randomizeCategories(reqCat) {
  let selCat = [];

  do {
    const r = getRandomIndexNumber(reqCat.length);
    const curCat = reqCat[r];

    if (!selCat.includes(curCat)) selCat.push(curCat);
  } while (selCat.length < 6);
  console.log(selCat);
  return selCat;
}

const server = createServer(async (req, res) => {
  const questions = await collection.find({}).toArray();
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  } else if (req.url === "/api/questions" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.write(JSON.stringify(questions));
    res.end();
  } else if (req.url === "/api/questions/categories" && req.method === "GET") {
    const categories = [...new Set(questions.map((q) => q.category))];
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.write(JSON.stringify(categories));
    res.end();
  } else if (req.url === "/api/startGame" && req.method === "POST") {
    getRequiredQuestions(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
