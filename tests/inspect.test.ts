import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { buildIndex, summarizeIndex } from "../src/inspect.js";

const fixtureRoot = path.resolve("fixtures/sample");

test("buildIndex creates a local corpus index", async () => {
  const index = await buildIndex({ rootDir: fixtureRoot, maxChunkChars: 300 });
  assert.equal(index.documents.length, 3);
  assert.ok(index.chunks.length >= 3);
  assert.ok(index.vocabulary.includes("network"));
});

test("summarizeIndex removes document text from inspect output", async () => {
  const summary = summarizeIndex(await buildIndex({ rootDir: fixtureRoot }));
  assert.equal(summary.documentCount, 3);
  assert.ok(!("text" in summary.documents[0]!));
});
