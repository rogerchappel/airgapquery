# Release candidate readiness

Status: **READY**

Generated: 2026-05-05 21:27:15 UTC

## Scope

Release-candidate readiness pass for `rogerchappel/airgapquery` against `origin/main`.

## Local verification

- npm ci:pass
- release:check:pass
- validate.sh:pass
- releasebox:pass

## Blockers

- None found in local readiness gates.

## ReleaseBox check / command log

```text


> airgapquery@0.1.0 lint
> node scripts/lint.mjs

lint ok

> airgapquery@0.1.0 check
> tsc -p tsconfig.json --noEmit


> airgapquery@0.1.0 test
> npm run build && node --test dist/tests/*.test.js


> airgapquery@0.1.0 build
> tsc -p tsconfig.json

✔ chunkDocument creates deterministic chunk ids and line ranges (5.619292ms)
✔ walkTextFiles discovers supported fixture documents (12.845459ms)
✔ loadDocument records stable metadata (2.439792ms)
✔ buildIndex creates a local corpus index (23.166875ms)
✔ summarizeIndex removes document text from inspect output (3.137792ms)
✔ queryIndex returns scored local chunks (17.16975ms)
✔ renderInspectMarkdown lists documents (17.816417ms)
✔ renderQueryMarkdown cites chunk locations (2.561625ms)
✔ renderJson is pretty JSON (0.333708ms)
✔ normalizes accents and case (1.529333ms)
✔ tokenizes useful terms and removes common stop words (0.66625ms)
✔ unique tokens are stable (0.062459ms)
ℹ tests 12
ℹ suites 0
ℹ pass 12
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 133.985333

> airgapquery@0.1.0 smoke
> npm run build && node dist/src/cli.js inspect fixtures/sample --format json --output out/smoke-report.json && node dist/src/cli.js query fixtures/sample --question "How do agents prove there are no hidden network calls?" --format markdown --top 2 && node scripts/no-network-smoke.mjs


> airgapquery@0.1.0 build
> tsc -p tsconfig.json

# AirgapQuery Query Report

Question: How do agents prove there are no hidden network calls?

## 1. README.md:1-14

Score: 4.386
Matched terms: agents, network, prove

```
# AirgapQuery Sample Corpus

This small corpus models a private-document question answering workflow that must work offline.
It is intentionally plain text so the CLI can prove ingestion, retrieval, and reporting without a network.

## Goal

Agents and developers need a repeatable smoke test before they point a RAG stack at sensitive docs.
The smoke test should show which files were read, what was skipped, and which local chunks answer a question.

## Safety expectation

The fixture describes a no-hidden-network-call rule: retrieval must use local files only, avoid telemetry, and avoid credential discovery.
```

## 2. policies/offline-safety.md:1-14

Score: 2.693
Matched terms: calls, network

```
# Offline Safety Policy

AirgapQuery treats network access as out of scope for the MVP.
A verifier should be able to run inspect and query commands after disconnecting Wi-Fi or blocking egress.

Required boundaries:

- Read only the directory path passed by the operator.
- Do not crawl home directories, shell history, keychains, browser profiles, or cloud sync folders unless explicitly selected.
- Do not send prompts, chunks, file names, hashes, or usage data to remote services.
- Prefer deterministic scoring over model calls for the default smoke test.

