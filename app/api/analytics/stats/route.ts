import { NextResponse } from 'next/server'
import { redis, analyticsKeys } from '@/lib/redis'

export async function GET() {
  try {
    console.log('Analytics stats API called')
    console.log('Redis URL:', process.env.KV_REST_API_URL ? 'Configured' : 'Missing')
    console.log('Redis Token:', process.env.KV_REST_API_TOKEN ? 'Configured' : 'Missing')
    
    const today = new Date().toISOString().split('T')[0]

    // Get all stats in parallel
    const [
      totalVisits,
      uniqueVisitorsCount,
      todayVisits,
      homeViews,
      storiesViews,
      artViews,
      aboutViews,
      contactViews,
      recentVisitsRaw,
      sessionKeys,
    ] = await Promise.all([
      redis.get(analyticsKeys.totalVisits),
      redis.scard(analyticsKeys.uniqueVisitors),
      redis.get(analyticsKeys.dailyVisits(today)),
      redis.get(analyticsKeys.pageViews('home')),
      redis.get(analyticsKeys.pageViews('stories')),
      redis.get(analyticsKeys.pageViews('art')),
      redis.get(analyticsKeys.pageViews('about')),
      redis.get(analyticsKeys.pageViews('contact')),
      redis.lrange(analyticsKeys.recentVisits, 0, 49),
      redis.keys('session:*'),
    ])
    
    console.log('Stats fetched:', {
      totalVisits,
      uniqueVisitorsCount,
      todayVisits,
      sessionCount: sessionKeys.length
    })

    // Get daily stats for last 7 days
    const dailyStats = await Promise.all(
      Array.from({ length: 7 }, async (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (6 - i))
        const dateKey = date.toISOString().split('T')[0]
        const visits = await redis.get(analyticsKeys.dailyVisits(dateKey))
        return {
          date: date.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: 'short',
          }),
          visits: Number(visits) || 0,
        }
      })
    )

    // Calculate bounce rate from sessions
    let bouncedSessions = 0
    let totalSessions = 0

    if (sessionKeys.length > 0) {
      const sessions = await Promise.all(
        sessionKeys.slice(0, 100).map((key) => redis.hgetall(key))
      )

      sessions.forEach((session) => {
        if (session && session.pages) {
          totalSessions++
          const pages = JSON.parse(session.pages as string)
          if (pages.length === 1) {
            bouncedSessions++
          }
        }
      })
    }

    const bounceRate =
      totalSessions > 0 ? (bouncedSessions / totalSessions) * 100 : 0

    // Parse recent visits
    const recentVisits = recentVisitsRaw.map((visit) => {
      if (typeof visit === 'string') {
        return JSON.parse(visit)
      }
      return visit
    })

    return NextResponse.json({
      totalVisits: Number(totalVisits) || 0,
      uniqueVisitors: Number(uniqueVisitorsCount) || 0,
      todayVisits: Number(todayVisits) || 0,
      bounceRate: Math.round(bounceRate * 10) / 10,
      pageViews: {
        home: Number(homeViews) || 0,
        stories: Number(storiesViews) || 0,
        art: Number(artViews) || 0,
        about: Number(aboutViews) || 0,
        contact: Number(contactViews) || 0,
      },
      dailyStats,
      recentVisits: recentVisits.slice(0, 20),
    })
  } catch (error) {
    console.error('Analytics stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Enable Edge Runtime for faster response
export const runtime = 'edge'
