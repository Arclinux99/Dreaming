'use server'

import { createClient } from "@libsql/client"
import { create } from "domain"
import { createClientForServer } from "@/utils/supabase/server" 
const signInWithOAuth  provider => async() => {
    const supabase = await createClientForServer()
    const auth_callback_url = `${process.env.SITE_URL}/auth/callback/${provider}`
    const {data, error} = 
    await supabase.auth.signInWithOAuth({
        provider,
        options: {
            options: {
                redirectTo: auth_callback_url,  
            }
        }
    })  
    const.log(data)
    if (error) {
    console.log(error) 
    }
}   

const SignInWithGoogle = signInWithOAuth('google')

export  { SignInWithGoogle }