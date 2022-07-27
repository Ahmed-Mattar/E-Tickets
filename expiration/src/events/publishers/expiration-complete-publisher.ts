import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@e-tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
