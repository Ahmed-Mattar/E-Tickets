import Queue from "bull";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

// this is where we process the job when we get it back from redis server
expirationQueue.process(async (job) => {
  console.log(
    "publish an expiration:complete event for orderId",
    job.data.orderId
  );
});

export { expirationQueue };
