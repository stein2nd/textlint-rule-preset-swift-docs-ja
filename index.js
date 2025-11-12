import { fileURLToPath as r } from "url";
import { dirname as o, resolve as e } from "path";
const a = r(import.meta.url), t = o(a), n = {
  rules: {
    "preset-ja-technical-writing": !0,
    terminology: !0,
    "no-doubled-joshi": !0,
    "ja-no-abusage": !0,
    "ja-space-between-half-and-full-width": !0,
    prh: !0
  },
  rulesConfig: {
    // 技術文書向けの日本語表現ルール
    // https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing
    "preset-ja-technical-writing": !0,
    // 用語統一ルール
    // https://github.com/textlint-ja/textlint-rule-terminology
    terminology: {
      defaultTerms: !1,
      terms: e(t, "./dict/terminology.json")
    },
    // 助詞の重複をチェック
    // https://github.com/textlint-ja/textlint-rule-no-doubled-joshi
    "no-doubled-joshi": !0,
    // よくある誤用をチェック
    // https://github.com/textlint-ja/textlint-rule-ja-no-abusage
    "ja-no-abusage": !0,
    // 半角・全角文字間のスペースをチェック
    // https://github.com/textlint-ja/textlint-rule-ja-space-between-half-and-full-width
    "ja-space-between-half-and-full-width": !0,
    // ymlファイルをもとに表記をチェックする
    // https://github.com/textlint-rule/textlint-rule-prh
    prh: {
      rulePaths: [e(t, "./prh-rules/swift.yml")]
    }
  },
  filters: {
    comments: !0,
    code: {
      allow: ["swift"]
    }
  }
};
export {
  n as default
};
