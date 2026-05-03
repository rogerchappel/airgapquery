import path from "node:path";
import { chunkDocument, type ChunkOptions } from "./chunk.js";
import { EmptyCorpusError } from "./errors.js";
import { loadDocument, walkTextFiles } from "./files.js";
import type { CorpusIndex, IngestOptions, InspectSummary } from "./types.js";

export interface BuildIndexOptions extends IngestOptions, ChunkOptions {}

export async function buildIndex(options: BuildIndexOptions): Promise<CorpusIndex> {
  const rootDir = path.resolve(options.rootDir);
  const ingestOptions: IngestOptions = { rootDir };
  if (options.includeHidden !== undefined) ingestOptions.includeHidden = options.includeHidden;
  if (options.maxFileBytes !== undefined) ingestOptions.maxFileBytes = options.maxFileBytes;
  if (options.extensions !== undefined) ingestOptions.extensions = options.extensions;
  const walked = await walkTextFiles(ingestOptions);
  const documents = await Promise.all(walked.files.map((file) => loadDocument(rootDir, file)));
  documents.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
  if (documents.length === 0) throw new EmptyCorpusError(rootDir);

  const chunkOptions: ChunkOptions = {};
  if (options.maxChunkChars !== undefined) chunkOptions.maxChunkChars = options.maxChunkChars;
  if (options.overlapLines !== undefined) chunkOptions.overlapLines = options.overlapLines;
  const chunks = documents.flatMap((document) => chunkDocument(document, chunkOptions));
  const vocabulary = [...new Set(chunks.flatMap((chunk) => chunk.tokens))].sort();

  return {
    rootDir,
    createdAt: new Date(0).toISOString(),
    documents,
    chunks,
    skipped: walked.skipped,
    vocabulary
  };
}

export function summarizeIndex(index: CorpusIndex): InspectSummary {
  return {
    rootDir: index.rootDir,
    generatedAt: new Date().toISOString(),
    documentCount: index.documents.length,
    chunkCount: index.chunks.length,
    skippedCount: index.skipped.length,
    totalBytes: index.documents.reduce((sum, document) => sum + document.bytes, 0),
    vocabularySize: index.vocabulary.length,
    documents: index.documents.map(({ text: _text, ...metadata }) => metadata),
    skipped: index.skipped
  };
}
