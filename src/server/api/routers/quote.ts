import { newQuoteSchema } from "~/pages/newquote";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const quoteRouter = createTRPCRouter({
  getPricePerGallon: protectedProcedure
    .input(newQuoteSchema)
    .mutation(({ input }) => {
      const { gallonsRequested } = input;
      console.log("HHHHHHHHHHHHHH", gallonsRequested * 1.52314);

      return {
        total: gallonsRequested * 1.5,
        suggestedPrice: 1.5,
      };
    }),

  // TODO: finitsh this for final assignment
  submitQuote: protectedProcedure
    .input(newQuoteSchema)
    .mutation(({ input }) => {
      const { gallonsRequested } = input;

      console.log("HHHHHHHHHHHHHH", gallonsRequested * 1.52314);

      return {
        total: gallonsRequested * 1.52314,
        suggestedPrice: 1.5,
      };
    }),
});
