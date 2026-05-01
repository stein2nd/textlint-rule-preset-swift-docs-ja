# Textlint Rule Preset for Swift Docs (ja)

[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
[![textlint](https://img.shields.io/badge/textlint-15.6-blue.svg)](https://textlint.org/)
[![Vite](https://img.shields.io/badge/vite-8.0-blue.svg)](https://vite.dev)

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

### 4. 個別ルールの設定

プリセット内の特定のルールに対して、個別に設定を上書きすることができます。以下の2つの方法があります。

#### 方法1: preset内でルールを個別に設定する

プリセット名の下にルール名をネストして設定する方法です。この方法では、`swift-docs-ja/prh` を `false` に設定して重複起動を防ぐ必要があります：

```json
{
  "rules": {
    "preset-swift-docs-ja": {
      "prh": {
        "rulePaths": [
          "../node_modules/textlint-rule-preset-swift-docs-ja/prh-rules/swift.yml"
        ],
        "severity": "warning"
      },
      "swift-docs-ja/prh": false
    }
  }
}
```

#### 方法2: preset-name/rule-name 形式で個別に設定する

`preset-name/rule-name` 形式で直接ルールを参照する方法です：

```json
{
  "rules": {
    "preset-swift-docs-ja": true,
    "swift-docs-ja/prh": {
      "severity": "warning"
    }
  }
}
```

**注意：** 方法1と方法2を同時に使用すると、同じルールが重複して実行される可能性があります。どちらか一方の方法を選択してください。

どちらの方法でも、`prh` ルールの違反が警告として報告されるようになります。他のルールに対しても同様の方法で個別に設定できます。

## 📋 含まれるルール

このプリセットには、以下のルールが含まれています。

### 日本語表現のルール

* **`textlint-rule-no-synonyms`** - 文章中の同義語の表記ゆれをチェック
* **`textlint-rule-ja-hiragana-keishikimeishi`** - ひらがなで表記したほうが読みやすい形式名詞をチェック
* **`textlint-rule-ja-no-abusage`** - よくある日本語の誤用をチェック
* **`textlint-rule-ja-no-redundant-expression`** - 冗長な表現を禁止
* **`textlint-rule-max-kanji-continuous-len`** - 漢字が連続する最大文字数を制限する (最大7文字)
* **`textlint-rule-no-dropping-the-ra`** - 「ら抜き言葉」を検出
* **`textlint-rule-no-mixed-zenkaku-and-hankaku-alphabet`** - 全角と半角アルファベットの混在をチェック
* **`textlint-rule-ja-space-around-code`** - インラインコードの前後にスペースを入れる
* **`textlint-rule-no-doubled-joshi`** - 助詞の重複をチェック
* **`textlint-rule-ja-space-between-half-and-full-width`** - 半角・全角文字間のスペースをチェック

### 用語統一ルール

* **`textlint-rule-terminology`** - 用語統一ルール (`dict/terminology.json` から読み込み)
* **`textlint-rule-prh`** - ymlファイルをもとに表記をチェック (`prh-rules/swift.yml` から読み込み)
  * `swift-docs-ja/prh` 形式で個別に参照・設定可能

### 除外設定

* **`textlint-filter-rule-comments`** - コメント部分を除外する

* **コメント部分** - `<!-- textlint-disable -->` と `<!-- textlint-enable -->` で囲まれた部分は除外
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
npm run build
cd dist/vscode
code --extensionDevelopmentPath=$(pwd)
```

### パッケージング

VSCode 拡張機能を `.vsix` ファイルとしてパッケージングするには、以下のコマンドを実行します。

```zsh
npm run build
npm run vscode:package
```

これにより、`dist/vscode/textlint-rule-preset-swift-docs-ja-{version}.vsix` が生成されます。

**注意：**
* ビルドプロセスで、必要なファイル (`package.json`、`prh-rules`、`dict`、`LICENSE`、`.vscodeignore`) が自動的に `dist/vscode/` にコピーされます
* パッケージング前に、依存関係 (`js-yaml`) が自動的にインストールされます
* 生成された `.vsix` ファイルは、VSCode の拡張機能としてインストールできます

## 🛠️ Development

### ビルド必須について

本リポジトリでは、**`dist/`、ルートの `index.cjs`、`chunk-*.cjs` は、Git に含めません** (Vite で都度生成します)。

リポジトリを clone した直後や、他ブランチに切り替えたあとは、次を実行してください。

```zsh
npm install
npm run build
```

その後で `npm run extract` / `npm run watch` (`dist/scripts/` を実行) や、VSCode 拡張の開発 (`dist/vscode/`) に進めます。

**npm レジストリから `npm install` する利用者** には影響しません。`npm pack` / `npm publish` 時に `prepack` で `build` が走り、`package.json` の `files` に従って tarball に入ります。

### Vite 8 (Rolldown) の扱い

ビルドは、Vite v8 の [Rolldown](https://rolldown.rs/) 基盤です。ライブラリ向け CJS では、既定の `platform` だと `import.meta.url` が誤って束ねられることがあるため、本リポジトリの `vite.config.ts` では **`rollupOptions.platform: "node"`** を指定しています (`__dirname` 相当のパス解決が壊れないようにするため。背景は [Vite #21974](https://github.com/vitejs/vite/issues/21974) などを参照)。

CJS 出力がコード分割されると、**`./chunk-*.cjs`** が増えます。`package.json` の `main` がルートの `index.cjs` を指す関係で、`npm run build` 内で `dist/` からルートへ同名チャンクもコピーします。チャンクのハッシュはビルドごとに変わり得るため、**成果物を Git で追うのではなく、常にビルドで揃える** 運用にしています。

### ビルド

```zsh
npm install
npm run build
```

### `package.json` scripts の使い分け

| script | 用途 | 実行タイミング |
|---|---|---|
| `npm run build` | ライブラリ本体、補助スクリプト、VSCode 拡張を `dist/` にビルドし、ルートの `index.cjs` と CJS 用 `chunk-*.cjs` を更新 | ソース変更後、clone 直後、VSCode 拡張のパッケージング前 |
| `npm run dev` | `vite build --watch` でビルド結果を監視更新 | 開発中に継続実行 |
| `npm run extract` | `glossary.md` から `dict/terminology.json` を再生成 | 用語表を更新した直後 |
| `npm run watch` | `glossary.md` 監視 + 辞書の自動再生成 | 用語整理を続ける作業中 |
| `npm run lint` | このリポジトリ向けの案内メッセージを表示 (実文書 lint は利用側プロジェクトで実施) | リリース前の確認メモ用途 |
| `npm run vscode:package` | `dist/vscode` の依存を入れて `.vsix` を作成 | VSCode 拡張を配布する時 |
| `npm run prepack` | パッケージ化直前に `build` を実行して公開物を最新化 (`npm pack` / `npm publish` 時に npm が自動実行) | 通常は手動実行不要 |

### 推奨実行順

通常の変更 (preset / script / vscode 拡張) では、次の順が安全です。

```zsh
npm install
npm run build
```

用語辞書を更新した場合は、次の順を推奨します。

```zsh
npm install
npm run extract   # または npm run watch
npm run build
```

VSCode 拡張を配布する場合は、最後に以下を実行します。

```zsh
npm run vscode:package
```

`npm pack` / `npm publish` では `prepack` により `build` が自動実行されるため、公開直前の取りこぼしを防げます。

### 依存更新時チェックリスト (daily routine / ncu 運用)

※ ここで、ncu とは [npm-check-updates](https://github.com/raineorshine/npm-check-updates) の略記です。

依存関係の定期更新を行うときは、次の手順で進めると差分管理しやすくなります。

1. **作業ツリーを確認する**
   * 先に未コミット変更を整理し、依存更新の差分と混ざらない状態にします。
2. **依存関係を更新する**
   * `ncu` で更新候補を確認し、`ncu -u` で `package.json` を更新します。
3. **lockfile を再生成する**
   * `npm install` (必要に応じて `npm install --legacy-peer-deps`) を実行し、`package-lock.json` を最新化します。
4. **ビルド確認**
   * `npm run build` が成功することを確認します (`dist/`、`index.cjs`、`chunk-*.cjs` は `.gitignore` 対象のため、コミットしません)。
5. **派生物を更新する (必要時のみ)**
   * 用語更新がある場合は `npm run extract` (または `npm run watch`) を実行します (事前に `npm run build` が必要です)。
   * VSCode 拡張を配布する場合は `npm run vscode:package` を実行します。
6. **差分を確認してコミットする**
   * `package.json` / `package-lock.json` / ソース、`dict` / `prh-rules` など、意図した差分だけが残っているか確認してからコミットします。

公開時 (`npm pack` / `npm publish`) は `prepack` が自動で `npm run build` を実行するため、公開 tarball に必要なファイルが揃います。

### プロジェクト構成

| ディレクトリ | 説明 |
|---|---|
| `src/preset/` | textlint プリセットの設定 |
| `src/scripts/` | 用語辞書の生成スクリプト |
| `src/vscode/` | VSCode 拡張のソース |
| `dist/` | ビルド出力 (Git 対象外。`npm run build` で生成) |
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
