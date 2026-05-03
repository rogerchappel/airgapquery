const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "but", "by", "do", "for", "from", "has", "have", "how", "i", "if", "in", "into", "is", "it", "its", "no", "not", "of", "on", "or", "our", "that", "the", "their", "there", "this", "to", "we", "what", "when", "where", "which", "who", "why", "with", "you", "your"
]);

export function normalizeText(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function tokenize(input: string): string[] {
  return normalizeText(input)
    .split(/[^a-z0-9_+-]+/u)
    .map((term) => term.trim())
    .filter((term) => term.length > 1 && !STOP_WORDS.has(term));
}

export function uniqueTokens(input: string): string[] {
  return [...new Set(tokenize(input))].sort();
}
