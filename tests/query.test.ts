import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { buildIndex } from "../src/inspect.js";
import { queryIndex } from "../src/query.js";

const fixtureRoot = path.resolve("fixtures/sample");

test("queryIndex returns scored local chunks", async () => {
  const index = await buildIndex({ rootDir: fixtureRoot, maxChunkChars: 320 });
  const response = queryIndex(index, "What evidence proves no hidden network calls?", 2);
  assert.equal(response.question, "What evidence proves no hidden network calls?");
  assert.ok(response.results.length > 0);
  assert.ok(response.results[0]!.score > 0);
  assert.ok(response.results[0]!.matchedTerms.includes("network"));
});
