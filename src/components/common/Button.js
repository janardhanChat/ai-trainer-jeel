import React from 'react'

export default function Button({text , className , handleClick , disabled , type}) {
  return (
      <button className={`py-3 px-[26px] text-white text-lg font-semibold rounded-lg border-none bg-custom-gradient ${className} ${disabled && 'cursor-not-allowed opacity-35'}`} onClick={handleClick} disabled={disabled} type={type}>
        {text}
      </button>
  )
}
