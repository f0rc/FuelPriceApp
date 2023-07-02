import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const quoteSchema = z.object({
    gallonsRequested: z.number(),
    deliveryDate: z.string(),
    deliveryAddress: z.string(), // the reason why this is here and not in the request because we are already making the request for the ui so no need to make another db call
});


export const quoteRouter = createTRPCRouter({
  getNewQuote: protectedProcedure
  .input(quoteSchema)
  .query(({input }) => {

    const { gallonsRequested } = input;

    return {
      pricePerGallon: gallonsRequested * 1.5,
    };
    }),
});