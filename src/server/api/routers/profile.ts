import { profileSchema } from "~/pages/profile/profileSchema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const profileRouter = createTRPCRouter({
  createProfile: protectedProcedure
    .input(profileSchema)
    .mutation(async ({ input,ctx }) => {
      const {address1, address2, fullName, city, state, zipcode } = input;
      const {session } = ctx;

      const profile = await prisma.profile.create({
        data: {
            address1: address1,
            address2: address2,
            name: fullName,
            city: city,
            state: 'AK',
            zipcode: zipcode,
            user: {connect:{ id: session.id}},
            address: "someting",
        }
      })
      //TODO: make sure that the number is rounded to .001
      return {
        profile
      };
    }),

  // TODO: finitsh this for final assignment
//   submitQuote: protectedProcedure
//     .input(profileSchema)
//     .mutation(({ input }) => {
//       const { gallonsRequested } = input;

//       // call db to insert into it

//       return {
//         total: gallonsRequested * 1.5,
//         suggestedPrice: 1.5,
//       };
//     }),
});