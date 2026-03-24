'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { DashboardKPI } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'
import { AlertCircle, TrendingDown, TrendingUp, Wallet } from 'lucide-react'

export default function DashboardPage() {
  const [kpis, setKpis] = useState<DashboardKPI | null>(null)
  const [loading, setLoading] = useState(true)
  const [supabase, setSupabaseClient] = useState<any>(null)

  useEffect(() => {
    async function initSupabase() {
      const { createClient } = await import('@/lib/supabase/client')
      setSupabaseClient(createClient())
    }
    initSupabase()
  }, [])

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // For now, return mock data until Supabase is set up
        const mockKPIs: DashboardKPI = {
          active_loans_count: 8,
          total_exposure: 389280,
          overdue_count: 2,
          today_interest_due: 18200,
          npa_amount: 69260,
          recent_alerts: [
            {
              id: '1',
              type: 'overdue',
              loan_id: 'PT-CHN-01791',
              message: 'PT-CHN-01791 (Suresh V) overdue by 79 days',
              created_at: new Date().toISOString(),
            },
            {
              id: '2',
              type: 'near_maturity',
              loan_id: 'PT-CHN-01866',
              message: 'PT-CHN-01866 (Rafiq A) matures in 2 days',
              created_at: new Date().toISOString(),
            },
          ],
        }
        setKpis(mockKPIs)
      } catch (error) {
        console.error('Failed to fetch dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>
  }

  if (!kpis) {
    return <div className="text-center py-12">Failed to load dashboard</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-600">Welcome back!</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Loans */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active Loans</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{kpis.active_loans_count}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Exposure */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Exposure</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">
                {formatCurrency(kpis.total_exposure)}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Overdue Loans */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Overdue Loans</p>
              <p className="text-3xl font-bold text-rose-600 mt-2">{kpis.overdue_count}</p>
            </div>
            <div className="p-3 bg-rose-50 rounded-lg">
              <TrendingDown className="w-6 h-6 text-rose-600" />
            </div>
          </div>
        </div>

        {/* Today's Interest Due */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Interest Due Today</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">
                {formatCurrency(kpis.today_interest_due)}
              </p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Alerts</h2>
        {kpis.recent_alerts.length > 0 ? (
          <div className="space-y-3">
            {kpis.recent_alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border flex items-start gap-3 ${
                  alert.type === 'overdue'
                    ? 'bg-rose-50 border-rose-200'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <AlertCircle
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    alert.type === 'overdue' ? 'text-rose-600' : 'text-amber-600'
                  }`}
                />
                <div>
                  <p
                    className={`text-sm font-medium ${
                      alert.type === 'overdue' ? 'text-rose-900' : 'text-amber-900'
                    }`}
                  >
                    {alert.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600">No alerts at this time.</p>
        )}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600">NPA Amount</p>
            <p className="text-2xl font-bold text-slate-900">
              {formatCurrency(kpis.npa_amount)}
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600">Avg LTV</p>
            <p className="text-2xl font-bold text-slate-900">70%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
