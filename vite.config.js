import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "/silabas/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        letras: resolve(__dirname, "letras.html"),
        progresso: resolve(__dirname, "progresso.html"),
        responsaveis: resolve(__dirname, "responsaveis.html"),
        sobre: resolve(__dirname, "sobre.html"),
        versions: resolve(__dirname, "versions.html"),
      },
    },
  },
});
