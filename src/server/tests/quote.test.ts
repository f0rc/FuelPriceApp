import { type inferProcedureInput } from "@trpc/server";
import { type AppRouter } from "../api/root";
import { createTestContext } from "./testingConfig";
import { Prisma } from "@prisma/client";
describe("Quote Details API Test", () => {
  it("should return quote details", async () => {
    const { prismaMock, caller } = createTestContext({
      session: true,
    });

    const fakeDate = new Date();

    prismaMock.quote.findUnique.mockResolvedValue({
      id: "TEST_QUOTE_ID",
      userId: "TEST_USER_ID",
      createdAt: fakeDate,
      updatedAt: fakeDate,
      deliveryAddressStreet: "TEST_ADDRESS1",
      deliveryAddressStreet2: "TEST_ADDRESS2",
      deliveryAddressCity: "TEST_CITY",
      deliveryAddressState: "TX",
      deliveryAddressZipcode: "12345",
      deliveryDate: fakeDate,
      gallonsRequested: new Prisma.Decimal(100),
      pricePerGallon: new Prisma.Decimal(100),
      total: new Prisma.Decimal(100),
    });
    type Input = inferProcedureInput<AppRouter["detail"]["getQuoteDetails"]>;
    const input: Input = {
      id: "TEST_QUOTE_ID",
    };

    const result = await caller.detail.getQuoteDetails(input);

    expect(result).toEqual({
      status: "success",
      quote: {
        id: "TEST_QUOTE_ID",
        userId: "TEST_USER_ID",
        createdAt: fakeDate,
        updatedAt: fakeDate,
        deliveryAddressStreet: "TEST_ADDRESS1",
        deliveryAddressStreet2: "TEST_ADDRESS2",
        deliveryAddressCity: "TEST_CITY",
        deliveryAddressState: "TX",
        deliveryAddressZipcode: "12345",
        deliveryDate: fakeDate,
        gallonsRequested: new Prisma.Decimal(100),
        pricePerGallon: new Prisma.Decimal(100),
        total: new Prisma.Decimal(100),
      },
    });
  });
});
