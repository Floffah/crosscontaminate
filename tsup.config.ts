import { defineConfig } from "tsup";

export default defineConfig({
    target: ["node12"],
    splitting: false,
    bundle: true,
    sourcemap: true,
    entry: ["app/index.ts", "app/preload.ts"],
    dts: false,
    outDir: "appdist",
    clean: false,
    format: ["cjs"],
    external: ["electron", "next", "next-compose-plugins"],
    platform: "node",
});
