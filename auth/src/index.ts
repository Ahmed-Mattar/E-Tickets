import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  // set using kubectl secrets
  console.log("Starting up...");
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    // instead of localhost url use the service url followed by the port that mongoose use
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!");
  });
};

start();
