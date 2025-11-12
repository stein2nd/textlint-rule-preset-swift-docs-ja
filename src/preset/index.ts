import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  rules: {
    "preset-ja-technical-writing": true,
    terminology: true,
    "no-doubled-joshi": true,
    "ja-no-abusage": true,
    "ja-space-between-half-and-full-width": true,
    prh: true,
  },
  rulesConfig: {
    // 技術文書向けの日本語表現ルール
    // https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing
    "preset-ja-technical-writing": true,

    // 用語統一ルール
    // https://github.com/textlint-ja/textlint-rule-terminology
    terminology: {
      defaultTerms: false,
      terms: resolve(__dirname, "./dict/terminology.json"),
    },

    // 助詞の重複をチェック
    // https://github.com/textlint-ja/textlint-rule-no-doubled-joshi
    "no-doubled-joshi": true,

    // よくある誤用をチェック
    // https://github.com/textlint-ja/textlint-rule-ja-no-abusage
    "ja-no-abusage": true,

    // 半角・全角文字間のスペースをチェック
    // https://github.com/textlint-ja/textlint-rule-ja-space-between-half-and-full-width
    "ja-space-between-half-and-full-width": true,

    // ymlファイルをもとに表記をチェックする
    // https://github.com/textlint-rule/textlint-rule-prh
    prh: {
      rulePaths: [resolve(__dirname, "./prh-rules/swift.yml")],
    },
  },
  filters: {
    comments: true,
    code: {
      allow: ["swift"],
    },
  },
};