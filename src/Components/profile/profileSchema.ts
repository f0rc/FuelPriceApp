import { State } from "@prisma/client";
import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string({ required_error: "Name is required" }).min(1).max(50),
  address1: z.string({ required_error: "Address 1 is required" }).max(100),
  address2: z.string().max(100).optional(),
  city: z.string({ required_error: "City is required" }).max(100),
  // be careful, enum or string?
  state: z.nativeEnum(State),
  zipcode: z.string().min(5).max(9),
});

export type profileSchemaType = z.infer<typeof profileSchema>;
