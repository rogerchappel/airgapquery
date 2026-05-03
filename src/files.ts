import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import type { DocumentRecord, IngestOptions, SkippedFile } from "./types.js";

export const DEFAULT_EXTENSIONS = [".md", ".txt", ".json", ".csv", ".yaml", ".yml", ".log"] as const;
export const DEFAULT_MAX_FILE_BYTES = 512 * 1024;

interface WalkResult {
  files: string[];
  skipped: SkippedFile[];
}

export async function walkTextFiles(options: IngestOptions): Promise<WalkResult> {
  const rootDir = path.resolve(options.rootDir);
  const extensions = new Set((options.extensions ?? DEFAULT_EXTENSIONS).map((ext) => ext.toLowerCase()));
  const skipped: SkippedFile[] = [];
  const files: string[] = [];

  async function visit(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      if (!options.includeHidden && entry.name.startsWith(".")) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await visit(fullPath);
        continue;
      }
      if (!entry.isFile()) continue;
      const extension = path.extname(entry.name).toLowerCase();
      if (!extensions.has(extension)) {
        skipped.push({ path: path.relative(rootDir, fullPath), reason: `unsupported extension ${extension || "(none)"}` });
        continue;
      }
      const info = await stat(fullPath);
      const maxFileBytes = options.maxFileBytes ?? DEFAULT_MAX_FILE_BYTES;
      if (info.size > maxFileBytes) {
        skipped.push({ path: path.relative(rootDir, fullPath), reason: `larger than ${maxFileBytes} bytes` });
        continue;
      }
      files.push(fullPath);
    }
  }

  await visit(rootDir);
  return { files, skipped };
}

export async function loadDocument(rootDir: string, filePath: string): Promise<DocumentRecord> {
  const absoluteRoot = path.resolve(rootDir);
  const absolutePath = path.resolve(filePath);
  const buffer = await readFile(absolutePath);
  const text = buffer.toString("utf8");
  const relativePath = path.relative(absoluteRoot, absolutePath);
  const title = inferTitle(text, relativePath);
  return {
    id: stableId(relativePath),
    path: absolutePath,
    relativePath,
    extension: path.extname(absolutePath).toLowerCase(),
    bytes: buffer.byteLength,
    text,
    ...(title ? { title } : {}),
    lineCount: text.length === 0 ? 0 : text.split(/\r?\n/u).length,
    sha256: createHash("sha256").update(buffer).digest("hex")
  };
}

export function stableId(input: string): string {
  return createHash("sha256").update(input).digest("hex").slice(0, 12);
}

function inferTitle(text: string, relativePath: string): string | undefined {
  const heading = text.split(/\r?\n/u).find((line) => /^#\s+\S/u.test(line));
  if (heading) return heading.replace(/^#\s+/u, "").trim();
  const basename = path.basename(relativePath, path.extname(relativePath));
  return basename ? basename.replace(/[-_]+/gu, " ") : undefined;
}
