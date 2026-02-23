import mongoose from "mongoose";

const uri =
  "mongodb+srv://kamildziobekk_db_user:6xue9fBE4QV3rN2C@joepartycluster.4kxkdkf.mongodb.net/joeparty?appName=JoepartyCluster";

export async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected with Mongoose");
    return mongoose.connection;
  } catch (err) {
    console.error("DB connection error:", err);
    throw err;
  }
}
