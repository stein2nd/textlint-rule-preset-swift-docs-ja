import { execSync as r } from "child_process";
import o from "fs";
const e = "glossary.md";
o.existsSync(e) || (console.error("❌ glossary.md が見つかりません。"), process.exit(1));
console.log("👀 glossary.md の変更を監視中...");
let s = null;
o.watchFile(e, { interval: 1e3 }, () => {
  s && clearTimeout(s), s = setTimeout(() => {
    console.log("🔁 glossary.md の更新を検知しました。辞書を再生成します..."), r("node dist/scripts/extract-terms.js", { stdio: "inherit" });
  }, 500);
});
