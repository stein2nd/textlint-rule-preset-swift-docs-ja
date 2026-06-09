import { execSync } from "child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sandboxDir = resolve(root, ".sandbox");
const verifyDir = resolve(sandboxDir, "verify-pack");
const artifactsDir = resolve(root, "artifacts");
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const tarballName = `${pkg.name}-${pkg.version}.tgz`;
const tarball = resolve(artifactsDir, tarballName);

const requiredTarballEntries = [
  "package/package.json",
  "package/index.cjs",
  "package/dict/terminology.json",
  "package/prh-rules/swift.yml"
];

const requiredInstalledPaths = [
  "index.cjs",
  "dict/terminology.json",
  "prh-rules/swift.yml"
];

function main() {
  if (!existsSync(tarball)) {
    console.error(`❌ Tarball not found: ${tarball}`);
    console.error("Run `npm run pack` first.");
    process.exit(1);
  }

  mkdirSync(sandboxDir, { recursive: true });

  if (existsSync(verifyDir)) {
    rmSync(verifyDir, { recursive: true, force: true });
  }
  mkdirSync(verifyDir, { recursive: true });

  const tarballListing = execSync(`tar -tzf "${tarball}"`, {
    cwd: root,
    encoding: "utf8"
  });

  const missingTarballEntries = requiredTarballEntries.filter(
    (entry) => !tarballListing.split("\n").includes(entry)
  );
  if (missingTarballEntries.length > 0) {
    console.error("❌ Tarball is missing required entries:");
    for (const entry of missingTarballEntries) {
      console.error(`  - ${entry}`);
    }
    process.exit(1);
  }

  const verifyPackage = {
    name: "verify-pack",
    private: true,
    type: "commonjs",
    dependencies: {
      [pkg.name]: `file:../../artifacts/${tarballName}`
    }
  };

  writeFileSync(
    resolve(verifyDir, "package.json"),
    `${JSON.stringify(verifyPackage, null, 2)}\n`
  );

  writeFileSync(
    resolve(verifyDir, "sample.md"),
    "Swift のドキュメントを翻訳する。\n"
  );

  console.log("📦 Installing tarball into .sandbox/verify-pack ...");
  execSync("npm install", { cwd: verifyDir, stdio: "inherit" });

  const installedRoot = resolve(verifyDir, "node_modules", pkg.name);
  const missingInstalledPaths = requiredInstalledPaths.filter(
    (relativePath) => !existsSync(resolve(installedRoot, relativePath))
  );
  if (missingInstalledPaths.length > 0) {
    console.error("❌ Installed package is missing required files:");
    for (const relativePath of missingInstalledPaths) {
      console.error(`  - ${relativePath}`);
    }
    process.exit(1);
  }

  const summary = {
    verifiedAt: new Date().toISOString(),
    tarball: `artifacts/${tarballName}`,
    tarballEntries: requiredTarballEntries,
    sandboxDir: ".sandbox/verify-pack",
    installedPackage: pkg.name,
    installedVersion: pkg.version
  };

  writeFileSync(
    resolve(verifyDir, "summary.json"),
    `${JSON.stringify(summary, null, 2)}\n`
  );

  console.log("✅ Pack verification succeeded in .sandbox/verify-pack");
  console.log(`📝 Summary: .sandbox/verify-pack/summary.json`);
}

main();
