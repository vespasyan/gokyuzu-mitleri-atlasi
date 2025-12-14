import { NextResponse } from 'next/server'
import { redis, analyticsKeys } from '@/lib/redis'

export async function GET() {
  try {
    console.log('Analytics stats API called')
    console.log('Redis URL:', process.env.KV_URL ? 'Configured' : 'Missing')
    
    // Check if Redis is properly configured
    if (!process.env.KV_URL || !redis) {
      console.warn('⚠️  Redis not configured - returning empty stats')
      // Return empty stats instead of error - let frontend use localStorage
      return NextResponse.json({
        totalVisits: 0,
        uniqueVisitors: 0,
        todayVisits: 0,
        bounceRate: 0,
        pageViews: {
          home: 0,
          stories: 0,
          art: 0,
          about: 0,
          contact: 0
        },
        recentVisits: [],
        dailyStats: Array.from({ length: 7 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - (6 - i))
          return {
            date: date.toLocaleDateString('tr-TR', {
              day: '2-digit',
              month: 'short',
            }),
            visits: 0,
          }
        })
      })
    }
    
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
      redis.get(analyticsKeys.totalVisits).catch(e => { console.error('Error getting totalVisits:', e); return null; }),
      redis.scard(analyticsKeys.uniqueVisitors).catch(e => { console.error('Error getting uniqueVisitors:', e); return 0; }),
      redis.get(analyticsKeys.dailyVisits(today)).catch(e => { console.error('Error getting dailyVisits:', e); return null; }),
      redis.get(analyticsKeys.pageViews('home')).catch(e => null),
      redis.get(analyticsKeys.pageViews('stories')).catch(e => null),
      redis.get(analyticsKeys.pageViews('art')).catch(e => null),
      redis.get(analyticsKeys.pageViews('about')).catch(e => null),
      redis.get(analyticsKeys.pageViews('contact')).catch(e => null),
      redis.lrange(analyticsKeys.recentVisits, 0, 49).catch(e => { console.error('Error getting recentVisits:', e); return []; }),
      redis.keys('session:*').catch(e => { console.error('Error getting sessions:', e); return []; }),
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
        const visits = redis ? await redis.get(analyticsKeys.dailyVisits(dateKey)) : null
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

    if (sessionKeys.length > 0 && redis) {
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
  } catch (error: any) {
    console.error('Analytics stats error:', error)
    console.error('Error details:', {
      message: error?.message,
      stack: error?.stack,
      name: error?.name
    })
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
}
