import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { buildIndex, summarizeIndex } from "../src/inspect.js";
import { queryIndex } from "../src/query.js";
import { renderInspectMarkdown, renderJson, renderQueryMarkdown } from "../src/report.js";

const fixtureRoot = path.resolve("fixtures/sample");

test("renderInspectMarkdown lists documents", async () => {
  const report = renderInspectMarkdown(summarizeIndex(await buildIndex({ rootDir: fixtureRoot })));
  assert.match(report, /AirgapQuery Inspect Report/u);
  assert.match(report, /policies\/offline-safety.md/u);
});

test("renderQueryMarkdown cites chunk locations", async () => {
  const index = await buildIndex({ rootDir: fixtureRoot });
  const report = renderQueryMarkdown(queryIndex(index, "network evidence", 1));
  assert.match(report, /Score:/u);
  assert.match(report, /Matched terms:/u);
});

test("renderJson is pretty JSON", () => {
  assert.equal(renderJson({ ok: true }), "{\n  \"ok\": true\n}\n");
});
