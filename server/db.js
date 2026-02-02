import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

let collection;

export async function connectDB() {
  try {
    await client.connect();
    const db = client.db("joeparty");
    collection = db.collection("questions");
    console.log("Connected to MongoDB");
    return collection;
  } catch (err) {
    console.error("DB connection error:", err);
  }
}

export function getCollection() {
  return collection;
}
