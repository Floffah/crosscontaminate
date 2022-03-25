import { forwardRef } from "react";
import clsx from "clsx";

export interface InputProps {}

const Input = forwardRef<
    HTMLInputElement,
    InputProps & JSX.IntrinsicElements["input"]
>(({ className, ...rest }, ref) => {
    return (
        <input
            className={clsx(
                "w-full rounded border border-stone-600 bg-stone-700 px-2 py-0.5 text-stone-300 outline-none placeholder:text-stone-500 focus:ring-1 focus:ring-blue-600",
                className,
            )}
            ref={ref}
            {...rest}
        />
    );
});
Input.displayName = "Input";

export { Input };
