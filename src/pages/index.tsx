import { NextSeo } from "next-seo";
import { Dashboard } from "src/views/dashboard/Dashboard";

export default function IndexPage() {
    return (
        <>
            <NextSeo />
            <Dashboard />
        </>
    );
}
