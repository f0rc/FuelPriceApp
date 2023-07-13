import { prisma } from "~/server/db";
import { type AppRouter, appRouter } from "../../root";
import type { IncomingMessage, ServerResponse } from "http";
import { type inferProcedureInput } from "@trpc/server";
import { mockDeep } from "jest-mock-extended";
import type { Example, PrismaClient } from "@prisma/client";
import { type ServerSession } from "~/server/auth";

test("hello test", async () => {
  const req = {} as IncomingMessage; // fake request object
  const res = {} as ServerResponse; // fake request object

  const caller = appRouter.createCaller({
    session: null,
    prisma: prisma,
    req: req,
    res: res,
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
  const req = {} as IncomingMessage; // fake request object
  const res = {} as ServerResponse; // fake response object

  const prismaMock = mockDeep<PrismaClient>(); // prisma client mock
  const mockOutput: Example[] = [
    {
      id: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  prismaMock.example.findMany.mockResolvedValue(mockOutput); // injecting into the mock prisma client

  const caller = appRouter.createCaller({
    session: null,
    prisma: prismaMock,
    req: req,
    res: res,
  });

  const result = await caller.example.getAll();

  expect(result).toHaveLength(mockOutput.length);
  expect(result).toStrictEqual(mockOutput);
});

test("auth example test", async () => {
  const req = {} as IncomingMessage; // fake request object
  const res = {} as ServerResponse; // fake request object

  const mockSession: ServerSession = {
    expires: new Date(),
    id: "TEST_SESSION_ID",
    sessionToken: "TEST_SESSION_TOKEN",
    User: {
      id: "TEST_USER_ID",
      username: "TEST_USERNAME",
    },
  };

  const caller = appRouter.createCaller({
    session: mockSession,
    prisma: prisma,
    req: req,
    res: res,
  });

  const result = await caller.example.getSecretMessage();

  expect(result).toBe("you have auth");
});
