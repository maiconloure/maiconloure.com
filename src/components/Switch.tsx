'use client'

import { useTheme } from 'next-themes'

export function Switch() {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className="relative w-12 h-7 ml-4 transition-colors bg-slate-300 dark:bg-slate-500 inline-flex rounded-2xl p-1 cursor-pointer"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <div className="block w-5 h-5 rounded-full bg-zinc-950 shadow-black transition-transform duration-100 translate-x-5 will-change-transform  dark:translate-x-0 " />
    </div>
  )
}
