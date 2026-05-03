import { buildIndex, queryIndex, renderQueryMarkdown } from "../src/index.js";

const index = await buildIndex({ rootDir: "fixtures/sample", maxChunkChars: 360 });
const response = queryIndex(index, "What evidence is required for offline safety?", 3);

console.log(renderQueryMarkdown(response));
