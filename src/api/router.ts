import { createRouter } from "src/api/context";
import { featuresRouter } from "src/api/routers/features";

export const appRouter = createRouter().merge("features.", featuresRouter);

export type AppRouter = typeof appRouter;
