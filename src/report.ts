import type { InspectSummary, QueryResponse } from "./types.js";

export function renderInspectMarkdown(summary: InspectSummary): string {
  const lines = [
    "# AirgapQuery Inspect Report",
    "",
    `- Root: ${summary.rootDir}`,
    `- Documents: ${summary.documentCount}`,
    `- Chunks: ${summary.chunkCount}`,
    `- Total bytes: ${summary.totalBytes}`,
    `- Vocabulary terms: ${summary.vocabularySize}`,
    `- Skipped files: ${summary.skippedCount}`,
    "",
    "## Documents",
    ""
  ];

  for (const document of summary.documents) {
    lines.push(`- ${document.relativePath} (${document.bytes} bytes, sha256 ${document.sha256.slice(0, 12)})`);
  }

  if (summary.skipped.length > 0) {
    lines.push("", "## Skipped", "");
    for (const skipped of summary.skipped) lines.push(`- ${skipped.path}: ${skipped.reason}`);
  }

  return `${lines.join("\n")}\n`;
}

export function renderQueryMarkdown(response: QueryResponse): string {
  const lines = ["# AirgapQuery Query Report", "", `Question: ${response.question}`, ""];
  if (response.results.length === 0) {
    lines.push("No local chunks matched the question.");
    return `${lines.join("\n")}\n`;
  }

  response.results.forEach((result, index) => {
    lines.push(
      `## ${index + 1}. ${result.chunk.relativePath}:${result.chunk.startLine}-${result.chunk.endLine}`,
      "",
      `Score: ${result.score.toFixed(3)}`,
      `Matched terms: ${result.matchedTerms.join(", ") || "none"}`,
      "",
      fence(result.chunk.text),
      ""
    );
  });

  return `${lines.join("\n")}\n`;
}

export function renderJson(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function fence(text: string): string {
  return ["```", text.trim(), "```"].join("\n");
}
