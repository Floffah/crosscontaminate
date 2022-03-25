import Link from "next/link";
import Emoji from "src/components/util/Emoji";

export function Dashboard() {
    return (
        <div className="mx-auto mt-10 h-fit w-fit max-w-lg">
            {/* header */}
            <h1 className="text-lg font-bold text-stone-300">
                Welcome to CrossContaminate
            </h1>
            <p className="-mt-1.5 text-sm font-light text-stone-500">
                By{" "}
                <span
                    className="text-stone-500 no-underline active:!text-stone-600"
                    onClick={() =>
                        window.Comms.openExternal(
                            "https://github.com/floffah/crosscontaminate",
                        )
                    }
                >
                    Floffah
                </span>
            </p>

            {/* options */}
            <div className="mt-5 h-fit w-full border-t border-t-stone-700 pt-5">
                <h1 className="text-base font-bold text-stone-300">Options</h1>
                <Link href="/settings">
                    <a className="mt-1 block">
                        <Emoji
                            className="mr-2"
                            size={15}
                            emoji="🛠"
                            alt="settings emoji"
                            wrap
                        />
                        Settings
                    </a>
                </Link>
            </div>
        </div>
    );
}
