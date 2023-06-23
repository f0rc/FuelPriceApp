import { type CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { type ServerSession } from "~/server/auth";
import { prisma } from "~/server/db";

export const getServerAuthSession = async (ctx: {
  req: CreateHTTPContextOptions["req"];
  res: CreateHTTPContextOptions["res"];
}): Promise<ServerSession | null> => {
  const sessionId = ctx.req.headers.cookie
    ?.split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("auth-session-id="))
    ?.split("=")[1];

  if (sessionId) {
    const session = await validateSession(sessionId);
    if (session) {
      const user = await prisma.user.findUnique({
        where: {
          id: session.userId,
        },
      });
      if (user) {
        return {
          id: user.id,
          username: user.username,
          expires: session.expires,
          sessionToken: session.sessionToken,
        };
      }
    }
  }
  return null;
};

export const validateSession = async (sessionId: string) => {
  const session = await prisma.session.findUnique({
    where: {
      sessionToken: sessionId,
    },
  });

  if (session) {
    if (session.expires < new Date()) {
      return;
    }
  }

  return session;
};
