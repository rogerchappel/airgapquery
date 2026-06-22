# Cited local query demo

This recipe uses the bundled `fixtures/sample` corpus to show a full local
inspection and retrieval smoke: write a JSON evidence report, ask a question,
and verify the Markdown answer cites local fixture files.

## What the demo proves

- `airgapquery inspect` can write a JSON corpus report for review.
- `airgapquery query` can answer from local chunks with cited file paths and
  line ranges.
- The demo checks that both the offline safety policy and private-docs
  checklist appear in the cited answer.
- The flow uses deterministic fixture text and makes no model, telemetry, or
  runtime network call.

## Run it from a checkout

```sh
npm install
npm run build
bash examples/cited-query-demo.sh
```

The script writes `inspect.json` and `query.md` under
`${TMPDIR:-/tmp}/airgapquery-cited-query-demo`.

## Manual commands

```sh
node dist/src/cli.js inspect fixtures/sample \
  --format json \
  --output /tmp/airgapquery-cited-query-demo/inspect.json

node dist/src/cli.js query fixtures/sample \
  --question "What evidence blocks hidden network calls?" \
  --format markdown \
  --top 2
```

## Promotion angle

This is the clearest short demo for AirgapQuery: inspect local files first, ask
a safety question second, then show that the answer is grounded in cited local
chunks instead of a remote model call.
