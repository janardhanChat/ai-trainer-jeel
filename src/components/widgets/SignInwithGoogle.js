import GoogleIcon from '@/assets/icons/GoogleIcon'
import React from 'react'

export default function SignInwithGoogle() {
  return (
    <button
    className='border border-solid flex items-center gap-4 w-full justify-center rounded-lg border-borderColor bg-transparent p-[14px] text-lg font-semibold text-black'
    aria-label='Sign in with Google'>
        <GoogleIcon/>
        Sign in with Google
    </button>
  )
}
