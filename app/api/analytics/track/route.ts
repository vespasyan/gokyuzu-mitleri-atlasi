import { NextRequest, NextResponse } from 'next/server'
import { redis, analyticsKeys } from '@/lib/redis'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { visitorId, sessionId, page, isNewSession, isNewVisitor } = body

    if (!visitorId || !sessionId || !page) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const today = new Date().toISOString().split('T')[0]
    const timestamp = Date.now()

    // Use pipeline for atomic operations
    const pipeline = redis.pipeline()

    // Increment total visits
    pipeline.incr(analyticsKeys.totalVisits)

    // Track unique visitor
    if (isNewVisitor) {
      pipeline.sadd(analyticsKeys.uniqueVisitors, visitorId)
    }

    // Increment daily visits
    pipeline.incr(analyticsKeys.dailyVisits(today))

    // Increment page views
    pipeline.incr(analyticsKeys.pageViews(page))

    // Track session for bounce rate calculation
    if (isNewSession) {
      pipeline.hset(`session:${sessionId}`, {
        visitorId,
        startTime: timestamp,
        pages: JSON.stringify([page]),
      })
      // Expire session data after 30 days
      pipeline.expire(`session:${sessionId}`, 30 * 24 * 60 * 60)
    } else {
      // Update existing session
      const sessionData = await redis.hgetall(`session:${sessionId}`)
      if (sessionData) {
        const pages = JSON.parse((sessionData.pages as string) || '[]')
        if (!pages.includes(page)) {
          pages.push(page)
          pipeline.hset(`session:${sessionId}`, {
            pages: JSON.stringify(pages),
          })
        }
      }
    }

    // Add to recent visits (keep last 100)
    pipeline.lpush(
      analyticsKeys.recentVisits,
      JSON.stringify({
        timestamp,
        page,
        sessionId,
      })
    )
    pipeline.ltrim(analyticsKeys.recentVisits, 0, 99)

    // Execute all operations
    await pipeline.exec()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
