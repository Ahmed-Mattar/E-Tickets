import { listener } from "./base-listener";
import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from "./ticket-created-event";
import { subjects } from "./subjects";

export class TicketCreatedListener extends listener<TicketCreatedEvent> {
  subject: subjects.TicketCreated = subjects.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(data: any, msg: Message) {
    console.log("business logic...", data);

    console.log(data.name);
    console.log(data.cost);

    msg.ack(); // successful
  }
}
