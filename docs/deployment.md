# CodeFlare Tools deployment (separate from Composer)

GitHub Actions workflow: `.github/workflows/deploy-tools.yml`.
It is **manual-only**, requiring dispatch input `codeflare-tools`. No push deploy.

GitHub **Environment**: `codeflare-tools-production`.
Set secrets in that environment:
- `CLOUDFLARE_API_TOKEN`: dedicated scoped token for managing **only codeflare-tools** Worker and inspecting Tools D1.
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account for the Tools Worker.

Set environment variable `CODEFLARE_TOOLS_D1_DATABASE_ID` to the UUID of the **separate Tools D1** database. Never use Composer D1.

**Important**: Deploy is not safe until migration 0001 is applied to that database and tested. The workflow currently performs a read-only listing of four tables, not a complete migration check. Review database schema manually before dispatch. The workflow cannot create or migrate the database.

Only the `codeflare-tools` Worker is targeted; there are no operations targeting `codeflare-blogger-publisher`. GitHub source remains public: never store any secrets here.

## Release retention
Retain at most three verified Releases/build archives (not git commits). Never delete currently active production artifacts or the only rollback until replacements are confirmed. Automatic pruning is intentionally not enabled yet.
