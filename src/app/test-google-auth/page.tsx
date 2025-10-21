import GoogleAuthButtonSimple from '@/components/GoogleAuthButtonSimple'

export default function TestGoogleAuth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Test Google Authentication
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Click the button below to test Google OAuth flow
          </p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <GoogleAuthButtonSimple />
          </div>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Testing Info</span>
              </div>
            </div>
            
            <div className="mt-6 text-xs text-gray-500 space-y-1">
              <p>✅ Check browser console for debug logs</p>
              <p>✅ Check network tab for OAuth requests</p>
              <p>✅ Test from different pages (/login, /signup)</p>
              <p>✅ Monitor redirect behavior</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}