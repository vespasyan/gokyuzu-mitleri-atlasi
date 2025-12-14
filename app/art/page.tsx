'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import VRButton from '@/components/VRButton'

const VirtualMuseum3D = dynamic(() => import('@/components/VirtualMuseum3D'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-dark-500">
      <div className="text-center">
        <div className="inline-block w-16 h-16 border-4 border-star-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white text-xl font-semibold">3D Müze Yükleniyor...</p>
      </div>
    </div>
  )
})

const artworks = [
  {
    id: 'sirius-light',
    title: 'Çoban Yıldızı\'nın Işığı',
    subtitle: 'Sirius - En Parlak Yıldız',
    category: 'Dijital Sanat',
    year: '2024',
    description: 'Gökyüzünün en parlak yıldızı Sirius\'un Türk mitolojisindeki bereket ve yol göstericilik sembolünü modern dijital sanat diliyle yeniden yorumlayan bir eser.',
    interpretation: 'Altın tonlarda geometrik formlar, yıldızın bereket getiren gücünü vurgularken, mavi tonlar kozmik derinliği simgeliyor.',
    relatedStars: ['sirius'],
    imageUrl: '/images/Vr_images/sirius-light.png',
    gallery: [
      '/images/Vr_images/sirius-light.png',
      '/images/Vr_images/sirius_light_2.png',
      '/images/Vr_images/sirius_light_3.png',
      '/images/Vr_images/sirius_light_4.png'
    ],
    medium: 'Dijital İllüstrasyon',
    dimensions: '3840x2160 px'
  },
  {
    id: 'kayra-han-throne',
    title: 'Kayra Han\'ın Tahtı',
    subtitle: 'Vega - Göklerin Yaratıcısı',
    category: 'Dijital Sanat',
    year: '2024',
    description: 'Türk mitolojisinin yaratıcı tanrısı Kayra Han\'ın kozmik tahtını ve Vega yıldızının etrafındaki ilahi gücü görselleştiren bir eser.',
    interpretation: 'Gökyüzünün en parlak yıldızlarından Vega, Kayra Han\'ın tahtı olarak tasvir edilmiş. Mor ve mavi tonlar ilahi gücü simgeliyor.',
    relatedStars: ['vega'],
    imageUrl: '/images/Vr_images/kayra-han-tahti.png',
    gallery: [
      '/images/Vr_images/kayra-han-tahti.png',
      '/images/Vr_images/kayra-han-tahti_2.png',
      '/images/Vr_images/kayra-han-tahti_3.png',
      '/images/Vr_images/kayra-han-tahti_4.png'
    ],
    medium: 'Dijital İllüstrasyon',
    dimensions: '3840x2160 px'
  },
  {
    id: 'demir-kazik',
    title: 'Göklerin Direği',
    subtitle: 'Polaris - Kutup Yıldızı',
    category: 'Dijital Sanat',
    year: '2024',
    description: 'Türk mitolojisinde gökyüzünün sabit noktası olarak bilinen Demir Kazık (Polaris) yıldızının kozmik işlevini görselleştiren bir eser.',
    interpretation: 'Kutup yıldızı etrafında dönen gök kubbenin merkezi olarak Demir Kazık, evrenin düzenini ve dengesini temsil ediyor.',
    relatedStars: ['polaris'],
    imageUrl: '/images/Vr_images/GDK.png',
    gallery: [
      '/images/Vr_images/GDK.png',
      '/images/Vr_images/GDK_2.png',
      '/images/Vr_images/GDK_3.png',
      '/images/Vr_images/GDK_4.png'
    ],
    medium: 'Dijital İllüstrasyon',
    dimensions: '3840x2160 px'
  },
  {
    id: 'ebe-ana',
    title: 'Ebe Ana\'nın Işığı',
    subtitle: 'Capella - Doğurganlığın Yıldızı',
    category: 'Dijital Sanat',
    year: '2024',
    description: 'Doğurganlık ve bereketin sembolü Ebe Ana\'nın Capella yıldızındaki tezahürünü görselleştiren, yaşam döngüsünü vurgulayan bir eser.',
    interpretation: 'Sarı tonlar yaşam enerjisini, döngüsel formlar doğanın sürekli yenilenmesini simgeliyor.',
    relatedStars: ['capella'],
    imageUrl: '/images/Vr_images/EAB.png',
    gallery: [
      '/images/Vr_images/EAB.png',
      '/images/Vr_images/EAB_2.png',
      '/images/Vr_images/EAB_3.png',
      '/images/Vr_images/EAB_4.png'
    ],
    medium: 'Dijital İllüstrasyon',
    dimensions: '3840x2160 px'
  },
  {
    id: 'diving-stars',
    title: 'Dalgıçlar Yıldızı',
    subtitle: 'Altair - Kartal Yıldızı',
    category: 'Dijital Sanat',
    year: '2024',
    description: 'Altair yıldızı etrafında şekillenen kartal imgesi ve Türk mitolojisindeki dalgıçlar efsanesini birleştiren özgün bir yorum.',
    interpretation: 'Masmavi tonlar gökyüzü ile denizin buluştuğu noktayı, kartal formu ise özgürlük ve yüceliği simgeliyor.',
    relatedStars: ['altair'],
    imageUrl: '/images/Vr_images/DS.png',
    gallery: [
      '/images/Vr_images/DS.png',
      '/images/Vr_images/DS_2.png',
      '/images/Vr_images/DS_3.png',
      '/images/Vr_images/DS_4.png'
    ],
    medium: 'Dijital İllüstrasyon',
    dimensions: '3840x2160 px'
  }
]

