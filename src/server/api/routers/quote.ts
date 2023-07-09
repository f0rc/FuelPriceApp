import { TRPCError } from "@trpc/server";
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

  getQuoteHistory: protectedProcedure.query(async ({ ctx }) => {
    const quotes = await ctx.prisma.quote.findMany({
      where: {
        userId: ctx.session.User.id,
      },
    });

    if (!quotes) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "NO QUOTES FOUND",
      });
    }

    return {
      status: "success",
      quoteList: quotes,
    };
  }),
});
