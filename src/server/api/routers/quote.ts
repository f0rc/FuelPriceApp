import { newQuoteSchema } from "~/pages/newquote/newquoteSchema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const quoteRouter = createTRPCRouter({
  getPricePerGallon: protectedProcedure
    .input(newQuoteSchema)
    .mutation(({ input }) => {
      const { gallonsRequested } = input;

      //TODO: make sure that the number is rounded to .001
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

      // call db to insert into it

      return {
        total: gallonsRequested * 1.5,
        suggestedPrice: 1.5,
      };
    }),
});
