import { type AppRouter } from "../api/root";
import type { inferProcedureInput } from "@trpc/server";
import { Prisma } from "@prisma/client";
import { createTestContext } from "./testingConfig";

describe("QUOTE API TEST", () => {
  test("[QUOTE API]: getPricePerGallon", async () => {
    const { caller, prismaMock } = createTestContext({
      session: true,
    });

    type Input = inferProcedureInput<AppRouter["quote"]["getPricePerGallon"]>;

    // TODO: make this get the actual calculations for the price per gallon final assignment
    const input: Input = {
      deliveryDate: new Date(new Date().setHours(24, 0, 0, 0)),
      gallonsRequested: 40,
    };

    prismaMock.profile.findUnique.mockResolvedValue({
      id: "TEST_PROFILE_ID",
      userId: "TEST_USER_ID",
      address1: "TEST_ADDRESS",
      address2: "TEST_ADDRESS2",
      city: "TEST_CITY",
      state: "TX",
      zipcode: "TEST_ZIPCODE",
      address: "TEST_ADDRESS, TEST_ADDRESS2, TEST_CITY, TX, TEST_ZIPCODE",
      name: "TEST_NAME",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    prismaMock.quote.findMany.mockResolvedValue([
      {
        id: "TEST_QUOTE_ID",
        userId: "TEST_USER_ID",
        deliveryDate: new Date(),
        gallonsRequested: new Prisma.Decimal(1),
        pricePerGallon: new Prisma.Decimal(1),
        total: new Prisma.Decimal(1),
        deliveryAddressStreet: "TEST_ADDRESS",
        deliveryAddressStreet2: "TEST_ADDRESS2",
        deliveryAddressCity: "TEST_CITY",
        deliveryAddressState: "TX",
        deliveryAddressZipcode: "TEST_ZIPCODE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const locationFactor = 0.02;
    const rateHistoryFactor = 0.01;

    const gallonsRequestedFactor = input.gallonsRequested >= 1000 ? 0.02 : 0.03;

    const companyProfitFactor = 0.1;

    const margin =
      1.5 *
      (locationFactor -
        rateHistoryFactor +
        gallonsRequestedFactor +
        companyProfitFactor);

    const suggestedPrice = 1.5 + margin;
    const result = await caller.quote.getPricePerGallon(input);

    expect(result).toStrictEqual({
      status: "sucess",
      total: input.gallonsRequested * suggestedPrice,
      suggestedPrice: suggestedPrice,
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
      deliveryAddressStreet: "TEST_ADDRESS",
      deliveryAddressStreet2: "TEST_ADDRESS2",
      deliveryAddressCity: "TEST_CITY",
      deliveryAddressState: "TEST_STATE",
      deliveryAddressZipcode: "TEST_ZIPCODE",

      createdAt: new Date(),
      updatedAt: new Date(),
    });

    prismaMock.profile.findUnique.mockResolvedValue({
      id: "TEST_PROFILE_ID",
      userId: "TEST_USER_ID",
      address1: "TEST_ADDRESS",
      address2: "TEST_ADDRESS2",
      city: "TEST_CITY",
      state: "TX",
      zipcode: "TEST_ZIPCODE",
      address: "TEST_ADDRESS, TEST_ADDRESS2, TEST_CITY, TX, TEST_ZIPCODE",
      name: "TEST_NAME",
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
      quoteId: "TEST_QUOTE_ID",
      status: "sucess",
    });
  });
});
