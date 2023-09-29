'use client'

import { useTheme } from 'next-themes'

export function Switch() {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className="flex-initial w-12 h-7   bg-slate-300 dark:bg-slate-500 inline-flex  rounded-2xl p-1 cursor-pointer"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <div className="w-5 h-5 rounded-full bg-zinc-950 transition-transform  translate-x-5 dark:translate-x-0" />
    </div>
  )
}
