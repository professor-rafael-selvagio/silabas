import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "/silabas/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        letras: resolve(__dirname, "letras.html"),
        versions: resolve(__dirname, "versions.html"),
      },
    },
  },
});
