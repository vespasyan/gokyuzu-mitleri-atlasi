'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface DailyStats {
  date: string
  visits: number
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
    todayVisits: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    pageViews: {
      home: 0,
      stories: 0,
      art: 0,
      about: 0,
      contact: 0
    },
    recentVisits: [] as { timestamp: number; page: string }[],
    dailyStats: [] as DailyStats[]
  })
  
  const [animatedStats, setAnimatedStats] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
    todayVisits: 0,
    bounceRate: 0
  })

  // Load stats from API (with localStorage fallback)
  useEffect(() => {
    const loadStats = async () => {
      try {
        // Try to fetch from API
        console.log('Fetching analytics from API...')
        const response = await fetch('/api/analytics/stats', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
        
        console.log('API Response status:', response.status)
        
        if (response.ok) {
          const data = await response.json()
          console.log('Analytics data from API:', data)
          setStats({
            totalVisits: data.totalVisits,
            uniqueVisitors: data.uniqueVisitors,
            todayVisits: data.todayVisits,
            bounceRate: data.bounceRate,
            avgSessionDuration: 0,
            pageViews: data.pageViews,
            recentVisits: data.recentVisits,
            dailyStats: data.dailyStats
          })
          return
        } else {
          const errorText = await response.text()
          console.error('API Error:', response.status, errorText)
        }
      } catch (error) {
        console.error('Failed to fetch from API:', error)
      }

      // Fallback to localStorage if API fails
      console.log('Using localStorage fallback')
      try {
        // Total visits
        const totalVisits = parseInt(localStorage.getItem('siteVisits') || '0')
        
        // Unique visitors (stored as array of visitor IDs)
        const visitorsData = localStorage.getItem('uniqueVisitors')
        const uniqueVisitors = visitorsData ? JSON.parse(visitorsData).length : 0
        
        // Calculate bounce rate from sessions
        const sessionsData = localStorage.getItem('sessions')
        const sessions = sessionsData ? JSON.parse(sessionsData) : []
        const bouncedSessions = sessions.filter((s: any) => s.pages && s.pages.length === 1).length
        const bounceRate = sessions.length > 0 ? (bouncedSessions / sessions.length) * 100 : 0
        
        // Calculate average session duration
        const now = Date.now()
        const avgSessionDuration = sessions.length > 0 
          ? sessions.reduce((sum: number, s: any) => {
              const duration = s.endTime ? s.endTime - s.startTime : now - s.startTime
              return sum + duration
            }, 0) / sessions.length / 1000 // Convert to seconds
          : 0
        
        // Today's visits
        const todayKey = new Date().toDateString()
        const todayVisits = parseInt(localStorage.getItem(`visits_${todayKey}`) || '0')
        
        // Page views
        const pageViews = {
          home: parseInt(localStorage.getItem('pageView_home') || '0'),
          stories: parseInt(localStorage.getItem('pageView_stories') || '0'),
          art: parseInt(localStorage.getItem('pageView_art') || '0'),
          about: parseInt(localStorage.getItem('pageView_about') || '0'),
          contact: parseInt(localStorage.getItem('pageView_contact') || '0')
        }
        
        // Recent visits
        const recentData = localStorage.getItem('recentVisits')
        const recentVisits = recentData ? JSON.parse(recentData) : []
        
        // Get daily stats for last 7 days
        const dailyStats: DailyStats[] = []
        const today = new Date()
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today)
          date.setDate(date.getDate() - i)
          const dateKey = date.toDateString()
          const visits = parseInt(localStorage.getItem(`visits_${dateKey}`) || '0')
          dailyStats.push({
            date: date.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' }),
            visits
          })
        }
        
        console.log('📊 Daily Stats:', dailyStats)
        
        setStats({
          totalVisits,
          uniqueVisitors,
          todayVisits,
          bounceRate,
          avgSessionDuration,
          pageViews,
          recentVisits,
          dailyStats
        })
      } catch (error) {
        console.error('Error loading stats:', error)
      }
    }
    
    loadStats()
    
    // Update every 5 seconds
    const interval = setInterval(loadStats, 5000)
    return () => clearInterval(interval)
  }, [])
  
  // Animate numbers
  useEffect(() => {
    const animateNumber = (target: number, setter: (val: number) => void, isDecimal = false) => {
      let current = 0
      const increment = isDecimal ? target / 30 : Math.ceil(target / 30)
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setter(isDecimal ? Math.round(current * 10) / 10 : Math.round(current))
      }, 30)
    }
    
    animateNumber(stats.totalVisits, (val) => 
      setAnimatedStats(prev => ({ ...prev, totalVisits: val }))
    )
    animateNumber(stats.uniqueVisitors, (val) => 
      setAnimatedStats(prev => ({ ...prev, uniqueVisitors: val }))
    )
    animateNumber(stats.todayVisits, (val) => 
      setAnimatedStats(prev => ({ ...prev, todayVisits: val }))
    )
    animateNumber(stats.bounceRate, (val) => 
      setAnimatedStats(prev => ({ ...prev, bounceRate: val }))
    , true)
  }, [stats.totalVisits, stats.uniqueVisitors, stats.todayVisits, stats.bounceRate])
  
  // Calculate page view percentages
  const totalPageViews = Object.values(stats.pageViews).reduce((a, b) => a + b, 0)
  const pageViewPercentages = Object.entries(stats.pageViews).map(([page, views]) => ({
    page,
    views,
    percentage: totalPageViews > 0 ? (views / totalPageViews) * 100 : 0
  })).sort((a, b) => b.views - a.views)
  
  // Calculate max visits for chart scaling
  const maxDailyVisits = Math.max(...stats.dailyStats.map(d => d.visits), 1)
  
  const pageNames: Record<string, string> = {
    home: 'Ana Sayfa',
    stories: 'Hikayeler',
    art: 'Sanat Galerisi',
    about: 'Hakkında',
    contact: 'İletişim'
  }

  return (
    <div className="min-h-screen bg-dark-500">
      {/* Header */}
      <div className="bg-cosmic-gradient border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                Site Analitikleri
              </h1>
              <p className="text-gray-300">
                Ziyaretçi istatistikleri ve sayfa görüntülemeleri
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              ← Ana Sayfa
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Visits */}
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/30 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">
                  {animatedStats.totalVisits.toLocaleString()}
                </div>
                <div className="text-blue-300 text-sm mt-1">Toplam Ziyaret</div>
              </div>
            </div>
            <div className="h-2 bg-blue-900/30 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 animate-pulse"></div>
            </div>
          </div>

          {/* Unique Visitors */}
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/30 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🌟</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">
                  {animatedStats.uniqueVisitors.toLocaleString()}
                </div>
                <div className="text-purple-300 text-sm mt-1">Benzersiz Ziyaretçi</div>
              </div>
            </div>
            <div className="h-2 bg-purple-900/30 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 animate-pulse"></div>
            </div>
          </div>

          {/* Today's Visits */}
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-lg rounded-xl p-6 border border-green-500/30 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/30 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">
                  {animatedStats.todayVisits.toLocaleString()}
                </div>
                <div className="text-green-300 text-sm mt-1">Bugünkü Ziyaret</div>
              </div>
            </div>
            <div className="h-2 bg-green-900/30 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-green-400 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Daily Visits Timeline Chart */}
        <div className="bg-dark-400/50 backdrop-blur-lg rounded-xl p-8 border border-white/10 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="text-2xl mr-3">📅</span>
            Son 7 Günlük Ziyaret Trendi
          </h2>
          
          <div className="space-y-4">
            {/* Chart */}
            <div className="relative h-64 flex items-end justify-between gap-2 px-4">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 -translate-x-8">
                <span>{maxDailyVisits}</span>
                <span>{Math.floor(maxDailyVisits * 0.75)}</span>
                <span>{Math.floor(maxDailyVisits * 0.5)}</span>
                <span>{Math.floor(maxDailyVisits * 0.25)}</span>
                <span>0</span>
              </div>
              
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-full border-t border-gray-700/30"></div>
                ))}
              </div>
              
              {/* Bars */}
              {stats.dailyStats.map((day, index) => {
                const height = maxDailyVisits > 0 ? (day.visits / maxDailyVisits) * 100 : 0
                const minHeight = day.visits > 0 ? 5 : 0 // Minimum görünür yükseklik
                const finalHeight = Math.max(height, minHeight)
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center justify-end group relative h-full px-1">
                    {finalHeight > 0 && (
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-400 hover:to-blue-300 relative"
                        style={{ height: `${finalHeight}%`, minHeight: '8px' }}
                      >
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-dark-300 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-10">
                          {day.visits} ziyaret
                        </div>
                      </div>
                    )}
                    <span className="text-xs text-gray-400 mt-2">{day.date}</span>
                  </div>
                )
              })}
            </div>
            
            {/* Stats summary */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {stats.dailyStats.reduce((sum, day) => sum + day.visits, 0)}
                </div>
                <div className="text-sm text-gray-400 mt-1">Toplam (7 gün)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {Math.round(stats.dailyStats.reduce((sum, day) => sum + day.visits, 0) / 7)}
                </div>
                <div className="text-sm text-gray-400 mt-1">Günlük Ortalama</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {maxDailyVisits}
                </div>
                <div className="text-sm text-gray-400 mt-1">En Yüksek (gün)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Views Chart */}
        <div className="bg-dark-400/50 backdrop-blur-lg rounded-xl p-8 border border-white/10 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="text-2xl mr-3">📈</span>
            Sayfa Görüntülemeleri
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Donut Chart */}
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64">
                {totalPageViews > 0 ? (
                  <>
                    {/* SVG Donut Chart */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {(() => {
                        let currentAngle = 0
                        const colors = ['#3b82f6', '#5931f7', '#f52222', '#10b981', '#eab308']
                        return pageViewPercentages.map((item, index) => {
                          const percentage = item.percentage
                          const angle = (percentage / 100) * 360
                          const startAngle = currentAngle
                          currentAngle += angle
                          
                          const radius = 35
                          const circumference = 2 * Math.PI * radius
                          const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`
                          const rotation = (startAngle / 360) * circumference
                          
                          return (
                            <circle
                              key={item.page}
                              cx="50"
                              cy="50"
                              r={radius}
                              fill="none"
                              stroke={colors[index % colors.length]}
                              strokeWidth="20"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={-rotation}
                              className="transition-all duration-500 hover:opacity-75"
                            />
                          )
                        })
                      })()}
                      <circle cx="50" cy="50" r="25" fill="#1e293b" />
                    </svg>
                    
                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-3xl font-bold text-white">{totalPageViews}</div>
                      <div className="text-xs text-gray-400">Toplam</div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">📊</div>
                      <div className="text-gray-400">Veri yok</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Legend and bars */}
            <div className="space-y-4">
              {pageViewPercentages.map((item, index) => {
                const colors = [
                  { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500' },
                  { bg: 'bg-blue-800', text: 'text-blue-400', border: 'border-blue-500' },
                  { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500' },
                  { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500' },
                  { bg: 'bg-yellow-500', text: 'text-yellow-400', border: 'border-yellow-500' }
                ]
                const color = colors[index % colors.length]
                
                return (
                  <div key={item.page} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${color.bg}`}></div>
                        <span className="text-white font-medium">{pageNames[item.page]}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-sm">{item.views.toLocaleString()}</span>
                        <span className={`${color.text} font-bold min-w-[50px] text-right`}>
                          {item.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-dark-300/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${color.bg} transition-all duration-1000 ease-out`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Additional Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Avg Session */}
          <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 backdrop-blur-lg rounded-xl p-6 border border-indigo-500/30">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">⏱️</span>
              <h3 className="text-lg font-semibold text-white">Ortalama Oturum</h3>
            </div>
            <div className="text-3xl font-bold text-indigo-400 mb-2">
              {totalPageViews > 0 ? (totalPageViews / Math.max(stats.uniqueVisitors, 1)).toFixed(1) : '0'}
            </div>
            <div className="text-sm text-gray-400">sayfa/oturum</div>
          </div>
          
          {/* Bounce Rate */}
          <div className="bg-gradient-to-br from-rose-500/20 to-rose-600/10 backdrop-blur-lg rounded-xl p-6 border border-rose-500/30">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🎯</span>
              <h3 className="text-lg font-semibold text-white">Hemen Çıkma</h3>
            </div>
            <div className="text-3xl font-bold text-rose-400 mb-2">
              {animatedStats.bounceRate.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-400">tek sayfa ziyaretleri</div>
          </div>
          
          {/* Top Page */}
          <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 backdrop-blur-lg rounded-xl p-6 border border-amber-500/30">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🏆</span>
              <h3 className="text-lg font-semibold text-white">En Popüler</h3>
            </div>
            <div className="text-2xl font-bold text-amber-400 mb-2">
              {pageViewPercentages.length > 0 ? pageNames[pageViewPercentages[0].page] : '-'}
            </div>
            <div className="text-sm text-gray-400">
              {pageViewPercentages.length > 0 ? `${pageViewPercentages[0].views} görüntüleme` : 'Veri yok'}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-dark-400/50 backdrop-blur-lg rounded-xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="text-2xl mr-3">⏱️</span>
            Son Aktiviteler
          </h2>
          
          {stats.recentVisits.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {stats.recentVisits.slice(0, 20).map((visit, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-dark-300/30 rounded-lg hover:bg-dark-300/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-white">{pageNames[visit.page] || visit.page}</span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {new Date(visit.timestamp).toLocaleString('tr-TR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">⏱️</span>
              <p className="text-gray-400">Henüz aktivite kaydı yok</p>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-star-gradient/10 rounded-xl p-6 border border-star-400/30">
          <div className="flex items-start gap-4">
            <span className="text-3xl">💡</span>
            
          </div>
        </div>
      </div>
    </div>
  )
}
