import "../styles/styles.scss";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "src/api/router";

function App(p: AppProps) {
    return (
        <>
            <DefaultSeo
                titleTemplate="%s | CrossContaminate"
                defaultTitle="CrossContaminate"
            />
            <p.Component {...p.pageProps} />
        </>
    );
}

// const url = process.env.VERCEL_URL
//     ? `https://${process.env.VERCEL_URL}/api/trpc`
//     : process.env.NODE_ENV === "development"
//     ? "http://localhost:3000/api/trpc"
//     : "https://updates.floffah.dev/api/trpc";
const url = "/api/trpc";

export default withTRPC<AppRouter>({
    config: () => {
        return {
            url,
        };
    },
})(App);
