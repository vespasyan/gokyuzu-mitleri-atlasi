'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Star } from '@/lib/types'
import { StarInfoPanel } from '@/components/StarInfoPanel'
import VRButton from '@/components/VRButton'
import starsData from '@/data/stars.json'

// Dynamic import - SimpleZoomStarField (2D canvas, high performance, default)
const SimpleZoomStarField = dynamic(
  () => import('@/components/SimpleZoomStarField'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-dark-500">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-star-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Gökyüzü yükleniyor...</p>
        </div>
      </div>
    )
  }
)

// Dynamic import - StarFieldCanvas (3D Three.js with VR support)
const StarFieldCanvas3D = dynamic(
  () => import('@/components/StarFieldCanvas'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-dark-500">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-star-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">3D sahne yükleniyor...</p>
        </div>
      </div>
    )
  }
)

export default function HomePage() {
  const [selectedStar, setSelectedStar] = useState<Star | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [stars, setStars] = useState<Star[]>([])
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
  const [isStarFieldLoaded, setIsStarFieldLoaded] = useState(false)
  const [isVRMode, setIsVRMode] = useState(false)

  useEffect(() => {
    // JSON verilerini yükle ve tip dönüşümü yap
    const loadStars = async () => {
      try {
        console.log('🌟 Loading star data...');
        setStars(starsData.stars as Star[])
        console.log('✅ Stars loaded:', starsData.stars.length);
        const tubitak = starsData.stars.find((s: any) => s.id === 'tubitak');
        console.log('🔍 TÜBİTAK yıldızı:', tubitak ? JSON.stringify(tubitak.coordinates) : 'BULUNAMADI!');
        
        // StarField'i hemen yüklenmeye hazır olarak işaretle
        // DOM zaten mount olmuştur çünkü useEffect çalışıyor
        setTimeout(() => {
          setIsStarFieldLoaded(true);
          console.log('✅ StarField ready to load');
        }, 100);
        
      } catch (error) {
        console.error('❌ Error loading stars:', error);
      }
    };
    
    loadStars();
  }, [])

  const handleStarClick = (star: Star) => {
    setSelectedStar(star)
    setIsPanelOpen(true)
  }

  const handlePanelClose = () => {
    setIsPanelOpen(false)
    // Panel kapandıktan sonra seçimi temizle
    setTimeout(() => setSelectedStar(null), 300)
  }

  // Klavye navigasyonu - ESC ile panel kapatma
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPanelOpen) {
        handlePanelClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isPanelOpen])

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Ana sahne alanı */}
      <div className="flex-1 relative">
        {/* Three.js Canvas */}
        <div 
          className="absolute inset-0"
          onClick={(e) => {
            // Canvas area'ya tıklayınca paneli kapat (sadece desktop'ta)
            if (isPanelOpen && window.innerWidth >= 1024 && e.target === e.currentTarget) {
              handlePanelClose()
            }
          }}
        >
          {isStarFieldLoaded && stars.length > 0 ? (
            isVRMode ? (
              // VR mode: Use 3D Three.js with WebXR
              <StarFieldCanvas3D
                stars={stars}
                onStarClick={handleStarClick}
                selectedStarId={selectedStar?.id}
                isVRMode={true}
              />
            ) : (
              // Normal mode: Use 2D canvas (better performance and visuals)
              <SimpleZoomStarField
                stars={stars}
                onStarClick={handleStarClick}
                selectedStarId={selectedStar?.id}
                isVRMode={false}
              />
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-dark-500">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-star-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Gökyüzü yükleniyor...</p>
              </div>
            </div>
          )}
        </div>

        {/* Overlay kontrolleri */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Üst bilgi */}
          <div className="absolute top-4 left-4 right-4 lg:right-auto">
            <div className="bg-dark-400/80 backdrop-blur-lg rounded-lg pointer-events-auto overflow-hidden">
              <button
                onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                className="w-full p-4 text-left hover:bg-white/5 transition-colors focus-ring"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-xl lg:text-2xl font-bold text-white">
                    Gökyüzü Mitleri Atlası
                  </h1>
                  <svg 
                    className={`w-5 h-5 text-gray-300 transition-transform duration-200 ${isDescriptionOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div className={`transition-all duration-300 ease-in-out ${isDescriptionOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 pb-4">
                  <p className="text-gray-300 text-sm lg:text-base">
                    Türk mitolojisindeki yıldız hikayelerini keşfedin.<br />
                    Yıldızlara tıklayarak hikayelerini öğrenin.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Alt kontroller */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-dark-400/80 backdrop-blur-lg rounded-lg p-4 pointer-events-auto">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-300">
                    <span className="hidden sm:inline">Fare ile döndür • </span>
                    <span className="hidden sm:inline">Kaydır: yakınlaş/uzaklaş • </span>
                    Yıldızlara tıkla
                    {isPanelOpen && (
                      <span className="hidden lg:inline text-star-400"> • Panel kapatmak için sahneye tıkla veya ESC</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-star-400 rounded-full"></div>
                    <span className="text-xs text-gray-400">Seçilebilir Yıldızlar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="absolute top-20 right-4 flex flex-col gap-2 pointer-events-auto">
            <button
              onClick={() => {
                type WindowWithZoom = Window & typeof globalThis & { zoomIn?: () => void; zoomOut?: () => void };
                const w = window as WindowWithZoom;
                console.log('=== ZOOM IN BUTTON CLICKED ===');
                console.log('Available zoom functions:', {
                  zoomIn: !!w.zoomIn,
                  zoomOut: !!w.zoomOut
                });
                
                // Try the global zoom function
                if (w.zoomIn) {
                  console.log('✓ Using window.zoomIn');
                  w.zoomIn();
                } else {
                  console.log('❌ NO ZOOM METHODS AVAILABLE!');
                  alert('Zoom bulunamadı! Sayfayı yenileyin ve F12 ile console\'u kontrol edin.');
                }
              }}
              className="w-12 h-12 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 active:scale-95 text-white rounded-full shadow-lg border-2 border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 focus-ring"
              title="Yakınlaştır"
            >
              <span className="text-2xl font-bold leading-none">+</span>
            </button>
            <button
              onClick={() => {
                type WindowWithZoom = Window & typeof globalThis & { zoomIn?: () => void; zoomOut?: () => void };
                const w = window as WindowWithZoom;
                console.log('=== ZOOM OUT BUTTON CLICKED ===');
                console.log('Available zoom functions:', {
                  zoomIn: !!w.zoomIn,
                  zoomOut: !!w.zoomOut
                });
                
                // Try the global zoom function
                if (w.zoomOut) {
                  console.log('✓ Using window.zoomOut');
                  w.zoomOut();
                } else {
                  console.log('❌ NO ZOOM METHODS AVAILABLE!');
                  alert('Zoom bulunamadı! Sayfayı yenileyin.');
                }
              }}
              className="w-12 h-12 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 active:scale-95 text-white rounded-full shadow-lg border-2 border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 focus-ring"
              title="Uzaklaştır"
            >
              <span className="text-2xl font-bold leading-none">−</span>
            </button>
          </div>

          {/* Mobile panel toggle */}
          {selectedStar && (
            <button
              onClick={() => setIsPanelOpen(true)}
              className="lg:hidden absolute bottom-20 right-4 bg-star-400 hover:bg-star-500 text-dark-500 p-3 rounded-full shadow-lg pointer-events-auto focus-ring"
              aria-label="Yıldız bilgilerini göster"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}
          
          {/* VR Button */}
          <VRButton onVRModeChange={setIsVRMode} />
        </div>
      </div>

      {/* Bilgi paneli */}
      {selectedStar && (
        <StarInfoPanel
          star={selectedStar}
          isOpen={isPanelOpen}
          onClose={handlePanelClose}
        />
      )}
    </div>
  )
}