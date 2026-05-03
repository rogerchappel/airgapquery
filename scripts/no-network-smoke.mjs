#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const env = {
  ...process.env,
  AIRGAPQUERY_OFFLINE_SMOKE: "1",
  npm_config_fund: "false",
  npm_config_audit: "false"
};

const commands = [
  ["node", ["dist/src/cli.js", "inspect", "fixtures/sample", "--format", "json"]],
  ["node", ["dist/src/cli.js", "query", "fixtures/sample", "--question", "What safety evidence blocks hidden network calls?", "--format", "json", "--top", "3"]]
];

for (const [command, args] of commands) {
  const result = spawnSync(command, args, { encoding: "utf8", env });
  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }
  if (/https?:\/\//iu.test(result.stdout)) {
    process.stderr.write(`Unexpected URL-like output from ${command} ${args.join(" ")}\n`);
    process.exit(1);
  }
}

console.log("no-network smoke ok: CLI completed using local fixtures only");
