/**
 * Interest and LTV calculation utilities for pawn loans
 * Based on Kumudu Jewellery ERP business logic
 */

export interface InterestCalculationParams {
  principal: number
  ratePercent: number
  daysHeld: number
  type: 'simple' | 'compound'
  monthsHeld?: number
}

export interface LTVCalculationParams {
  fineWeight: number
  rate24kPerGram: number
  ltvPercent: number
}

/**
 * Calculate simple interest
 * Formula: Interest = Principal × (Rate% / 365) × Days
 */
export function calculateSimpleInterest(
  principal: number,
  ratePercent: number,
  daysHeld: number
): number {
  return (principal * ratePercent / 365) * daysHeld
}

/**
 * Calculate compound interest (for overdue loans)
 * Formula: Interest = Principal × (1 + Rate% / 12)^Months - Principal
 */
export function calculateCompoundInterest(
  principal: number,
  ratePercent: number,
  monthsHeld: number
): number {
  return principal * (Math.pow(1 + ratePercent / 12, monthsHeld) - 1)
}

/**
 * Calculate interest based on scheme type
 */
export function calculateInterest(params: InterestCalculationParams): number {
  if (params.type === 'simple') {
    return calculateSimpleInterest(params.principal, params.ratePercent, params.daysHeld)
  } else {
    return calculateCompoundInterest(
      params.principal,
      params.ratePercent,
      params.monthsHeld || Math.ceil(params.daysHeld / 30)
    )
  }
}

/**
 * Calculate fine weight (gold content)
 * Fine Weight = Gross Weight × Purity Value
 */
export function calculateFineWeight(grossWeight: number, purityValue: number): number {
  return grossWeight * purityValue
}

/**
 * Calculate valuation amount
 * Valuation = Fine Weight × 24K Rate per gram
 */
export function calculateValuation(fineWeight: number, rate24k: number): number {
  return fineWeight * rate24k
}

/**
 * Calculate recommended principal (loan amount)
 * Principal = Valuation × (LTV% / 100)
 */
export function calculatePrincipal(valuation: number, ltvPercent: number): number {
  return valuation * (ltvPercent / 100)
}

/**
 * Calculate days between two dates
 */
export function daysBetween(startDate: Date, endDate: Date): number {
  return Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
}

/**
 * Calculate maturity date
 */
export function calculateMaturityDate(pledgeDate: Date, tenureDays: number): Date {
  const maturity = new Date(pledgeDate)
  maturity.setDate(maturity.getDate() + tenureDays)
  return maturity
}

/**
 * Determine loan status based on days past maturity
 */
export function determineLoanStatus(
  maturityDate: Date,
  settledDate?: Date
): 'active' | 'near' | 'overdue' | 'settled' {
  if (settledDate) return 'settled'

  const today = new Date()
  const daysUntilMaturity = daysBetween(today, maturityDate)

  if (daysUntilMaturity < 0) return 'overdue'
  if (daysUntilMaturity <= 7) return 'near'
  return 'active'
}

/**
 * Purity code to purity value mapping
 */
export const purityMap = {
  '24K': 0.999,
  '22K': 0.9167,
  '18K': 0.75,
} as const

export type PurityCode = keyof typeof purityMap
