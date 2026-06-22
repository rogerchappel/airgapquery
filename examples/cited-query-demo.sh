#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${TMPDIR:-/tmp}/airgapquery-cited-query-demo"
INSPECT_JSON="$OUT_DIR/inspect.json"
QUERY_MD="$OUT_DIR/query.md"

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

echo "== Write a JSON inspection report for the sample corpus =="
node "$ROOT_DIR/dist/src/cli.js" inspect "$ROOT_DIR/fixtures/sample" \
  --format json \
  --output "$INSPECT_JSON"

test -s "$INSPECT_JSON"
grep -q '"documentCount"' "$INSPECT_JSON"
grep -q '"chunkCount"' "$INSPECT_JSON"

echo "== Write a cited Markdown answer from local chunks =="
node "$ROOT_DIR/dist/src/cli.js" query "$ROOT_DIR/fixtures/sample" \
  --question "What evidence blocks hidden network calls?" \
  --format markdown \
  --top 2 \
  > "$QUERY_MD"

test -s "$QUERY_MD"
grep -q "policies/offline-safety.md" "$QUERY_MD"
grep -q "runbooks/private-docs-checklist.md" "$QUERY_MD"

sed -n '1,120p' "$QUERY_MD"

echo
echo "Wrote inspection and query reports to $OUT_DIR"
