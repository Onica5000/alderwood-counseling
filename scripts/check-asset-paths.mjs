/**
 * Guards against the failure that shipped once already: a raw <img src="/...">
 * does not get `basePath` applied, so images 404 on a GitHub Pages project site
 * while every link on the page keeps working — invisible in local dev, where the
 * base path is empty.
 *
 * Run after a build. Scans the export for asset references that are missing the
 * base path the build was made with.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
if (!base) {
  console.log("check-asset-paths: no base path set, nothing to verify.");
  process.exit(0);
}

const html = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (entry.endsWith(".html")) html.push(p);
  }
})("out");

const bad = [];
for (const file of html) {
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/(?:src|href)="(\/[^"]*)"/g)) {
    const url = m[1];
    if (url.startsWith(base + "/") || url === base) continue;
    if (url.startsWith("//")) continue; // protocol-relative
    bad.push(`${file}: ${url}`);
  }
}

if (bad.length) {
  console.error(
    `check-asset-paths: ${bad.length} reference(s) missing the "${base}" base path.\n` +
      `Route every /public reference through asset() from src/lib/asset.ts.\n`,
  );
  for (const b of bad.slice(0, 20)) console.error("  " + b);
  process.exit(1);
}
console.log(`check-asset-paths: all references carry the "${base}" base path.`);
