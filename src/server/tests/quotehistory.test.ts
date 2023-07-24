import { createTestContext } from "./testingConfig";
import { Prisma, type Quote } from "@prisma/client";

describe("quotehistory", () => {
  test("hello test", async () => {
    const { caller, prismaMock } = createTestContext({
      session: true,
    });

    const mockOutput: Quote[] = [
      {
        id: "test",
        createdAt: new Date(),
        updatedAt: new Date(),
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
      },
    ];

    prismaMock.quote.findMany.mockResolvedValue(mockOutput);

    const result = await caller.quote.getQuoteHistory();

    expect(result).toStrictEqual({
      status: "success",
      quoteList: mockOutput,
    });
  });
});
