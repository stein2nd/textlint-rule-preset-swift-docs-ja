import { execSync } from "child_process";
import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const tarball = resolve(root, "artifacts", `${pkg.name}-${pkg.version}.tgz`);

execSync("node scripts/pack-to-artifacts.mjs", { cwd: root, stdio: "inherit" });
execSync("node scripts/verify-pack.mjs", { cwd: root, stdio: "inherit" });

// Provenance は GitHub Actions (Trusted Publisher) 上でのみ生成される。
// ローカル publish では --provenance を付けると EUSAGE になる。
execSync(`npm publish --access public "${tarball}"`, {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, NPM_CONFIG_PROVENANCE: "false" }
});

console.log(`✅ Published ${tarball}`);
