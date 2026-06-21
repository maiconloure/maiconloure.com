import { useTheme } from '@/context/theme'

export function Switch() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div
      class="relative w-12 h-7 lg:ml-4 transition-colors bg-slate-300 dark:bg-slate-500 inline-flex rounded-2xl p-1 cursor-pointer"
      onClick={toggleTheme}
    >
      <div
        class="block w-5 h-5 rounded-full bg-zinc-950 shadow-black transition-transform duration-100 will-change-transform"
        classList={{ 'translate-x-5': theme() === 'light', 'translate-x-0': theme() === 'dark' }}
      />
    </div>
  )
}
