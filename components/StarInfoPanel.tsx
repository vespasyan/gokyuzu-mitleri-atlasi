'use client'

import React, { Fragment } from 'react'
import Image from 'next/image'
import { Star } from '@/lib/types'

interface StarInfoPanelProps {
  star: Star | null
  isOpen: boolean
  onClose: () => void
}

export function StarInfoPanel({ star, isOpen, onClose }: StarInfoPanelProps) {
  if (!star) return null

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Panel */}
      <div className={`
        fixed lg:static top-0 right-0 h-full w-full lg:w-96 xl:w-[28rem]
        bg-dark-400/95 backdrop-blur-lg border-l border-white/10
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        ${!isOpen && 'lg:hidden'}
        overflow-y-auto scrollbar-hide
      `}>
        {/* Header */}
        <div className="sticky top-0 bg-dark-400/95 backdrop-blur-lg border-b border-white/10 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-white">
                {star.turkishName}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {star.name} • {star.constellation}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 focus-ring transition-colors"
              aria-label="Paneli kapat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {/* Yıldız Özellikleri - Tübitak için gizle */}
          {star.id !== 'tubitak' && (
            <div className="bg-cosmic-50/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-star-400 mb-3">
                Yıldız Özellikleri
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-400">Parlaklık:</span>
                  <p className="text-white font-medium">{star.magnitude}</p>
                </div>
                <div>
                  <span className="text-gray-400">Spektral Sınıf:</span>
                  <p className="text-white font-medium">{star.spectralClass}</p>
                </div>
                <div>
                  <span className="text-gray-400">Uzaklık:</span>
                  <p className="text-white font-medium">{star.astronomy.distance}</p>
                </div>
                <div>
                  <span className="text-gray-400">Sıcaklık:</span>
                  <p className="text-white font-medium">{star.astronomy.temperature}</p>
                </div>
                <div>
                  <span className="text-gray-400">Kütle:</span>
                  <p className="text-white font-medium">{star.astronomy.mass}</p>
                </div>
                <div>
                  <span className="text-gray-400">Yaş:</span>
                  <p className="text-white font-medium">{star.astronomy.age}</p>
                </div>
              </div>
            </div>
          )}

          {/* Mitolojik Hikaye */}
          <div className="bg-dark-300/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-star-400 mb-3">
              {star.myth.title}
            </h3>
            <div className="space-y-3">
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                {star.myth.story}
              </p>
              
              {star.myth.moralLesson && (
                <div className="bg-cosmic-100/10 rounded p-3 border-l-4 border-star-400">
                  <p className="text-star-200 italic text-sm">
                    &ldquo;{star.myth.moralLesson}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Karakterler ve Temalar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-dark-300/20 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-star-400 mb-2">
                Karakterler
              </h4>
              <div className="flex flex-wrap gap-1">
                {star.myth.characters.map((character, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-cosmic-400/20 text-cosmic-200 rounded text-xs"
                  >
                    {character}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-dark-300/20 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-star-400 mb-2">
                Temalar
              </h4>
              <div className="flex flex-wrap gap-1">
                {star.myth.themes.map((theme, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-star-400/20 text-star-200 rounded text-xs"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Astronomik Bilgiler */}
          <div className="bg-dark-300/20 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-star-400 mb-3">
              İlginç Astronomik Bilgiler
            </h4>
            <ul className="space-y-2">
              {star.astronomy.facts.map((fact, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="text-star-400 mr-2 mt-1 flex-shrink-0">•</span>
                  <span className="text-gray-300">{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Medya İçeriği */}
          {star.media?.images && star.media.images.length > 0 && (
            <div className="bg-dark-300/20 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-star-400 mb-3">
                Medya İçeriği
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {star.media.images.map((image, index) => (
                  <div key={index} className="space-y-2">
                    <div className="aspect-video bg-dark-200 rounded-lg overflow-hidden">
                      {image.type === 'video' ? (
                        <video
                          src={image.url}
                          controls
                          muted
                          className="w-full h-full object-cover"
                          poster="/images/video-placeholder.jpg"
                        >
                          <source src={image.url} type="video/mp4" />
                          Tarayıcınız video oynatmayı desteklemiyor.
                        </video>
                      ) : image.type === 'animation' ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Eğer GIF yüklenemezse fallback göster
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : (
                        <>
                          <Image
                            src={image.url}
                            alt={image.alt}
                            width={400}
                            height={225}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              // Eğer görsel yüklenemezse fallback göster
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <div className="hidden w-full h-full flex items-center justify-center">
                            <span className="text-gray-500 text-sm">
                              {image.alt}
                            </span>
                          </div>
                        </>
                      )}
                      <div className="hidden w-full h-full flex items-center justify-center">
                        <span className="text-gray-500 text-sm">
                          {image.alt}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">{image.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Koordinat Bilgisi */}
          <div className="bg-dark-300/20 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-star-400 mb-3">
              Gözlem Bilgileri
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-400">Sağ Açıklık:</span>
                <p className="text-white font-medium">{star.coordinates.ra}h</p>
              </div>
              <div>
                <span className="text-gray-400">Açıklık:</span>
                <p className="text-white font-medium">{star.coordinates.dec}°</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Bu koordinatları kullanarak yıldızı gece gökyüzünde bulabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}