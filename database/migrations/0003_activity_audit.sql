-- Additive CodeFlare Tools-only telemetry and admin reviews.
CREATE TABLE IF NOT EXISTS cft_activity_daily (
 user_id INTEGER NOT NULL REFERENCES cft_users(id) ON DELETE CASCADE,
 day TEXT NOT NULL,
 page_views INTEGER NOT NULL DEFAULT 0,
 PRIMARY KEY(user_id,day)
);
CREATE TABLE IF NOT EXISTS cft_admin_reviews (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 member_id INTEGER NOT NULL REFERENCES cft_users(id),
 reviewer_id INTEGER NOT NULL REFERENCES cft_users(id),
 finding TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'review' CHECK(status IN ('review','cleared','escalated')),
 created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_cft_reviews_member ON cft_admin_reviews(member_id,created_at DESC);
