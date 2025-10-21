// 📚 CONTOH HALAMAN LOGIN DENGAN REDIRECT RULES
import GoogleAuthButtonAdvanced, { ProtectedActionButton } from '@/components/GoogleAuthButtonAdvanced'
import Link from 'next/link'

export default function LoginPageDemo() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
          <div className="space-y-6">
            {/* 🔧 Versi Advanced dengan redirect rules */}
            <GoogleAuthButtonAdvanced />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            {/* 🎯 CONTOH PROTECTED ACTIONS */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Protected Actions:</h3>
              
              <ProtectedActionButton 
                action="/checkout"
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                🛒 Continue to Checkout (Login First)
              </ProtectedActionButton>
              
              <ProtectedActionButton 
                action="/premium-content"
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                ⭐ Access Premium Content
              </ProtectedActionButton>
              
              <ProtectedActionButton 
                action="/profile/settings"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                ⚙️ Manage Settings
              </ProtectedActionButton>
            </div>
            
            {/* 📊 Testing Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">🧪 Testing Redirect Rules</h3>
              <div className="text-xs text-blue-700 space-y-1">
                <p>• Try accessing from different pages</p>
                <p>• Check console for redirect analysis</p>
                <p>• Test protected action buttons</p>
                <p>• Monitor Network tab for redirects</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

// 📝 CARA TESTING:
// 1. Buka halaman ini: http://localhost:3000/login-demo
// 2. Buka console (F12 → Console)
// 3. Coba klik "Continue with Google"
// 4. Lihat console log untuk redirect analysis
// 5. Coba dari halaman berbeda: /checkout, /pricing, dll
// 6. Test protected action buttons
// 7. Check Network tab untuk melihat redirect flow