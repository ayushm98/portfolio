import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { Analytics } from '@/components/Analytics'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AyushKM — AI content automation for lean teams',
  description: 'AyushKM turns one brief into a full content run — research, drafts, and channel-ready variants — with a human approval step before anything ships.',
  keywords: ['AI content automation', 'content generation', 'AI writing platform', 'content operations', 'LLM', 'RAG'],
  authors: [{ name: 'Ayush Malik' }],
  creator: 'Ayush Malik',
  metadataBase: new URL('https://ayushkm.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ayushkm.com',
    siteName: 'AyushKM',
    title: 'AyushKM — AI content automation for lean teams',
    description: 'One brief in, a full content run out. Researched, cited, on-voice drafts with a human approval gate.',
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
    title: 'AyushKM — AI content automation for lean teams',
    description: 'One brief in, a full content run out. Researched, cited, on-voice drafts with a human approval gate.',
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
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AyushKM',
    url: 'https://ayushkm.com',
    email: 'contact@ayushkm.com',
    description:
      'AI content automation platform: one brief produces researched, cited, on-voice drafts and channel variants, with a human approval step before publishing.',
    founder: {
      '@type': 'Person',
      name: 'Ayush Malik',
      jobTitle: 'Founder',
      sameAs: ['https://github.com/ayushm98', 'https://linkedin.com/in/ayush67'],
    },
    sameAs: ['https://github.com/ayushm98', 'https://linkedin.com/in/ayush67'],
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
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
