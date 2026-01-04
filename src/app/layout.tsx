import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@/components/Analytics'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ayush Malik | AI/ML Engineer',
  description: 'AI/ML Engineer specializing in RAG systems, LLM orchestration, and production machine learning. Building reliable AI infrastructure that actually ships.',
  keywords: ['AI Engineer', 'ML Engineer', 'RAG Systems', 'LLM', 'Machine Learning', 'Python', 'LangChain', 'Production ML'],
  authors: [{ name: 'Ayush Malik' }],
  creator: 'Ayush Malik',
  metadataBase: new URL('https://ayushkm.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ayushkm.com',
    siteName: 'Ayush Malik',
    title: 'Ayush Malik | AI/ML Engineer',
    description: 'Building production AI systems that actually ship. RAG pipelines, LLM orchestration, and real-time inference systems.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ayush Malik - AI/ML Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayush Malik | AI/ML Engineer',
    description: 'Building production AI systems that actually ship. RAG pipelines, LLM orchestration, and real-time inference systems.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ayush Malik',
    jobTitle: 'AI/ML Engineer',
    url: 'https://ayushkm.com',
    sameAs: [
      'https://github.com/ayushm98',
      'https://linkedin.com/in/ayush67',
    ],
    knowsAbout: [
      'Machine Learning',
      'Artificial Intelligence',
      'RAG Systems',
      'LLM Orchestration',
      'Python',
      'FastAPI',
      'LangChain',
      'PyTorch',
    ],
  }

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Plausible Analytics - Privacy-friendly, GDPR compliant */}
        <script
          defer
          data-domain="ayushkm.com"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className="antialiased">
        <Analytics />
        {children}
      </body>
    </html>
  )
}
