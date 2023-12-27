import mongoose from "mongoose";
import dotenvConfig from "../config/dotenv.config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(dotenvConfig.mogoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.log(error);
    return error;
  }
};
