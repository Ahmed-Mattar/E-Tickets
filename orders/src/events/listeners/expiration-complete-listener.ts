import { Message } from "node-nats-streaming";
import {
  Subjects,
  listener,
  ExpirationCompleteEvent,
  OrderStatus,
} from "@e-tickets/common";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class ExpirationCompleteListener extends listener<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;

  queueGroupName = queueGroupName;

  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({
      status: OrderStatus.Cancelled,
    });

    msg.ack();
  }
}
