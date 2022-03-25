import { createRouter } from "src/api/context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const featuresRouter = createRouter()
    .query("remoteSyncingEnabled", {
        resolve: async ({ ctx }) => {
            return ctx.db.remoteSyncingEnabled;
        },
    })
    .mutation("enableRemoteSyncing", {
        input: z.object({
            provider: /*z.union([*/ z.optional(z.literal("github")) /*])*/,
        }),
        resolve: async ({ ctx, input }) => {
            if (ctx.db.settings.features.remoteSyncing.enabled)
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Remote syncing is already enabled",
                });

            ctx.db.settings.features.remoteSyncing = {
                enabled: true,
                provider: input.provider ?? "github",
            };
            await ctx.db.syncSettings();
        },
    })
    .mutation("disableRemoteSyncing", {
        resolve: async ({ ctx }) => {
            if (!ctx.db.settings.features.remoteSyncing.enabled)
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Remote syncing is already disabled",
                });

            ctx.db.settings.features.remoteSyncing = {
                enabled: false,
            };
            await ctx.db.syncSettings();
        },
    });
