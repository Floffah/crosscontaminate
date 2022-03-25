import { NextSeo } from "next-seo";
import { Settings } from "src/views/settings/Settings";

export default function SettingsPage() {
    return (
        <>
            <NextSeo title="Settings" />
            <Settings />
        </>
    );
}
