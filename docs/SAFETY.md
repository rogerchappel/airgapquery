# Safety Model

`airgapquery` is designed as a local-first smoke test, not as a complete security boundary.

## What the MVP promises

- No runtime network libraries are used by the CLI or core library.
- No telemetry, update checks, remote model APIs, or package registry calls occur during `inspect` or `query`.
- The file walker starts from the operator-provided directory and does not crawl unrelated home, browser, keychain, shell-history, or cloud-sync locations.
- Hidden paths are skipped unless the operator passes `--include-hidden`.
- Reports are deterministic enough to review and diff.

## What it does not promise

- It does not prove the host is air-gapped.
- It does not sandbox Node.js or the operating system.
- It does not redact sensitive file names or excerpts from query reports.
- It does not classify secrets.
- It does not validate downstream RAG frameworks.

## Recommended operator workflow

1. Copy a representative non-sensitive fixture set into a temporary folder.
2. Disconnect or block network egress at the host, VM, or firewall level.
3. Run `npm run smoke` and one explicit `airgapquery query` against fixtures.
4. Review JSON/Markdown evidence before using private documents.
5. Delete generated reports when they include sensitive file names or excerpts.

## Adding integrations

Any future integration that can access a network, model API, vector database, telemetry endpoint, or credential store should be opt-in, documented, tested, and disabled by default.
