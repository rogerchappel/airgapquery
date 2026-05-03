import { buildIndex, type BuildIndexOptions } from "./inspect.js";
import { tokenize } from "./tokenize.js";
import type { CorpusIndex, QueryResponse, QueryResult } from "./types.js";

export interface QueryOptions extends BuildIndexOptions {
  question: string;
  top?: number;
}

export async function queryCorpus(options: QueryOptions): Promise<QueryResponse> {
  const index = await buildIndex(options);
  return queryIndex(index, options.question, options.top ?? 5);
}

export function queryIndex(index: CorpusIndex, question: string, top = 5): QueryResponse {
  const questionTerms = tokenize(question);
  const questionSet = new Set(questionTerms);
  const documentById = new Map(index.documents.map((document) => [document.id, document]));
  const documentFrequency = computeDocumentFrequency(index);
  const totalChunks = Math.max(index.chunks.length, 1);
  const results: QueryResult[] = [];

  for (const chunk of index.chunks) {
    const document = documentById.get(chunk.documentId);
    if (!document) continue;
    const chunkTerms = new Set(chunk.tokens);
    const matchedTerms = [...questionSet].filter((term) => chunkTerms.has(term)).sort();
    const score = matchedTerms.reduce((sum, term) => {
      const tf = chunk.tokens.filter((token) => token === term).length;
      const idf = Math.log((1 + totalChunks) / (1 + (documentFrequency.get(term) ?? 0))) + 1;
      return sum + tf * idf;
    }, 0);
    if (score > 0) results.push({ chunk, document, score, matchedTerms });
  }

  results.sort((a, b) => b.score - a.score || a.chunk.relativePath.localeCompare(b.chunk.relativePath));

  return {
    question,
    normalizedQuestion: questionTerms.join(" "),
    results: results.slice(0, Math.max(top, 1))
  };
}

function computeDocumentFrequency(index: CorpusIndex): Map<string, number> {
  const frequency = new Map<string, number>();
  for (const chunk of index.chunks) {
    for (const term of new Set(chunk.tokens)) {
      frequency.set(term, (frequency.get(term) ?? 0) + 1);
    }
  }
  return frequency;
}
