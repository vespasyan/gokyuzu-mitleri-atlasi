import Redis from 'ioredis'

// Validate environment variables
if (!process.env.KV_URL) {
  console.error('Redis KV_URL environment variable missing')
}

// Initialize Redis client with Upstash credentials
export const redis = new Redis(process.env.KV_URL || '', {
  maxRetriesPerRequest: 3,
  enableReadyCheck: false,
  lazyConnect: true,
})

// Test connection
redis.connect().catch((err) => {
  console.error('Redis connection error:', err)
})

// Helper functions for analytics
export const analyticsKeys = {
  totalVisits: 'analytics:total_visits',
  uniqueVisitors: 'analytics:unique_visitors',
  dailyVisits: (date: string) => `analytics:daily:${date}`,
  pageViews: (page: string) => `analytics:page:${page}`,
  sessions: 'analytics:sessions',
  recentVisits: 'analytics:recent_visits',
}
