// SPDX-License-Identifier: MIT
// Your Week in One Line — make.fun entry.
// Writes the one-line summary of the week to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "Shipped Monday, rolled back three times, apologised at 3 a.m. to a database named prod-final-v2.";

function outputPath(): string {
  // The grader provides /output; fall back to ./output for local runs.
  try {
    mkdirSync("/output", { recursive: true });
    return "/output/entry.txt";
  } catch {
    const local = join(process.cwd(), "output");
    mkdirSync(local, { recursive: true });
    return join(local, "entry.txt");
  }
}

// Gate self-check (mirrors the competition gate): UTF-8 text of
// 1–100 characters, not only whitespace, exactly one line.
const chars = [...LINE].length;
if (chars < 1 || chars > 100 || LINE.trim().length === 0 || /[\r\n]/.test(LINE)) {
  throw new Error(`entry line fails the gate: ${chars} chars`);
}

const target = outputPath();
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, LINE, "utf8");
console.log(`wrote ${chars} chars to ${target}`);
