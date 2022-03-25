import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "src/api/router";
import { createContext } from "src/api/context";

export default createNextApiHandler({
    router: appRouter,
    createContext,
});
