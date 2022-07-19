import { listener } from "./base-listener";
import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("business logic...", data);

    console.log(data.id);
    console.log(data.title);
    console.log(data.price);

    msg.ack(); // successful
  }
}
