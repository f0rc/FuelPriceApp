import { type CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { type ServerSession } from "~/server/auth";
import { prisma } from "~/server/db";

/* istanbul ignore next */
export const getServerAuthSession = async (ctx: {
  req: CreateHTTPContextOptions["req"];
  res: CreateHTTPContextOptions["res"];
}): Promise<ServerSession | null> => {
  const rawSessionCookie = ctx.req.headers.cookie
    ?.split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("auth-session-id="))
    ?.split("=")[1];

  if (rawSessionCookie) {
    const session = await validateSession(rawSessionCookie);
    if (session) {
      // here we verified that the session is valid so now we can get user info
      const user = await prisma.user.findUnique({
        where: {
          id: session.userId,
        },
      });
      if (user) {
        return {
          id: user.id,
          expires: session.expires,
          sessionToken: session.sessionToken,
          User: {
            id: user.id,
            username: user.username,
          },
        };
      }
    }
  }
  return null;
};

/* istanbul ignore next */
export const validateSession = async (rawSessionCookie: string) => {
  const session = await prisma.session.findUnique({
    where: {
      sessionToken: rawSessionCookie,
    },
  });

  if (session) {
    if (session.expires < new Date()) {
      return null;
    }
  }

  return session;
};
