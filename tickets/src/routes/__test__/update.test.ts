import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { signin } from "../../test/setup";

it("return a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", signin())
    .send({
      title: "asdfa",
      price: 20,
    })
    .expect(404);
});

it("return a 401 if the user is not authenticated", async () => {});

it("return a 401 if the user does not own the ticket", async () => {});

it("return a 400 if the user provide invalid title or price", async () => {});

it("updated the ticket provided valid inputs", async () => {});
