# Security Policy

## Supported Versions

`airgapquery` has not published a stable release yet.

| Version | Supported |
| --- | --- |
| 0.1.x | Best-effort MVP fixes |
| < 0.1.0 | No |

## Reporting a Vulnerability

Please do not report suspected vulnerabilities in public issues, pull requests, discussions, or example corpora.

If GitHub private vulnerability reporting is enabled, use it. Otherwise, ask the maintainer for a private reporting path without including exploit details, secrets, personal data, or sensitive technical details in public messages.

## What to Include

When a private reporting path is available, include:

- a clear description of the issue;
- affected versions, files, packages, workflows, or configuration;
- safe reproduction steps or a minimal proof of concept;
- potential impact;
- suggested mitigation, if known.

## Project-Specific Scope

In scope:

- hidden network behavior in the CLI or library;
- unintended traversal outside the operator-provided directory;
- unsafe defaults around hidden files, oversized files, or report generation;
- CI, release, or dependency guidance maintained by this project.

Out of scope:

- proving that a host, VM, container, or firewall is truly air-gapped;
- vulnerabilities in unrelated downstream RAG frameworks;
- general support requests;
- requests for guaranteed maintenance timelines.

## Disclosure

Coordinate disclosure with maintainers before publishing vulnerability details. Do not attach private corpora, credentials, shell history, browser data, keychain exports, or sensitive generated reports to public issues.
