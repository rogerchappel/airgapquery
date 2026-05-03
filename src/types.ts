export type OutputFormat = "json" | "markdown";

export interface IngestOptions {
  rootDir: string;
  includeHidden?: boolean;
  maxFileBytes?: number;
  extensions?: readonly string[];
}

export interface DocumentRecord {
  id: string;
  path: string;
  relativePath: string;
  extension: string;
  bytes: number;
  text: string;
  title?: string;
  lineCount: number;
  sha256: string;
}

export interface SkippedFile {
  path: string;
  reason: string;
}

export interface ChunkRecord {
  id: string;
  documentId: string;
  relativePath: string;
  startLine: number;
  endLine: number;
  text: string;
  tokens: readonly string[];
}

export interface CorpusIndex {
  rootDir: string;
  createdAt: string;
  documents: readonly DocumentRecord[];
  chunks: readonly ChunkRecord[];
  skipped: readonly SkippedFile[];
  vocabulary: readonly string[];
}

export interface QueryResult {
  chunk: ChunkRecord;
  document: DocumentRecord;
  score: number;
  matchedTerms: readonly string[];
}

export interface QueryResponse {
  question: string;
  normalizedQuestion: string;
  results: readonly QueryResult[];
}

export interface InspectSummary {
  rootDir: string;
  generatedAt: string;
  documentCount: number;
  chunkCount: number;
  skippedCount: number;
  totalBytes: number;
  vocabularySize: number;
  documents: readonly Omit<DocumentRecord, "text">[];
  skipped: readonly SkippedFile[];
}
