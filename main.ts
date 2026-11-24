// Dad Joke Showdown — one dad joke, at most 200 characters.
// Writes the joke to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My kids asked for a napkin joke, so I said I'd fold under pressure.";

const length = [...JOKE].length;
if (length < 1 || length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${length}`);
}

// The joke must stand alone: no leading/trailing whitespace, one
// terminal period, no sentence break in the middle.
if (
  JOKE.trim() !== JOKE ||
  !JOKE.endsWith(".") ||
  JOKE.endsWith("..") ||
  /[.!?]\s+[A-Z]/.test(JOKE)
) {
  throw new Error("entry must be a single clean sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// No trailing newline: the file is byte-identical to the joke itself.
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
console.log(`wrote entry.txt (${length} characters)`);
