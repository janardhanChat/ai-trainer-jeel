import React from 'react'

export default function LoginImageTextSection() {
  return (
    <div className='bg-[url("/images/login-banner.png")] h-screen w-full bg-no-repeat bg-center flex items-center justify-center'>
      <div className='bg-whiteOpacitybg border rounded-lg border-solid border-white filter backdrop-blur-xl p-[50px] max-w-[580px]'>
        <h2 className='text-[50px] leading-[62px] text-white font-extrabold'>
        Transforming Customer Support with Smart 
        <span className='block text-black100'>
        AI Innovation.
        </span>
        </h2>
        <p className='mt-4 text-xl text-white font-medium max-w-[280px]'>
        You will never know everything. But you will know more.
        </p>
      </div>
    </div>
  )
}
