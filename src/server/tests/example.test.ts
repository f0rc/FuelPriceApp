import { type inferProcedureInput } from "@trpc/server";
import { createTestContext } from "./testingConfig";
import { type AppRouter } from "../api/root";
import type { Example } from "@prisma/client";

test("hello test", async () => {
  const { caller } = createTestContext({
    session: false,
  });

  type Input = inferProcedureInput<AppRouter["example"]["hello"]>;

  const input: Input = {
    text: "Test",
  };

  const result = await caller.example.hello(input);

  expect(result).toStrictEqual({ greeting: "Hello Test" });
});

// test with mock prisma db
test("mock db example test", async () => {
  const { caller, prismaMock } = createTestContext({
    session: true,
  });
  const mockOutput: Example[] = [
    {
      id: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  prismaMock.example.findMany.mockResolvedValue(mockOutput); // injecting into the mock prisma client

  const result = await caller.example.getAll();

  expect(result).toHaveLength(mockOutput.length);
  expect(result).toStrictEqual(mockOutput);
});

test("auth example test", async () => {
  const { caller } = createTestContext({
    session: true,
  });

  const result = await caller.example.getSecretMessage();

  expect(result).toBe("you have auth");
});
