import { execSync } from "child_process";

/** Cursor 等のサンドボックスが注入する npm キャッシュ設定を除き、ユーザーの ~/.npmrc を使う */
export function getNpmPublishEnv() {
  const env = { ...process.env };

  for (const key of Object.keys(env)) {
    if (key === "NPM_CONFIG_CACHE" || key === "npm_config_cache") {
      delete env[key];
    }
    if (key === "NPM_CONFIG_DEVDIR" || key === "npm_config_devdir") {
      delete env[key];
    }
  }

  const token = env.NPM_TOKEN?.trim() || env.NODE_AUTH_TOKEN?.trim();
  if (token) {
    env.NODE_AUTH_TOKEN = token;
  }

  env.NPM_CONFIG_PROVENANCE = "false";
  return env;
}

export function npmWhoami(env = getNpmPublishEnv()) {
  return execSync("npm whoami", {
    encoding: "utf8",
    env,
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();
}

export function assertNpmRegistryAuth(options = {}) {
  const env = getNpmPublishEnv();
  const registry =
    options.registry ??
    execSync("npm config get registry", { encoding: "utf8", env }).trim();

  try {
    const user = npmWhoami(env);
    console.log(`✅ npm registry authenticated as ${user} (${registry})`);
    return user;
  } catch {
    const lines = [
      "❌ npm レジストリに未ログイン、またはトークンが無効です。",
      "",
      "推奨: GitHub で Release を公開すると、Actions (Trusted Publisher) が provenance 付きで npm に公開します。",
      "  → gh release create vX.Y.Z ...",
      "",
      "ローカルから npm run publish:npm する場合は次のいずれかを行ってください。",
      "  1. ターミナルで npm login を実行し、~/.npmrc にトークンを保存する",
      "  2. 環境変数 NPM_TOKEN (または NODE_AUTH_TOKEN) に npm の Access Token を設定する",
      "     例: NPM_TOKEN=*** npm run publish:npm",
      "",
      "IDE / エージェント環境では npm の認証情報が隔離されることがあります。",
      "その場合は macOS のターミナルや iTerm で同じコマンドを実行してください。"
    ];
    console.error(lines.join("\n"));
    process.exit(1);
  }
}