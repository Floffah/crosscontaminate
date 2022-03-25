import { forwardRef } from "react";
import clsx from "clsx";

export interface ButtonProps {
    btnType?: "primary" | "default";
}

const Button = forwardRef<
    HTMLButtonElement,
    ButtonProps & JSX.IntrinsicElements["button"]
>(({ btnType, className, ...rest }, ref) => {
    let styledClasses = "";

    // border-stone-700/50 text-stone-500 body-focus:border-stone-600 body-focus:bg-stone-700 body-focus:text-stone-300
    switch (btnType) {
        case "default":
            styledClasses =
                "border-stone-600 bg-stone-700 text-stone-300 hover:text-stone-400 active:border-stone-700 active:bg-stone-700/50";
            break;
        case "primary":
            styledClasses = "";
            break;
    }

    return (
        <button
            {...rest}
            className={clsx(
                "rounded border py-1 px-2 text-base transition-colors duration-150",
                styledClasses,
                className,
            )}
            ref={ref}
        >
            {rest.children}
        </button>
    );
});
Button.displayName = "Button";
Button.defaultProps = {
    btnType: "default",
};

export { Button };
