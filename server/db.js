import mongoose from "mongoose";

const uri = "";

export async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected with Mongoose");
  } catch (err) {
    console.error("DB connection error:", err);
  }
}
