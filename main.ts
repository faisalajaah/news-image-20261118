// news-image-20261118 — Node 22, standard library only.
//
// The entry is the front page in entry.png beside this file: one image
// summing up the world's news of Wednesday 18 November 2026. The program
// copies it to the grader's output directory as entry.png, so both runs
// write exactly the same bytes. Run locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const source = new URL("./entry.png", import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.png");
copyFileSync(source, dest);
// Guard against a truncated copy: the grader runs the program twice and
// both runs must write the same bytes, so fail loudly instead of shipping
// a partial file.
if (statSync(source).size !== statSync(dest).size) {
  throw new Error("entry.png copy is incomplete");
}
