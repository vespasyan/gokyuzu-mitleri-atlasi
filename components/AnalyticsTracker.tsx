'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Generate a persistent unique visitor ID
const getVisitorId = (): string => {
  let visitorId = localStorage.getItem('visitorId')
  if (!visitorId) {
    // Create unique ID using timestamp + random string + browser fingerprint
    const fingerprint = `${navigator.userAgent}-${screen.width}x${screen.height}-${navigator.language}`
    visitorId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${btoa(fingerprint).substr(0, 10)}`
    localStorage.setItem('visitorId', visitorId)
  }
  return visitorId
}

const getPageName = (path: string): string => {
  if (path === '/') return 'home'
  if (path.startsWith('/stories')) return 'stories'
  if (path.startsWith('/art')) return 'art'
  if (path.startsWith('/about')) return 'about'
  if (path.startsWith('/contact')) return 'contact'
  return 'other'
}

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track visit via API
    const trackVisit = async () => {
      try {
        // Get or create session ID (resets when browser closes)
        let sessionId = sessionStorage.getItem('sessionId')
        const isNewSession = !sessionId
        
        if (!sessionId) {
          sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
          sessionStorage.setItem('sessionId', sessionId)
        }

        // Get visitor ID
        const visitorId = getVisitorId()

        // Get page name
        const pageName = getPageName(pathname)

        // Send tracking data to API (backend will check if visitor is truly new)
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            visitorId,
            sessionId,
            page: pageName,
            isNewSession,
          }),
        })

        // Also keep localStorage backup for offline functionality
        const totalVisits = parseInt(localStorage.getItem('siteVisits') || '0')
        localStorage.setItem('siteVisits', (totalVisits + 1).toString())

        // Track today's visits
        const todayKey = new Date().toDateString()
        const todayVisits = parseInt(localStorage.getItem(`visits_${todayKey}`) || '0')
        localStorage.setItem(`visits_${todayKey}`, (todayVisits + 1).toString())

        // Track page views locally
        const pageKey = `pageView_${pageName}`
        const pageViews = parseInt(localStorage.getItem(pageKey) || '0')
        localStorage.setItem(pageKey, (pageViews + 1).toString())

        // Clean up old daily stats (keep only last 30 days)
        cleanOldDailyStats()
      } catch (error) {
        console.error('Error tracking visit:', error)
      }
    }

    trackVisit()
  }, [pathname])

  const cleanOldDailyStats = () => {
    try {
      const now = new Date()
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith('visits_')) {
          const dateStr = key.replace('visits_', '')
          const date = new Date(dateStr)
          if (date < thirtyDaysAgo) {
            localStorage.removeItem(key)
          }
        }
      }
    } catch (error) {
      console.error('Error cleaning old stats:', error)
    }
  }

  return null
}
