import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "node18",
    lib: {
      entry: {
        "index": resolve(__dirname, "src/preset/index.ts"),
        "scripts/extract-terms": resolve(__dirname, "src/scripts/extract-terms.ts"),
        "scripts/watch-terms": resolve(__dirname, "src/scripts/watch-terms.ts"),
        "vscode/extension": resolve(__dirname, "src/vscode/extension.ts")
      },
      formats: ["cjs", "es"]
    },
    rollupOptions: {
      external: ["vscode", "fs", "path", "child_process", "url"]
    }
  }
});
