//@ts-check

const withPlugins = require("next-compose-plugins");
const path = require("path");

const nextTranslate = require("next-translate");

module.exports = withPlugins([[nextTranslate]], {
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    reactStrictMode: true,
    future: {
        modern: true,
    },
    webpack5: true,
    images: {
        domains: ["twemoji.maxcdn.com"],
    },
});
