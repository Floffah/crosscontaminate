import { Checkbox } from "src/components/input/Checkbox";
import { ChangeEventHandler, useState } from "react";
import Icon from "@mdi/react";
import { mdiContentSave, mdiContentSaveCheck, mdiLoading } from "@mdi/js";
import { wait } from "src/lib/util/promises";
import { useMutation, useQuery } from "src/lib/hooks/trpc";

export function RemoteSyncingSettings() {
    const [savingRemoteSyncing, setSavingRemoteSyncing] = useState<
        boolean | number
    >(false);

    const remoteSyncingEnabled = useQuery(["features.remoteSyncingEnabled"]);
    const enableRemoteSyncing = useMutation(["features.enableRemoteSyncing"]);
    const disableRemoteSyncing = useMutation(["features.disableRemoteSyncing"]);

    const onToggleRemoteSyncing: ChangeEventHandler<HTMLInputElement> = async (
        e,
    ) => {
        setSavingRemoteSyncing(true);

        if (e.target.checked) await enableRemoteSyncing.mutateAsync({});
        else await disableRemoteSyncing.mutateAsync(void 0);

        setSavingRemoteSyncing(1);
        await wait(1000);
        setSavingRemoteSyncing(false);
    };

    if (remoteSyncingEnabled.isLoading)
        return (
            <p className="mt-2 text-stone-200">
                <Icon path={mdiLoading} size={1} spin={true} />
            </p>
        );

    return (
        <>
            <p className="mt-2 text-stone-200">
                <Checkbox
                    className="mr-2 mt-1 align-top"
                    disabled={!!savingRemoteSyncing}
                    onChange={onToggleRemoteSyncing}
                    defaultChecked={remoteSyncingEnabled.data}
                />
                <span>Enable remote syncing</span>
                {!!savingRemoteSyncing && (
                    <span className="animate-bounce text-red-300">
                        {typeof savingRemoteSyncing === "number" ? (
                            <Icon
                                path={mdiContentSaveCheck}
                                size={0.9}
                                className="ml-2 inline-block opacity-0 transition-opacity duration-700"
                            />
                        ) : (
                            <Icon
                                path={mdiContentSave}
                                size={0.9}
                                className="ml-2 inline-block opacity-100 transition-opacity duration-700"
                            />
                        )}
                    </span>
                )}
            </p>
            <p className="text-sm text-stone-500">
                If we should enable remote syncing and allow backing up allowed
                projects to a git repository
            </p>
        </>
    );
}
