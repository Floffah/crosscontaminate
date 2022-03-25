import Link from "next/link";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";
import { RemoteSyncingSettings } from "src/views/settings/RemoteSyncing";
import { FC } from "react";
import { ProviderSettings } from "src/views/settings/Providers";
import { Button } from "src/components/input/Button";
import { KeychainSettings } from "src/views/settings/Keychain";

const SettingsSection: FC<{ title: string }> = ({ title, children }) => (
    <div className="mt-5 h-fit w-full border-t border-t-stone-700 pt-5">
        <h1 className="text-base font-bold text-stone-300">{title}</h1>
        {children}
    </div>
);

export function Settings() {
    return (
        <div className="mx-auto mt-10 h-fit w-fit max-w-lg">
            {/* header */}
            <h1 className="text-lg font-bold text-stone-300">
                <Link href="/">
                    <a className="mt-0.5 mr-1 inline-block align-top text-stone-300 no-underline active:!text-stone-400 ">
                        <Icon path={mdiArrowLeft} size={1} />
                    </a>
                </Link>{" "}
                Settings
            </h1>

            <Button
                className="mt-2"
                onClick={() => window.Comms.openDataFolder()}
            >
                Open data folder
            </Button>

            <SettingsSection title="Providers">
                <ProviderSettings />
            </SettingsSection>

            <SettingsSection title="Remote syncing">
                <RemoteSyncingSettings />
            </SettingsSection>

            <SettingsSection title="Keychain">
                <KeychainSettings />
            </SettingsSection>
        </div>
    );
}
