-- Seed data for Pawn Module demo
-- Run after schema.sql in the Supabase SQL Editor

-- Interest Schemes
INSERT INTO interest_schemes (id, name, type, rate_percent, min_loan_amount, max_loan_amount, default_tenure_days) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Monthly Flat 2.0%', 'flat_monthly', 2.0000, 5000, 500000, 90),
  ('a1000000-0000-0000-0000-000000000002', 'Daily Accrual (0.07%/day)', 'daily_accrual', 0.0700, 10000, 1000000, 60);

-- Penalty Rules
INSERT INTO penalty_rules (id, name, grace_days, penalty_type, rate_or_amount, period) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'Standard - 0.5%/month after 3 days', 3, 'percent', 0.50, 'monthly'),
  ('b1000000-0000-0000-0000-000000000002', 'Fixed - ₹50/week after 7 days', 7, 'fixed', 50.00, 'weekly');

-- Vault Locations
INSERT INTO vault_locations (id, label, capacity, notes) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Vault A', 200, 'Main vault - ground floor'),
  ('c1000000-0000-0000-0000-000000000002', 'Vault B', 150, 'Secondary vault - first floor');

-- Customers
INSERT INTO customers (id, name, phone, aadhaar_masked, kyc_status, customer_since, lifetime_value, avatar_initials) VALUES
  ('d1000000-0000-0000-0000-000000000001', 'Arjun Pillai',  '+91 99400 56712', 'XXXX 8821', 'verified', '2023-01-15', 285000, 'AP'),
  ('d1000000-0000-0000-0000-000000000002', 'Meena Rajan',   '+91 98441 23001', 'XXXX 4412', 'verified', '2022-03-10', 142000, 'MR'),
  ('d1000000-0000-0000-0000-000000000003', 'Suresh Kumar',  '+91 99001 78934', 'XXXX 7733', 'partial',  '2024-09-01',  52000, 'SK'),
  ('d1000000-0000-0000-0000-000000000004', 'Kavitha Nair',  '+91 98210 34456', 'XXXX 5521', 'verified', '2021-06-20', 410000, 'KN'),
  ('d1000000-0000-0000-0000-000000000005', 'Ravi Shankar',  '+91 99887 65432', 'XXXX 2290', 'verified', '2020-11-05', 680000, 'RS');

-- Pawn Loans
INSERT INTO pawn_loans (id, ticket_no, customer_id, pledge_date, principal_amount, interest_scheme_id, tenure_days, ltv_percent, status, maturity_date, vault_location_id, created_by) VALUES
  ('e1000000-0000-0000-0000-000000000001', 'PT-CHN-01892', 'd1000000-0000-0000-0000-000000000002', '2026-01-12', 48000,  'a1000000-0000-0000-0000-000000000001', 90, 70, 'active',  '2026-04-12', 'c1000000-0000-0000-0000-000000000001', 'Arun Kumar'),
  ('e1000000-0000-0000-0000-000000000002', 'PT-CHN-01866', 'd1000000-0000-0000-0000-000000000001', '2025-12-22', 110000, 'a1000000-0000-0000-0000-000000000001', 90, 70, 'near',    '2026-03-22', 'c1000000-0000-0000-0000-000000000001', 'Arun Kumar'),
  ('e1000000-0000-0000-0000-000000000003', 'PT-CHN-01791', 'd1000000-0000-0000-0000-000000000003', '2025-11-04', 62000,  'a1000000-0000-0000-0000-000000000002', 90, 70, 'overdue', '2026-02-04', 'c1000000-0000-0000-0000-000000000002', 'Priya M');

-- Pawn Items
INSERT INTO pawn_items (loan_id, item_type, gross_wt, stone_wt, purity_code, purity_value, fine_wt, valuation_amount, condition, appraiser_initials, bis_hallmark, rfid_tag) VALUES
  ('e1000000-0000-0000-0000-000000000001', 'Bangle', 22.100, 0.500, '22K', 0.9167, 19.797, 131649, 'excellent', 'AK', true,  'RF-CHN-004987'),
  ('e1000000-0000-0000-0000-000000000002', 'Chain',  18.500, 0.300, '22K', 0.9167, 16.694, 111014, 'good',      'AK', true,  'RF-CHN-004921'),
  ('e1000000-0000-0000-0000-000000000003', 'Ring',    8.300, 0.000, '22K', 0.9167,  7.609,  50597, 'good',      'PM', false, 'RF-CHN-004901');
