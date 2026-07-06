# Cited Query Demo

Use this recipe to show how `airgapquery` answers a local-only question from
the checked-in fixture corpus and returns citations that reviewers can inspect.

## Run the Demo

```sh
npm install
npm run build
bash examples/cited-query-demo.sh
```

The script writes a JSON inspection report and a Markdown query answer under a
temporary directory. It then checks that the answer cites files from
`fixtures/sample`.

## Manual Version

```sh
node dist/src/cli.js inspect fixtures/sample --format json --output /tmp/airgapquery-inspect.json
node dist/src/cli.js query fixtures/sample \
  --question "How do agents prove there are no hidden network calls?" \
  --format markdown \
  --top 3
```

Use the inspection report to show which files were read or skipped. Use the
query answer to show cited file paths, line ranges, matched terms, scores, and
chunk excerpts.

## What This Proves

- The demo operates on local fixture files.
- The reported answer is deterministic for the same fixture corpus and query.
- Citations point back to files in the inspected directory.

It does not prove that the whole host is air-gapped. Pair the demo with firewall
rules, VM networking controls, or physical disconnection when hard egress
guarantees are required.