export default function VirtualMuseumPage() {
  const [viewMode, setViewMode] = useState<'3d' | 'gallery'>('3d')
  const [isVRMode, setIsVRMode] = useState(false)

  // Hide navbar in 3D mode
  useEffect(() => {
    if (viewMode === '3d') {
      document.body.style.overflow = 'hidden'
      const nav = document.querySelector('nav')
      if (nav) {
        (nav as HTMLElement).style.display = 'none'
      }
    } else {
      document.body.style.overflow = ''
      const nav = document.querySelector('nav')
      if (nav) {
        (nav as HTMLElement).style.display = ''
      }
    }
    
    return () => {
      document.body.style.overflow = ''
      const nav = document.querySelector('nav')
      if (nav) {
        (nav as HTMLElement).style.display = ''
      }
    }
  }, [viewMode])

  if (viewMode === '3d') {
    return (
      <>
        <VirtualMuseum3D isVRMode={isVRMode} />
        {/* Exit/Close Button */}
        <button
          onClick={() => setViewMode('gallery')}
          className="fixed top-8 right-8 w-12 h-12 bg-red-600/90 hover:bg-red-700 backdrop-blur-md text-white rounded-full border-2 border-red-400/50 hover:border-red-300 transition-all flex items-center justify-center z-[250] shadow-2xl group"
          title="Galeri Görünümüne Dön"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Gallery View Button */}
        <button
          onClick={() => setViewMode('gallery')}
          className="fixed top-24 right-8 px-4 py-2 bg-dark-400/90 backdrop-blur-md text-white rounded-lg border border-white/10 hover:border-star-400/50 transition-all flex items-center gap-2 z-[250]"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          Galeri Görünümü
        </button>
        
        {/* VR Button */}
        <VRButton onVRModeChange={setIsVRMode} />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-500 via-dark-400 to-dark-500">
      {/* View Mode Toggle */}
      <button
        onClick={() => setViewMode('3d')}
        className="fixed top-24 right-8 px-4 py-2 bg-dark-400/90 backdrop-blur-md text-white rounded-lg border border-white/10 hover:border-star-400/50 transition-all flex items-center gap-2 z-50"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
        3D Müze Görünümü
      </button>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-dark-500 to-dark-400/80 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-star-400/20 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cosmic-400/20 border border-cosmic-400/30 rounded-full mb-6">
            <svg className="w-5 h-5 text-cosmic-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <span className="text-cosmic-300 text-sm font-medium">Sanal Müze Deneyimi</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-star-400 via-cosmic-300 to-star-400 mb-4">
            Türk Mitolojisi Sanat Galerisi
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Gökyüzünün kadim hikayeleri, dijital sanat eserleriyle yeniden canlanıyor. 
            Her eser, yıldızların mitolojik öyküsünü çağdaş bir dille anlatıyor.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400 flex-wrap">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-star-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <span>5 Eser</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-cosmic-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <span>Dijital Koleksiyon</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-star-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span>360° Galeri Görünümü</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork, index) => (
            <Link
              key={artwork.id}
              href={`/art/${artwork.id}`}
              className="group relative bg-dark-400/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 hover:border-star-400/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-star-400/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-dark-300 to-dark-400">
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-500 via-dark-500/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-cosmic-400/90 backdrop-blur-sm rounded-full">
                  <span className="text-xs font-medium text-white">{artwork.category}</span>
                </div>

                {/* Gallery Count */}
                <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-dark-500/90 backdrop-blur-sm rounded-full">
                  <svg className="w-4 h-4 text-star-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium text-white">{artwork.gallery.length}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-star-400 transition-colors">
                    {artwork.title}
                  </h2>
                  <p className="text-sm text-cosmic-300 font-medium">
                    {artwork.subtitle}
                  </p>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {artwork.description}
                </p>

                {/* Interpretation */}
                <div className="bg-gradient-to-r from-star-400/10 to-cosmic-400/10 rounded-lg p-3 mb-4 border border-star-400/20">
                  <p className="text-xs text-gray-300 italic line-clamp-2">
                    &ldquo;{artwork.interpretation}&rdquo;
                  </p>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <span>{artwork.medium}</span>
                  <span>{artwork.year}</span>
                </div>

                {/* View Button */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{artwork.dimensions}</span>
                  <div className="inline-flex items-center gap-2 text-star-400 group-hover:text-star-300 font-medium text-sm">
                    <span>Galeriyi Gez</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-br from-dark-400/80 to-dark-300/80 backdrop-blur-lg rounded-2xl p-8 lg:p-12 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Sanal Müze Deneyimi
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Her eser, Türk mitolojisinin zengin yıldız anlatılarını dijital sanat diliyle yeniden yorumluyor. 
                Galeri görünümünde 360 derece dönerek eserleri farklı açılardan inceleyebilir, 
                yıldızların hikayelerini keşfedebilirsiniz.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-star-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-white font-medium">360° Galeri Görünümü</p>
                    <p className="text-sm text-gray-400">Her eser için 4 farklı açıdan görsel sunum</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-cosmic-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-white font-medium">Mitolojik Bağlamlar</p>
                    <p className="text-sm text-gray-400">Her eser ilgili yıldız hikayesiyle bağlantılı</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-star-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-white font-medium">Yüksek Çözünürlük</p>
                    <p className="text-sm text-gray-400">4K kalitesinde dijital sanat eserleri</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-gradient-to-br from-star-400/20 to-cosmic-400/20 rounded-xl p-8 border border-star-400/30">
                <svg className="w-full h-48 text-star-400/30" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white mb-2">20</p>
                    <p className="text-sm text-gray-300">Mitolojik Eser</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}