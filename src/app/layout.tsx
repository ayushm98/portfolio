import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ayush Kumar Malik | AI/ML Engineer',
  description: 'AI/ML Engineer specializing in RAG systems, LLMs, and production machine learning. MS in Computer Science from Indiana University.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.Node
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}
