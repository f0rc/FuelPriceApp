import type { IncomingMessage, ServerResponse } from "http";
import { type AppRouter, appRouter } from "../api/root";
import type { inferProcedureInput } from "@trpc/server";
import { createInnerTRPCContext } from "../api/trpc";
import { prisma } from "../db";

describe("AUTH API", () => {
  test("[AUTH API]: signup", async () => {
    const req = {} as IncomingMessage; // fake request object
    const res = {} as ServerResponse; // fake request object

    const ctx = createInnerTRPCContext({
      session: null,
      req: req,
      res: res,
    });

    const caller = appRouter.createCaller(ctx);

    try {
      await prisma.user.delete({
        where: {
          username: "TEST_USERNAME",
        },
      });
    } catch (e) {
      console.log(e);
    }

    type Input = inferProcedureInput<AppRouter["auth"]["signUp"]>;
    const input: Input = {
      username: "TEST_USERNAME",
      password: "TEST_PASSWORD",
    };

    const result = await caller.auth.signUp(input);

    expect(result).toStrictEqual({
      status: "success",
      message: "User created",
      result: input.username,
    });
  });
});
