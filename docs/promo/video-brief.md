# airgapquery Video Brief

## Angle

`airgapquery` is a local-first smoke test for document QA workflows: inspect the
files that were read, ask a deterministic retrieval question, and keep the
evidence reviewable as JSON or Markdown.

## 60-Second Flow

1. Open `fixtures/sample` to show the local corpus.
2. Run `bash examples/cited-query-demo.sh`.
3. Open the generated inspection JSON and point to file-level evidence.
4. Open the generated Markdown answer and highlight cited paths, line ranges,
   matched terms, scores, and excerpts.
5. Close with the safety boundary: this checks the local ingestion and retrieval
   path, not the entire host network posture.

## On-Screen Commands

```sh
npm install
npm run build
bash examples/cited-query-demo.sh
```

## Honest Limits

- No LLM calls, embedding APIs, telemetry, crawling, or publishing are part of
  the MVP path.
- The deterministic token scorer is deliberately small and inspectable.
- Hard air-gap guarantees still require host-level egress controls.
