# Textlint Rule Preset for Swift Docs (ja) - CHANGELOG

## Unreleased

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
