# AirgapQuery Social Hooks

Drafts for public posts and short clips. Keep claims tied to the checked-in
fixture corpus and the CLI commands below.

## Short hooks

1. AirgapQuery is a tiny local-first retrieval smoke: inspect files, ask a
   question, and review the cited chunks before trusting a document-QA workflow.
2. The demo does not need an API key. It uses deterministic token scoring over
   local fixture files and prints the evidence it used.
3. Useful air-gapped QA starts with boring receipts: which files were read,
   which chunks answered, and whether the run stayed local.

## Demo CTA

```sh
npm run build
bash examples/cited-query-demo.sh
```

Pair the terminal output with `docs/tutorials/cited-local-query.md` when
drafting a blog post, README clip, or short walkthrough.
