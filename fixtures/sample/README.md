# AirgapQuery Sample Corpus

This small corpus models a private-document question answering workflow that must work offline.
It is intentionally plain text so the CLI can prove ingestion, retrieval, and reporting without a network.

## Goal

Agents and developers need a repeatable smoke test before they point a RAG stack at sensitive docs.
The smoke test should show which files were read, what was skipped, and which local chunks answer a question.

## Safety expectation

The fixture describes a no-hidden-network-call rule: retrieval must use local files only, avoid telemetry, and avoid credential discovery.
