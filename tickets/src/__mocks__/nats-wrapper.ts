import { Subjects } from "@e-tickets/common";

// fake implementation
export const natsWrapper = {
  client: {
    publish: (Subject: string, data: string, callback: () => void) => {
      callback();
    },
  },
};
