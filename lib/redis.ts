import Redis from 'ioredis'

// Check if Redis is configured
const isRedisConfigured = !!process.env.KV_URL

// Initialize Redis client with Upstash credentials (only if configured)
export const redis = isRedisConfigured 
  ? new Redis(process.env.KV_URL!, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: false,
      lazyConnect: true,
      // Suppress connection error logs
      retryStrategy: () => null,
    })
  : null

// Test connection only if configured
if (redis) {
  redis.connect().catch(() => {
    // Silently fail - analytics is optional
  })
  
  // Suppress error event logs
  redis.on('error', () => {
    // Silently ignore Redis errors
  })
} else {
  console.warn('⚠️  Redis not configured - analytics disabled')
}

// Helper functions for analytics
export const analyticsKeys = {
  totalVisits: 'analytics:total_visits',
  uniqueVisitors: 'analytics:unique_visitors',
  dailyVisits: (date: string) => `analytics:daily:${date}`,
  pageViews: (page: string) => `analytics:page:${page}`,
  sessions: 'analytics:sessions',
  recentVisits: 'analytics:recent_visits',
}
