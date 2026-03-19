import e from "path";
import t from "fs";
import n from "js-yaml";
import * as r from "vscode";
//#region src/vscode/extension.ts
var i = {}, a = {}, o = {};
function s(r) {
	let i = t.existsSync(e.join(r.extensionPath, "prh-rules", "swift.yml")) ? e.join(r.extensionPath, "prh-rules", "swift.yml") : e.join(r.extensionPath, "..", "prh-rules", "swift.yml"), a = {};
	if (t.existsSync(i)) try {
		let e = t.readFileSync(i, "utf8"), r = n.load(e);
		if (r.rules) for (let e of r.rules) {
			let t = e.pattern.match(/^\/(.+)\/$/);
			if (t) {
				let n = t[1];
				a[n] = e.expected;
			}
		}
		console.log("✅ PRH rules loaded:", Object.keys(a).length, "entries");
	} catch (e) {
		console.warn("⚠️ Failed to load PRH rules:", e);
	}
	else console.warn("⚠️ prh-rules/swift.yml not found");
	return a;
}
function c(n) {
	let r = t.existsSync(e.join(n.extensionPath, "dict", "terminology.json")) ? e.join(n.extensionPath, "dict", "terminology.json") : e.join(n.extensionPath, "..", "dict", "terminology.json"), i = {};
	if (t.existsSync(r)) try {
		i = JSON.parse(t.readFileSync(r, "utf8")), console.log("✅ Terminology loaded:", Object.keys(i).length, "entries");
	} catch (e) {
		console.warn("⚠️ Failed to load terminology:", e);
	}
	else console.warn("⚠️ terminology.json not found");
	return i;
}
function l(e) {
	a = s(e), i = c(e), o = {
		...i,
		...a
	}, console.log("✅ Unified dictionary created:", Object.keys(o).length, "entries"), console.log("  - PRH rules:", Object.keys(a).length, "entries"), console.log("  - Terminology:", Object.keys(i).length, "entries");
}
function u(e) {
	l(e);
	let t = r.languages.registerHoverProvider("markdown", { provideHover(e, t) {
		let n = e.getText(e.getWordRangeAtPosition(t));
		if (o[n]) {
			let e = a[n] ? "PRH" : "Terminology";
			return new r.Hover(`💡 **${n}** → 「${o[n]}」 (${e})`);
		}
		return null;
	} }), n = r.commands.registerCommand("swiftDocsJA.reloadTerminology", () => {
		l(e), r.window.showInformationMessage("Unified dictionary reloaded!");
	});
	e.subscriptions.push(t, n);
}
function d() {}
//#endregion
export { u as activate, d as deactivate };
