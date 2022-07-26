import { Ticket } from "../ticket";

it("optimistic concurrency control", async () => {
  // create an instance of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 10,
    userId: "123",
  });
  // save the ticket to the database
  await ticket.save();
  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id); //version 0
  const secondInstance = await Ticket.findById(ticket.id); //version 0
  // make changes to the tickets we fetched
  firstInstance!.set({ price: 20 });
  secondInstance!.set({ price: 15 });

  // save the first fetched ticket
  await firstInstance!.save(); // it's now version 1
  // save the second fetched ticket  and expect an error

  try {
    await secondInstance!.save();
  } catch (error) {
    return;
  }

  throw new Error("Shouldn't reach this point");
});

it("increments the version on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "khayert",
    price: 20,
    userId: "123",
  });
  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
