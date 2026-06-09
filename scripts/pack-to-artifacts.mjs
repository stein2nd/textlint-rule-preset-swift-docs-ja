import { execSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const artifactsDir = resolve(root, "artifacts");
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const expectedName = `${pkg.name}-${pkg.version}.tgz`;

mkdirSync(artifactsDir, { recursive: true });

for (const name of readdirSync(artifactsDir)) {
  if (name.endsWith(".tgz") && name.startsWith(`${pkg.name}-`)) {
    unlinkSync(resolve(artifactsDir, name));
  }
}

execSync(`npm pack --pack-destination "${artifactsDir}"`, { cwd: root, stdio: "inherit" });

const tarball = resolve(artifactsDir, expectedName);
if (!existsSync(tarball)) {
  console.error(`❌ Expected tarball not found: ${tarball}`);
  process.exit(1);
}

console.log(`✅ Packed ${tarball}`);
