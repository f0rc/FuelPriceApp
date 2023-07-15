import type { IncomingMessage, ServerResponse } from "http";
import { appRouter } from "../api/root";
import { type ServerSession } from "../auth";
import { type PrismaClient, type Quote } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { mockDeep } from "jest-mock-extended";

describe("quotehistory", () => {
  test("hello test", async () => {
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

    const mockOutput: Quote[] = [
      {
        id: "test",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "TEST_USER_ID",
        deliveryDate: new Date(),
        gallonsRequested: new Decimal(1),
        pricePerGallon: new Decimal(1),
        total: new Decimal(1),
      },
    ];

    const caller = appRouter.createCaller({
      session: mockSession,
      prisma: prismaMock,
      req: req,
      res: res,
    });

    prismaMock.quote.findMany.mockResolvedValue(mockOutput);

    const result = await caller.quote.getQuoteHistory();

    expect(result).toStrictEqual({
      status: "success",
      quoteList: mockOutput,
    });
  });
});
