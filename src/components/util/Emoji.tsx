import Twemoji from "twemoji";
import { forwardRef } from "react";
import Image from "next/image";
import clsx from "clsx";

export interface EmojiProps {
    size?: number;
    png?: boolean;
    emoji: string | StaticImageData;
    wrap?: boolean;
}

export const TwemojiURL = `https://twemoji.maxcdn.com/v/latest`;

export function getEmojiURL(emoji: string, type: "svg" | "72x72" = "svg") {
    if (type === "72x72") {
        return `${TwemojiURL}/72x72/${Twemoji.convert.toCodePoint(emoji)}.png`;
    }
    return `${TwemojiURL}/svg/${Twemoji.convert.toCodePoint(emoji)}.svg`;
}

const Emoji = forwardRef<
    HTMLElement,
    JSX.IntrinsicElements["img"] & EmojiProps
>(({ size, png, emoji, wrap, className, ...rest }, ref) => {
    if (typeof ref === "function")
        throw new Error(
            "ref cannot be passed as a function to the Emoji component",
        );

    const image = (
        <Image
            src={
                typeof emoji === "string"
                    ? {
                          src: getEmojiURL(emoji, png ? "72x72" : "svg"),
                          width: size ?? 30,
                          height: size ?? 30,
                          // blurDataURL: DataBlurEmoji,
                      }
                    : emoji
            }
            // placeholder="blur"
            alt="Unnamed Emoji"
            {...rest}
            placeholder={typeof emoji === "string" ? undefined : "blur"}
            lazyRoot={ref}
            className={wrap ? "" : className}
        />
    );

    return wrap ? (
        <div className={clsx("inline-block", className)}>{image}</div>
    ) : (
        image
    );
});
Emoji.displayName = "Emoji";
Emoji.defaultProps = {
    size: 30,
    png: false,
};

export default Emoji;
