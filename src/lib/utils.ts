import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'dd MMM yyyy')
}

export function formatDateTime(date: string | Date): string {
  return format(new Date(date), 'dd MMM yyyy hh:mm a')
}

export function generateTicketNumber(): string {
  const prefix = 'PT'
  const dateStr = format(new Date(), 'MMM').toUpperCase()
  const random = Math.floor(Math.random() * 100000)
  return `${prefix}-${dateStr}-${String(random).padStart(5, '0')}`
}

export function maskAadhaar(aadhaar: string): string {
  if (!aadhaar || aadhaar.length < 4) return aadhaar
  return `XXXX ${aadhaar.slice(-4)}`
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n.charAt(0).toUpperCase())
    .join('')
}

export function getStatusColor(status: string): string {
  const colors = {
    active: 'text-green-600 bg-green-50 border-green-200',
    near: 'text-amber-600 bg-amber-50 border-amber-200',
    overdue: 'text-rose-600 bg-rose-50 border-rose-200',
    settled: 'text-slate-600 bg-slate-50 border-slate-200',
    forfeited: 'text-red-600 bg-red-50 border-red-200',
  }
  return colors[status as keyof typeof colors] || colors.settled
}

export function getDaysUntilMaturity(maturityDate: string): number {
  const today = new Date()
  const maturity = new Date(maturityDate)
  return Math.ceil((maturity.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}
