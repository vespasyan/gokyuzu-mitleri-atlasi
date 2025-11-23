import { Metadata } from 'next'
import Link from 'next/link'
import { SiriusPainting, KayraHanSculpture, SimurgDigital, DemirKazikInstallation, EbeAnaArtwork } from '@/components/art/MythologyArtworks'

export const metadata: Metadata = {
  title: 'Çağdaş Sanat Yorumları',
  description: 'Türk mitolojisi yıldız hikayeleri ile ilgili çağdaş sanat eserleri',
}

const artworks = [
  {
    id: 'sirius-painting',
    title: 'Çoban Yıldızı\'nın Işığı',
    artist: 'Şeyma Şimşek',
    medium: 'Tuval üzerine yağlıboya',
    year: '2023',
    description: 'Sirius yıldızının Türk mitolojisindeki yerini çağdaş bir perspektifle yorumlayan bu eser, geleneksel motifleri modern tekniklerle harmanlıyor.',
    interpretation: 'Eserde, Çoban Yıldızı\'nın bereket getiren gücü, altın tonlarla işlenmiş geometrik formlarla vurgulanıyor.',
    relatedStars: ['sirius'],
    imageUrl: '/images/sirius-light.png',
    dimensions: '120cm x 80cm'
  },
  {
    id: 'kayra-han-sculpture',
    title: 'Kayra Han\'ın Tahtı',
    artist: 'Arya Deniz Altıokka',
    medium: 'Tuval üzerine yağlıboya',
    year: '2024',
    description: 'Vega yıldızının Kayra Han\'ın tahtı olarak yorumlandığı bu eser, Türk kozmolojisinin güçlü sembollerini barındırıyor.',
    interpretation: 'Eser, gökyüzündeki düzenin ve yaratıcı gücün fiziksel bir temsilini sunuyor.',
    relatedStars: ['vega'],
    imageUrl: '/images/kayra-han-tahti.png',
    dimensions: '120cm x 80cm'
  },
  {
    id: 'simurg-digital',
    title: 'Dijital Simurg',
    artist: 'Mısra Oya UZEL',
    medium: 'Dijital sanat',
    year: '2024',
    description: 'Altair yıldızı ve Simurg mitinin modern teknoloji ile buluştuğu interaktif bir enstalasyon.',
    interpretation: 'Eser, antik bilginin çağdaş teknoloji ile nasıl yeniden canlanabileceğini gösteriyor.',
    relatedStars: ['altair'],
    imageUrl: '/images/DS.png',
    dimensions: 'Değişken boyutlar'
  },
  {
    id: 'demir-kazik-installation',
    title: 'Göğün Demir Kazığı',
    artist: 'Yağmur DUMAN',
    medium: 'Karma teknik',
    year: '2023',
    description: 'Polaris yıldızının Türk mitolojisindeki anlamını mekânsal bir deneyime dönüştüren büyük ölçekli enstalasyon.',
    interpretation: 'Eser, izleyiciyi çadır kavramı üzerinden kendi kültürel köklerini sorgulamaya davet ediyor.',
    relatedStars: ['polaris'],
    imageUrl: '/images/GDK.png',
    dimensions: '100cm x 150cm'
  },
  {
    id: 'ebe-ana-fertility',
    title: 'Ebe Ana\'nın Bereketi',
    artist: 'Alperen AKDAĞ',
    medium: 'Karma teknik',
    year: '2024',
    description: 'Capella yıldızının doğurganlık ve bereket sembolü olarak yorumlandığı büyük ölçekli duvar resmi.',
    interpretation: 'Eser, yaşam döngüsünün kutsal anlarını ve Ebe Ana\'nın koruyucu gücünü görselleştiriyor.',
    relatedStars: ['capella'],
    imageUrl: '/images/EAB.png',
    dimensions: '70cm x 100cm'
  }
]

export default function ArtPage() {
  return (
    <div className="min-h-screen bg-dark-500 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Çağdaş Sanat Yorumları
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Türk mitolojisindeki yıldız hikayeleri, günümüz sanatçılarının elinde 
            yeni anlamlar kazanıyor ve çağdaş sanat diliyle yeniden yorumlanıyor.
          </p>
        </div>

        {/* Art Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {artworks.map((artwork) => (
            <article
              key={artwork.id}
              className="bg-dark-400/50 backdrop-blur-lg rounded-lg overflow-hidden border border-white/10 hover:border-star-400/30 transition-all duration-300"
            >
              {/* Beautiful Artwork */}
              <div className="aspect-video bg-gradient-to-br from-dark-400 to-dark-300 flex items-center justify-center overflow-hidden rounded-t-lg">
                {artwork.imageUrl ? (
                  <img 
                    src={artwork.imageUrl} 
                    alt={artwork.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="text-center text-cosmic-500">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium">{artwork.title}</p>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {artwork.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                    <span>{artwork.artist}</span>
                    <span>•</span>
                    <span>{artwork.year}</span>
                    <span>•</span>
                    <span>{artwork.medium}</span>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {artwork.description}
                </p>

                <div className="bg-dark-300/30 rounded-lg p-4 mb-4">
                  <h3 className="text-star-400 font-semibold mb-2">Sanatçı Yorumu</h3>
                  <p className="text-gray-300 text-sm italic">
                    "{artwork.interpretation}"
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400">Boyutlar: </span>
                    <span className="text-sm text-white">{artwork.dimensions}</span>
                  </div>
                  <Link
                    href={`/art/${artwork.id}`}
                    className="inline-flex items-center text-star-400 hover:text-star-300 text-sm font-medium focus-ring rounded px-2 py-1"
                  >
                    Detayları Gör
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-star-400/20 to-cosmic-400/20 rounded-lg p-8 border border-star-400/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              Sanatçı mısınız?
            </h2>
            <p className="text-gray-200 mb-6">
              Türk mitolojisi yıldız hikayeleri ile ilgili eserinizi bu koleksiyona dahil etmek istiyorsanız bizimle iletişime geçin.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-star-400 text-dark-500 font-semibold rounded-lg hover:bg-star-500 transition-colors focus-ring">
              İletişime Geç
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}