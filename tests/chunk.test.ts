import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { chunkDocument } from "../src/chunk.js";
import { loadDocument } from "../src/files.js";

const fixtureRoot = path.resolve("fixtures/sample");

test("chunkDocument creates deterministic chunk ids and line ranges", async () => {
  const document = await loadDocument(fixtureRoot, path.join(fixtureRoot, "policies/offline-safety.md"));
  const chunks = chunkDocument(document, { maxChunkChars: 260 });
  assert.ok(chunks.length > 1);
  assert.equal(chunks[0]?.relativePath, "policies/offline-safety.md");
  assert.ok((chunks[0]?.tokens ?? []).includes("offline"));
  assert.match(chunks[0]?.id ?? "", /^[a-f0-9]{12}$/u);
});
