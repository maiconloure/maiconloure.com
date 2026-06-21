import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app.config.ts',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-rubik)',
        inter: 'var(--font-inter)',
        work: 'var(--font-work)',
        space: 'var(--font-space)',
        alt: 'var(--font-kanit)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
