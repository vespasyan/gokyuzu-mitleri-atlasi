import { Metadata } from 'next'
import Link from 'next/link'
import starsData from '@/data/stars.json'
import { Star } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Mitoloji Hikayeleri',
  description: 'Türk mitolojisindeki yıldız hikayeleri ve efsaneler',
}

const stars = starsData.stars as Star[]

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-dark-500 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Mitoloji Hikayeleri
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Türk mitolojisinde yıldızlar sadece gece gökyüzünün ışıkları değil, 
            aynı zamanda atalarımızın bilgeliğini ve inançlarını yansıtan kutsal hikayelerdir.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stars.filter(star => star.id !== 'tubitak').map((star) => (
            <div
              key={star.id}
              className="bg-dark-400/50 backdrop-blur-lg rounded-lg p-6 border border-white/10 hover:border-star-400/30 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Star info */}
              <div className="flex items-center mb-4">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: star.color }}
                ></div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {star.turkishName}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {star.name} • {star.constellation}
                  </p>
                </div>
              </div>

              {/* Myth title */}
              <h4 className="text-xl font-bold text-star-400 mb-3">
                {star.myth.title}
              </h4>

              {/* Story excerpt */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
                {star.myth.story.length > 200 
                  ? `${star.myth.story.substring(0, 200)}...`
                  : star.myth.story
                }
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {star.myth.themes.slice(0, 3).map((theme, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-cosmic-400/20 text-cosmic-200 rounded text-xs"
                  >
                    {theme}
                  </span>
                ))}
              </div>

              {/* Read more link */}
              <Link
                href={`/stories/${star.id}`}
                className="inline-flex items-center text-star-400 hover:text-star-300 text-sm font-medium focus-ring rounded"
              >
                Hikayeyi Oku
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-cosmic-gradient rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Gökyüzünde Keşfet
            </h2>
            <p className="text-gray-200 mb-6">
              Bu hikayeleri interaktif gökyüzü haritasında yıldızları tıklayarak da keşfedebilirsiniz.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-white text-cosmic-500 font-semibold rounded-lg hover:bg-gray-100 transition-colors focus-ring"
            >
              Gökyüzü Haritasına Git
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}