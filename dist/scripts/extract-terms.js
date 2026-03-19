import e from "path";
import t from "fs";
//#region src/scripts/extract-terms.ts
var n = e.resolve("glossary.md"), r = e.resolve("dict/terminology.json");
t.existsSync(n) || (console.error("❌ glossary.md が見つかりません。"), process.exit(1));
var i = t.readFileSync(n, "utf8").split(/\r?\n/), a = {};
for (let e of i) if (/^\|[^|]+\|[^|]+\|/.test(e)) {
	let t = e.split("|").map((e) => e.trim()), n = t[1], r = t[2];
	n && r && n !== "英語" && r !== "日本語" && (a[n] = r);
}
t.mkdirSync(e.dirname(r), { recursive: !0 }), t.writeFileSync(r, JSON.stringify(a, null, 2), "utf8"), console.log(`✅ 用語集を ${r} に出力しました。`);
//#endregion
