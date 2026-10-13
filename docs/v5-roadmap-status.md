# CodeFlare Tools independent roadmap (v5)

CodeFlare Tools is **fully separate** from Composer. Target Worker: `codeflare-tools`. Source repository: `codeflareblogspot/lolhack`.

## Implemented
- v5.1 member username/email + password registration and login; HTTP-only session.
- v5.2 member/admin role-checking; member-specific earnings storage (no fake AdSense figures).
- v5.3 admin overview, member directory, account activity (admin only).
- v5.4 member-dashboard page view counter and 30-day admin anomaly indicators (not ad clicks or Google validity).

## Not yet operational — must not claim complete
- Authorize the initial admin account after verifying its identity. There is no unsecured bootstrap endpoint.
- Google Sign-In: needs OAuth client ID, authorized redirect URI, state/PKCE verification, and token policy.
- AdSense report connection: separate OAuth consent from Google Sign-In, encrypted per-owner token storage and read-only AdSense API. Only aggregate publisher earnings may be obtained; never attribute account-wide revenue to an individual member without a defined allocation.
- Consent screen, privacy notice, retention for personally identifiable telemetry, member export/deletion.
- Admin review case workflows and proper alert calibration.
- Integration/security tests including D1 migrations and rollback, role boundary tests.
- Standalone CodeFlare Tools MCP plugin (not the Composer plugin).
- Automated retention of the latest three verified releases (do not delete commit history or the live rollback).

## Security constraints
Do not attempt to read or intercept AdSense iframe events. First-party site activity is not Google-confirmed invalid-click evidence. Do not report member income as publisher-wide AdSense revenue. Avoid copying Composer secrets or databases.
