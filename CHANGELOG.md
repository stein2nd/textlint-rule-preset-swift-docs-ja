# Textlint Rule Preset for Swift Docs (ja) - CHANGELOG

## Unreleased

## v1.0.20: 2026-11-26

* `engines.node` を `>=22.12.0` に明示し、インストール・開発要件を [Docs Linter](https://github.com/stein2nd/docs-linter) と揃えた
* `peerDependencies.textlint` を `>=16.0.0` に更新 (Node v22.12要件と整合)
* README に Node バッジ、Contributing / npm 公開の前提、`build.target` と `engines` の関係を追記
* `vite.config.ts` と npm publish ワークフローに、`build.target` (配布物) と `engines` (実行環境) のコメントを追加

## v1.0.19: 2026-11-26

* 直接の `rollup` devDependency と `overrides` を削除し、README バッジを Rolldown に更新 ([#4](https://github.com/stein2nd/textlint-rule-preset-swift-docs-ja/issues/4))
* README の「Vite v8 (Rolldown) の扱い」を現行ビルド (Rolldown、チャンクコピー) に合わせて整理
* `tsconfig.json` に `rootDir: "src"` を明示し、TypeScript v7での `outDir` レイアウト警告を解消

## v1.0.18: 2026-11-26

* `publish:npm` 前に npm 認証を検証し、`NPM_TOKEN` / サンドボックス用 npm 環境変数に対応
* `npm run publish:check-auth` を追加

## v1.0.17: 2026-11-26

* npm プリセットが `require` / `import` のどちらでも読み込めるよう、ビルド時に textlint ルールをバンドルせず `dependencies` として配布するよう変更 ([#8](https://github.com/stein2nd/textlint-rule-preset-swift-docs-ja/issues/8))
* `verify:pack` で tarball インストール後の `require` / `import` スモークテストを追加

## v1.0.16: 2026-11-26

* 利用 npm モジュールを最新化 (textlint v16.1.3、Rollup v4.68.8、@types/node v26.6.10、textlint-rule-preset-ja-technical-writing v12.1.0など)
* README のバッジを更新

## v1.0.15: 2026-11-20

* npm publish ワークフローの Actions を v7系に更新し、Node.js v20非推奨の Annotation を解消

## v1.0.14: 2026-11-20

* 利用 npm モジュールを最新化 (textlint v16.1.1、Vite v8.3.8、Rollup v4.68.7、@vscode/vsce v4.1.1、@types/vscode v1.146.0など)
* README のバッジを更新

## v1.0.13: 2026-11-05

* 利用 npm モジュールを最新化 (Vite v8.3.6、Rollup v4.67.5、@types/vscode v1.145.0など)
* README のバッジを更新

## v1.0.12: 2026-10-29

* 利用 npm モジュールを最新化 (Rollup v4.66.0、@vscode/vsce v4.1.0、@types/node v26.6.6、@types/vscode v1.144.0など)
* README のバッジを更新

## v1.0.11: 2026-10-24

* 利用 npm モジュールを最新化 (Vite v8.3.5、Rollup v4.65.0など)
* README のバッジを更新

## v1.0.10: 2026-10-15

* 利用 npm モジュールを最新化 (Vite v8.3.4、Rollup v4.64.6、js-yaml v5.4.3、@types/node v26.6.5など)

## v1.0.9: 2026-10-04

* 利用 npm モジュールを最新化 (Rollup v4.64.0など)
* README のバッジを更新

## v1.0.8: 2026-10-02

* 利用 npm モジュールを最新化 (Vite v8.3.2、Rollup v4.63.6、@types/node v26.6.4、@types/vscode v1.140.0など)
* `package.json` の SchemaStore スキーマを読み込めるよう、`json.schemaDownload.enable` を有効化

## v1.0.7: 2026-09-26

* 利用 npm モジュールを最新化 (Vite v8.3.1、@vscode/vsce v4.0.0、@types/node v26.6.3など)
* README のバッジを更新

## v1.0.6: 2026-09-09

* 利用 npm モジュールを最新化 (@types/node v26.5.0、@types/vscode v1.136.0など)

## v1.0.5: 2026-08-31

* 利用 npm モジュールを最新化 (Rollup v4.63.1、js-yaml v5.4.1、Vite v8.2.2など)
* README のバッジを更新

## v1.0.4: 2026-08-08

* 利用 npm モジュールを最新化 (textlint v15.8、Vite v8.2、Rollup v4.62.4 など)
* README のバッジを更新

## v1.0.3: 2026-07-23

* 利用 npm モジュールを最新化 (TypeScript v7、Vite v8.1、Rollup v4.62、js-yaml v5など)
* textlint v15.7系に更新
* README のバッジを更新

## v1.0.2: 2026-06-09

* GitHub Actions の npm publish で Trusted Publisher (OIDC) 認証が正しく使われるよう修正
* CI の Node.js を24に更新 (Trusted Publisher 要件)
* `setup-node` が書く空の `_authToken` を除去し、OIDC 認証を有効化
* CI の publish 手順をパッケージルートからの `npm publish` に変更
* ビルド時に `src/vscode/package.json` のバージョンをルート `package.json` に同期

## v1.0.1: 2026-06-09

* npm 公開向けに `pack` / `verify:pack` / `publish:npm` スクリプトを追加 (tarball は `artifacts/`、検証は `.sandbox/`)
* GitHub Actions による npm publish ワークフローを追加 (Trusted Publisher / OIDC 対応)
* `peerDependencies` に `textlint` を追加

## v1.0.0: 2026-06-09

* 初の安定版リリース (`0.0.10` → `1.0.0`)
* ライセンスを GPL-2.0-or-later から GPL-3.0-or-later に更新
* VS Code 拡張のバージョンを `1.0.0` に揃え
* ビルド基盤を Vite v8に移行
* CJS チャンクをルートにコピーする `copy-root-cjs-chunks.mjs` を追加
* 依存 npm モジュールを最新化
