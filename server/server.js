import { createServer } from "http";
import { connectDB, getCollection } from "./db.js";

const PORT = process.env.PORT;

await connectDB();

const chooseQuestions = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    const reqCat = JSON.parse(body);
    const x = reqCat.requestedCategories;
    const collection = getCollection();
    const questions = await collection.find({}).toArray();
    const filteredQuestions = questions.filter((q) => x.includes(q.category));
    console.log(filteredQuestions);
    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    console.log(filteredQuestions);
    res.end(JSON.stringify(filteredQuestions));
  });
};

const server = createServer(async (req, res) => {
  const collection = getCollection();
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  } else if (req.url === "/api/questions" && req.method === "GET") {
    const questions = await collection.find({}).toArray();
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.write(JSON.stringify(questions));
    res.end();
  } else if (req.url === "/api/questions/categories" && req.method === "GET") {
    const questions = await collection.find({}).toArray();
    const categories = [...new Set(questions.map((q) => q.category))];
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.write(JSON.stringify(categories));
    res.end();
  } else if (req.url === "/api/startGame" && req.method === "POST") {
    chooseQuestions(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
