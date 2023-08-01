import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { hash, verify } from "argon2";
import { randomUUID } from "crypto";
import Cookies from "cookies";
// import Cookies from "cookies";

export const loginSchema = z.object({
  //username: z.string()
  username: z.string().min(3).max(20),
  password: z.string().min(8).max(100),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(loginSchema)
    .mutation(async ({ ctx, input }) => {
      const { username, password } = input;

      const existingUser = await ctx.prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      if (existingUser) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Username already in use",
        });
      }

      const hashedPassword = await hash(password);

      // console.log("HASHED", hashedPassword);

      const result = await ctx.prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      // console.log("RESULT", result);

      if (!result) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }

      return {
        status: "success",
        message: "User created",
        result: result.username,
      };
    }),

  login: publicProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const { username, password } = input;

    const existingUser = await ctx.prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!existingUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User Not Found",
      });
    }

    const verifiedPassword = await verify(existingUser.password, password);

    if (!verifiedPassword) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }

    // create session

    const sessionToken = randomUUID();
    const sessionMaxAge = 60 * 60 * 24 * 7; // 7 days
    const sessionexpires = fromDate(sessionMaxAge);
    // add the session to the db

    const createSession = await ctx.prisma.session.create({
      data: {
        expires: sessionexpires,
        sessionToken: sessionToken,
        userId: existingUser.id,
      },
    });

    if (!createSession) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }

    // set the cookie
    const cookies = new Cookies(ctx.req, ctx.res);

    try {
      cookies.set("auth-session-id", sessionToken, {
        expires: sessionexpires,
        httpOnly: true,
        secure: false,
        sameSite: "none",
      });
    } catch (e) {
      // console.log("ERROR", e);
    }

    return {
      status: "success",
      message: "User logged in",
    };
  }),

  getSession: publicProcedure.query(({ ctx }) => {
    if (!ctx.session || ctx.session.expires < new Date()) {
      return null;
    }
    return ctx.session;
  }),

  logout: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session || ctx.session.expires < new Date()) {
      return {
        status: "success",
      };
    }

    await ctx.prisma.session.delete({
      where: {
        sessionToken: ctx.session.sessionToken,
      },
    });

    const cookies = new Cookies(ctx.req, ctx.res);


    try {
      cookies.set("auth-session-id", "", {
        expires: new Date(0),
        httpOnly: true,
        secure: false,
        sameSite: "none",
      });
    } catch (e) {
      // console.log("ERROR", e);
    }

    return {
      status: "success",
    };
  }),

  profileComplete: protectedProcedure.query(async ({ ctx }) => {
    const profile = await ctx.prisma.profile.findUnique({
      where: {
        userId: ctx.session?.User.id,
      },
    });

    if (!profile) {
      return {
        status: "error",
        message: "Profile not found",
        profile: false,
      };
    }

    return {
      status: "success",
      message: "Profile found",
      profile: true,
    };
  }),
});

const fromDate = (time: number, date = Date.now()) =>
  new Date(date + time * 1000);
