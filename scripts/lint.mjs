#!/usr/bin/env node
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const ignored = new Set([".git", "node_modules", "dist", "out"]);
const checkedExtensions = new Set([".ts", ".js", ".mjs", ".md", ".json", ".yml", ".yaml", ".sh"]);
const failures = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }
    if (checkedExtensions.has(path.extname(entry.name))) await checkFile(fullPath);
  }
}

async function checkFile(file) {
  const text = await readFile(file, "utf8");
  const relative = path.relative(root, file);
  if (!text.endsWith("\n")) failures.push(`${relative}: missing trailing newline`);
  const lines = text.split("\n");
  lines.forEach((line, index) => {
    if (/\s$/u.test(line)) failures.push(`${relative}:${index + 1}: trailing whitespace`);
  });
}

await walk(root);
if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("lint ok");
