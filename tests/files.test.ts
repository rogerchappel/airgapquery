import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { loadDocument, walkTextFiles } from "../src/files.js";

const fixtureRoot = path.resolve("fixtures/sample");

test("walkTextFiles discovers supported fixture documents", async () => {
  const result = await walkTextFiles({ rootDir: fixtureRoot });
  assert.ok(result.files.some((file) => file.endsWith("README.md")));
  assert.ok(result.files.every((file) => !file.includes("node_modules")));
});

test("loadDocument records stable metadata", async () => {
  const document = await loadDocument(fixtureRoot, path.join(fixtureRoot, "README.md"));
  assert.equal(document.relativePath, "README.md");
  assert.equal(document.title, "AirgapQuery Sample Corpus");
  assert.equal(document.sha256.length, 64);
});
