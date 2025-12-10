import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import starsData from '@/data/stars.json'
import { Star } from '@/lib/types'

const stars = starsData.stars as Star[]

const artworks = [
  {
    id: 'sirius-light',
    title: 'Çoban Yıldızı\'nın Işığı',
    artist: 'Şeyma Şimşek',
    medium: 'Tuval üzerine yağlıboya',
    year: '2023',
    description: 'Şeyma Şimşek\'in "Çoban Yıldızı\'nın Işığı" adlı 2023 tarihli tablosu, Sirius\'un Türk mitolojisindeki bereket ve yol göstericilik sembolünü çağdaş bir estetikle yeniden yorumluyor. Sanatçı, altın tonlarda geometrik formlar ve titreşen mavi dokular aracılığıyla yıldızın hem kozmos hem insan ruhu üzerindeki ışığını görünür kılıyor. Geleneksel motiflerle modern soyutlama tekniklerini buluşturan eser, gökyüzünün kadim bilgeliğini bugünün duyarlılığıyla bir araya getiriyor. İzleyici, bu parlak merkez etrafında hem içsel bir yolculuğa hem de kültürel belleğin derinliklerine davet ediliyor.',
    interpretation: 'Eserde, Çoban Yıldızı\'nın bereket getiren gücü, altın tonlarla işlenmiş geometrik formlarla vurgulanıyor.',
    relatedStars: ['sirius'],
    imageUrl: '/images/Vr_images/sirius-light.png',
    gallery: [
      '/images/Vr_images/sirius-light.png',
      '/images/Vr_images/sirius_light_2.png',
      '/images/Vr_images/sirius_light_3.png',
      '/images/Vr_images/sirius_light_4.png'
    ],
    dimensions: '120cm x 80cm',
    techniques: ['Yağlıboya', 'Altın varak', 'Geleneksel motifler'],
    inspiration: 'Anadolu çoban kültürü ve yıldız gözlemciliği',
    symbolism: {
      'Altın tonlar': 'Bereket ve bolluk sembolü',
      'Geometrik formlar': 'Türk sanatının matematiksel düzeni',
      'Yıldız ışınları': 'İlahi rehberlik ve koruma'
    },
    exhibitions: [
      '',
      ''
    ],
    price: '₺45,000'
  },
  {
    id: 'kayra-han-throne',
    title: 'Kayra Han\'ın Tahtı',
    artist: 'Arya Deniz Altıokka',
    medium: 'Tuval üzerine yağlıboya',
    year: '2024',
    description: 'Arya Deniz Altıokka\'nın "Kayra Han\'ın Tahtı" adlı 2024 tarihli yağlıboya eseri, Türk mitolojisinde evrenin yaratıcı gücü olarak anılan Kayra Han\'ı kozmik bir taht sembolü üzerinden yeniden yorumluyor. Sanatçı, yoğun fırça dokularıyla gökyüzü ve yeryüzü arasındaki enerjik geçişi resmederken, bronz tonların sıcaklığıyla mistik bir ışık etkisi yaratıyor. Kompozisyonun merkezindeki taht formu, hem ilahi düzenin simgesi hem de insanın evrenle kurduğu ruhsal bağın metaforu olarak öne çıkıyor. Eser, kadim Türk kozmolojisinin derin anlamlarını çağdaş bir plastik dille aktarırken, izleyiciyi maddenin ötesindeki yaratıcı kudreti hissetmeye davet ediyor.',
    interpretation: 'Eser, gökyüzündeki düzenin ve yaratıcı gücün fiziksel bir temsilini sunuyor.',
    relatedStars: ['vega'],
    imageUrl: '/images/Vr_images/kayra-han-tahti.png',
    gallery: [
      '/images/Vr_images/kayra-han-tahti.png',
      '/images/Vr_images/kayra-han-tahti_2.png',
      '/images/Vr_images/kayra-han-tahti_3.png',
      '/images/Vr_images/kayra-han-tahti_4.png'
    ],
    dimensions: '120cm x 80cm',
    techniques: ['Yağlıboya', 'Altın varak', 'Geleneksel motifler'],
    inspiration: 'Türk şamanlığı ve kozmik düzen anlayışı',
    symbolism: {
      'Taht formu': 'İlahi otorite ve düzen',
      'Altın tonlar': 'İlahi ışık ve bereket',
      'Geometrik desenler': 'Evrenin matematik harmonisi'
    },
    exhibitions: [
      '',
      ''
    ],
    price: '₺125,000'
  },
  {
    id: 'diving-stars',
    title: 'Dijital Simurg',
    artist: 'Mısra Oya UZEL',
    medium: 'Dijital sanat',
    year: '2024',
    description: '“Dijital Simurg”, Altair yıldızı ile Simurg mitinin kesişiminden doğan çağdaş bir dijital sanat eseridir. Eser, kadim bilgeliği temsil eden Simurg figürünü ışık, hareket ve algoritmik formlar aracılığıyla yeniden yorumlayarak mitolojik bir varlığın dijital çağda nasıl beden bulabileceğini araştırır. Etkileşimli ışık geçişleri, izleyicinin varlığına duyarlı biçimde değişerek mitin dönüşüm, yeniden doğuş ve kolektif bilgelik temalarını görünür kılar. Böylece “Dijital Simurg”, hem geçmişe açılan bir kapı hem de teknolojinin sunduğu yeni bir anlatı alanı olarak konumlanır.',
    interpretation: 'Eser antik bilginin çağdaş teknoloji ile nasıl yeniden canlanabileceğini gösteriyor.',
    relatedStars: ['altair'],
    imageUrl: '/images/Vr_images/DS.png',
    gallery: [
      '/images/Vr_images/DS.png',
      '/images/Vr_images/DS_2.png',
      '/images/Vr_images/DS_3.png',
      '/images/Vr_images/DS_4.png'
    ],
    dimensions: 'Değişken boyutlar',
    techniques: ['Generative art', 'Interaktif sensörler', 'LED projeksiyon'],
    inspiration: 'Yapay zeka ve geleneksel Türk mitolojisi',
    symbolism: {
      'Dijital formlar': 'Modern çağın mitolojisi',
      'İnteraktif öğeler': 'İzleyici katılımı ve dönüşüm',
      'Mavi ışık': 'Teknolojik aydınlanma'
    },
    exhibitions: [
      '',
      ''
    ],
    price: 'Edition 3/5'
  },
  {
    id: 'demir-kazik',
    title: 'Göğün Demir Kazığı',
    artist: 'Yağmur DUMAN',
    medium: 'Karma teknik',
    year: '2023',
    description: '“Göğün Demir Kazığı”, Polaris yıldızının Türk mitolojisindeki merkez ve yön tayini sembolünü mekânsal bir deneyime dönüştüren büyük ölçekli bir enstalasyondur. Eser, göğün eksenini temsil eden bu kutsal kavramı, metalik yüzeyler, gerilim hatları ve ışık odakları aracılığıyla yeniden kurgulayarak izleyiciyi hem fiziksel hem de kültürel bir merkez arayışına davet eder. Yapının yükselen formu, kadim kozmogonilerin evren tasavvurunu çağrıştırırken; iç mekândaki boşluk ve gölge ilişkileri, modern bireyin kökleriyle kurduğu bağa dair sezgisel bir yolculuk sunar. Böylece enstalasyon, hem mitolojik hem de çağdaş bir “eksensel dünya” yeniden inşası niteliği taşır.',
    interpretation: 'Eser, izleyiciyi çadır kavramı üzerinden kendi kültürel köklerini sorgulamaya davet ediyor.',
    relatedStars: ['polaris'],
    imageUrl: '/images/Vr_images/GDK.png',
    gallery: [
      '/images/Vr_images/GDK.png',
      '/images/Vr_images/GDK_2.png',
      '/images/Vr_images/GDK_3.png',
      '/images/Vr_images/GDK_4.png'
    ],
    dimensions: '100cm x 150cm',
    techniques: ['Karışık Teknik'],
    inspiration: 'Göçebe yaşam kültürü ve navigasyon sanatı',
    symbolism: {
      'Demir kazık': 'Sabitlik ve güvenlik',
      'Çadır formu': 'Geçici olan ile kalıcı olan',
      'Merkezsel yerleşim': 'Evrenin düzeni'
    },
    exhibitions: [
      '',
      ''
    ],
    price: 'Satışta değil'
  },
  {
    id: 'ebe-ana',
    title: 'Ebe Ana\'nın Bereketi',
    artist: 'Alperen AKDAĞ',
    medium: 'Karma teknik',
    year: '2024',
    description: '“Ebe Ana’nın Bereketi”, Capella yıldızının doğurganlık ve yaşam döngüsüyle ilişkilendirilen mitolojik anlamını büyük ölçekli bir duvar resmi üzerinden yorumlayan kapsamlı bir çalışmadır. Eserde, Ebe Ana figürü koruyucu ve besleyici bir güç olarak merkezde konumlandırılırken; etrafında yer alan organik formlar, toprak ve gökyüzü arasındaki sürekli yenilenmeyi simgeler. Zengin renk geçişleri ve ritmik çizgiler, yaşamın sürekliliğini ve doğanın bereketini görsel bir akışa dönüştürür. Böylece duvar resmi, izleyiciyi hem mitolojik bir anlatıya hem de evrensel bir yaratılış temasına bağlayan güçlü bir görsel alan yaratır.',
    interpretation: 'Eser, yaşam döngüsünün kutsal anlarını ve Ebe Ana\'nın koruyucu gücünü görselleştiriyor.',
    relatedStars: ['capella'],
    imageUrl: '/images/Vr_images/EAB.png',
    gallery: [
      '/images/Vr_images/EAB.png',
      '/images/Vr_images/EAB_2.png',
      '/images/Vr_images/EAB_3.png',
      '/images/Vr_images/EAB_4.png'
    ],
    dimensions: '70cm x 100cm',
    techniques: ['Akrilik boya', 'Altın varak', 'Doğal pigmentler'],
    inspiration: 'Anadolu kadın kültürü ve doğurganlık ritüelleri',
    symbolism: {
      'Organik formlar': 'Yaşamın sürekli yenilenmesi',
      'Sıcak renkler': 'Ana rahminin koruması',
      'Dairesel kompozisyon': 'Yaşam döngüsü'
    },
    exhibitions: [
      '',
      ''
    ],
    price: '₺55,000'
  }
]

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return artworks.map((artwork) => ({
    id: artwork.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const artwork = artworks.find((a) => a.id === id)
  
  if (!artwork) {
    return {
      title: 'Sanat Eseri Bulunamadı',
    }
  }

  return {
    title: `${artwork.title} - ${artwork.artist}`,
    description: `${artwork.artist} tarafından ${artwork.year} yılında yaratılan "${artwork.title}" adlı eserin detayları.`,
  }
}

export default async function ArtworkDetailPage({ params }: Props) {
  const { id } = await params
  const artwork = artworks.find((a) => a.id === id)

  if (!artwork) {
    notFound()
  }

  const relatedStar = stars.find(star => artwork.relatedStars.includes(star.id))

  return (
    <div className="min-h-screen bg-dark-500">
      {/* Hero Section */}
      <div className="relative py-16 lg:py-24 bg-cosmic-gradient">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              {artwork.title}
            </h1>
            <p className="text-xl text-gray-200 mb-6">
              {artwork.artist} • {artwork.year} • {artwork.medium}
            </p>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-lg rounded-full px-6 py-2">
              <span className="text-star-400 font-semibold">{artwork.dimensions}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Artwork Display */}
          <div className="space-y-6">
            <div className="bg-dark-400/50 backdrop-blur-lg rounded-lg overflow-hidden border border-white/10">
              <div className="aspect-square bg-gradient-to-br from-dark-400 to-dark-300 flex items-center justify-center p-8">
                {artwork.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={artwork.imageUrl} 
                    alt={artwork.title}
                    className="w-full h-full object-contain rounded-lg"
                  />
                )  : (
                  <div className="text-center text-gray-400">
                    <div className="text-6xl mb-4">🎨</div>
                    <p>Eser görseli</p>
                  </div>
                )}
              </div>
            </div>

            {/* Gallery Grid */}
            {artwork.gallery && artwork.gallery.length > 1 && (
              <div className="bg-dark-400/30 backdrop-blur-lg rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Galeri</h3>
                <div className="grid grid-cols-2 gap-4">
                  {artwork.gallery.map((image, index) => (
                    <div key={index} className="bg-dark-300 rounded-lg overflow-hidden border border-white/10 hover:border-star-400/50 transition-all cursor-pointer group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={image} 
                        alt={`${artwork.title} - Görsel ${index + 1}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Artwork Info */}
            <div className="bg-dark-400/30 backdrop-blur-lg rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Eser Bilgileri</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-400">Sanatçı:</span>
                  <span className="font-medium">{artwork.artist}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Yıl:</span>
                  <span>{artwork.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Teknik:</span>
                  <span>{artwork.medium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Boyutlar:</span>
                  <span>{artwork.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fiyat:</span>
                  <span className="text-star-400 font-semibold">{artwork.price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Description */}
            <div className="bg-dark-400/50 backdrop-blur-lg rounded-lg p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-star-400 mb-4">Eser Hakkında</h2>
              <p className="text-gray-200 text-lg leading-relaxed mb-6">
                {artwork.description}
              </p>
              
              <div className="bg-star-gradient/10 rounded-lg p-6 border-l-4 border-star-400">
                <h3 className="text-lg font-semibold text-white mb-3">Sanatçı Yorumu</h3>
                <p className="text-gray-300 italic">
                  &ldquo;{artwork.interpretation}&rdquo;
                </p>
              </div>
            </div>

            {/* Techniques */}
            <div className="bg-dark-400/30 backdrop-blur-lg rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-bold text-cosmic-300 mb-4">Kullanılan Teknikler</h3>
              <div className="flex flex-wrap gap-2">
                {artwork.techniques.map((technique, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-cosmic-400/20 text-cosmic-200 rounded-full text-sm"
                  >
                    {technique}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-gray-400 text-sm">İlham Kaynağı:</p>
                <p className="text-gray-200">{artwork.inspiration}</p>
              </div>
            </div>

            {/* Symbolism */}
            <div className="bg-dark-400/30 backdrop-blur-lg rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-bold text-star-400 mb-4">Sembolik Anlamlar</h3>
              <div className="space-y-3">
                {Object.entries(artwork.symbolism).map(([symbol, meaning], index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-star-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="text-white font-medium">{symbol}:</span>
                      <span className="text-gray-300 ml-2">{meaning}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Star Mythology */}
        {relatedStar && (
          <div className="bg-cosmic-gradient/20 rounded-lg p-8 mb-8 border border-star-400/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <div 
                className="w-6 h-6 rounded-full mr-3"
                style={{ 
                  backgroundColor: relatedStar.color,
                  boxShadow: `0 0 15px ${relatedStar.color}40`
                }}
              ></div>
              İlgili Yıldız Mitolojisi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-star-400 mb-3">
                  {relatedStar.turkishName}
                </h3>
                <p className="text-gray-300 mb-4">
                  {relatedStar.myth.story.substring(0, 200)}...
                </p>
                <Link
                  href={`/stories/${relatedStar.id}`}
                  className="inline-flex items-center text-star-400 hover:text-star-300 text-sm font-medium"
                >
                  Hikayeyi Oku
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-cosmic-300 mb-3">Astronomik Bilgiler</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uzaklık:</span>
                    <span className="text-gray-200">{relatedStar.astronomy.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sıcaklık:</span>
                    <span className="text-gray-200">{relatedStar.astronomy.temperature}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Kütle:</span>
                    <span className="text-gray-200">{relatedStar.astronomy.mass}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Exhibitions */}
        <div className="bg-dark-400/30 backdrop-blur-lg rounded-lg p-8 mb-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Sergiler ve Gösterimler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {artwork.exhibitions.map((exhibition, index) => (
              <div key={index} className="flex items-center p-4 bg-dark-300/30 rounded-lg">
                <div className="w-3 h-3 bg-star-400 rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-gray-200">{exhibition}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Link
            href="/art"
            className="inline-flex items-center px-6 py-3 bg-dark-400 text-white rounded-lg hover:bg-dark-300 transition-colors focus-ring"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Sanat Galerisine Dön
          </Link>
          
          <div className="flex gap-4">
            <button className="inline-flex items-center px-6 py-3 bg-star-gradient text-white rounded-lg hover:opacity-90 transition-opacity focus-ring">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Favorilere Ekle
            </button>
            
            <button className="inline-flex items-center px-6 py-3 bg-cosmic-gradient text-white rounded-lg hover:opacity-90 transition-opacity focus-ring">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Paylaş
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}