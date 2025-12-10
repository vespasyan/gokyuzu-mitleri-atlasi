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

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track visit
    const trackVisit = () => {
      try {
        // Get or create session ID (resets when browser closes)
        let sessionId = sessionStorage.getItem('sessionId')
        const isNewSession = !sessionId
        
        if (!sessionId) {
          sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
          sessionStorage.setItem('sessionId', sessionId)
          sessionStorage.setItem('sessionStartTime', Date.now().toString())
          sessionStorage.setItem('sessionPageCount', '0')
        }

        // Track page count in session
        const pageCount = parseInt(sessionStorage.getItem('sessionPageCount') || '0') + 1
        sessionStorage.setItem('sessionPageCount', pageCount.toString())

        // Increment total visits
        const totalVisits = parseInt(localStorage.getItem('siteVisits') || '0')
        localStorage.setItem('siteVisits', (totalVisits + 1).toString())

        // Track unique visitors using persistent visitor ID
        const visitorId = getVisitorId()
        const visitorsData = localStorage.getItem('uniqueVisitors')
        const visitors = visitorsData ? JSON.parse(visitorsData) : []
        
        if (!visitors.includes(visitorId)) {
          visitors.push(visitorId)
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

        // Track session info for bounce rate calculation
        if (isNewSession) {
          // Track new session
          const sessionsData = localStorage.getItem('sessions')
          const sessions = sessionsData ? JSON.parse(sessionsData) : []
          sessions.push({
            id: sessionId,
            startTime: Date.now(),
            pages: [pageName],
            visitorId
          })
          // Keep only last 100 sessions
          const limitedSessions = sessions.slice(-100)
          localStorage.setItem('sessions', JSON.stringify(limitedSessions))
        } else {
          // Update existing session
          const sessionsData = localStorage.getItem('sessions')
          const sessions = sessionsData ? JSON.parse(sessionsData) : []
          const currentSession = sessions.find((s: any) => s.id === sessionId)
          if (currentSession && !currentSession.pages.includes(pageName)) {
            currentSession.pages.push(pageName)
            localStorage.setItem('sessions', JSON.stringify(sessions))
          }
        }

        // Track recent visits
        const recentData = localStorage.getItem('recentVisits')
        const recentVisits = recentData ? JSON.parse(recentData) : []
        recentVisits.unshift({
          timestamp: Date.now(),
          page: pageName,
          sessionId
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
