import { Input } from "src/components/input/Input";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { Button } from "src/components/input/Button";
import { FormEvent, useEffect, useState } from "react";
import clsx from "clsx";
import { KeychainEntry } from "src/lib/db/clientdb";

export function KeychainSettings() {
    const [newKeyNameValue, setNewKeyNameValue] = useState("");
    const [newKeyNameError, setNewKeyNameError] = useState(false);
    const [newKeyValueValue, setNewKeyValueValue] = useState("");
    const [newKeyValueError, setNewKeyValueError] = useState(false);

    const [keychainKeys, setKeychainKeys] = useState<
        Omit<KeychainEntry, "value">[]
    >([]);

    const ensureValid = () => {
        const nameInvalid = /^\s*$/.test(newKeyNameValue);
        const valueInvalid = /^\s*$/.test(newKeyValueValue);

        if (!newKeyNameError && nameInvalid) setNewKeyNameError(true);
        else if (newKeyNameError && !nameInvalid) setNewKeyNameError(false);
        if (!newKeyValueError && valueInvalid) setNewKeyValueError(true);
        else if (newKeyValueError && !valueInvalid) setNewKeyValueError(false);

        if (nameInvalid || valueInvalid) return false;
        return true;
    };

    const onSubmitNewKey = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const valid = ensureValid();
        if (!valid) return false;

        window.keychain.keychain.add(
            {
                name: newKeyNameValue,
                value: newKeyValueValue,
            } as KeychainEntry,
            newKeyNameValue,
        );
        window.comms.events.emit("keychainAltered");

        return false;
    };

    useEffect(() => {
        const recalculateKeys = async () => {
            const keys = await window.keychain.keychain.toArray();

            console.log(keys);

            setKeychainKeys(keys.map((k) => ({ ...k, value: undefined })));
        };

        recalculateKeys();

        console.log(window.comms);
        window.comms.events.addListener("keychainAltered", recalculateKeys);

        return () => {
            window.comms.events.removeListener(
                "keychainAltered",
                recalculateKeys,
            );
        };
    }, []);

    return (
        <>
            <div>
                <div className="mt-1.5 mb-3">
                    {keychainKeys.length <= 0 ? (
                        <p className="text-sm text-stone-400">No keys yet!</p>
                    ) : (
                        keychainKeys.map((k) => (
                            <div key={k.id}>
                                <p className="inline-block align-top text-stone-300">
                                    {k.name}
                                </p>
                                <p className="mt-1 ml-3 inline-block align-top text-stone-400">
                                    ************
                                </p>
                            </div>
                        ))
                    )}
                </div>

                <form onSubmit={onSubmitNewKey}>
                    <Input
                        placeholder="Name"
                        className="inline-block h-[2.125rem] w-44 "
                        value={newKeyNameValue}
                        onChange={(e) => {
                            setNewKeyNameValue(e.target.value);
                            ensureValid();
                        }}
                    />
                    <Input
                        placeholder="Value"
                        className="ml-3 inline-block h-[2.125rem] w-44"
                        value={newKeyValueValue}
                        onChange={(e) => {
                            setNewKeyValueValue(e.target.value);
                            ensureValid();
                        }}
                    />
                    <Button
                        className="ml-3 inline-block align-top"
                        type="submit"
                    >
                        <Icon
                            path={mdiPlus}
                            size={1}
                            className="-mt-0.5 inline-block"
                        />{" "}
                        Add key
                    </Button>
                </form>
                <p
                    className={clsx(
                        "invisible inline-block text-sm text-red-400",
                        {
                            "!visible": newKeyNameError,
                        },
                    )}
                >
                    Invalid input
                </p>
                <p
                    className={clsx(
                        "invisible ml-[6.8rem] inline-block text-sm text-red-400",
                        {
                            "!visible": newKeyValueError,
                        },
                    )}
                >
                    Invalid input
                </p>
            </div>
        </>
    );
}
