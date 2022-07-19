import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  // set using kubectl secrets
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await natsWrapper.connect("ticketing", "asda", "http://nats-srv:4222");
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    // windows platform issues on SIGINT and SIGTERM
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
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
