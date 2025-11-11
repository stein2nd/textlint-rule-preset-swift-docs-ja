# textlint-rule-preset-swift-docs-ja

[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
[![textlint](https://img.shields.io/badge/textlint-15.3-blue.svg)](https://textlint.org/)
[![Vite](https://img.shields.io/badge/vite-7.2-blue.svg)](https://vite.dev)

## 📝 Description

**Swift 日本語ドキュメント向けの textlint ルールプリセット** は、Swift/SwiftUI の日本語ドキュメント作成時に、一貫した用語使用と日本語表現の品質を保つための textlint ルールプリセットです。

## 🚀 機能概要

| 機能 | 説明 |
|---|---|
| ✅ **textlint プリセット** | Swift 文書に適した日本語表現・用語統一ルールを提供 |
| 📘 **用語辞書の自動生成** | `glossary.md` から `dict/terminology.json` を自動生成 |
| 🔁 **自動的な更新監視** | glossary の変更を検知して辞書を再生成 |
| 💡 **VSCode 拡張** | 翻訳中の英単語に対して訳語をホバー表示 |
| ⚡ **Vite + TypeScript 構成** | 高速ビルドと型安全なスクリプト管理 |

## ⚖️ License

本プロジェクトは GPL2.0以降ライセンスの下で提供されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## Support and Contact

サポート、機能リクエスト、またはバグ報告については、[GitHub Issues](https://github.com/stein2nd/textlint-rule-preset-swift-docs-ja/issues) ページをご覧ください。

---

## 📦 Installation

```zsh
npm install --save-dev textlint-rule-preset-swift-docs-ja
```

## ⚙️ Usage

### 1. 設定ファイルの作成

プロジェクトルートに `.textlintrc` を作成します。

```json
{
  "rules": {
    "preset-swift-docs-ja": true
  }
}
```

### 2. ドキュメントのチェック

```zsh
# 特定のファイルをチェック
npx textlint docs/**/*.md

# 特定のファイルを指定
npx textlint README.md
```

### 3. 自動修正 (可能な場合)

```zsh
npx textlint --fix docs/**/*.md
```

## 📋 含まれるルール

このプリセットには、以下のルールが含まれています。

### 日本語表現のルール

* **`preset-ja-technical-writing`** - 技術文書向けの日本語表現ルール
* **`no-doubled-joshi`** - 助詞の重複をチェック
* **`ja-no-abusage`** - 日本語の誤用をチェック
* **`ja-space-between-half-and-full-width`** - 半角・全角文字間のスペースをチェック

### 用語統一ルール

* **`terminology`** - 用語統一ルール (`dict/terminology.json` から読み込み)
* **`prh`** - PRH ルール (`prh-rules/swift.yml` から読み込み)

### 除外設定

* **コメント部分** - `<!-- -->` で囲まれた部分は除外
* **コードブロック** - Swift コードは除外 (翻訳対象外)

## 🧠 用語辞書の設定

### 用語統一の仕組み

このプリセットでは、2つの異なるアプローチで用語統一を実現しています：

| 方式 | ファイル | 用途 | 特徴 |
|---|---|---|---|
| **Terminology** | `dict/terminology.json` | プロジェクト固有の用語 | `glossary.md` から自動生成 |
| **PRH** | `prh-rules/swift.yml` | Swift 共通の用語統一 | 手動で定義・管理 |

### 1. プロジェクト固有の用語辞書 (Terminology)

#### 用語辞書の作成

`glossary.md` に用語表を作成します。

```markdown
| 英語 | 日本語 | 備考 |
| --- | --- | --- |
| Protocol | プロトコル | |
| Closure | クロージャ | |
| Property | プロパティ | |
```

#### 辞書の生成

```zsh
npm run extract
```

これで `dict/terminology.json` が生成され、プロジェクト固有の用語統一ルールが有効になります。

### 2. Swift 共通の用語統一 (PRH)

#### PRH ルールの設定

Swift 特有の用語統一ルールは `prh-rules/swift.yml` で定義されています。

```yaml
version: 1
rules:
  - expected: プロトコル
    pattern: /プロトコール/
  - expected: クロージャ
    pattern: /クロージャー/
  - expected: プロパティ
    pattern: /プロパティー/
```

#### 用語統一の優先順位

1. **PRH ルール** (`prh-rules/swift.yml`) - Swift 共通の用語統一
2. **Terminology** (`dict/terminology.json`) - プロジェクト固有の用語

#### 矛盾時の処理

両方の辞書で同じ用語が定義されている場合、**PRH ルールが優先**されます。

**例：矛盾する定義**
- `prh-rules/swift.yml`: `プロトコル` (正しい)
- `dict/terminology.json`: `プロトコール` (誤り)

この場合、PRH ルールが優先され、`プロトコール` は誤りとして検出されます。

**推奨事項：**
- Swift 共通の用語は `prh-rules/swift.yml` で管理
- プロジェクト固有の用語のみ `glossary.md` で管理
- 重複を避けるため、用語の分類を明確にする

### 自動監視 (開発時)

```zsh
npm run watch
```

`glossary.md` の変更を監視し、自動で辞書を再生成します。

## 💡 VSCode 拡張機能

翻訳作業を効率化する VSCode 拡張も提供しています。

### 機能

* 英単語にカーソルを合わせると訳語をホバー表示
* 用語辞書の即時リロード

### 開発モードでの使用

```zsh
cd dist/vscode
code --extensionDevelopmentPath=$(pwd)
```

## 🛠️ Development

### ビルド

```zsh
npm install
npm run build
```

### プロジェクト構成

| ディレクトリ | 説明 |
|---|---|
| `src/preset/` | textlint プリセットの設定 |
| `src/scripts/` | 用語辞書の生成スクリプト |
| `src/vscode/` | VSCode 拡張のソース |
| `dict/` | 生成された用語辞書 |
| `prh-rules/` | PRH ルール定義ファイル |

## Contributing

貢献をお待ちしています。以下の手順に従ってください。

1. リポジトリをフォークしてください。
2. 機能ブランチを作成してください (`git checkout -b feature/amazing-feature`)。
3. 変更をコミットしてください (`git commit -m 'Add some amazing feature'`)。
4. 機能ブランチにプッシュしてください (`git push origin feature/amazing-feature`)。
5. Pull Request を開いてください。

### 開発ガイドライン

#### textlint ルールの追加

* 新しい textlint ルールを追加する場合は、`src/preset/index.ts` の `rules` セクションに追加してください。
* ルールの設定は、既存のルールの形式に従ってください。
* ルールを追加したら、`npm run build` でビルドし、動作確認を行ってください。

#### 用語辞書の更新

* **プロジェクト固有の用語** を追加する場合は、`glossary.md` に用語表の形式で追加してください。
* 用語を追加したら、`npm run extract` を実行して `dict/terminology.json` を再生成してください。
* **Swift 共通の用語統一** を追加する場合は、`prh-rules/swift.yml` に追加してください。
* PRH ルールと Terminology の重複を避け、用語の分類を明確にしてください (Swift 共通は PRH、プロジェクト固有は Terminology)。

#### コードスタイル

* TypeScript の型定義を適切に使用してください。
* 既存のコードスタイル (インデント、命名規則など) に従ってください。
* スクリプト (`src/scripts/`) や VSCode 拡張 (`src/vscode/`) を変更する場合は、TypeScript の型安全性を保つようにしてください。

#### ビルドとテスト

* 変更を加えたら、`npm run build` でビルドが正常に完了することを確認してください。
* 実際の Markdown ファイルに対して `npm run lint` を実行し、ルールが正しく動作することを確認してください。
* VSCode 拡張を変更した場合は、開発モードで動作確認を行ってください。

#### ドキュメントの更新

* 新しいルールや機能を追加した場合は、`README.md` の「📋 含まれるルール」セクションを更新してください。
* 用語辞書の更新方法や設定方法が変更された場合は、該当するセクションを更新してください。
* `glossary.md` や `prh-rules/swift.yml` を更新した場合は、変更内容が明確になるようにコメントを追加してください。

## Contributors & Developers

**"textlint-rule-preset-swift-docs-ja"** はオープンソース・ソフトウェアです。以下の皆様がこのプロジェクトに貢献しています。

* **開発者**: Koutarou ISHIKAWA

---

## 🙌 謝辞

* [The Swift Programming Language 日本語版](https://github.com/stzn/the-swift-programming-language-jp)
* [textlint-rule-preset-wp-docs-ja](https://github.com/jawordpressorg/textlint-rule-preset-wp-docs-ja)
* [textlint](https://textlint.github.io/)
