import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // Ajoute ici tes entrées HTML si besoin
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
