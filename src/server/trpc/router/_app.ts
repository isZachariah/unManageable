import { router } from "../trpc";
import { reflectionsRouter } from "./reflections";
import { bigbookRouter } from "./bigbook";

export const appRouter = router({
  bigbook: bigbookRouter,
  reflections: reflectionsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
