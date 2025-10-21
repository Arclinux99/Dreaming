'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const signInWithOAuth = (provider) => async () => {
  const supabase = await createClient()
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000'
  const auth_callback_url = `${siteUrl}/auth/callback?next=/dashboard`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
      queryParams: { prompt: 'select_account' },
      flowType: 'pkce',
    },
  })

  if (error) {
    console.error(error)
  }
  if (data?.url) {
    redirect(data.url)
  }
}

const SignInWithGoogle = signInWithOAuth('google')

export { SignInWithGoogle }