'use client'

import { useState } from 'react'
import { Settings, Plus, Pencil } from 'lucide-react'

type MasterTab = 'schemes' | 'penalties' | 'vaults'

const interestSchemes = [
  { id: '1', name: 'Monthly Flat 2.0%', type: 'flat_monthly', rate: 2.0, minLoan: 5000, maxLoan: 500000, tenure: 90 },
  { id: '2', name: 'Daily Accrual (0.07%/day)', type: 'daily_accrual', rate: 0.07, minLoan: 10000, maxLoan: 1000000, tenure: 60 },
  { id: '3', name: 'Slab Rate (tiered)', type: 'compound', rate: 1.5, minLoan: 25000, maxLoan: 2000000, tenure: 180 },
]

const penaltyRules = [
  { id: '1', name: 'Standard Penalty', graceDays: 3, type: 'percent', rate: 0.5, period: 'monthly' },
  { id: '2', name: 'Fixed Weekly', graceDays: 7, type: 'fixed', rate: 50, period: 'weekly' },
]

const vaultLocs = [
  { id: 'V1', label: 'Vault A', capacity: 200, notes: 'Main vault - ground floor' },
  { id: 'V2', label: 'Vault B', capacity: 150, notes: 'Secondary vault - first floor' },
  { id: 'V3', label: 'Locker Room', capacity: 50, notes: 'High-value items only' },
]

export default function MastersPage() {
  const [tab, setTab] = useState<MasterTab>('schemes')

  const tabs: { key: MasterTab; label: string }[] = [
    { key: 'schemes', label: 'Interest Schemes' },
    { key: 'penalties', label: 'Penalty Rules' },
    { key: 'vaults', label: 'Vault Locations' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Pawn Masters</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-sm font-medium">
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-1">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
                tab === key
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Interest Schemes */}
      {tab === 'schemes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {interestSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{scheme.name}</h3>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded mt-1 inline-block">
                    {scheme.type.replace('_', ' ')}
                  </span>
                </div>
                <button className="p-1.5 hover:bg-slate-100 rounded transition">
                  <Pencil className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Rate</span>
                  <span className="font-medium text-slate-900">{scheme.rate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Loan Range</span>
                  <span className="font-medium text-slate-900">
                    &#8377;{(scheme.minLoan / 1000).toFixed(0)}K - &#8377;{(scheme.maxLoan / 100000).toFixed(0)}L
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Default Tenure</span>
                  <span className="font-medium text-slate-900">{scheme.tenure} days</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Penalty Rules */}
      {tab === 'penalties' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {penaltyRules.map((rule) => (
            <div key={rule.id} className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-slate-900">{rule.name}</h3>
                <button className="p-1.5 hover:bg-slate-100 rounded transition">
                  <Pencil className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Grace Period</span>
                  <span className="font-medium text-slate-900">{rule.graceDays} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Penalty</span>
                  <span className="font-medium text-slate-900">
                    {rule.type === 'percent' ? `${rule.rate}%` : `&#8377;${rule.rate}`} / {rule.period}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vault Locations */}
      {tab === 'vaults' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vaultLocs.map((vault) => (
            <div key={vault.id} className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{vault.label}</h3>
                </div>
                <button className="p-1.5 hover:bg-slate-100 rounded transition">
                  <Pencil className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Capacity</span>
                  <span className="font-medium text-slate-900">{vault.capacity} items</span>
                </div>
                <p className="text-slate-500 text-xs">{vault.notes}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
