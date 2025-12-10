'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track visit
    const trackVisit = () => {
      try {
        // Increment total visits
        const totalVisits = parseInt(localStorage.getItem('siteVisits') || '0')
        localStorage.setItem('siteVisits', (totalVisits + 1).toString())

        // Track unique visitors (using a simple session-based approach)
        const sessionId = sessionStorage.getItem('sessionId') || Date.now().toString()
        sessionStorage.setItem('sessionId', sessionId)
        
        const visitorsData = localStorage.getItem('uniqueVisitors')
        const visitors = visitorsData ? JSON.parse(visitorsData) : []
        
        if (!visitors.includes(sessionId)) {
          visitors.push(sessionId)
          localStorage.setItem('uniqueVisitors', JSON.stringify(visitors))
        }

        // Track today's visits
        const todayKey = new Date().toDateString()
        const todayVisits = parseInt(localStorage.getItem(`visits_${todayKey}`) || '0')
        localStorage.setItem(`visits_${todayKey}`, (todayVisits + 1).toString())

        // Track page views
        const pageName = getPageName(pathname)
        const pageKey = `pageView_${pageName}`
        const pageViews = parseInt(localStorage.getItem(pageKey) || '0')
        localStorage.setItem(pageKey, (pageViews + 1).toString())

        // Track recent visits
        const recentData = localStorage.getItem('recentVisits')
        const recentVisits = recentData ? JSON.parse(recentData) : []
        recentVisits.unshift({
          timestamp: Date.now(),
          page: pageName
        })
        // Keep only last 50 visits
        const limitedVisits = recentVisits.slice(0, 50)
        localStorage.setItem('recentVisits', JSON.stringify(limitedVisits))

        // Clean up old daily stats (keep only last 30 days)
        cleanOldDailyStats()
      } catch (error) {
        console.error('Error tracking visit:', error)
      }
    }

    trackVisit()
  }, [pathname])

  const getPageName = (path: string): string => {
    if (path === '/') return 'home'
    if (path.startsWith('/stories')) return 'stories'
    if (path.startsWith('/art')) return 'art'
    if (path.startsWith('/about')) return 'about'
    if (path.startsWith('/contact')) return 'contact'
    return 'other'
  }

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
