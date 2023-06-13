import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { hash, verify } from "argon2";
import { randomUUID } from "crypto";
import Cookies from "cookies";
// import Cookies from "cookies";

export const loginSchema = z.object({
  //username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const signUpSchema = loginSchema.extend({
  username: z.string().min(3).max(20),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { email, password, username } = input;

      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already in use",
        });
      }

      const hashedPassword = await hash(password);

      const result = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
        },
      });

      if (!result) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }

      return {
        status: "success",
        message: "User created",
        result: result.email,
      };
    }),

  login: publicProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const { prisma } = ctx;
    const { email, password } = input;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
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

    const createSession = await prisma.session.create({
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

    cookies.set("auth-session-id", sessionToken, {
      expires: sessionexpires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return {
      status: "success",
    };
  }),

  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
});

const fromDate = (time: number, date = Date.now()) =>
  new Date(date + time * 1000);
