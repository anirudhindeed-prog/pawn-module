'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { BarChart3, TrendingUp, AlertTriangle, Gavel, Users, Wallet } from 'lucide-react'

type ReportType = 'income' | 'portfolio' | 'npa' | 'auction' | 'staff' | 'cash'

const reportConfig: { key: ReportType; label: string; icon: React.ElementType }[] = [
  { key: 'income', label: 'Income', icon: TrendingUp },
  { key: 'portfolio', label: 'Portfolio', icon: BarChart3 },
  { key: 'npa', label: 'NPA', icon: AlertTriangle },
  { key: 'auction', label: 'Auction', icon: Gavel },
  { key: 'staff', label: 'Staff', icon: Users },
  { key: 'cash', label: 'Cash Book', icon: Wallet },
]

const reportData: Record<ReportType, { kpis: { label: string; value: string; change?: string }[]; rows: Record<string, string>[] }> = {
  income: {
    kpis: [
      { label: 'Interest Income', value: '₹2,34,000', change: '+12%' },
      { label: 'Penalty Income', value: '₹18,500', change: '+5%' },
      { label: 'Total Revenue', value: '₹2,52,500', change: '+11%' },
    ],
    rows: [
      { scheme: 'Monthly Flat 2%', loans: '42', interest: '₹1,56,000', penalty: '₹8,200' },
      { scheme: 'Daily Accrual', loans: '18', interest: '₹62,000', penalty: '₹7,300' },
      { scheme: 'Slab Rate', loans: '8', interest: '₹16,000', penalty: '₹3,000' },
    ],
  },
  portfolio: {
    kpis: [
      { label: 'Total AUM', value: '₹38,92,800' },
      { label: 'Avg LTV', value: '70.2%' },
      { label: 'Active Loans', value: '68' },
    ],
    rows: [
      { purity: '22K', loans: '48', weight: '680g', value: '₹28,50,000', avgLtv: '71%' },
      { purity: '18K', loans: '12', weight: '120g', value: '₹5,40,000', avgLtv: '68%' },
      { purity: 'Silver', loans: '8', weight: '850g', value: '₹5,02,800', avgLtv: '65%' },
    ],
  },
  npa: {
    kpis: [
      { label: 'Total NPA', value: '₹6,92,600' },
      { label: 'NPA %', value: '17.8%' },
      { label: 'Accounts', value: '5' },
    ],
    rows: [
      { bucket: '0-7 days', count: '12', amount: '₹2,40,000' },
      { bucket: '8-30 days', count: '6', amount: '₹1,80,000' },
      { bucket: '31-90 days', count: '3', amount: '₹1,52,600' },
      { bucket: '90+ days', count: '2', amount: '₹1,20,000' },
    ],
  },
  auction: {
    kpis: [
      { label: 'Batches (YTD)', value: '3' },
      { label: 'Reserve Value', value: '₹7,65,000' },
      { label: 'Realised Value', value: '₹5,43,000' },
    ],
    rows: [
      { batch: 'AUC-2026-003', date: '15 Apr 2026', items: '3', reserve: '₹2,65,000', realised: '—' },
      { batch: 'AUC-2026-002', date: '20 Feb 2026', items: '2', reserve: '₹1,80,000', realised: '₹1,95,000' },
      { batch: 'AUC-2026-001', date: '15 Jan 2026', items: '4', reserve: '₹3,20,000', realised: '₹3,48,000' },
    ],
  },
  staff: {
    kpis: [
      { label: 'Loans Issued (MTD)', value: '24' },
      { label: 'Renewals', value: '18' },
      { label: 'Payments Collected', value: '52' },
    ],
    rows: [
      { staff: 'Arun Kumar', issued: '10', renewed: '8', payments: '22', amount: '₹4,80,000' },
      { staff: 'Priya M', issued: '8', renewed: '6', payments: '18', amount: '₹3,20,000' },
      { staff: 'Rajan S', issued: '6', renewed: '4', payments: '12', amount: '₹2,10,000' },
    ],
  },
  cash: {
    kpis: [
      { label: 'Opening Balance', value: '₹2,50,000' },
      { label: 'Cash In', value: '₹3,85,000' },
      { label: 'Cash Out', value: '₹4,10,000' },
    ],
    rows: [
      { entry: 'Opening Balance', cashIn: '₹2,50,000', cashOut: '—', running: '₹2,50,000' },
      { entry: 'Loan Disbursement x3', cashIn: '—', cashOut: '₹2,80,000', running: '₹-30,000' },
      { entry: 'Interest Collections', cashIn: '₹1,85,000', cashOut: '—', running: '₹1,55,000' },
      { entry: 'Principal Repayments', cashIn: '₹2,00,000', cashOut: '—', running: '₹3,55,000' },
      { entry: 'Loan Disbursement x2', cashIn: '—', cashOut: '₹1,30,000', running: '₹2,25,000' },
    ],
  },
}

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState<ReportType>('income')

  const data = reportData[activeReport]
  const columns = data.rows.length > 0 ? Object.keys(data.rows[0]) : []

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Reports</h1>

      {/* Report Type Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {reportConfig.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveReport(key)}
            className={`p-3 rounded-lg border text-sm font-medium flex items-center gap-2 transition ${
              activeReport === key
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
            <p className="text-sm text-slate-600 mb-1">{kpi.label}</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
              {kpi.change && (
                <span className="text-sm font-medium text-green-600 mb-0.5">{kpi.change}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide"
                >
                  {col.replace(/([A-Z])/g, ' $1').trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-3 text-sm text-slate-900">
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
