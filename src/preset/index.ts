import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
let __dirname = dirname(__filename);
// index.cjs がルートディレクトリにコピーされることを考慮
// dist/index.cjs の場合は親ディレクトリ（ルート）を指すようにする
if (__dirname.endsWith("/dist") || __dirname.endsWith("\\dist")) {
  __dirname = dirname(__dirname);
}

export default {
  rules: {
    "@textlint-ja/no-synonyms": require("@textlint-ja/textlint-rule-no-synonyms").default,
    "ja-hiragana-keishikimeishi": require("textlint-rule-ja-hiragana-keishikimeishi"),
    "ja-no-abusage": require("textlint-rule-ja-no-abusage").default,
    "ja-no-redundant-expression": require("textlint-rule-ja-no-redundant-expression").default,
    "max-kanji-continuous-len": require("textlint-rule-max-kanji-continuous-len"),
    "no-dropping-the-ra": require("textlint-rule-no-dropping-the-ra").default,
    "no-mixed-zenkaku-and-hankaku-alphabet": require("textlint-rule-no-mixed-zenkaku-and-hankaku-alphabet"),
    "ja-space-around-code": require("textlint-rule-ja-space-around-code"),
    "no-doubled-joshi": require("textlint-rule-no-doubled-joshi").default,
    "ja-space-between-half-and-full-width": require("textlint-rule-ja-space-between-half-and-full-width"),
    "terminology": require("textlint-rule-terminology").default,
    "prh": require("textlint-rule-prh").default,
  },
  rulesConfig: {
    // 文章中の同義語の表記ゆれをチェックする
    // https://github.com/textlint-ja/textlint-rule-no-synonyms
    "@textlint-ja/no-synonyms": true,
    // 漢字よりもひらがなで表記したほうが読みやすい形式名詞を指摘する
    // https://github.com/lostandfound/textlint-rule-ja-hiragana-keishikimeishi
    "ja-hiragana-keishikimeishi": true,
    // よくある誤用をチェックする
    // https://github.com/textlint-ja/textlint-rule-ja-no-abusage
    "ja-no-abusage": true,
    // 冗長な表現を禁止する
    // https://github.com/textlint-ja/textlint-rule-ja-no-redundant-expression
    "ja-no-redundant-expression": true,
    // 漢字が連続する最大文字数を制限する（最大7文字）
    // https://github.com/textlint-ja/textlint-rule-max-kanji-continuous-len
    "max-kanji-continuous-len": {max: 7},
    // 「ら抜き言葉」を検出する
    // https://github.com/textlint-ja/textlint-rule-no-dropping-the-ra
    "no-dropping-the-ra": true,
    // 全角と半角アルファベットの混在をチェックする
    // https://github.com/textlint-ja/textlint-rule-no-mixed-zenkaku-and-hankaku-alphabet
    "no-mixed-zenkaku-and-hankaku-alphabet": true,
    // インラインコードの前後にスペースを入れる
    // https://github.com/textlint-ja/textlint-rule-preset-ja-spacing/tree/master/packages/textlint-rule-ja-space-around-code
    "ja-space-around-code": {before: true, after: true},
    // 助詞の重複をチェック
    // https://github.com/textlint-ja/textlint-rule-no-doubled-joshi
    "no-doubled-joshi": true,
    // 半角・全角文字間のスペースをチェック
    // https://github.com/textlint-ja/textlint-rule-ja-space-between-half-and-full-width
    "ja-space-between-half-and-full-width": true,
    // 用語統一ルール
    // https://github.com/textlint-ja/textlint-rule-terminology
    terminology: {
      defaultTerms: false,
      terms: resolve(__dirname, "./dict/terminology.json"),
    },
    // ymlファイルをもとに表記をチェックする
    // https://github.com/textlint-rule/textlint-rule-prh
    prh: {
      rulePaths: [resolve(__dirname, "./prh-rules/swift.yml")],
    },
    // 「<!-- textlint-disable -->」と「<!-- textlint-enable -->」に挟まれたコメント部分を除外する
    // https://github.com/textlint-filter-rule-comments
    comments: true,
  },
  filters: {
    comments: true,
    code: {
      allow: ["swift"],
    },
  },
};