export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Auth Code Error</h1>
        <p className="text-gray-600">We couldn't complete the sign-in process because no authorization code was found in the callback.</p>
        <ul className="text-sm text-left list-disc list-inside">
          <li>Ensure your Supabase redirect URL includes /auth/callback</li>
          <li>Try again or return to the login page</li>
        </ul>
        <a className="text-blue-600 underline" href="/login">Back to login</a>
      </div>
    </div>
  )
}
