# airgapquery

Privacy-first offline document inspection and retrieval smoke tests for developers and agents.

`airgapquery` is a tiny TypeScript CLI/library for answering one practical question before you trust a document-QA stack with private files: **can the local ingestion and retrieval path run with no hidden network calls?**

It does not call LLM APIs, run embeddings, send telemetry, crawl credentials, or publish anything. The MVP uses deterministic token scoring over local text fixtures so it is easy to inspect, test, and replace.

## Why this exists

Air-gapped RAG demos often hide the boring-but-critical parts: what files were read, what was skipped, and whether the smoke test can run after egress is blocked. `airgapquery` keeps V1 deliberately small:

- inspect a local folder of text documents;
- chunk and tokenize supported files deterministically;
- query the local chunks with transparent scores and citations;
- emit JSON or Markdown evidence for review;
- provide fixture-backed tests and a real CLI smoke.

Inspired by the public `airgapped-offfline-rag` idea noted in [docs/PRD.md](docs/PRD.md), but this repository is an original TypeScript implementation with a narrower local-first verification focus.

## Install

```sh
npm install
npm run build
```

For local CLI development:

```sh
npm link
airgapquery --help
```

Or run directly from the repo after building:

```sh
node dist/src/cli.js --help
```

## Quickstart

Inspect the included fixture corpus:

```sh
npm run build
node dist/src/cli.js inspect fixtures/sample --format markdown
```

Write a JSON evidence report:

```sh
node dist/src/cli.js inspect fixtures/sample --format json --output out/inspect.json
```

Ask a local-only retrieval question:

```sh
node dist/src/cli.js query fixtures/sample \
  --question "How do agents prove there are no hidden network calls?" \
  --format markdown \
  --top 3
```

Example output includes the cited file path, line range, matched terms, score, and chunk excerpt.

## CLI

```text
airgapquery inspect <directory> [--format json|markdown] [--output <file>]
airgapquery query <directory> --question <text> [--top <n>] [--format json|markdown]
```

Useful options:

- `--max-chunk-chars <n>`: cap chunk size for deterministic retrieval.
- `--max-file-bytes <n>`: skip unexpectedly large files.
- `--extensions <list>`: comma-separated allow-list such as `md,txt,json`.
- `--include-hidden`: include dotfiles and hidden directories; off by default.

## Library

```ts
import { buildIndex, queryIndex, renderQueryMarkdown } from "airgapquery";

const index = await buildIndex({ rootDir: "fixtures/sample" });
const response = queryIndex(index, "What evidence is required?", 3);
console.log(renderQueryMarkdown(response));
```

## Safety boundaries

`airgapquery` is intentionally boring:

- reads only files under the directory you pass;
- skips hidden paths unless `--include-hidden` is set;
- limits supported extensions and maximum file size;
- performs no runtime network calls, telemetry, model calls, credential discovery, or publishing;
- produces deterministic JSON/Markdown evidence you can diff in review.

It does **not** prove your whole machine is air-gapped. Use host controls such as firewall rules, VM networking, or physical disconnection when you need hard egress guarantees.

## Verify

```sh
npm test
npm run check
npm run build
npm run smoke
bash scripts/validate.sh
```

A real fixture CLI smoke used during development:

```sh
node dist/src/cli.js query fixtures/sample \
  --question "What safety evidence blocks hidden network calls?" \
  --format json \
  --top 3
```

## Project status

MVP. The current scope is deterministic fixture-backed inspection/query and practical safety documentation. Future versions may add pluggable embedding backends, but local-only defaults and explicit network boundaries should remain non-negotiable.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Keep changes small, test with local fixtures, and avoid adding runtime network behavior without an explicit design discussion.

## Security

See [SECURITY.md](SECURITY.md). Please do not post sensitive corpus examples or vulnerability details publicly.

## License

MIT
