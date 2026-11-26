import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { copyFileSync, mkdirSync, cpSync, existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nodeBuiltins = new Set([
  "fs", "path", "child_process", "url",
  "assert", "os", "module", "node:fs", "node:path", "node:url", "node:module"
]);

function isBareModuleImport(id: string): boolean {
  return !id.startsWith(".") && !id.startsWith("/") && !id.startsWith("\0");
}

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
      // Lib ビルドは既定で platform が browser になり、CJS 出力で import.meta.url が壊れる。
      // @see https://github.com/vitejs/vite/issues/21974
      platform: "node",
      external: (id) => {
        if (id === "vscode" || id.startsWith("node:")) {
          return true;
        }
        if (nodeBuiltins.has(id)) {
          return true;
        }
        if (id === "js-yaml" || id.startsWith("js-yaml/")) {
          return true;
        }
        // kuromoji 経由の zlibjs はバンドルすると strict 下で this が壊れるため外部依存のままにする
        return isBareModuleImport(id);
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
