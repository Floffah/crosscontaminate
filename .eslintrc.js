const { readFileSync } = require("fs");
const { resolve } = require("path");

module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "prettier"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "next",
    ],
    rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "react/prop-types": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                argsIgnorePattern: "^_",
                vars: "all",
                args: "after-used",
                ignoreRestSiblings: false,
            },
        ],
        "@typescript-eslint/no-var-requires": "warn",
        "prettier/prettier": [
            "error",
            JSON.parse(
                readFileSync(resolve(__dirname, ".prettierrc"), "utf-8"),
            ),
        ],
    },
    globals: {
        JSX: "readonly",
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        prettier: true,
        react: {
            version: "detect",
        },
    },
    env: {
        node: true,
    },
};
