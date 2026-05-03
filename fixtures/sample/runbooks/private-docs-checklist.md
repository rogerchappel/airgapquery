# Private Docs Checklist

Use this checklist before running a document QA experiment in an air-gapped or privacy-sensitive environment.

1. Copy a small representative fixture set into a temporary folder.
2. Run `airgapquery inspect ./fixture --format markdown` and review every discovered file.
3. Run `airgapquery query ./fixture --question "What safety evidence is required?"`.
4. Confirm the answer cites local chunks only.
5. Delete generated reports if they contain sensitive file names or excerpts.

The operator remains responsible for validating that the host environment itself blocks network egress.
