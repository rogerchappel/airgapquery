# Roadmap

This roadmap describes intended direction, not a binding delivery promise.

## Now

- Keep the deterministic inspect/query MVP small, local-first, and easy to audit.
- Improve fixture coverage around realistic private-document QA workflows.
- Gather feedback from developers and agents who need offline retrieval smoke tests.

## Next

- Add optional redaction helpers for report output.
- Support saved index files so large local corpora do not need to be rebuilt for each question.
- Add richer scoring explanations and query diagnostics.
- Document host-level egress blocking recipes for common development environments.

## Later

- Consider opt-in embedding backends that can run fully offline.
- Consider vector-store adapters only when they are explicitly configured and testable without egress.
- Explore package release automation after the API stabilizes.

## Not Planned for V1

- Hidden network calls, telemetry, or remote model APIs.
- Credential discovery or broad home-directory crawling.
- A full RAG platform replacement.
- Claims that the tool alone proves an environment is air-gapped.

## Roadmap Review

Before each meaningful release:

- Move completed user-visible work into `CHANGELOG.md`.
- Remove stale commitments.
- Promote only the next reviewable set of work into `Now`.
