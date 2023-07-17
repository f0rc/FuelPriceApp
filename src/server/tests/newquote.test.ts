import { type AppRouter } from "../api/root";
import type { inferProcedureInput } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { createTestContext } from "./testingConfig";

describe("QUOTE API TEST", () => {
  test("[QUOTE API]: getPricePerGallon", async () => {
    const { caller } = createTestContext({
      session: true,
    });

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
    const { caller, prismaMock } = createTestContext({
      session: true,
    });

    prismaMock.user.create.mockResolvedValue({
      id: "TEST_USER_ID",
      password: "test",
      username: "TEST_USERNAME",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    prismaMock.quote.create.mockResolvedValue({
      id: "TEST_QUOTE_ID",
      userId: "TEST_USER_ID",
      deliveryDate: new Date(),
      gallonsRequested: new Prisma.Decimal(1),
      pricePerGallon: new Prisma.Decimal(1),
      total: new Prisma.Decimal(1),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    type Input = inferProcedureInput<AppRouter["quote"]["submitQuote"]>;
    const input: Input = {
      deliveryDate: new Date(new Date().setHours(24, 0, 0, 0)),
      gallonsRequested: 40,
    };

    const result = await caller.quote.submitQuote(input);

    expect(result).toStrictEqual({
      message: "successfully created order",
      status: "sucess",
    });
  });
});
