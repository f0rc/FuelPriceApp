import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth";
import { quoteRouter } from "./routers/quote";
import { profileRouter } from "./routers/profile";
import { detailRouter } from "./routers/detail";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  quote: quoteRouter,
  profile: profileRouter,
  detail: detailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
