-- CodeFlare Tools Commission Engine v5.7: additive and isolated, no Composer dependency.
-- Monetary units are minor units of a currency. Never use floats for money.
CREATE TABLE IF NOT EXISTS cft_commission_batches (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 source_type TEXT NOT NULL CHECK(source_type IN ('adsense','product_service')),
 source_reference TEXT NOT NULL,
 period_start TEXT NOT NULL,
 period_end TEXT NOT NULL,
 currency TEXT NOT NULL,
 gross_minor INTEGER NOT NULL CHECK(gross_minor>=0),
 adjustments_minor INTEGER NOT NULL DEFAULT 0 CHECK(adjustments_minor>=0),
 net_minor INTEGER NOT NULL CHECK(net_minor>=0),
 admin_minor INTEGER NOT NULL CHECK(admin_minor>=0),
 activity_minor INTEGER NOT NULL CHECK(activity_minor>=0),
 network_minor INTEGER NOT NULL CHECK(network_minor>=0),
 rank_minor INTEGER NOT NULL CHECK(rank_minor>=0),
 status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','review','approved','void')),
 compliance_status TEXT NOT NULL DEFAULT 'pending' CHECK(compliance_status IN ('pending','cleared','blocked')),
 created_by INTEGER NOT NULL REFERENCES cft_users(id),
 created_at TEXT NOT NULL,
 approved_by INTEGER REFERENCES cft_users(id),
 approved_at TEXT,
 CHECK(admin_minor+activity_minor+network_minor+rank_minor=net_minor),
 UNIQUE(source_type,source_reference,period_start,period_end,currency)
);
CREATE INDEX IF NOT EXISTS idx_cft_commission_source_period ON cft_commission_batches(source_type,period_start DESC);
CREATE TABLE IF NOT EXISTS cft_commission_allocations (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 batch_id INTEGER NOT NULL REFERENCES cft_commission_batches(id) ON DELETE CASCADE,
 member_id INTEGER NOT NULL REFERENCES cft_users(id),
 pool TEXT NOT NULL CHECK(pool IN ('activity','network','rank')),
 points INTEGER NOT NULL CHECK(points>=0),
 allocated_minor INTEGER NOT NULL CHECK(allocated_minor>=0),
 evidence_ref TEXT NOT NULL,
 state TEXT NOT NULL DEFAULT 'draft' CHECK(state IN ('draft','verified','rejected')),
 UNIQUE(batch_id,member_id,pool)
);
CREATE INDEX IF NOT EXISTS idx_cft_commission_alloc_member ON cft_commission_allocations(member_id,batch_id DESC);
-- No payment or wallet credit from these tables. Separate reviewed payout module required.
