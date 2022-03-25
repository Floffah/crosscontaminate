const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
    important: false,
    darkMode: "class",
    i18n: {
        locales: ["en-US"],
        defaultLocale: "en-US",
    },
    content: ["./src/**/*.{js,jsx,ts,tsx,scss}", "./.storybook/preview.js"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                "2.5xl": "1.688rem",
            },

            width: {
                fit: "fit-content",
                0.25: "0.0625rem",
                30: "7.5rem",
                38: "9.5rem",
                128: "32rem",
                inherit: "inherit",
            },
            height: {
                fit: "fit-content",
                0.25: "0.0625rem",
                30: "7.5rem",
                38: "9.5rem",
            },
            margin: {
                0.25: "0.0625rem",
                1.25: "0.3125rem",
                u: "unset",
            },
            borderWidth: {
                7: "7px",
            },

            backdropBlur: {
                xs: "2px",
            },

            verticalAlign: {
                4: "1rem",
            },
            gridAutoFlow: {
                dense: "dense",
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ["checked"],
            borderColor: ["checked"],
            inset: ["checked"],
            zIndex: ["hover", "active"],
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        plugin(function ({ addVariant, e }) {
            addVariant("body-focus", ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `body:focus .${e(
                        `body-focus${separator}${className}`,
                    )}`;
                });
            });
        }),
    ],
    future: {
        purgeLayersByDefault: true,
    },
};
