'use client'

import { useState } from 'react'
import { Package, Search, MapPin } from 'lucide-react'

const vaultLocations = [
  {
    id: 'V1',
    label: 'Vault A',
    items: [
      { ticket: 'PT-CHN-01791', customer: 'Arjun Pillai', desc: 'Gold Chain 22K', weight: '18.5g', rfid: 'RF-CHN-004921', status: 'active' },
      { ticket: 'PT-CHN-01823', customer: 'Meena Rajan', desc: 'Gold Bangle 22K', weight: '22.1g', rfid: 'RF-CHN-004987', status: 'active' },
      { ticket: 'PT-CHN-01756', customer: 'Kavitha Nair', desc: 'Gold Ring 22K', weight: '8.3g', rfid: 'RF-CHN-004901', status: 'near' },
    ],
  },
  {
    id: 'V2',
    label: 'Vault B',
    items: [
      { ticket: 'PT-CHN-01744', customer: 'Suresh Kumar', desc: 'Silver Anklet', weight: '42.0g', rfid: 'RF-CHN-004855', status: 'overdue' },
      { ticket: 'PT-CHN-01712', customer: 'Priya Venkat', desc: 'Gold Earrings 18K', weight: '6.8g', rfid: 'RF-CHN-004832', status: 'active' },
    ],
  },
]

const statusStyles: Record<string, string> = {
  active: 'bg-green-50 text-green-700 border-green-200',
  near: 'bg-amber-50 text-amber-700 border-amber-200',
  overdue: 'bg-rose-50 text-rose-700 border-rose-200',
}

export default function VaultPage() {
  const [search, setSearch] = useState('')

  const totalItems = vaultLocations.reduce((sum, v) => sum + v.items.length, 0)
  const totalWeight = vaultLocations.reduce(
    (sum, v) => sum + v.items.reduce((s, i) => s + parseFloat(i.weight), 0),
    0
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Vault</h1>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <span>{totalItems} items</span>
          <span>{totalWeight.toFixed(1)}g total weight</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by ticket, customer, RFID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Vault Locations */}
      <div className="space-y-6">
        {vaultLocations.map((vault) => {
          const filtered = vault.items.filter(
            (item) =>
              !search ||
              item.ticket.toLowerCase().includes(search.toLowerCase()) ||
              item.customer.toLowerCase().includes(search.toLowerCase()) ||
              item.rfid.toLowerCase().includes(search.toLowerCase())
          )

          if (search && filtered.length === 0) return null

          return (
            <div key={vault.id} className="bg-white rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200 bg-slate-50 rounded-t-lg">
                <MapPin className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-semibold text-slate-900">{vault.label}</h2>
                <span className="text-sm text-slate-500">{filtered.length} items</span>
              </div>

              <div className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <div key={item.ticket} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{item.desc}</p>
                        <p className="text-sm text-slate-600">{item.customer} &middot; {item.ticket}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-900">{item.weight}</p>
                        <p className="text-xs text-slate-500 font-mono">{item.rfid}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded border font-medium capitalize ${statusStyles[item.status] || ''}`}>
                        {item.status === 'near' ? 'Near Maturity' : item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
