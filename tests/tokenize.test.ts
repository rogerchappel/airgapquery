import test from "node:test";
import assert from "node:assert/strict";
import { normalizeText, tokenize, uniqueTokens } from "../src/tokenize.js";

test("normalizes accents and case", () => {
  assert.equal(normalizeText("Résumé OFFLINE"), "resume offline");
});

test("tokenizes useful terms and removes common stop words", () => {
  assert.deepEqual(tokenize("How do agents prove offline network safety?"), ["agents", "prove", "offline", "network", "safety"]);
});

test("unique tokens are stable", () => {
  assert.deepEqual(uniqueTokens("local local offline"), ["local", "offline"]);
});
