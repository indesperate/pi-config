import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Narrow compatibility patch for @gotgenes/pi-permission-system 41.0.0.
// Keep FFF tools as extension tools: their path syntax is not Pi's built-in
// file-tool syntax. Only their read/write attribution needs to change.
const original = `export const READ_ONLY_PATH_BEARING_TOOLS: ReadonlySet<string> = new Set([
  "read",
  "find",
  "grep",
  "ls",
]);`;
const patched = original.replace('  "ls",', `  "ls",
  // @ff-labs/pi-fff searches read files; they do not modify search targets.
  "ffgrep",
  "fffind",`);

export function patchSource(source) {
  if (source.includes(patched) && source.split(patched).length === 2) return source;
  if (source.split(original).length !== 2) {
    throw new Error("FFF permission patch: unrecognized read-only registry. Review the installed permission package before patching.");
  }
  return source.replace(original, patched);
}

export function patchInstalledPermissions(agentDir) {
  const path = join(agentDir, "npm/node_modules/@gotgenes/pi-permission-system/src/access-intent/path-surfaces.ts");
  const source = readFileSync(path, "utf8");
  const result = patchSource(source);
  if (result === source) return false;
  writeFileSync(path, result);
  return true;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const agentDir = process.env.PI_CODING_AGENT_DIR || fileURLToPath(new URL("../", import.meta.url));
    const changed = patchInstalledPermissions(agentDir);
    console.log(changed ? "FFF permission patch applied. Reload Pi to activate." : "FFF permission patch already applied.");
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
