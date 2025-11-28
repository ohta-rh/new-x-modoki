import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/features/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'X Clone',
  description: 'A lightweight X clone application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <main className="container max-w-2xl mx-auto py-6">
          {children}
        </main>
      </body>
    </html>
  )
}
