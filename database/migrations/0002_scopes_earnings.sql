-- CodeFlare Tools v5.2 only. Additive migration; does not alter legacy tables.
CREATE TABLE IF NOT EXISTS cft_user_roles (
 user_id INTEGER PRIMARY KEY REFERENCES cft_users(id) ON DELETE CASCADE,
 role TEXT NOT NULL DEFAULT 'member' CHECK(role IN ('member','admin')),
 assigned_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS cft_member_earnings (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 user_id INTEGER NOT NULL REFERENCES cft_users(id) ON DELETE CASCADE,
 report_date TEXT NOT NULL,
 currency TEXT NOT NULL,
 amount_micros INTEGER NOT NULL CHECK(amount_micros >= 0),
 source TEXT NOT NULL DEFAULT 'admin_verified',
 created_at TEXT NOT NULL,
 UNIQUE(user_id,report_date,currency,source)
);
CREATE INDEX IF NOT EXISTS idx_cft_earnings_user_date ON cft_member_earnings(user_id,report_date DESC);
-- A member row must be specifically attributed and approved before an amount appears.
-- Publisher-wide AdSense revenue is NOT automatically treated as individual member income.
