/* eslint-disable camelcase */
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Rubik, Kanit, Work_Sans } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const work = Work_Sans({ subsets: ['latin'], variable: '--font-work' })
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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${inter.variable} ${rubik.variable} ${kanit.variable} ${work.variable}  font-work`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
