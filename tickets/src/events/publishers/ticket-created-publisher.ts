import { Publisher, Subjects, TicketCreatedEvent } from "@e-tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
