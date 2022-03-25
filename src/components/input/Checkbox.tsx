import { forwardRef } from "react";
import clsx from "clsx";

const Checkbox = forwardRef<HTMLInputElement, JSX.IntrinsicElements["input"]>(
    ({ className, ...rest }, ref) => {
        return (
            <input
                {...rest}
                ref={ref}
                type="checkbox"
                className={clsx("rounded focus:ring-offset-1", className)}
            />
        );
    },
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
