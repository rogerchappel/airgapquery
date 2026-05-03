import type { ChunkRecord, DocumentRecord } from "./types.js";
import { stableId } from "./files.js";
import { tokenize } from "./tokenize.js";

export interface ChunkOptions {
  maxChunkChars?: number;
  overlapLines?: number;
}

export function chunkDocument(document: DocumentRecord, options: ChunkOptions = {}): ChunkRecord[] {
  const maxChunkChars = options.maxChunkChars ?? 900;
  const overlapLines = options.overlapLines ?? 1;
  const lines = document.text.split(/\r?\n/u);
  const chunks: ChunkRecord[] = [];
  let start = 0;

  while (start < lines.length) {
    const collected: string[] = [];
    let end = start;
    while (end < lines.length) {
      const candidate = [...collected, lines[end] ?? ""].join("\n");
      if (candidate.length > maxChunkChars && collected.length > 0) break;
      collected.push(lines[end] ?? "");
      end += 1;
    }

    const text = collected.join("\n").trim();
    if (text.length > 0) {
      const startLine = start + 1;
      const endLine = end;
      chunks.push({
        id: stableId(`${document.relativePath}:${startLine}:${endLine}:${text}`),
        documentId: document.id,
        relativePath: document.relativePath,
        startLine,
        endLine,
        text,
        tokens: tokenize(text)
      });
    }

    if (end >= lines.length) break;
    start = Math.max(end - overlapLines, start + 1);
  }

  return chunks;
}
