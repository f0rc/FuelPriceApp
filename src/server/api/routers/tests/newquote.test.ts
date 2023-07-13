import type { IncomingMessage, ServerResponse } from "http";
import type { ServerSession } from "~/server/auth";
import { type AppRouter, appRouter } from "../../root";
import { prisma } from "~/server/db";
import type { inferProcedureInput } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";

describe("QUOTE API TEST", () => {
  test("[QUOTE API]: getPricePerGallon", async () => {
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

    type Input = inferProcedureInput<AppRouter["quote"]["getPricePerGallon"]>;

    // TODO: make this get the actual calculations for the price per gallon final assignment
    const input: Input = {
      deliveryDate: new Date(new Date().setHours(24, 0, 0, 0)),
      gallonsRequested: 40,
    };

    const result = await caller.quote.getPricePerGallon(input);

    expect(result).toStrictEqual({
      total: input.gallonsRequested * 1.5,
      suggestedPrice: 1.5,
    });
  });

  test("[QUOTE API]: submit quote", async () => {
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

    const prismaMock = mockDeep<PrismaClient>();

    const caller = appRouter.createCaller({
      session: mockSession,
      prisma: prismaMock,
      req: req,
      res: res,
    });

    type Input = inferProcedureInput<AppRouter["quote"]["submitQuote"]>;
    const input: Input = {
      deliveryDate: new Date(new Date().setHours(24, 0, 0, 0)),
      gallonsRequested: 40,
    };

    //TODO: 1. nest tests so that total is recieved
    //      2. add db outputput

    const result = await caller.quote.submitQuote(input);

    expect(result).toStrictEqual({
      total: input.gallonsRequested * 1.5,
      suggestedPrice: 1.5,
    });
  });
});
