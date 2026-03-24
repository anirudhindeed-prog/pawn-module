'use client'

import { useState } from 'react'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'
import { Search, Filter } from 'lucide-react'
import Link from 'next/link'

// Mock data from prototype
const mockLoans = [
  {
    id: '1',
    ticket: 'PT-CHN-01892',
    customer: 'Meena R',
    phone: '+91 98xxxx2210',
    principal: 48000,
    interest: 1120,
    penalty: 0,
    total: 49120,
    status: 'active',
    maturity: '2026-04-12',
  },
  {
    id: '2',
    ticket: 'PT-CHN-01866',
    customer: 'Rafiq A',
    phone: '+91 99xxxx1180',
    principal: 110000,
    interest: 3980,
    penalty: 0,
    total: 113980,
    status: 'near',
    maturity: '2026-03-22',
  },
  {
    id: '3',
    ticket: 'PT-CHN-01791',
    customer: 'Suresh V',
    phone: '+91 97xxxx7733',
    principal: 62000,
    interest: 6540,
    penalty: 720,
    total: 69260,
    status: 'overdue',
    maturity: '2026-02-04',
  },
]

export default function LoansPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedLoan, setSelectedLoan] = useState<typeof mockLoans[0] | null>(null)

  const filtered = mockLoans.filter((loan) => {
    const matchSearch =
      loan.ticket.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = statusFilter === 'all' || loan.status === statusFilter
    return matchSearch && matchStatus
  })

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'status-active'
      case 'near':
        return 'status-near'
      case 'overdue':
        return 'status-overdue'
      default:
        return 'status-settled'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'near':
        return 'Near Maturity'
      case 'overdue':
        return 'Overdue'
      default:
        return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Active Loans</h1>
        <Link
          href="/dashboard/new"
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-sm font-medium"
        >
          + New Pawn Entry
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ticket or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="near">Near Maturity</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Main Content - Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Loan List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <p className="text-sm font-medium text-slate-700">{filtered.length} Loans</p>
            </div>
            <div className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
              {filtered.map((loan) => (
                <button
                  key={loan.id}
                  onClick={() => setSelectedLoan(loan)}
                  className={`w-full p-4 text-left hover:bg-slate-50 transition border-l-4 ${
                    selectedLoan?.id === loan.id
                      ? 'bg-amber-50 border-l-amber-600'
                      : 'border-l-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-slate-900">{loan.ticket}</p>
                      <p className="text-sm text-slate-600">{loan.customer}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium border ${getStatusBadgeClass(
                        loan.status
                      )}`}
                    >
                      {getStatusLabel(loan.status)}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatCurrency(loan.principal)}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loan Detail Panel */}
        <div className="lg:col-span-2">
          {selectedLoan ? (
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedLoan.ticket}</h2>
                  <p className="text-slate-600 mt-1">{selectedLoan.customer}</p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium border ${getStatusBadgeClass(
                    selectedLoan.status
                  )}`}
                >
                  {getStatusLabel(selectedLoan.status)}
                </span>
              </div>

              {/* Loan Details Grid */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Principal</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatCurrency(selectedLoan.principal)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Interest</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatCurrency(selectedLoan.interest)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Penalty</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatCurrency(selectedLoan.penalty)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Due</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {formatCurrency(selectedLoan.total)}
                  </p>
                </div>
              </div>

              {/* Contact and Dates */}
              <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-600 uppercase tracking-wide">Phone</p>
                    <p className="text-sm font-medium text-slate-900">{selectedLoan.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 uppercase tracking-wide">Maturity</p>
                    <p className="text-sm font-medium text-slate-900">
                      {formatDate(selectedLoan.maturity)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Link
                  href={`/dashboard/payments?loan=${selectedLoan.id}`}
                  className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-sm font-medium text-center"
                >
                  Record Payment
                </Link>
                <button className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-slate-200 p-12 flex items-center justify-center min-h-96">
              <p className="text-slate-600">Select a loan to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
