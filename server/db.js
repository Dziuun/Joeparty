import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connected with Mongoose");
    return mongoose.connection;
  } catch (err) {
    console.error("DB connection error:", err);
    throw err;
  }
  //TODO Finally to close when app is closed or so
}
