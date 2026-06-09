# Textlint Rule Preset for Swift Docs (ja) - CHANGELOG

## Unreleased

## v1.0.2: 2026-06-09

* GitHub Actions の npm publish で Trusted Publisher (OIDC) 認証が正しく使われるよう修正
* CI の Node.js を24に更新（Trusted Publisher 要件）
* `setup-node` が書く空の `_authToken` を除去し、OIDC 認証を有効化
* CI の publish 手順をパッケージルートからの `npm publish` に変更
* ビルド時に `src/vscode/package.json` のバージョンをルート `package.json` へ同期

## v1.0.1: 2026-06-09

* npm 公開向けに `pack` / `verify:pack` / `publish:npm` スクリプトを追加（tarball は `artifacts/`、検証は `.sandbox/`）
* GitHub Actions による npm publish ワークフローを追加（Trusted Publisher / OIDC 対応）
* `peerDependencies` に `textlint` を追加

## v1.0.0: 2026-06-09

* 初の安定版リリース（`0.0.10` → `1.0.0`）
* ライセンスを GPL-2.0-or-later から GPL-3.0-or-later に更新
* VS Code 拡張のバージョンを `1.0.0` に揃え
* ビルド基盤を Vite v8に移行
* CJS チャンクをルートへコピーする `copy-root-cjs-chunks.mjs` を追加
* 依存 npm モジュールを最新化
