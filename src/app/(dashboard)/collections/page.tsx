'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { Phone, AlertTriangle } from 'lucide-react'

const collData = [
  { ticket: 'PT-CHN-01823', customer: 'Meena Rajan', phone: '+91 98441 23001', interest: 2100, penalty: 0, dpd: 0, lastPay: '10 Mar 2026' },
  { ticket: 'PT-CHN-01791', customer: 'Arjun Pillai', phone: '+91 99400 56712', interest: 3200, penalty: 850, dpd: 12, lastPay: '28 Feb 2026' },
  { ticket: 'PT-CHN-01756', customer: 'Kavitha Nair', phone: '+91 98210 34456', interest: 1800, penalty: 0, dpd: 2, lastPay: '12 Mar 2026' },
  { ticket: 'PT-CHN-01744', customer: 'Suresh Kumar', phone: '+91 99001 78934', interest: 4500, penalty: 2100, dpd: 41, lastPay: '03 Feb 2026' },
  { ticket: 'PT-CHN-01712', customer: 'Priya Venkat', phone: '+91 98765 43210', interest: 2800, penalty: 0, dpd: 1, lastPay: '13 Mar 2026' },
  { ticket: 'PT-CHN-01698', customer: 'Ravi Shankar', phone: '+91 99887 65432', interest: 5200, penalty: 3600, dpd: 67, lastPay: '09 Jan 2026' },
  { ticket: 'PT-CHN-01675', customer: 'Lakshmi Devi', phone: '+91 98001 23456', interest: 1400, penalty: 0, dpd: 0, lastPay: '11 Mar 2026' },
  { ticket: 'PT-CHN-01643', customer: 'Murugan S', phone: '+91 99100 45678', interest: 6800, penalty: 4200, dpd: 88, lastPay: '20 Dec 2025' },
]

export default function CollectionsPage() {
  const [filter, setFilter] = useState<'all' | 'overdue' | 'current'>('all')

  const totalInterest = collData.reduce((s, r) => s + r.interest, 0)
  const totalPenalty = collData.reduce((s, r) => s + r.penalty, 0)

  const filtered = collData.filter((row) => {
    if (filter === 'overdue') return row.dpd > 0
    if (filter === 'current') return row.dpd === 0
    return true
  })

  const dpdColor = (dpd: number) => {
    if (dpd === 0) return 'text-green-600 bg-green-50'
    if (dpd <= 7) return 'text-amber-600 bg-amber-50'
    if (dpd <= 30) return 'text-orange-600 bg-orange-50'
    return 'text-rose-600 bg-rose-50'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Today&apos;s Collections</h1>
        <p className="text-sm text-slate-600">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Total Interest Due</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalInterest)}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Total Penalty</p>
          <p className="text-2xl font-bold text-rose-600">{formatCurrency(totalPenalty)}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Grand Total</p>
          <p className="text-2xl font-bold text-amber-600">{formatCurrency(totalInterest + totalPenalty)}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(['all', 'overdue', 'current'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === f
                ? 'bg-amber-600 text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {f === 'all' ? 'All' : f === 'overdue' ? 'Overdue' : 'Current'}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Ticket</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Customer</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wide">Interest</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wide">Penalty</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wide">DPD</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Last Payment</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((row) => (
              <tr key={row.ticket} className="hover:bg-slate-50 transition">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900 text-sm">{row.ticket}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-slate-900">{row.customer}</p>
                  <p className="text-xs text-slate-500">{row.phone}</p>
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">
                  {formatCurrency(row.interest)}
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium">
                  <span className={row.penalty > 0 ? 'text-rose-600' : 'text-slate-400'}>
                    {formatCurrency(row.penalty)}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded ${dpdColor(row.dpd)}`}>
                    {row.dpd > 30 && <AlertTriangle className="w-3 h-3" />}
                    {row.dpd}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{row.lastPay}</td>
                <td className="px-4 py-3 text-right">
                  <button className="px-3 py-1 bg-amber-600 text-white rounded text-xs font-medium hover:bg-amber-700 transition">
                    Collect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
