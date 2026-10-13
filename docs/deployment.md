# CodeFlare Tools deployment (separate from Composer)

GitHub Actions workflow: `.github/workflows/deploy-tools.yml`.
It is **manual-only**, requiring dispatch input `codeflare-tools`. No push deploy.

GitHub **Environment**: `codeflare-tools`.
Set secrets in that environment:
- `CLOUDFLARE_API_TOKEN`: token used only by the Tools-only workflow; IMPORTANT: Workers Scripts Edit is account-scoped and could technically modify other Workers in the account, so keep its access restricted and never reuse it for Composer.
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account for the Tools Worker.

Set environment variable `CODEFLARE_TOOLS_D1_DATABASE_ID` to the UUID of the **separate Tools D1** database. Never use Composer D1.

**Important**: Deploy is not safe until migration 0001 is applied to that database and tested. The workflow performs read-only required-column checks for the four member tables and blocks deployment on incompatible or missing schema. This is a minimal compatibility preflight, not a complete migration or runtime integration test. The workflow cannot create or migrate the database.

Only the `codeflare-tools` Worker is targeted; there are no operations targeting `codeflare-blogger-publisher`. GitHub source remains public: never store any secrets here.

## Release retention
Retain at most three verified Releases/build archives (not git commits). Never delete currently active production artifacts or the only rollback until replacements are confirmed. Automatic pruning is intentionally not enabled yet.
