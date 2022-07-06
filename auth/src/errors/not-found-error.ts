import { CustomError } from "./custom-error";

export class NOtFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Route not found");

    Object.setPrototypeOf(this, NOtFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not Found" }];
  }
}
