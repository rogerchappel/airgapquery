# Offline Safety Policy

AirgapQuery treats network access as out of scope for the MVP.
A verifier should be able to run inspect and query commands after disconnecting Wi-Fi or blocking egress.

Required boundaries:

- Read only the directory path passed by the operator.
- Do not crawl home directories, shell history, keychains, browser profiles, or cloud sync folders unless explicitly selected.
- Do not send prompts, chunks, file names, hashes, or usage data to remote services.
- Prefer deterministic scoring over model calls for the default smoke test.

Evidence should include a JSON or Markdown report, fixture-backed tests, and a real CLI smoke command.
