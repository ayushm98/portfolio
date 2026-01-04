'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined') {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')

      // Simple pageview tracking
      trackPageView(url)
    }
  }, [pathname, searchParams])

  return null
}

function trackPageView(url: string) {
  // Option 1: Plausible Analytics (privacy-friendly, GDPR compliant)
  if (window.plausible) {
    window.plausible('pageview', { props: { path: url } })
  }

  // Option 2: Simple Analytics (privacy-friendly alternative)
  if (window.sa_event) {
    window.sa_event('pageview')
  }

  // Option 3: Custom tracking endpoint (if you build your own)
  // fetch('/api/analytics/pageview', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ url, timestamp: Date.now() })
  // })

  // Log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Pageview:', url)
  }
}

// Type declarations for analytics scripts
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void
    sa_event?: (event: string) => void
  }
}
