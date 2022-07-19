import { listener, TicketCreatedEvent, Subjects } from "@e-tickets/common";
import { Message } from "node-nats-streaming";

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
