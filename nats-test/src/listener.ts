import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    .setDeliverAllAvailable() // important for the very first time
    .setManualAckMode(true);

  const subscription = stan.subscribe(
    "ticket:created",
    "Orders-service-Qgroup",
    options
  );

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(
        `Received event #${msg.getSequence()}, with data: ${msg.getData()}`
      );

      msg.ack();
    }
  });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());

abstract class listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;
  private client: Stan;
  protected ackWait = 5 * 1000; // 5 sec acknowledge wait

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return (
      this.client
        .subscriptionOptions()
        .setDeliverAllAvailable()
        // that's going to make sure that the very first time our subscription is created,
        //we get all messages on this channel that have ever been emitted.
        .setManualAckMode(true)
        .setAckWait(this.ackWait)
        .setDurableName(this.queueGroupName)
    ); //Doing this causes the NATS Streaming server to track the last acknowledged message for that clientID + durable name, so that only messages since the last acknowledged message will be delivered to the client.
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message recieved: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
