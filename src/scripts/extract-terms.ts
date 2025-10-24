import fs from "fs";
import path from "path";

const glossaryPath = path.resolve("glossary.md");
const outputPath = path.resolve("dict/terminology.json");

if (!fs.existsSync(glossaryPath)) {
  console.error("❌ glossary.md が見つかりません。");
  process.exit(1);
}

const content = fs.readFileSync(glossaryPath, "utf8");
const lines = content.split(/\r?\n/);

const dict: Record<string, string> = {};

for (const line of lines) {
  if (/^\|[^|]+\|[^|]+\|/.test(line)) {
    const cells = line.split("|").map((c) => c.trim());
    const en = cells[1];
    const ja = cells[2];
    if (en && ja && en !== "英語" && ja !== "日本語") dict[en] = ja;
  }
}

/**
 * 用語集を出力する
 */
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(dict, null, 2), "utf8");
console.log(`✅ 用語集を ${outputPath} に出力しました。`);
