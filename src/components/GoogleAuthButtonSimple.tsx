// 🎯 VERSI SEDERHANA UNTUK TESTING
'use client'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function GoogleAuthButtonSimple() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  // Buat client sederhana
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      console.log('🚀 Starting Google OAuth flow...')
      
      const origin = window.location.origin
      const currentPath = window.location.pathname
      
      // Simple redirect rule
      let next = '/'
      if (currentPath === '/signup') next = '/'
      if (currentPath === '/login') next = '/'
      
      console.log('📍 Redirect config:')
      console.log('  - Current path:', currentPath)
      console.log('  - Target path:', next)
      
      const redirectUrl = `${origin}/auth/callback?next=${next}`
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          flowType: 'pkce',
          queryParams: { prompt: 'select_account' }
        }
      })
      
      if (error) {
        console.error('❌ OAuth error:', error)
        setError(error.message)
        return
      }
      
      console.log('✅ OAuth initiated, redirecting to Google...')
      
    } catch (error) {
      console.error('💥 Unexpected error:', error)
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="flex items-center justify-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 w-full"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        )}
        <span className="text-gray-700 font-medium">
          {isLoading ? 'Redirecting to Google...' : 'Continue with Google'}
        </span>
      </button>
      
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}