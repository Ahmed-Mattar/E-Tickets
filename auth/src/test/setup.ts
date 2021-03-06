import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

// connect to the in memory mongo server before any test
let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdasda";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

// to reset data before each test we run
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// stop server after all the tests finished
afterAll(async () => {
  await mongo.stop();
});
