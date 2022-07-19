import { listener } from "./base-listener";
import { Message } from "node-nats-streaming";

export class TicketCreatedListener extends listener {
  subject = "ticket:created";
  queueGroupName = "payments-service";

  onMessage(data: any, msg: Message) {
    console.log("business logic...", data);

    msg.ack(); // successful
  }
}
