import {fileURLToPath, URL} from "url";
import {defineConfig} from "vite";
import {qwikVite} from "@builder.io/qwik/optimizer";
import {qwikCity} from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
    return {
        plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
        resolve: {
            alias: [
                {find: '@scss', replacement: fileURLToPath(new URL('./src/scss', import.meta.url))}
            ]
        },
        preview: {
            headers: {
                "Cache-Control": "public, max-age=600",
            },
        },
    };
});
