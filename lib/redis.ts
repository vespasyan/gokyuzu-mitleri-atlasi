import { Redis } from '@upstash/redis'

// Validate environment variables
if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  console.error('Redis environment variables missing:', {
    url: !!process.env.KV_REST_API_URL,
    token: !!process.env.KV_REST_API_TOKEN
  })
}

// Initialize Redis client with Vercel KV credentials
export const redis = new Redis({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || '',
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
