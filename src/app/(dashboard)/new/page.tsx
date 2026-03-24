'use client'

import { useState } from 'react'
import { calculateFineWeight, calculateValuation, calculatePrincipal, purityMap } from '@/lib/interest'
import { formatCurrency } from '@/lib/utils'

type Step = 'customer' | 'items' | 'terms'

export default function NewPawnPage() {
  const [currentStep, setCurrentStep] = useState<Step>('customer')
  const [customer, setCustomer] = useState('')
  const [items, setItems] = useState([
    { id: 1, type: 'Chain', gross: 12.4, stone: 0.3, purity: '22K' },
  ])
  const [interestScheme, setInterestScheme] = useState('flat_monthly_2')
  const [tenure, setTenure] = useState(30)
  const [ltv, setLtv] = useState(70)
  const [rate24k, setRate24k] = useState(6650)
  const [nextItemId, setNextItemId] = useState(2)

  const handleAddItem = () => {
    setItems([...items, { id: nextItemId, type: 'Chain', gross: 10, stone: 0, purity: '22K' }])
    setNextItemId(nextItemId + 1)
  }

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleUpdateItem = (id: number, field: string, value: any) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  // Calculate valuations
  const calculations = items.map((item) => {
    const purityValue = purityMap[item.purity as keyof typeof purityMap] || 0.9167
    const net = item.gross - item.stone
    const fineWt = calculateFineWeight(net, purityValue)
    const valuation = calculateValuation(fineWt, rate24k)
    const principal = calculatePrincipal(valuation, ltv)
    return { fineWt, valuation, principal }
  })

  const totalValuation = calculations.reduce((sum, c) => sum + c.valuation, 0)
  const totalPrincipal = calculations.reduce((sum, c) => sum + c.principal, 0)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">New Pawn Entry</h1>

      {/* Step Indicator */}
      <div className="flex gap-2">
        {(['customer', 'items', 'terms'] as Step[]).map((step, index) => (
          <div key={step} className="flex items-center">
            <button
              onClick={() => setCurrentStep(step)}
              className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition ${
                step === currentStep
                  ? 'bg-amber-600 text-white'
                  : step === 'customer' || (step === 'items' && currentStep !== 'customer') || (step === 'terms' && currentStep === 'terms')
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {index + 1}
            </button>
            {index < 2 && <div className="w-8 h-1 bg-slate-200 mx-2"></div>}
          </div>
        ))}
      </div>

      {/* Step 1: Customer */}
      {currentStep === 'customer' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Step 1: Select Customer</h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Search Customer</label>
            <input
              type="text"
              placeholder="Enter customer name or phone..."
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <p className="text-sm text-slate-600 mt-2">
              Suggestion: Meena R • +91 98xxxx2210
            </p>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setCurrentStep('items')}
              className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-medium"
            >
              Next: Add Items
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Items */}
      {currentStep === 'items' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Step 2: Jewellery Details</h2>
          <div className="space-y-4 mb-6">
            {items.map((item, idx) => (
              <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <label className="block text-xs text-slate-600 font-medium mb-1">Type</label>
                    <select
                      value={item.type}
                      onChange={(e) => handleUpdateItem(item.id, 'type', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                    >
                      <option>Chain</option>
                      <option>Ring</option>
                      <option>Bangle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 font-medium mb-1">Gross (g)</label>
                    <input
                      type="number"
                      step="0.001"
                      value={item.gross}
                      onChange={(e) => handleUpdateItem(item.id, 'gross', parseFloat(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 font-medium mb-1">Stone (g)</label>
                    <input
                      type="number"
                      step="0.001"
                      value={item.stone}
                      onChange={(e) => handleUpdateItem(item.id, 'stone', parseFloat(e.target.value))}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 font-medium mb-1">Purity</label>
                    <select
                      value={item.purity}
                      onChange={(e) => handleUpdateItem(item.id, 'purity', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-sm"
                    >
                      <option>24K</option>
                      <option>22K</option>
                      <option>18K</option>
                    </select>
                  </div>
                </div>
                {items.length > 1 && (
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove Item
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleAddItem}
            className="mb-6 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-medium"
          >
            + Add Another Item
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentStep('customer')}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep('terms')}
              className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-medium"
            >
              Next: Terms
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Terms */}
      {currentStep === 'terms' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold mb-6">Step 3: Terms & Issue</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Interest Scheme</label>
              <select
                value={interestScheme}
                onChange={(e) => setInterestScheme(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="flat_monthly_2">Monthly Flat 2.0%</option>
                <option value="daily_accrual">Daily Accrual (0.07%/day)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tenure (days)</label>
              <select
                value={tenure}
                onChange={(e) => setTenure(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value={30}>30 days</option>
                <option value={60}>60 days</option>
                <option value={90}>90 days</option>
              </select>
            </div>
          </div>

          {/* LTV Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">LTV %</label>
            <div className="flex gap-2">
              {[60, 70, 75, 80].map((value) => (
                <button
                  key={value}
                  onClick={() => setLtv(value)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    ltv === value
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-amber-600'
                  }`}
                >
                  {value}%
                </button>
              ))}
            </div>
          </div>

          {/* Valuation Summary */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-slate-900 mb-4">Valuation Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-slate-600">24K Rate</p>
                <p className="font-bold text-slate-900">{formatCurrency(rate24k)}/g</p>
              </div>
              <div>
                <p className="text-slate-600">Total Valuation</p>
                <p className="font-bold text-slate-900">{formatCurrency(totalValuation)}</p>
              </div>
              <div>
                <p className="text-slate-600">LTV {ltv}%</p>
                <p className="font-bold text-amber-600">{formatCurrency(totalPrincipal)}</p>
              </div>
              <div>
                <p className="text-slate-600">Items</p>
                <p className="font-bold text-slate-900">{items.length}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setCurrentStep('items')}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
            >
              Back
            </button>
            <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
              Issue Loan
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
