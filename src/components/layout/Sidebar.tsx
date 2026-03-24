'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import {
  BarChart3,
  DollarSign,
  Wallet,
  Users,
  Package,
  Clock,
  TrendingUp,
  Zap,
  Settings,
  LogOut,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Active Loans', href: '/dashboard/loans', icon: DollarSign },
  { name: 'Vault', href: '/dashboard/vault', icon: Package },
  { name: "Today's Collections", href: '/dashboard/collections', icon: Wallet },
  { name: 'Customer Ledger', href: '/dashboard/customers', icon: Users },
  { name: 'New Pawn Entry', href: '/dashboard/new', icon: Zap },
  { name: 'Payments', href: '/dashboard/payments', icon: TrendingUp },
  { name: 'Auctions / Foreclosure', href: '/dashboard/auctions', icon: Clock },
]

const settings = [
  { name: 'Pawn Masters', href: '/dashboard/masters', icon: Settings },
  { name: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [supabase, setSupabase] = useState<any>(null)

  useEffect(() => {
    async function initSupabase() {
      const { createClient } = await import('@/lib/supabase/client')
      setSupabase(createClient())
    }
    initSupabase()
  }, [])

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut()
      router.push('/')
    }
  }

  return (
    <div className="w-64 h-screen bg-slate-900 text-white overflow-y-auto sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <div>
            <h1 className="font-bold">Pawn Module</h1>
            <p className="text-xs text-slate-400">Kumudu ERP</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-2 mb-4">
          Main
        </h3>
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm',
                isActive
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}

        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-2 mb-4 mt-6">
          Settings
        </h3>
        {settings.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm',
                isActive
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm text-slate-300 hover:bg-slate-800"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  )
}
