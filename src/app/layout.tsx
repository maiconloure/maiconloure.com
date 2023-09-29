import './globals.css'
import type { Metadata } from 'next'
import { Inter, Rubik, Kanit } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const rubik = Rubik({ subsets: ['latin'], variable: '--font-rubik' })
const kanit = Kanit({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-kanit',
})

export const metadata: Metadata = {
  title: 'Maicon Lourenço',
  description:
    'A software developer passionate about this wonderful planet and all the things that make it works',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${rubik.variable} ${kanit.variable} bg-slate-950 font-sans text-white`}
      >
        {children}
      </body>
    </html>
  )
}
