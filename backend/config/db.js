import mongoose from "mongoose";

export async function connectDB() {
  try {
    const uri = (process.env.MONGO_URI || "").trim();
    if (!uri) {
      console.error(
        "Missing MONGO_URI in environment variables.\nSet it in backend/.env"
      );
      process.exit(1);
    }
    if (!/^mongodb(\+srv)?:\/\//.test(uri)) {
      console.error(
        "Invalid MONGO_URI scheme. It must start with 'mongodb://' or 'mongodb+srv://'."
      );
      process.exit(1);
    }
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
