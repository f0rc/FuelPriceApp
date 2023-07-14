import type { IncomingMessage, ServerResponse } from "http";
import type { ServerSession } from "~/server/auth";
import { type AppRouter, appRouter } from "../api/root";
import type { inferProcedureInput } from "@trpc/server";
import { createInnerTRPCContext } from "../api/trpc";
import { mockDeep } from "jest-mock-extended";
import type { PrismaClient } from "@prisma/client";
import { prisma } from "../db";

describe("QUOTE API TEST", () => {
  test("[QUOTE API]: getPricePerGallon", async () => {
    const req = {} as IncomingMessage; // fake request object
    const res = {} as ServerResponse; // fake request object

    const prismaMock = mockDeep<PrismaClient>();

    const mockSession: ServerSession = {
      expires: new Date(),
      id: "TEST_SESSION_ID",
      sessionToken: "TEST_SESSION_TOKEN",
      User: {
        id: "TEST_USER_ID",
        username: "TEST_USERNAME",
      },
    };

    const ctx = createInnerTRPCContext({
      session: mockSession,
      req: req,
      res: res,
      prisma: prismaMock,
    });

    const caller = appRouter.createCaller(ctx);

    type Input = inferProcedureInput<AppRouter["quote"]["getPricePerGallon"]>;

    // TODO: make this get the actual calculations for the price per gallon final assignment
    const input: Input = {
      deliveryDate: new Date(new Date().setHours(24, 0, 0, 0)),
      gallonsRequested: 40,
    };

    const result = await caller.quote.getPricePerGallon(input);

    expect(result).toStrictEqual({
      status: "sucess",
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

    await prisma.user.delete({
      where: {
        username: "TEST_USERNAME",
      },
    });

    await prisma.user.upsert({
      where: {
        username: "TEST_USERNAME",
      },
      update: {},
      create: {
        id: "TEST_USER_ID",
        username: "TEST_USERNAME",
        password: "TEST_PASSWORD",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const ctx = createInnerTRPCContext({
      session: mockSession,
      req: req,
      res: res,
      prisma: prismaMock,
    });

    const caller = appRouter.createCaller(ctx);

    type Input = inferProcedureInput<AppRouter["quote"]["submitQuote"]>;
    const input: Input = {
      deliveryDate: new Date(new Date().setHours(24, 0, 0, 0)),
      gallonsRequested: 40,
    };

    const result = await caller.quote.submitQuote({
      deliveryDate: new Date(new Date().setHours(24, 0, 0, 0)),
      gallonsRequested: 40,
    });

    expect(result).toStrictEqual({
      message: "successfully created order",
      status: "sucess",
    });
  });
});
