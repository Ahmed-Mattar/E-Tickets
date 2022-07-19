import { listener } from "./base-listener";
import { Message } from "node-nats-streaming";

export class TicketCreatedListener extends listener {
  subject = "ticket:created";
  queueGroupName = "payments-service";

  onMessage(data: any, msg: Message) {
    console.log("business logic...", data);

    console.log(data.name);
    console.log(data.cost);

    msg.ack(); // successful
  }
}
