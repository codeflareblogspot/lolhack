-- CodeFlare Tools dashboard, notification, and leader messaging; additive only.
CREATE TABLE IF NOT EXISTS cft_member_leaders (
 member_id INTEGER PRIMARY KEY REFERENCES cft_users(id),
 leader_id INTEGER NOT NULL REFERENCES cft_users(id),
 assigned_at TEXT NOT NULL,
 CHECK(member_id<>leader_id)
);
CREATE TABLE IF NOT EXISTS cft_admin_content (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 content_type TEXT NOT NULL CHECK(content_type IN ('announcement','adsterra')),
 title TEXT NOT NULL,
 body TEXT NOT NULL DEFAULT '',
 target_url TEXT,
 active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)),
 created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS cft_leader_messages (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 member_id INTEGER NOT NULL REFERENCES cft_users(id),
 leader_id INTEGER NOT NULL REFERENCES cft_users(id),
 sender_id INTEGER NOT NULL REFERENCES cft_users(id),
 body TEXT NOT NULL,
 created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_cft_leader_chat ON cft_leader_messages(member_id,id DESC);
