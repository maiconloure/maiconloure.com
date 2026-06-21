import { defineConfig } from "@solidjs/start/config";
import path from "path";

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
  },
  server: {
    preset: "cloudflare-pages",
    rollupConfig: {
      external: ["__STATIC_CONTENT_MANIFEST"],
    },
  },
});
