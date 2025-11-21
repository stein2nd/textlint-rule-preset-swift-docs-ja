import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { copyFileSync, mkdirSync, cpSync, existsSync } from "fs";

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
      external: (id) => {
        // VSCode拡張機能のビルドでは、vscode と Node.js の組み込みモジュールを外部化
        if (id === "vscode" || id.startsWith("node:")) {
          return true;
        }
        // 組み込みモジュールを外部化
        const builtins = ["fs", "path", "child_process", "url"];
        if (builtins.includes(id)) {
          return true;
        }
        // vscode/extension のビルドでは js-yaml を外部化（node_modules に含める）
        if (id === "js-yaml" || id.startsWith("js-yaml/")) {
          return true;
        }
        return false;
      }
    }
  },
  plugins: [
    {
      name: "copy-vscode-files",
      closeBundle() {
        const destDir = resolve(__dirname, "dist/vscode");

        try {
          // package.json をコピー
          mkdirSync(destDir, { recursive: true });
          copyFileSync(
            resolve(__dirname, "src/vscode/package.json"),
            resolve(destDir, "package.json")
          );
          console.log("✅ Copied vscode/package.json to dist/vscode/package.json");

          // prh-rules と dict をコピー（存在する場合）
          const prhRulesSrc = resolve(__dirname, "prh-rules");
          const dictSrc = resolve(__dirname, "dict");

          if (existsSync(prhRulesSrc)) {
            cpSync(prhRulesSrc, resolve(destDir, "prh-rules"), { recursive: true });
            console.log("✅ Copied prh-rules to dist/vscode/prh-rules");
          }

          if (existsSync(dictSrc)) {
            cpSync(dictSrc, resolve(destDir, "dict"), { recursive: true });
            console.log("✅ Copied dict to dist/vscode/dict");
          }

          // LICENSE ファイルをコピー（存在する場合）
          const licenseSrc = resolve(__dirname, "LICENSE");
          if (existsSync(licenseSrc)) {
            copyFileSync(licenseSrc, resolve(destDir, "LICENSE"));
            console.log("✅ Copied LICENSE to dist/vscode/LICENSE");
          }

          // .vscodeignore ファイルをコピー（存在する場合）
          const vscodeignoreSrc = resolve(__dirname, "src/vscode/.vscodeignore");
          if (existsSync(vscodeignoreSrc)) {
            copyFileSync(vscodeignoreSrc, resolve(destDir, ".vscodeignore"));
            console.log("✅ Copied .vscodeignore to dist/vscode/.vscodeignore");
          }
        } catch (error) {
          console.error("❌ Failed to copy vscode files:", error);
        }
      }
    }
  ]
});
