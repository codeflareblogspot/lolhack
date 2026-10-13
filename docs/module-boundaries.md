# CodeFlare Tools — Independent module boundaries

CodeFlare Tools is a standalone application. Do not connect to or modify Composer.

## Target folder structure (incremental extraction)
- `backend/src/index.js`: thin Worker entrypoint and route dispatch (currently legacy monolith; migration pending).
- `backend/src/modules/auth/`: login, register, sessions, Turnstile, password validation.
- `backend/src/modules/member/`: profile, dashboard, activity and payout settings.
- `backend/src/modules/referral/`: sponsor hierarchy, one-use invitations, request approvals.
- `backend/src/modules/support/`: private member ↔ admin messages.
- `backend/src/modules/revenue/`: separate publisher-source ledgers and compliance checks.
- `backend/src/modules/commission/`: nonpayable commission preview and audit.
- `backend/src/modules/payout/`: destination methods, admin reviews, reconciliation.
- `backend/src/modules/admin/`: admin-only reports and moderation.
- `frontend/src/modules/`: independently owned views and components.

## Change policy
1. Preserve live endpoints, database tables and current behavior by default.
2. Change one module per patch; interface changes must have backward-compatible contracts.
3. Test missing HTML identifiers, login/logout, admin guards, registration, and all impacted APIs before deploy.
4. Add D1 migrations instead of modifying/deleting existing tables or previously applied migrations.
5. Run validation and regression tests in BOTH CI and deploy preflight; refuse deploy on failure.
6. Deliver the smallest patch and state exactly which module was touched. Maintain a verified rollback.
7. Never claim a module is extracted when it still resides in the legacy Worker entrypoint.

The current regression contract is `tests/contracts.mjs`. Dynamic auth/DB/integration tests must be added as modules are extracted.
