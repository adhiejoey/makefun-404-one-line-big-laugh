import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My code review came back with one comment: 'who wrote this garbage?' I did. I also wrote the comment.";

const MAX_CHARS = 200;

if (LINE.length === 0 || LINE.length > MAX_CHARS) {
  throw new Error(`Entry must be 1 to ${MAX_CHARS} characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error(`Wrote ${written.length} characters but expected ${LINE.length}`);
}
console.log(`Wrote ${LINE.length} characters to ${outPath}`);
