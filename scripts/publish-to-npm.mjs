import { execSync } from "child_process";
import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { assertNpmRegistryAuth, getNpmPublishEnv } from "./npm-publish-env.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const tarball = resolve(root, "artifacts", `${pkg.name}-${pkg.version}.tgz`);
const publishEnv = getNpmPublishEnv();

function versionAlreadyPublished() {
  try {
    const published = execSync(
      `npm view ${JSON.stringify(`${pkg.name}@${pkg.version}`)} version`,
      { encoding: "utf8", env: publishEnv, stdio: ["ignore", "pipe", "ignore"] }
    ).trim();
    return published === pkg.version;
  } catch {
    return false;
  }
}

execSync("node scripts/pack-to-artifacts.mjs", { cwd: root, stdio: "inherit" });
execSync("node scripts/verify-pack.mjs", { cwd: root, stdio: "inherit" });

if (versionAlreadyPublished()) {
  console.log(
    `ℹ️  ${pkg.name}@${pkg.version} は既に npm に公開済みです。スキップします。`
  );
  process.exit(0);
}

assertNpmRegistryAuth();

// Provenance は GitHub Actions (Trusted Publisher) 上でのみ生成される。
// ローカル publish では --provenance を付けると EUSAGE になる。
execSync(`npm publish --access public "${tarball}"`, {
  cwd: root,
  stdio: "inherit",
  env: publishEnv
});

console.log(`✅ Published ${tarball}`);
