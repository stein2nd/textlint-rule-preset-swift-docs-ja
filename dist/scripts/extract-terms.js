import t from "fs";
import n from "path";
const c = n.resolve("glossary.md"), e = n.resolve("dict/terminology.json");
t.existsSync(c) || (console.error("❌ glossary.md が見つかりません。"), process.exit(1));
const m = t.readFileSync(c, "utf8"), a = m.split(/\r?\n/), l = {};
for (const r of a)
  if (/^\|[^|]+\|[^|]+\|/.test(r)) {
    const i = r.split("|").map((f) => f.trim()), o = i[1], s = i[2];
    o && s && o !== "英語" && s !== "日本語" && (l[o] = s);
  }
t.mkdirSync(n.dirname(e), { recursive: !0 });
t.writeFileSync(e, JSON.stringify(l, null, 2), "utf8");
console.log(`✅ 用語集を ${e} に出力しました。`);
