# textlint-rule-preset-swift-docs-ja

[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
[![textlint](https://img.shields.io/badge/textlint-15.2.3-green.svg)](https://textlint.org/)
[![Vite](https://img.shields.io/badge/vite-7.1-blue.svg)](https://vite.dev)

📝 **Swift 日本語ドキュメント向けの textlint ルールプリセット**

Swift/SwiftUI の日本語ドキュメント作成時に、一貫した用語使用と日本語表現の品質を保つための textlint ルールプリセットです。

## 🚀 機能概要

| 機能 | 説明 |
|---|---|
| ✅ **textlint プリセット** | Swift 文書に適した日本語表現・用語統一ルールを提供 |
| 📘 **用語辞書の自動生成** | `glossary.md` から `dict/terminology.json` を自動生成 |
| 🔁 **自動的な更新監視** | glossary の変更を検知して辞書を再生成 |
| 💡 **VSCode 拡張** | 翻訳中の英単語に対して訳語をホバー表示 |
| ⚡ **Vite + TypeScript 構成** | 高速ビルドと型安全なスクリプト管理 |

---

## 📦 インストール

```zsh
npm install --save-dev textlint-rule-preset-swift-docs-ja
```

## ⚙️ 基本的な使い方

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

## 🛠️ 開発者向け情報

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

## ⚖️ ライセンス

本プロジェクトは GPL2.0以降ライセンスの下で提供されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

---

## 🙌 謝辞

* [The Swift Programming Language 日本語版](https://github.com/stzn/the-swift-programming-language-jp)
* [textlint-rule-preset-wp-docs-ja](https://github.com/jawordpressorg/textlint-rule-preset-wp-docs-ja)
* [textlint](https://textlint.github.io/)
