-- Pawn Module Schema for Supabase
-- Run this in the Supabase SQL Editor to create all tables

-- Customers
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  aadhaar_masked TEXT,
  kyc_status TEXT NOT NULL DEFAULT 'pending' CHECK (kyc_status IN ('verified', 'partial', 'pending')),
  customer_since DATE NOT NULL DEFAULT CURRENT_DATE,
  lifetime_value NUMERIC(12,2) NOT NULL DEFAULT 0,
  avatar_initials TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Interest schemes
CREATE TABLE interest_schemes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('flat_monthly', 'daily_accrual', 'compound')),
  rate_percent NUMERIC(6,4) NOT NULL,
  min_loan_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  max_loan_amount NUMERIC(12,2) NOT NULL DEFAULT 10000000,
  default_tenure_days INT NOT NULL DEFAULT 90,
  compound_rate_percent NUMERIC(6,4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Penalty rules
CREATE TABLE penalty_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  grace_days INT NOT NULL DEFAULT 3,
  penalty_type TEXT NOT NULL CHECK (penalty_type IN ('percent', 'fixed')),
  rate_or_amount NUMERIC(10,2) NOT NULL,
  period TEXT NOT NULL CHECK (period IN ('daily', 'weekly', 'monthly'))
);

-- Vault locations
CREATE TABLE vault_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  capacity INT NOT NULL DEFAULT 100,
  notes TEXT
);

-- Pawn loans (pledge receipts)
CREATE TABLE pawn_loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_no TEXT NOT NULL UNIQUE,
  customer_id UUID NOT NULL REFERENCES customers(id),
  pledge_date DATE NOT NULL DEFAULT CURRENT_DATE,
  principal_amount NUMERIC(12,2) NOT NULL,
  interest_scheme_id UUID NOT NULL REFERENCES interest_schemes(id),
  tenure_days INT NOT NULL DEFAULT 90,
  ltv_percent NUMERIC(5,2) NOT NULL DEFAULT 70,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'near', 'overdue', 'settled', 'forfeited')),
  maturity_date DATE NOT NULL,
  vault_location_id UUID REFERENCES vault_locations(id),
  created_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pawn items (pledged jewellery details)
CREATE TABLE pawn_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID NOT NULL REFERENCES pawn_loans(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL,
  gross_wt NUMERIC(8,3) NOT NULL,
  stone_wt NUMERIC(8,3) NOT NULL DEFAULT 0,
  purity_code TEXT NOT NULL CHECK (purity_code IN ('24K', '22K', '18K')),
  purity_value NUMERIC(6,4) NOT NULL,
  fine_wt NUMERIC(8,3) NOT NULL,
  valuation_amount NUMERIC(12,2) NOT NULL,
  condition TEXT NOT NULL DEFAULT 'good' CHECK (condition IN ('excellent', 'good', 'fair', 'damaged')),
  appraiser_initials TEXT,
  bis_hallmark BOOLEAN NOT NULL DEFAULT FALSE,
  hallmark_code TEXT,
  condition_notes TEXT,
  photo_url TEXT,
  rfid_tag TEXT
);

-- Pawn settlements (payments)
CREATE TABLE pawn_settlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID NOT NULL REFERENCES pawn_loans(id),
  settlement_date DATE NOT NULL DEFAULT CURRENT_DATE,
  principal_paid NUMERIC(12,2) NOT NULL DEFAULT 0,
  interest_paid NUMERIC(12,2) NOT NULL DEFAULT 0,
  penalty_paid NUMERIC(12,2) NOT NULL DEFAULT 0,
  total_paid NUMERIC(12,2) NOT NULL,
  payment_mode TEXT NOT NULL DEFAULT 'cash' CHECK (payment_mode IN ('cash', 'upi', 'card')),
  reference_no TEXT,
  notes TEXT
);

-- Indexes
CREATE INDEX idx_pawn_loans_customer ON pawn_loans(customer_id);
CREATE INDEX idx_pawn_loans_status ON pawn_loans(status);
CREATE INDEX idx_pawn_loans_maturity ON pawn_loans(maturity_date);
CREATE INDEX idx_pawn_items_loan ON pawn_items(loan_id);
CREATE INDEX idx_pawn_settlements_loan ON pawn_settlements(loan_id);
CREATE INDEX idx_customers_phone ON customers(phone);

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE interest_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE penalty_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE vault_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE pawn_loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE pawn_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE pawn_settlements ENABLE ROW LEVEL SECURITY;

-- RLS policies: allow all for authenticated users (single-tenant for now)
CREATE POLICY "Authenticated access" ON customers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated access" ON interest_schemes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated access" ON penalty_rules FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated access" ON vault_locations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated access" ON pawn_loans FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated access" ON pawn_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated access" ON pawn_settlements FOR ALL TO authenticated USING (true) WITH CHECK (true);
