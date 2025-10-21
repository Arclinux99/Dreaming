import React from 'react'
import { SignInWithGoogle } from '@/utils/actions'

const AuthForm = () => {
  return (
    <div>
      <form action={SignInWithGoogle}>
        <button className='btn' formAction={SignInWithGoogle}>Sign In with Google</button>
      </form>
    </div>
  )
}

export default AuthForm
