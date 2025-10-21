// 🔧 CONTOH LENGKAP DENGAN BERBAGAI REDIRECT RULES
'use client'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function GoogleAuthButtonAdvanced() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // 🎯 FUNGSI UTAMA: Tentukan kemana user akan diarahkan
  const getRedirectRule = (currentPath: string): string => {
    console.log('🧠 Analyzing redirect rule for path:', currentPath)
    
    // RULE 1: Redirect berdasarkan halaman asal
    const pathRules: { [key: string]: string } = {
      '/login': '/',
      '/signup': '/',
      '/pricing': '/subscribe',
      '/checkout': '/payment',
      '/account': '/profile',
      '/settings': '/profile/settings'
    }
    
    // Cek apakah ada rule khusus untuk path ini
    if (pathRules[currentPath]) {
      console.log('✅ Found path rule:', currentPath, '→', pathRules[currentPath])
      return pathRules[currentPath]
    }
    
    // RULE 2: Kalau lagi di halaman produk, balik ke produk
    if (currentPath.includes('/product/')) {
      console.log('✅ Product page detected, redirect back to:', currentPath)
      return currentPath
    }
    
    // RULE 3: Kalau ada saved redirect dari localStorage (untuk protected actions)
    const savedRedirect = localStorage.getItem('redirectAfterLogin')
    if (savedRedirect) {
      localStorage.removeItem('redirectAfterLogin') // Hapus setelah dipakai
      console.log('✅ Found saved redirect:', savedRedirect)
      return savedRedirect
    }
    
    // RULE 4: Kalau di halaman khusus, gunakan referrer
    if (currentPath === '/auth/login' || currentPath === '/auth-required') {
      const referrer = document.referrer
      if (referrer && !referrer.includes('/auth')) {
        console.log('✅ Using referrer:', referrer)
        return new URL(referrer).pathname
      }
    }
    
    // DEFAULT: Ke beranda/home
    console.log('✅ Using default redirect: /')
    return '/'
  }

  // 🚀 HANDLE GOOGLE SIGN IN
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      console.log('🚀 Starting Google OAuth flow...')
      
      // 🔍 ANALISIS: Dari mana user datang?
      const origin = window.location.origin
      const currentPath = window.location.pathname
      const next = getRedirectRule(currentPath)
      
      // 📝 BUAT REDIRECT URL DENGAN PARAMETER
      const redirectUrl = new URL(`${origin}/auth/callback`)
      redirectUrl.searchParams.set('next', next)
      redirectUrl.searchParams.set('source', 'google')
      redirectUrl.searchParams.set('timestamp', Date.now().toString())
      
      // Kalau ada extra params, tambahkan
      const urlParams = new URLSearchParams(window.location.search)
      const campaign = urlParams.get('campaign')
      const ref = urlParams.get('ref')
      if (campaign) redirectUrl.searchParams.set('campaign', campaign)
      if (ref) redirectUrl.searchParams.set('ref', ref)
      
      console.log('📍 Final redirect config:')
      console.log('  - Current path:', currentPath)
      console.log('  - Target path:', next)
      console.log('  - Full redirect URL:', redirectUrl.toString())
      
      // 🎯 MULAI OAUTH
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl.toString(),
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          flowType: 'pkce'
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

  // 🧪 FUNGSI BONUS: Save redirect untuk protected actions
  const saveRedirectForLater = (targetPath: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('redirectAfterLogin', targetPath)
      console.log('💾 Saved redirect for later:', targetPath)
    }
  }

  // FIX: Gunakan useEffect untuk client-side only
  const [currentPath, setCurrentPath] = useState('...')
  
  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

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
      
      {/* 🧪 Testing UI */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>Current path: <code className="bg-gray-100 px-1 rounded">{currentPath}</code></p>
        <p>Debug: Check console for redirect analysis</p>
      </div>
      
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}

// 🎯 CONTOH PENGGUNAAN: Protected Action Button
export function ProtectedActionButton({ 
  action, 
  children, 
  className 
}: { 
  action: string
  children: React.ReactNode
  className?: string 
}) {
  const router = useRouter()
  
  const handleClick = () => {
    // Simpan target action
    localStorage.setItem('redirectAfterLogin', action)
    console.log('💾 Saved protected action:', action)
    
    // Redirect ke login
    router.push('/login')
  }
  
  return (
    <button 
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  )
}