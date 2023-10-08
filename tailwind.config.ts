import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
      colors: {
        darkBackground:
          'linear-gradient(90deg, #3c42d0 21px, transparent 1%) center,linear-gradient(#3c42d0 21px, transparent 1%) center,#797edc;',
      },
    },
  },
  plugins: [],
}
export default config
