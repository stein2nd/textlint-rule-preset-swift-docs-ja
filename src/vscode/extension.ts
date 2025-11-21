import * as vscode from "vscode";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

/**
 * PRH ルールのインターフェース
 */
interface PRHRule {
  expected: string;
  pattern: string;
}

/**
 * PRH ルールの設定のインターフェース
 */
interface PRHConfig {
  version: number;
  rules: PRHRule[];
}

/**
 * 用語集の辞書
 */
let terminology: Record<string, string> = {};

/**
 * PRH ルールの辞書
 */
let prhRules: Record<string, string> = {};

/**
 * 統合辞書
 */
let unifiedDictionary: Record<string, string> = {};

/**
 * PRH ルールを読み込む
 * @param context VSCode の拡張コンテキスト
 * @returns PRH ルールの辞書
 */
function loadPRHRules(context: vscode.ExtensionContext): Record<string, string> {
  // まず拡張機能ディレクトリ内を確認し、なければ親ディレクトリを確認
  const prhPath = fs.existsSync(path.join(context.extensionPath, "prh-rules", "swift.yml"))
    ? path.join(context.extensionPath, "prh-rules", "swift.yml")
    : path.join(context.extensionPath, "..", "prh-rules", "swift.yml");
  const prhDict: Record<string, string> = {};
  
  if (fs.existsSync(prhPath)) {
    try {
      const content = fs.readFileSync(prhPath, "utf8");
      const config = yaml.load(content) as PRHConfig;
      
      if (config.rules) {
        for (const rule of config.rules) {
          // パターンから誤った用語を抽出
          const patternMatch = rule.pattern.match(/^\/(.+)\/$/);
          if (patternMatch) {
            const wrongTerm = patternMatch[1];
            prhDict[wrongTerm] = rule.expected;
          }
        }
      }
      console.log("✅ PRH rules loaded:", Object.keys(prhDict).length, "entries");
    } catch (error) {
      console.warn("⚠️ Failed to load PRH rules:", error);
    }
  } else {
    console.warn("⚠️ prh-rules/swift.yml not found");
  }
  
  return prhDict;
}

/**
 * 用語集を読み込む
 * @param context VSCode の拡張コンテキスト
 * @returns 用語集の辞書
 */
function loadTerminology(context: vscode.ExtensionContext): Record<string, string> {
  // まず拡張機能ディレクトリ内を確認し、なければ親ディレクトリを確認
  const dictPath = fs.existsSync(path.join(context.extensionPath, "dict", "terminology.json"))
    ? path.join(context.extensionPath, "dict", "terminology.json")
    : path.join(context.extensionPath, "..", "dict", "terminology.json");
  let termDict: Record<string, string> = {};
  
  if (fs.existsSync(dictPath)) {
    try {
      termDict = JSON.parse(fs.readFileSync(dictPath, "utf8"));
      console.log("✅ Terminology loaded:", Object.keys(termDict).length, "entries");
    } catch (error) {
      console.warn("⚠️ Failed to load terminology:", error);
    }
  } else {
    console.warn("⚠️ terminology.json not found");
  }
  
  return termDict;
}

/**
 * 統合辞書を作成する
 * @param context VSCode の拡張コンテキスト
 */
function createUnifiedDictionary(context: vscode.ExtensionContext) {
  prhRules = loadPRHRules(context);
  terminology = loadTerminology(context);
  
  // PRH ルールを優先して統合辞書を作成
  unifiedDictionary = { ...terminology, ...prhRules };
  
  console.log("✅ Unified dictionary created:", Object.keys(unifiedDictionary).length, "entries");
  console.log("  - PRH rules:", Object.keys(prhRules).length, "entries");
  console.log("  - Terminology:", Object.keys(terminology).length, "entries");
}

/**
 * VSCode の拡張機能をアクティブ化する
 * @param context VSCode の拡張コンテキスト
 */
export function activate(context: vscode.ExtensionContext) {
  // 統合辞書を作成する
  createUnifiedDictionary(context);

  // ホバープロバイダを登録する
  const hoverProvider = vscode.languages.registerHoverProvider("markdown", {
    provideHover(document, position) {
      const word = document.getText(document.getWordRangeAtPosition(position));
      if (unifiedDictionary[word]) {
        const source = prhRules[word] ? "PRH" : "Terminology";
        return new vscode.Hover(`💡 **${word}** → 「${unifiedDictionary[word]}」 (${source})`);
      }
      return null;
    }
  });

  // 用語集をリロードするコマンドを登録する
  const reloadCmd = vscode.commands.registerCommand("swiftDocsJA.reloadTerminology", () => {
    createUnifiedDictionary(context);
    vscode.window.showInformationMessage("Unified dictionary reloaded!");
  });

  context.subscriptions.push(hoverProvider, reloadCmd);
}

export function deactivate() {}
