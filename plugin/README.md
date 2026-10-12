# CodeFlare Developer Plugin (planned)

A separate MCP service will support **read-only first** health, diagnostics, repository review and staged fixes.

Required safeguards:
- per-project allowlist targeting `codeflare-tools` only;
- never edit `codeflare-blogger-publisher` or its repository;
- short-lived credentials with scoped permissions; redact logs;
- PR + tests + explicit approval before any deployment or database migration;
- no direct access to member passwords, OAuth refresh tokens or AdSense sensitive data.

This directory contains a design placeholder, **not** an installed ChatGPT plugin.
