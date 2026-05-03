# Examples

## CLI fixture smoke

```sh
npm run build
node dist/cli.js inspect fixtures/sample --format markdown
node dist/cli.js query fixtures/sample --question "What safety evidence is required?" --top 3
```

## Library usage

See [`basic-library.ts`](basic-library.ts) for the smallest TypeScript API example.

The example imports from `src` because it is meant for repository development. Package consumers should import from `airgapquery` after install.