Evidence should include a JSON or Markdown report, fixture-backed tests, and a real CLI smoke command.
```

no-network smoke ok: CLI completed using local fixtures only
npm notice
npm notice package: airgapquery@0.1.0
npm notice Tarball Contents
npm notice 1.1kB LICENSE
npm notice 4.2kB README.md
npm notice 1.6kB SECURITY.md
npm notice 291B dist/src/chunk.d.ts
npm notice 330B dist/src/chunk.d.ts.map
npm notice 1.4kB dist/src/chunk.js
npm notice 1.5kB dist/src/chunk.js.map
npm notice 115B dist/src/cli.d.ts
npm notice 169B dist/src/cli.d.ts.map
npm notice 5.8kB dist/src/cli.js
npm notice 5.7kB dist/src/cli.js.map
npm notice 368B dist/src/errors.d.ts
npm notice 314B dist/src/errors.d.ts.map
npm notice 638B dist/src/errors.js
npm notice 590B dist/src/errors.js.map
npm notice 599B dist/src/files.d.ts
npm notice 534B dist/src/files.d.ts.map
npm notice 3.0kB dist/src/files.js
npm notice 3.5kB dist/src/files.js.map
npm notice 767B dist/src/index.d.ts
npm notice 692B dist/src/index.d.ts.map
npm notice 541B dist/src/index.js
npm notice 525B dist/src/index.js.map
npm notice 400B dist/src/inspect.d.ts
npm notice 395B dist/src/inspect.d.ts.map
npm notice 2.1kB dist/src/inspect.js
npm notice 2.2kB dist/src/inspect.js.map
npm notice 439B dist/src/query.d.ts
npm notice 461B dist/src/query.d.ts.map
npm notice 1.9kB dist/src/query.js
npm notice 2.4kB dist/src/query.js.map
npm notice 319B dist/src/report.d.ts
npm notice 329B dist/src/report.d.ts.map
npm notice 1.7kB dist/src/report.js
npm notice 2.0kB dist/src/report.js.map
npm notice 222B dist/src/tokenize.d.ts
npm notice 281B dist/src/tokenize.d.ts.map
npm notice 822B dist/src/tokenize.js
npm notice 1.2kB dist/src/tokenize.js.map
npm notice 1.5kB dist/src/types.d.ts
npm notice 1.6kB dist/src/types.d.ts.map
npm notice 44B dist/src/types.js
npm notice 105B dist/src/types.js.map
npm notice 51B dist/tests/chunk.test.d.ts
npm notice 119B dist/tests/chunk.test.d.ts.map
npm notice 780B dist/tests/chunk.test.js
npm notice 930B dist/tests/chunk.test.js.map
npm notice 51B dist/tests/files.test.d.ts
npm notice 119B dist/tests/files.test.d.ts.map
npm notice 865B dist/tests/files.test.js
npm notice 1.1kB dist/tests/files.test.js.map
npm notice 53B dist/tests/inspect.test.d.ts
npm notice 123B dist/tests/inspect.test.d.ts.map
npm notice 802B dist/tests/inspect.test.js
npm notice 999B dist/tests/inspect.test.js.map
npm notice 51B dist/tests/query.test.d.ts
npm notice 119B dist/tests/query.test.d.ts.map
npm notice 792B dist/tests/query.test.js
npm notice 933B dist/tests/query.test.js.map
npm notice 52B dist/tests/report.test.d.ts
npm notice 121B dist/tests/report.test.d.ts.map
npm notice 1.1kB dist/tests/report.test.js
npm notice 1.2kB dist/tests/report.test.js.map
npm notice 54B dist/tests/tokenize.test.d.ts
npm notice 125B dist/tests/tokenize.test.d.ts.map
npm notice 638B dist/tests/tokenize.test.js
npm notice 699B dist/tests/tokenize.test.js.map
npm notice 297B examples/basic-library.ts
npm notice 468B examples/README.md
npm notice 664B fixtures/sample/policies/offline-safety.md
npm notice 615B fixtures/sample/README.md
npm notice 611B fixtures/sample/runbooks/private-docs-checklist.md
npm notice 1.5kB package.json
npm notice Tarball Details
npm notice name: airgapquery
npm notice version: 0.1.0
npm notice filename: airgapquery-0.1.0.tgz
npm notice package size: 19.4 kB
npm notice unpacked size: 70.6 kB
npm notice shasum: e7f86595602276e8d08f1e8f64ef5eca8b1b2017
npm notice integrity: sha512-QBKhj8qrgFF4/[...]+w5gN5DvIMJrw==
npm notice total files: 73
npm notice
airgapquery-0.1.0.tgz
EXIT_CODE=0
\n===== bash scripts/validate.sh =====
+ bash -lc cd '/Users/roger/Developer/my-opensource/_worktrees/airgapquery-release-candidate-readiness' && bash scripts/validate.sh
Checking airgapquery required files...
PASS: required file exists: README.md
PASS: required file exists: AGENTS.md
PASS: required file exists: CONTRIBUTING.md
PASS: required file exists: SECURITY.md
PASS: required file exists: .github/pull_request_template.md
PASS: required file exists: scripts/validate.sh

Checking airgapquery required directories...
PASS: required directory exists: .github
PASS: required directory exists: docs
PASS: required directory exists: scripts

Running local project checks where present...
NOTE: using package manager: npm

> airgapquery@0.1.0 check
> tsc -p tsconfig.json --noEmit

PASS: package script: check

> airgapquery@0.1.0 lint
> node scripts/lint.mjs

lint ok
PASS: package script: lint

> airgapquery@0.1.0 test
> npm run build && node --test dist/tests/*.test.js


> airgapquery@0.1.0 build
> tsc -p tsconfig.json

✔ chunkDocument creates deterministic chunk ids and line ranges (5.570791ms)
✔ walkTextFiles discovers supported fixture documents (10.705833ms)
✔ loadDocument records stable metadata (1.088291ms)
✔ buildIndex creates a local corpus index (14.061625ms)
✔ summarizeIndex removes document text from inspect output (1.73575ms)
✔ queryIndex returns scored local chunks (16.781375ms)
✔ renderInspectMarkdown lists documents (10.477ms)
✔ renderQueryMarkdown cites chunk locations (1.269584ms)
✔ renderJson is pretty JSON (0.093875ms)
✔ normalizes accents and case (0.662ms)
✔ tokenizes useful terms and removes common stop words (0.667416ms)
✔ unique tokens are stable (0.061833ms)
ℹ tests 12
ℹ suites 0
ℹ pass 12
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 117.761958
PASS: package script: test

> airgapquery@0.1.0 build
> tsc -p tsconfig.json

PASS: package script: build
NOTE: agent-qc not installed; skipping optional agent check

Validation passed.
EXIT_CODE=0
\n===== releasebox check =====
+ node /Users/roger/Developer/my-opensource/releasebox/bin/releasebox.js check /Users/roger/Developer/my-opensource/_worktrees/airgapquery-release-candidate-readiness
✅ releasebox config: node-cli
✅ ci workflow: .github/workflows/ci.yml
✅ release dry run workflow: .github/workflows/release-dry-run.yml
✅ task breakdown: docs/TASKS.md
✅ orchestration plan: docs/ORCHESTRATION.md
✅ dependabot config: .github/dependabot.yml
✅ npm test script: npm run build && node --test dist/tests/*.test.js
✅ build script: tsc -p tsconfig.json
✅ smoke script: npm run build && node dist/src/cli.js inspect fixtures/sample --format json --output out/smoke-report.json && node dist/src/cli.js query fixtures/sample --question "How do agents prove there are no hidden network calls?" --format markdown --top 2 && node scripts/no-network-smoke.mjs
✅ bin entry: {"airgapquery":"./dist/src/cli.js"}
EXIT_CODE=0
```
