import { createServer } from "http";
import { connectDB, getCollection } from "./db.js";

const PORT = process.env.PORT;

await connectDB();

const server = createServer(async (req, res) => {
  if (req.url === "/api/questions" && req.method === "GET") {
    const collection = getCollection();
    const questions = await collection.find({}).toArray();
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.write(JSON.stringify(questions));
    res.end();
  } else {
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
