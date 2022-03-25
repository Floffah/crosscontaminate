import { Input } from "src/components/input/Input";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { Button } from "src/components/input/Button";
import { FormEvent, useState } from "react";
import clsx from "clsx";
import { KeychainEntry } from "src/lib/db/clientdb";

export function KeychainSettings() {
    const [newKeyNameValue, setNewKeyNameValue] = useState("");
    const [newKeyNameError, setNewKeyNameError] = useState(false);
    const [newKeyValueValue, setNewKeyValueValue] = useState("");
    const [newKeyValueError, setNewKeyValueError] = useState(false);

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

        window.Comms.keychain.keychain.add(
            {
                name: newKeyNameValue,
                value: newKeyValueValue,
            } as KeychainEntry,
            newKeyNameValue,
        );

        return false;
    };

    return (
        <>
            <div>
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
