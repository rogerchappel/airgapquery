# CLI Reference

`airgapquery` exposes two commands for the MVP: `inspect` and `query`.

## `inspect`

```sh
airgapquery inspect <directory> [--format json|markdown] [--output <file>]
```

Builds a deterministic local corpus summary. Inspect output intentionally excludes full document text so it can be shared more safely during review.

Fields include:

- root directory;
- document, chunk, skipped-file, byte, and vocabulary counts;
- file paths, line counts, extensions, byte sizes, and sha256 hashes;
- skipped file reasons.

## `query`

```sh
airgapquery query <directory> --question <text> [--top <n>] [--format json|markdown]
```

Builds the same local index, tokenizes the question, ranks chunks with transparent term-frequency / inverse-document-frequency scoring, and returns cited local chunks.

## Shared options

- `--format json|markdown` controls report rendering.
- `--output <file>` writes the report instead of printing it.
- `--max-chunk-chars <n>` changes chunk size; minimum is 120.
- `--max-file-bytes <n>` skips oversized files; minimum is 1.
- `--extensions <list>` limits supported file extensions.
- `--include-hidden` opts into dotfiles and hidden directories.

## Exit behavior

Invalid user input exits non-zero and writes a concise error to stderr. Successful commands write only the requested report to stdout unless `--output` is used.
