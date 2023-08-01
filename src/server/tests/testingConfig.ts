import type { IncomingMessage, ServerResponse } from "http";
import { type AppRouter, appRouter } from "../api/root";
import { createInnerTRPCContext } from "../api/trpc";
import { type ServerSession } from "../auth";
import { type DeepMockProxy, mockDeep } from "jest-mock-extended";
import { type Prisma, type PrismaClient } from "@prisma/client";

export interface TestContext {
  caller: ReturnType<AppRouter["createCaller"]>;
  prismaMock: DeepMockProxy<
    PrismaClient<
      Prisma.PrismaClientOptions,
      never,
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >
  >;
  sessionExpires: Date;
}

export function createTestContext({
  session = null,
  req = {} as IncomingMessage,
  res = {} as ServerResponse,
}: {
  session?: ServerSession | null | boolean;
  req?: IncomingMessage;
  res?: ServerResponse;
}): TestContext {
  const prismaMock = mockDeep<PrismaClient>();

  const sessionExpires = new Date();
  const mockSession: ServerSession = {
    expires: sessionExpires,
    id: "TEST_USER_ID",
    sessionToken: "TEST_SESSION_TOKEN",
    User: {
      id: "TEST_USER_ID",
      username: "TEST_USERNAME",
      profileComplete: true,
    },
  };

  const ctx = createInnerTRPCContext({
    session: session === true ? mockSession : null,
    req,
    res,
    prisma: prismaMock,
  });

  const caller = appRouter.createCaller(ctx);

  return {
    caller,
    prismaMock,
    sessionExpires,
  };
}
