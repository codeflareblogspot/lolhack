# Architecture

Frontend => isolated Cloudflare Worker (`codeflare-tools`) => separate D1.
Google Sign-In (future) => user identity link; AdSense reporting (future) => publisher-owned read-only aggregated metrics.

The Composer project is a distinct application. Deployment registration must use projectId `codeflare-tools`, workerName `codeflare-tools`, and credentials scoped to that Worker.

Development plan:
1. v5.1 member register/login/session with secure password hashing.
2. v5.2 Google Sign-In and local password set.
3. v5.3 consensual first-party site activity (30 days).
4. v5.4 admin anomaly review and evidence retention policy.
5. v5.5 aggregate AdSense reporting through official Google OAuth.
