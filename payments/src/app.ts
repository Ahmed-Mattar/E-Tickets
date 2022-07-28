import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { createChargeRouter } from "./routes/new";
import { errorHandler, NotFoundError, currentUser } from "@e-tickets/common";

const app = express();
//to make express aware that it's behind a proxy ingress
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);
app.use(createChargeRouter);

app.all("*", async (req, res) => {
  //console.log(req.method, req.path);
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
