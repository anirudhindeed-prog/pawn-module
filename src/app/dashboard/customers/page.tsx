'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { Search, Shield, ShieldAlert, User } from 'lucide-react'

const customers = [
  { id: 'C001', name: 'Arjun Pillai', phone: '+91 99400 56712', aadhaar: 'XXXX 8821', kyc: 'Verified', since: 'Jan 2023', lifetimeValue: 285000, exposure: 68540, activeLoans: 2, defaultCount: 0, avatar: 'AP' },
  { id: 'C002', name: 'Meena Rajan', phone: '+91 98441 23001', aadhaar: 'XXXX 4412', kyc: 'Verified', since: 'Mar 2022', lifetimeValue: 142000, exposure: 42000, activeLoans: 1, defaultCount: 0, avatar: 'MR' },
  { id: 'C003', name: 'Suresh Kumar', phone: '+91 99001 78934', aadhaar: 'XXXX 7733', kyc: 'Partial', since: 'Sep 2024', lifetimeValue: 52000, exposure: 31000, activeLoans: 1, defaultCount: 1, avatar: 'SK' },
  { id: 'C004', name: 'Kavitha Nair', phone: '+91 98210 34456', aadhaar: 'XXXX 5521', kyc: 'Verified', since: 'Jun 2021', lifetimeValue: 410000, exposure: 89000, activeLoans: 3, defaultCount: 0, avatar: 'KN' },
  { id: 'C005', name: 'Ravi Shankar', phone: '+91 99887 65432', aadhaar: 'XXXX 2290', kyc: 'Verified', since: 'Nov 2020', lifetimeValue: 680000, exposure: 0, activeLoans: 0, defaultCount: 2, avatar: 'RS' },
]

export default function CustomersPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<typeof customers[0] | null>(null)
  const [tab, setTab] = useState<'active' | 'history'>('active')

  const filtered = customers.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Customer Ledger</h1>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, phone, ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
              <p className="text-sm font-medium text-slate-700">{filtered.length} Customers</p>
            </div>
            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
              {filtered.map((cust) => (
                <button
                  key={cust.id}
                  onClick={() => setSelected(cust)}
                  className={`w-full p-4 text-left hover:bg-slate-50 transition flex items-center gap-3 border-l-4 ${
                    selected?.id === cust.id ? 'bg-amber-50 border-l-amber-600' : 'border-l-transparent'
                  }`}
                >
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-sm font-bold text-amber-700">
                    {cust.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-slate-900 text-sm truncate">{cust.name}</p>
                      {cust.kyc === 'Verified' ? (
                        <Shield className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                      ) : (
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{cust.phone}</p>
                  </div>
                  {cust.activeLoans > 0 && (
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">
                      {cust.activeLoans}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Detail */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
              {/* Header */}
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center text-lg font-bold text-amber-700">
                    {selected.avatar}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selected.name}</h2>
                    <p className="text-sm text-slate-600">{selected.phone} &middot; Aadhaar: {selected.aadhaar}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded border font-medium ${
                        selected.kyc === 'Verified'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        KYC: {selected.kyc}
                      </span>
                      <span className="text-xs text-slate-500">Customer since {selected.since}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-slate-200">
                <div>
                  <p className="text-xs text-slate-600 uppercase tracking-wide">Lifetime Value</p>
                  <p className="text-lg font-bold text-slate-900">{formatCurrency(selected.lifetimeValue)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 uppercase tracking-wide">Current Exposure</p>
                  <p className="text-lg font-bold text-slate-900">{formatCurrency(selected.exposure)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 uppercase tracking-wide">Active Loans</p>
                  <p className="text-lg font-bold text-slate-900">{selected.activeLoans}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 uppercase tracking-wide">Defaults</p>
                  <p className={`text-lg font-bold ${selected.defaultCount > 0 ? 'text-rose-600' : 'text-green-600'}`}>
                    {selected.defaultCount}
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-slate-200">
                <div className="flex">
                  <button
                    onClick={() => setTab('active')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition ${
                      tab === 'active'
                        ? 'border-amber-600 text-amber-600'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Active Loans
                  </button>
                  <button
                    onClick={() => setTab('history')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition ${
                      tab === 'history'
                        ? 'border-amber-600 text-amber-600'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    History
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {tab === 'active' ? (
                  selected.activeLoans > 0 ? (
                    <p className="text-sm text-slate-600">
                      {selected.activeLoans} active loan(s) with {formatCurrency(selected.exposure)} exposure.
                      Loan details will be populated from the database.
                    </p>
                  ) : (
                    <p className="text-sm text-slate-500 text-center py-8">No active loans</p>
                  )
                ) : (
                  <p className="text-sm text-slate-500 text-center py-8">
                    Loan history will be populated from the database.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-slate-200 p-12 flex flex-col items-center justify-center min-h-96">
              <User className="w-12 h-12 text-slate-300 mb-4" />
              <p className="text-slate-600">Select a customer to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
