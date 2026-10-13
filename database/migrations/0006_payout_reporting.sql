-- CodeFlare Tools v5.8. Separate payout source accounting; additive only.
CREATE TABLE IF NOT EXISTS cft_revenue_sources (
 source_code TEXT PRIMARY KEY CHECK(source_code IN ('adsense','adsterra','affiliate')),
 label TEXT NOT NULL
);
INSERT OR IGNORE INTO cft_revenue_sources(source_code,label) VALUES ('adsense','Google AdSense'),('adsterra','Adsterra'),('affiliate','Produk Afiliasi');
CREATE TABLE IF NOT EXISTS cft_payout_accounts (
 user_id INTEGER PRIMARY KEY REFERENCES cft_users(id) ON DELETE CASCADE,
 method TEXT NOT NULL CHECK(method IN ('bca','bank_other','dana','ovo','gopay','shopeepay','other')),
 provider TEXT NOT NULL,
 account_holder TEXT NOT NULL,
 account_number TEXT NOT NULL,
 updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS cft_payout_items (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 member_id INTEGER NOT NULL REFERENCES cft_users(id),
 source_code TEXT NOT NULL REFERENCES cft_revenue_sources(source_code),
 reference TEXT NOT NULL,
 period_end TEXT NOT NULL,
 currency TEXT NOT NULL DEFAULT 'IDR' CHECK(currency='IDR'),
 gross_rupiah INTEGER NOT NULL CHECK(gross_rupiah>=0),
 status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','verified','held','paid','void')),
 created_at TEXT NOT NULL,
 UNIQUE(member_id,source_code,reference)
);
CREATE INDEX IF NOT EXISTS idx_cft_payout_due ON cft_payout_items(status,period_end,member_id);
-- Payout is recorded and reviewed manually; never initiates transfers.
