import { copyFileSync, existsSync, readdirSync, unlinkSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(root, "dist");

const isRootChunk = (name) => name.startsWith("chunk-") && name.endsWith(".cjs");

function main() {
  if (!existsSync(distDir)) {
    console.error(`❌ ${distDir} not found. Run vite build first.`);
    process.exit(1);
  }

  const fromDist = readdirSync(distDir).filter(isRootChunk);
  const atRoot = existsSync(root) ? readdirSync(root).filter(isRootChunk) : [];

  for (const name of atRoot) {
    if (!fromDist.includes(name)) {
      unlinkSync(resolve(root, name));
    }
  }

  for (const name of fromDist) {
    copyFileSync(resolve(distDir, name), resolve(root, name));
  }

  if (fromDist.length > 0) {
    console.log(`✅ Copied ${fromDist.length} CJS chunk(s) to package root`);
  }
}

main();
