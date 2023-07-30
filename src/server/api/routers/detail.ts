import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const detailRouter = createTRPCRouter({
  getQuoteDetails: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const quote = await ctx.prisma.quote.findUnique({
        where: {
          id: input.id,
        },
      });

      return {
        status: "success",
        quote: quote,
      };
    }),
});
