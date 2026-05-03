#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { UserInputError } from "./errors.js";
import { buildIndex, summarizeIndex } from "./inspect.js";
import { queryCorpus } from "./query.js";
import { renderInspectMarkdown, renderJson, renderQueryMarkdown } from "./report.js";
import type { OutputFormat } from "./types.js";

interface ParsedArgs {
  command: string;
  positional: string[];
  flags: Map<string, string | boolean>;
}

const HELP = `airgapquery - local-first document inspection and query smoke tests

Usage:
  airgapquery inspect <directory> [--format json|markdown] [--output <file>]
  airgapquery query <directory> --question <text> [--top <n>] [--format json|markdown]

Options:
  --max-chunk-chars <n>  Maximum characters per searchable chunk (default: 900)
  --include-hidden       Include dotfiles and hidden directories
  --help                 Show this help

Safety: airgapquery reads only local files under the directory you pass. The MVP has no runtime network calls, telemetry, model APIs, or credential discovery.
`;

export async function main(argv = process.argv.slice(2)): Promise<void> {
  const parsed = parseArgs(argv);
  if (parsed.command === "help" || parsed.flags.has("help")) {
    process.stdout.write(HELP);
    return;
  }

  switch (parsed.command) {
    case "inspect":
      await runInspect(parsed);
      return;
    case "query":
      await runQuery(parsed);
      return;
    default:
      throw new UserInputError(`Unknown command: ${parsed.command || "(missing)"}. Run airgapquery --help.`);
  }
}

function parseArgs(argv: string[]): ParsedArgs {
  const positional: string[] = [];
  const flags = new Map<string, string | boolean>();

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index]!;
    if (!value.startsWith("--")) {
      positional.push(value);
      continue;
    }
    const name = value.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      flags.set(name, true);
      continue;
    }
    flags.set(name, next);
    index += 1;
  }

  return { command: positional.shift() ?? (flags.has("help") ? "help" : ""), positional, flags };
}

async function runInspect(parsed: ParsedArgs): Promise<void> {
  const rootDir = requireDirectory(parsed);
  const format = readFormat(parsed, "markdown");
  const index = await buildIndex(readBuildOptions(parsed, rootDir));
  const summary = summarizeIndex(index);
  const output = format === "json" ? renderJson(summary) : renderInspectMarkdown(summary);
  await writeOrPrint(parsed, output);
}

async function runQuery(parsed: ParsedArgs): Promise<void> {
  const rootDir = requireDirectory(parsed);
  const question = readStringFlag(parsed, "question");
  if (!question) throw new UserInputError("query requires --question <text>.");
  const top = Number(readStringFlag(parsed, "top") ?? "5");
  if (!Number.isInteger(top) || top < 1) throw new UserInputError("--top must be a positive integer.");
  const format = readFormat(parsed, "markdown");
  const response = await queryCorpus({ ...readBuildOptions(parsed, rootDir), question, top });
  const output = format === "json" ? renderJson(response) : renderQueryMarkdown(response);
  await writeOrPrint(parsed, output);
}

function requireDirectory(parsed: ParsedArgs): string {
  const rootDir = parsed.positional[0];
  if (!rootDir) throw new UserInputError(`${parsed.command} requires a directory path.`);
  return rootDir;
}

function readBuildOptions(parsed: ParsedArgs, rootDir: string) {
  const maxChunkCharsRaw = readStringFlag(parsed, "max-chunk-chars");
  const maxChunkChars = maxChunkCharsRaw ? Number(maxChunkCharsRaw) : undefined;
  if (maxChunkChars !== undefined && (!Number.isInteger(maxChunkChars) || maxChunkChars < 120)) {
    throw new UserInputError("--max-chunk-chars must be an integer >= 120.");
  }
  return {
    rootDir,
    includeHidden: parsed.flags.get("include-hidden") === true,
    ...(maxChunkChars ? { maxChunkChars } : {})
  };
}

function readFormat(parsed: ParsedArgs, fallback: OutputFormat): OutputFormat {
  const format = readStringFlag(parsed, "format") ?? fallback;
  if (format !== "json" && format !== "markdown") throw new UserInputError("--format must be json or markdown.");
  return format;
}

function readStringFlag(parsed: ParsedArgs, name: string): string | undefined {
  const value = parsed.flags.get(name);
  return typeof value === "string" ? value : undefined;
}

async function writeOrPrint(parsed: ParsedArgs, output: string): Promise<void> {
  const outputPath = readStringFlag(parsed, "output");
  if (!outputPath) {
    process.stdout.write(output);
    return;
  }
  await mkdir(path.dirname(path.resolve(outputPath)), { recursive: true });
  await writeFile(outputPath, output, "utf8");
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`airgapquery: ${message}\n`);
  process.exitCode = 1;
});
