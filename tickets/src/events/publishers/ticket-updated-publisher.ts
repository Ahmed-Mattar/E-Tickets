import { Publisher, Subjects, TicketUpdatedEvent } from "@e-tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
