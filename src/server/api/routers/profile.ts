import { TRPCError } from "@trpc/server";
import { profileSchema } from "~/pages/profile/profileSchema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  createProfile: protectedProcedure
    .input(profileSchema)
    .mutation(async ({ input, ctx }) => {
      const { address1, address2, fullName, city, state, zipcode } = input;

      const profile = await ctx.prisma.profile.upsert({
        where: { userId: ctx.session.id },
        create: {
          address1: address1,

          address2: address2,
          name: fullName,
          city: city,
          state: state,
          zipcode: zipcode,
          user: { connect: { id: ctx.session.id } },
          address: [address1, address2].join(" "),
        },
        update: {
          address1: address1,

          address2: address2,
          name: fullName,
          city: city,
          state: state,
          zipcode: zipcode,
          user: { connect: { id: ctx.session.id } },
          address: [address1, address2].join(" "),
        },
      });
      //TODO: make sure that the number is rounded to .001
      return {
        profile,
      };
    }),
  profileById: protectedProcedure.query(async ({ ctx }) => {
    const profile = await ctx.prisma.profile.findUnique({
      where: { userId: ctx.session.id },
    });
    return {
      profile,
    };
  }),

  getUserAddress: protectedProcedure.query(async ({ ctx }) => {
    const profile = await ctx.prisma.profile.findUnique({
      where: {
        userId: ctx.session.User.id,
      },
    });

    if (!profile)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Something went wrong",
      });

    return {
      status: "success",
      address: {
        street: profile.address1,
        street2: profile.address2,
        city: profile.city,
        state: profile.state,
        zipcode: profile.zipcode,
      },
    };
  }),
});
