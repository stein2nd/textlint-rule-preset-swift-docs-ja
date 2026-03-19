import e from "fs";
import { execSync as t } from "child_process";
//#region src/scripts/watch-terms.ts
var n = "glossary.md";
e.existsSync(n) || (console.error("❌ glossary.md が見つかりません。"), process.exit(1)), console.log("👀 glossary.md の変更を監視中...");
var r = null;
e.watchFile(n, { interval: 1e3 }, () => {
	r && clearTimeout(r), r = setTimeout(() => {
		console.log("🔁 glossary.md の更新を検知しました。辞書を再生成します..."), t("node dist/scripts/extract-terms.js", { stdio: "inherit" });
	}, 500);
});
//#endregion
