import { inferAsyncReturnType, router } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

export async function createContext(_ctx: CreateNextContextOptions) {
    return {
        db: INTERNAL_DB,
    };
}

export type ContextType = inferAsyncReturnType<typeof createContext>;

export function createRouter() {
    return router<ContextType>();
}
