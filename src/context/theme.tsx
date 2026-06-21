import { createContext, createEffect, createSignal, useContext, ParentComponent } from 'solid-js'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: () => Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>()

export const ThemeProvider: ParentComponent = (props) => {
  const initial: Theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'

  const [theme, setTheme] = createSignal<Theme>(initial)

  createEffect(() => {
    const t = theme()
    localStorage.setItem('theme', t)
    document.documentElement.classList.toggle('dark', t === 'dark')
  })

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
