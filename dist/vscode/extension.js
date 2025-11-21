import * as a from "vscode";
import i from "fs";
import s from "path";
import u from "js-yaml";
let y = {}, d = {}, m = {};
function h(e) {
  const t = i.existsSync(s.join(e.extensionPath, "prh-rules", "swift.yml")) ? s.join(e.extensionPath, "prh-rules", "swift.yml") : s.join(e.extensionPath, "..", "prh-rules", "swift.yml"), o = {};
  if (i.existsSync(t))
    try {
      const n = i.readFileSync(t, "utf8"), l = u.load(n);
      if (l.rules)
        for (const r of l.rules) {
          const c = r.pattern.match(/^\/(.+)\/$/);
          if (c) {
            const g = c[1];
            o[g] = r.expected;
          }
        }
      console.log("✅ PRH rules loaded:", Object.keys(o).length, "entries");
    } catch (n) {
      console.warn("⚠️ Failed to load PRH rules:", n);
    }
  else
    console.warn("⚠️ prh-rules/swift.yml not found");
  return o;
}
function p(e) {
  const t = i.existsSync(s.join(e.extensionPath, "dict", "terminology.json")) ? s.join(e.extensionPath, "dict", "terminology.json") : s.join(e.extensionPath, "..", "dict", "terminology.json");
  let o = {};
  if (i.existsSync(t))
    try {
      o = JSON.parse(i.readFileSync(t, "utf8")), console.log("✅ Terminology loaded:", Object.keys(o).length, "entries");
    } catch (n) {
      console.warn("⚠️ Failed to load terminology:", n);
    }
  else
    console.warn("⚠️ terminology.json not found");
  return o;
}
function f(e) {
  d = h(e), y = p(e), m = { ...y, ...d }, console.log("✅ Unified dictionary created:", Object.keys(m).length, "entries"), console.log("  - PRH rules:", Object.keys(d).length, "entries"), console.log("  - Terminology:", Object.keys(y).length, "entries");
}
function v(e) {
  f(e);
  const t = a.languages.registerHoverProvider("markdown", {
    provideHover(n, l) {
      const r = n.getText(n.getWordRangeAtPosition(l));
      if (m[r]) {
        const c = d[r] ? "PRH" : "Terminology";
        return new a.Hover(`💡 **${r}** → 「${m[r]}」 (${c})`);
      }
      return null;
    }
  }), o = a.commands.registerCommand("swiftDocsJA.reloadTerminology", () => {
    f(e), a.window.showInformationMessage("Unified dictionary reloaded!");
  });
  e.subscriptions.push(t, o);
}
function H() {
}
export {
  v as activate,
  H as deactivate
};
