import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "src/api/router";

export const {
    useQuery,
    useContext,
    useMutation,
    useSubscription,
    useInfiniteQuery,
} = createReactQueryHooks<AppRouter>();
