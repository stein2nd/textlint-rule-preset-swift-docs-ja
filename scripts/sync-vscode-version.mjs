import { readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const rootPkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const vscodePkgPath = resolve(root, "src/vscode/package.json");
const vscodePkg = JSON.parse(readFileSync(vscodePkgPath, "utf8"));

if (vscodePkg.version !== rootPkg.version) {
  vscodePkg.version = rootPkg.version;
  writeFileSync(vscodePkgPath, `${JSON.stringify(vscodePkg, null, 2)}\n`);
  console.log(`✅ Synced src/vscode/package.json version to ${rootPkg.version}`);
}
