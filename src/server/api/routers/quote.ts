import { newQuoteSchema } from "~/pages/newquote";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const quoteRouter = createTRPCRouter({
  getPreNewQuote: protectedProcedure
    .input(newQuoteSchema)
    .mutation(({ input }) => {
      const { gallonsRequested } = input;

      return {
        pricePerGallon: gallonsRequested * 1.5, //
      };
    }),

  getPricePerGallon: protectedProcedure
    .input(newQuoteSchema)
    .mutation(({ input }) => {
      const { gallonsRequested } = input;

      return {
        total: gallonsRequested * 1.5,
        suggestedPrice: 1.5,
      };
    }),

  // TODO: create submit quote
});
