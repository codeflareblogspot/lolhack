-- CodeFlare Tools v5 D1 only; never run against the Composer database.
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS cf_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE COLLATE NOCASE,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT,
  google_subject TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active','suspended')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS cf_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES cf_users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_cf_sessions_expires ON cf_sessions(expires_at);
CREATE TABLE IF NOT EXISTS cf_activity_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES cf_users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  page_path TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_cf_activity_user_date ON cf_activity_events(user_id,created_at DESC);

CREATE TABLE IF NOT EXISTS cf_login_limits (
  identity_hash TEXT PRIMARY KEY,
  attempts INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_cf_login_limits_updated ON cf_login_limits(updated_at);
