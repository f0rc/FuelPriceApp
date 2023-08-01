import { TRPCError } from "@trpc/server";
import { newQuoteSchema } from "~/Components/newquote/newquoteSchema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const quoteRouter = createTRPCRouter({
  getPricePerGallon: protectedProcedure
    .input(newQuoteSchema)
    .mutation(async ({ ctx, input }) => {
      const { gallonsRequested } = input;
      const userState = await ctx.prisma.profile.findUnique({
        where: {
          userId: ctx.session.User.id,
        },
      });

      // console.log("USER STATE", userState);

      const pastQuotes = await ctx.prisma.quote.findMany({
        where: {
          userId: ctx.session.User.id,
        },
      });

      if (!userState) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "USER NOT FOUND",
        });
      }

      const locationFactor = userState.state === "TX" ? 0.02 : 0.04;

      const rateHistoryFactor = pastQuotes.length === 0 ? 0.0 : 0.01;

      const gallonsRequestedFactor = gallonsRequested >= 1000 ? 0.02 : 0.03;

      const companyProfitFactor = 0.1;

      const margin =
        1.5 *
        (locationFactor -
          rateHistoryFactor +
          gallonsRequestedFactor +
          companyProfitFactor);

      const suggestedPrice = 1.5 + margin;

      return {
        status: "sucess",
        total: gallonsRequested * suggestedPrice,
        suggestedPrice: suggestedPrice,
      };
    }),

  // TODO: finitsh this for final assignment
  submitQuote: protectedProcedure
    .input(newQuoteSchema)
    .mutation(async ({ input, ctx }) => {
      const { gallonsRequested, deliveryDate, pricePerGallon, total } = input;

      const userState = await ctx.prisma.profile.findUnique({
        where: {
          userId: ctx.session.User.id,
        },
      });

      // console.log("USER STATE", userState);

      if (!userState) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "USER NOT FOUND",
        });
      }

      const quote = await ctx.prisma.quote.create({
        data: {
          userId: ctx.session.User.id,
          deliveryDate: deliveryDate,
          gallonsRequested: gallonsRequested,
          pricePerGallon: pricePerGallon,
          total: total,

          deliveryAddressStreet: userState.address1,
          deliveryAddressStreet2: userState.address2,
          deliveryAddressCity: userState.city,
          deliveryAddressState: userState.state,
          deliveryAddressZipcode: userState.zipcode,
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
        quoteId: quote.id,
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
