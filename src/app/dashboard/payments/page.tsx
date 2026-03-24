'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { CheckCircle } from 'lucide-react'

export default function PaymentsPage() {
  const [ticketNo, setTicketNo] = useState('')
  const [paymentMode, setPaymentMode] = useState('cash')
  const [interestAmount, setInterestAmount] = useState('')
  const [penaltyAmount, setPenaltyAmount] = useState('')
  const [principalAmount, setPrincipalAmount] = useState('')
  const [referenceNo, setReferenceNo] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const total =
    (parseFloat(interestAmount) || 0) +
    (parseFloat(penaltyAmount) || 0) +
    (parseFloat(principalAmount) || 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Record Payment</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-6">
            {/* Ticket Search */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Loan Ticket No.</label>
              <input
                type="text"
                value={ticketNo}
                onChange={(e) => setTicketNo(e.target.value)}
                placeholder="e.g. PT-CHN-01892"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Payment Mode */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Payment Mode</label>
              <div className="flex gap-2">
                {['cash', 'upi', 'card'].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMode(mode)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium capitalize transition ${
                      paymentMode === mode
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white border-slate-300 text-slate-700 hover:border-amber-400'
                    }`}
                  >
                    {mode === 'upi' ? 'UPI' : mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Interest</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 text-sm">&#8377;</span>
                  <input
                    type="number"
                    value={interestAmount}
                    onChange={(e) => setInterestAmount(e.target.value)}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Penalty</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 text-sm">&#8377;</span>
                  <input
                    type="number"
                    value={penaltyAmount}
                    onChange={(e) => setPenaltyAmount(e.target.value)}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Principal</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 text-sm">&#8377;</span>
                  <input
                    type="number"
                    value={principalAmount}
                    onChange={(e) => setPrincipalAmount(e.target.value)}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Reference */}
            {paymentMode !== 'cash' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Reference No.</label>
                <input
                  type="text"
                  value={referenceNo}
                  onChange={(e) => setReferenceNo(e.target.value)}
                  placeholder="Transaction ID"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Optional notes..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={total <= 0 || !ticketNo}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              Record Payment &mdash; {formatCurrency(total)}
            </button>
          </form>
        </div>

        {/* Summary Panel */}
        <div>
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Payment Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Ticket</span>
                <span className="font-medium text-slate-900">{ticketNo || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Mode</span>
                <span className="font-medium text-slate-900 capitalize">{paymentMode === 'upi' ? 'UPI' : paymentMode}</span>
              </div>
              <hr className="border-slate-200" />
              <div className="flex justify-between">
                <span className="text-slate-600">Interest</span>
                <span className="font-medium">{formatCurrency(parseFloat(interestAmount) || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Penalty</span>
                <span className="font-medium">{formatCurrency(parseFloat(penaltyAmount) || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Principal</span>
                <span className="font-medium">{formatCurrency(parseFloat(principalAmount) || 0)}</span>
              </div>
              <hr className="border-slate-200" />
              <div className="flex justify-between text-base">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="font-bold text-amber-600">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {submitted && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-800 font-medium">Payment recorded successfully!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
