-- Isolated CodeFlare Tools user settings and private support inbox.
CREATE TABLE IF NOT EXISTS cft_member_profiles (
 user_id INTEGER PRIMARY KEY REFERENCES cft_users(id) ON DELETE CASCADE,
 display_name TEXT NOT NULL DEFAULT '',
 avatar_data TEXT,
 updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS cft_support_messages (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 user_id INTEGER NOT NULL REFERENCES cft_users(id) ON DELETE CASCADE,
 sender_role TEXT NOT NULL CHECK(sender_role IN ('member','admin')),
 body TEXT NOT NULL,
 created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_cft_support_member ON cft_support_messages(user_id,id DESC);
