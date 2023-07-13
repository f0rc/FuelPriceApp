import { z } from "zod";

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
