import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const detailRouter = createTRPCRouter({
  getQuoteDetails: protectedProcedure.query(async ({ ctx }) => {
    const quote = await ctx.prisma.quote.findUnique({
      where: {
        id: ctx.session.User.id,
      },
    });
    if (!quote) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "NO QUOTES FOUND",
        });
      }
  
      return {
        status: "success",
        quoteList: quote,
      };
}),

});
