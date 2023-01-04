import { router } from "../trpc";
import { exampleRouter } from "./example";
import { reflectionsRouter } from "./reflections";

export const appRouter = router({
  example: exampleRouter,
  reflections: reflectionsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
