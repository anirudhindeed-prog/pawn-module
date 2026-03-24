'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { AlertTriangle, Gavel, Bell } from 'lucide-react'

type AuctionTab = 'pipeline' | 'batches' | 'reminders'

const pipelineData = [
  { ticket: 'PT-CHN-01698', customer: 'Ravi Shankar', principal: 85000, dpd: 67, item: 'Gold Chain 22K - 24.2g', valuation: 121000, status: 'Notice Sent' },
  { ticket: 'PT-CHN-01643', customer: 'Murugan S', principal: 72000, dpd: 88, item: 'Gold Bangle 22K - 32.5g', valuation: 165000, status: 'Ready for Auction' },
  { ticket: 'PT-CHN-01744', customer: 'Suresh Kumar', principal: 62000, dpd: 41, item: 'Silver Anklet - 42.0g', valuation: 38000, status: 'Under Review' },
]

const batchData = [
  { id: 'AUC-2026-003', date: '15 Apr 2026', items: 3, reserve: 265000, realised: 0, status: 'Scheduled' },
  { id: 'AUC-2026-002', date: '20 Feb 2026', items: 2, reserve: 180000, realised: 195000, status: 'Completed' },
  { id: 'AUC-2026-001', date: '15 Jan 2026', items: 4, reserve: 320000, realised: 348000, status: 'Completed' },
]

const reminderData = [
  { ticket: 'PT-CHN-01698', customer: 'Ravi Shankar', phone: '+91 99887 65432', type: 'Final Notice', sentOn: '10 Mar 2026', responseDeadline: '25 Mar 2026' },
  { ticket: 'PT-CHN-01643', customer: 'Murugan S', phone: '+91 99100 45678', type: 'Auction Warning', sentOn: '05 Mar 2026', responseDeadline: '20 Mar 2026' },
  { ticket: 'PT-CHN-01744', customer: 'Suresh Kumar', phone: '+91 99001 78934', type: 'First Reminder', sentOn: '18 Mar 2026', responseDeadline: '01 Apr 2026' },
]

export default function AuctionsPage() {
  const [tab, setTab] = useState<AuctionTab>('pipeline')

  const tabs: { key: AuctionTab; label: string; icon: React.ElementType }[] = [
    { key: 'pipeline', label: 'Pipeline', icon: AlertTriangle },
    { key: 'batches', label: 'Batches', icon: Gavel },
    { key: 'reminders', label: 'Reminders', icon: Bell },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Auctions / Foreclosure</h1>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
                tab === key
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline */}
      {tab === 'pipeline' && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
            <p className="text-sm font-medium text-slate-700">Overdue pledges (&gt;30 days past maturity)</p>
          </div>
          <div className="divide-y divide-slate-100">
            {pipelineData.map((row) => (
              <div key={row.ticket} className="px-6 py-4 flex items-start justify-between hover:bg-slate-50 transition">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-medium text-slate-900">{row.ticket}</p>
                    <span className="text-xs bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200 font-medium">
                      {row.dpd} DPD
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{row.customer}</p>
                  <p className="text-sm text-slate-500 mt-1">{row.item}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">Principal: {formatCurrency(row.principal)}</p>
                  <p className="text-sm text-slate-600">Valuation: {formatCurrency(row.valuation)}</p>
                  <span className={`mt-2 inline-block text-xs px-2 py-1 rounded font-medium ${
                    row.status === 'Ready for Auction'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : row.status === 'Notice Sent'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {row.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Batches */}
      {tab === 'batches' && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Batch ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Items</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Reserve</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Realised</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {batchData.map((batch) => (
                <tr key={batch.id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{batch.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{batch.date}</td>
                  <td className="px-4 py-3 text-sm text-center text-slate-900">{batch.items}</td>
                  <td className="px-4 py-3 text-sm text-right text-slate-900">{formatCurrency(batch.reserve)}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium">
                    {batch.realised > 0 ? (
                      <span className={batch.realised >= batch.reserve ? 'text-green-600' : 'text-rose-600'}>
                        {formatCurrency(batch.realised)}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      batch.status === 'Completed'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {batch.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reminders */}
      {tab === 'reminders' && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {reminderData.map((rem) => (
              <div key={rem.ticket} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-slate-900">{rem.ticket}</p>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                      rem.type === 'Final Notice'
                        ? 'bg-rose-50 text-rose-700'
                        : rem.type === 'Auction Warning'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}>
                      {rem.type}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{rem.customer} &middot; {rem.phone}</p>
                  <p className="text-xs text-slate-500 mt-1">Sent: {rem.sentOn} &middot; Deadline: {rem.responseDeadline}</p>
                </div>
                <button className="px-3 py-1.5 border border-slate-300 text-slate-700 rounded text-sm font-medium hover:bg-slate-50 transition">
                  Resend
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
