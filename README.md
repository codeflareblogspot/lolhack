# CodeFlare Tools v5

Independent application, **not** CodeFlare Composer.

- Public Worker target: https://codeflare-tools.fjreggy.workers.dev
- Frontend: `frontend/`
- Backend Worker: `backend/src/index.js`
- Database migrations: `database/migrations/`
- ChatGPT/MCP plugin groundwork: `plugin/`

## Setup

1. Create a separate Cloudflare D1 database for this project.
2. Copy `wrangler.example.toml` to `wrangler.toml`; insert your D1 database ID (never commit credentials).
3. Run the SQL migration in `database/migrations/0001_members.sql` on the intended D1 database.
4. Run `npx wrangler deploy --config wrangler.toml` from the repository root **only after reviewing the target account**.

No automatic production deploy is configured. Do not point this repository to the Composer Worker.

## Releases
Retain the latest **three completed releases**. Never rewrite Git history or delete the current production version/only viable rollback. GitHub Actions artifacts and old build archives can be pruned separately after successful verification.

## Security
Public repository. Store credentials in Cloudflare Secrets, never in source control. Member authentication and Google/AdSense integration require review and tests before production.
