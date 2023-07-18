import { TRPCError } from "@trpc/server";
import { newQuoteSchema } from "~/pages/newquote/newquoteSchema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const quoteRouter = createTRPCRouter({
  getPricePerGallon: protectedProcedure
    .input(newQuoteSchema)
    .mutation(({ input }) => {
      const { gallonsRequested } = input;

      //TODO: calculations + make sure that the number is rounded to .001

      return {
        status: "sucess",
        total: gallonsRequested * 1.5,
        suggestedPrice: 1.5,
      };
    }),

  // TODO: finitsh this for final assignment
  submitQuote: protectedProcedure
    .input(newQuoteSchema)
    .mutation(async ({ input, ctx }) => {
      const { gallonsRequested, deliveryDate, pricePerGallon, total } = input;

      const quote = await ctx.prisma.quote.create({
        data: {
          userId: ctx.session.User.id,
          deliveryDate: deliveryDate,
          gallonsRequested: gallonsRequested,
          pricePerGallon: pricePerGallon,
          total: total,
        },
      });

      // console.log("QUOTE", quote);

      if (!quote) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong!",
        });
      }

      return {
        status: "sucess",
        message: "successfully created order",
      };
    }),

  getQuoteHistory: protectedProcedure.query(async ({ ctx }) => {
    const quotes = await ctx.prisma.quote.findMany({
      where: {
        userId: ctx.session.User.id,
      },
    });

    // console.log("HHEHE", quotes);

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
