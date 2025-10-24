import { execSync } from "child_process";
import fs from "fs";

const glossaryPath = "glossary.md";

if (!fs.existsSync(glossaryPath)) {
  console.error("❌ glossary.md が見つかりません。");
  process.exit(1);
}

console.log("👀 glossary.md の変更を監視中...");

let timer: NodeJS.Timeout | null = null;
/**
 * 用語集を監視する
 * 用語集が更新されたら辞書を再生成する
 */
fs.watchFile(glossaryPath, { interval: 1000 }, () => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    console.log("🔁 glossary.md の更新を検知しました。辞書を再生成します...");
    execSync("node dist/scripts/extract-terms.js", { stdio: "inherit" });
  }, 500);
});
