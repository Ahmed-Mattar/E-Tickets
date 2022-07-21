import { Subjects, Publisher, OrderCancelledEvent } from "@e-tickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
