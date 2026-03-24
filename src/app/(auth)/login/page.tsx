'use client'

import { useState, useEffect } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)

  useEffect(() => {
    async function initSupabase() {
      const { createClient } = await import('@/lib/supabase/client')
      setSupabase(createClient())
    }
    initSupabase()
  }, [])

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return

    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Check your email for the login link!')
      setEmail('')
    }
    setLoading(false)
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-2">💰</div>
            <h1 className="text-2xl font-bold text-slate-900">Pawn Module</h1>
            <p className="text-sm text-slate-600">Kumudu Jewellery ERP</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              {loading ? 'Sending...' : 'Send Login Link'}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-4 rounded-lg text-sm ${
              message.includes('Error')
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}

          <p className="text-center text-sm text-slate-600 mt-6">
            <Link href="/" className="text-amber-600 hover:text-amber-700 font-medium">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
