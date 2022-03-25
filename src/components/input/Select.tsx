import { Listbox } from "@headlessui/react";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "src/components/input/Button";
import Icon from "@mdi/react";
import { mdiCheck, mdiUnfoldMoreHorizontal } from "@mdi/js";

export interface SelectProps<ValueType> {
    className?: string;
    buttonClassName?: string;
    onChange: (value: ValueType) => void;
    options: {
        value: ValueType;
        label: string;
    }[];
    defaultValue?: ValueType;
}

export function Select<ValueType>({
    className,
    buttonClassName,
    onChange,
    options,
    defaultValue,
}: SelectProps<ValueType>) {
    const [selected, setSelected] = useState<ValueType>(
        defaultValue ?? options[0].value,
    );

    return (
        <Listbox
            value={selected}
            onChange={(value: ValueType) => {
                setSelected(value);
                onChange(value);
            }}
        >
            <div className={clsx("relative", className)}>
                {/*<Listbox.Button*/}
                {/*    className={clsx(*/}
                {/*        "relative w-full border-stone-600 bg-stone-700 py-1 px-2 pr-10 text-left text-base text-stone-300 transition-colors duration-150 rounded cursor-default",*/}
                {/*        buttonClassName,*/}
                {/*    )}*/}
                {/*>*/}
                {/*    {options.find(({ value }) => value === selected)?.label}*/}
                {/*</Listbox.Button>*/}
                <Listbox.Button
                    className={clsx("w-full", buttonClassName)}
                    as={Button}
                >
                    <span className="mr-10 block truncate">
                        {options.find(({ value }) => value === selected)?.label}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <Icon path={mdiUnfoldMoreHorizontal} size={1} />
                    </span>
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-stone-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {options.map(({ value, label }, idx) => (
                        <Listbox.Option
                            key={idx}
                            value={value}
                            className={({ active }) =>
                                clsx(
                                    "relative cursor-pointer select-none py-1 pl-10 pr-4",
                                    active && "bg-stone-600/50",
                                )
                            }
                        >
                            {({ selected }) => (
                                <>
                                    <span
                                        className={clsx(
                                            "block truncate text-left text-stone-300",
                                            selected
                                                ? "font-bold"
                                                : "font-normal",
                                        )}
                                    >
                                        {label}
                                    </span>
                                    {selected && (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-300">
                                            <Icon path={mdiCheck} size={0.8} />
                                        </span>
                                    )}
                                </>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    );
}
