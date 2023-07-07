import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const newQuoteSchema = z.object({
  gallonsRequested: z
    .number({
      invalid_type_error: "Please enter only numbers",
    })
    .nonnegative("must request at least 1 gallon(s)")
    .min(1, "must request at least 1 gallon(s)"),
  deliveryDate: z.coerce.date().refine(
    (data) => {
      // console.log("ZOD", data, new Date(new Date().setHours(0, 0, 0, 0)));
      return data > new Date(new Date().setHours(0, 0, 0, 0));
    },
    {
      message: "Delivery must be 24hrs in the future",
    }
  ),
  pricePerGallon: z.number().multipleOf(0.0001).default(0),
  total: z.number().multipleOf(0.0001).default(0),
});

export type newQuoteSchemaType = z.infer<typeof newQuoteSchema>;

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
