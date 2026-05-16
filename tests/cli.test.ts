import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

const cli = new URL("../src/cli.js", import.meta.url).pathname;

test("CLI rejects unknown options before scanning", () => {
  const result = spawnSync(process.execPath, [cli, "inspect", "fixtures/sample", "--bogus"], { encoding: "utf8" });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unknown option: --bogus/u);
});

test("CLI rejects missing values for value flags", () => {
  const result = spawnSync(process.execPath, [cli, "query", "fixtures/sample", "--question"], { encoding: "utf8" });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /--question requires a value/u);
});
