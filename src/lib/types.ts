/**
 * Core data types for pawn module
 */

export interface Customer {
  id: string
  name: string
  phone: string
  aadhaar_masked: string
  kyc_status: 'verified' | 'partial' | 'pending'
  customer_since: string
  lifetime_value: number
  avatar_initials: string
  created_at: string
}

export interface InterestScheme {
  id: string
  name: string
  type: 'flat_monthly' | 'daily_accrual' | 'compound'
  rate_percent: number
  min_loan_amount: number
  max_loan_amount: number
  default_tenure_days: number
  compound_rate_percent?: number
  created_at: string
}

export interface PawnLoan {
  id: string
  ticket_no: string
  customer_id: string
  pledge_date: string
  principal_amount: number
  interest_scheme_id: string
  tenure_days: number
  ltv_percent: number
  status: 'active' | 'near' | 'overdue' | 'settled' | 'forfeited'
  maturity_date: string
  vault_location_id?: string
  created_by: string
  created_at: string
}

export interface PawnItem {
  id: string
  loan_id: string
  item_type: string
  gross_wt: number
  stone_wt: number
  purity_code: '22K' | '18K' | '24K'
  purity_value: number
  fine_wt: number
  valuation_amount: number
  condition: 'excellent' | 'good' | 'fair' | 'damaged'
  appraiser_initials?: string
  bis_hallmark: boolean
  hallmark_code?: string
  condition_notes?: string
  photo_url?: string
  rfid_tag?: string
}

export interface PawnSettlement {
  id: string
  loan_id: string
  settlement_date: string
  principal_paid: number
  interest_paid: number
  penalty_paid: number
  total_paid: number
  payment_mode: 'cash' | 'upi' | 'card'
  reference_no?: string
  notes?: string
}

export interface PenaltyRule {
  id: string
  name: string
  grace_days: number
  penalty_type: 'percent' | 'fixed'
  rate_or_amount: number
  period: 'daily' | 'weekly' | 'monthly'
}

export interface VaultLocation {
  id: string
  label: string
  capacity: number
  notes?: string
}

export interface DashboardKPI {
  active_loans_count: number
  total_exposure: number
  overdue_count: number
  today_interest_due: number
  npa_amount: number
  recent_alerts: Alert[]
}

export interface Alert {
  id: string
  type: 'overdue' | 'near_maturity' | 'low_ltv'
  loan_id: string
  message: string
  created_at: string
}
