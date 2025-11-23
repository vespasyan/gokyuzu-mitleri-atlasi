import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import starsData from '@/data/stars.json'
import { Star } from '@/lib/types'

const stars = starsData.stars as Star[]

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return stars.map((star) => ({
    id: star.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const star = stars.find((s) => s.id === id)
  
  if (!star) {
    return {
      title: 'Hikaye Bulunamadı',
    }
  }

  return {
    title: `${star.myth.title} - ${star.turkishName}`,
    description: `${star.turkishName} yıldızının Türk mitolojisindeki hikayesi: ${star.myth.title}`,
  }
}

export default async function StoryPage({ params }: Props) {
  const { id } = await params
  const star = stars.find((s) => s.id === id)

  if (!star) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-dark-500">
      {/* Hero Section */}
      <div className="relative py-16 lg:py-24 bg-cosmic-gradient">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div 
              className="w-8 h-8 rounded-full mr-4 shadow-lg"
              style={{ 
                backgroundColor: star.color,
                boxShadow: `0 0 20px ${star.color}40`
              }}
            ></div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white">
              {star.turkishName}
            </h1>
          </div>
          <p className="text-xl text-gray-200 mb-4">
            {star.name} • {star.constellation}
          </p>
          <div className="inline-flex items-center bg-white/10 backdrop-blur-lg rounded-full px-6 py-2">
            <span className="text-star-400 font-semibold">Kadir: {star.magnitude}</span>
            <span className="mx-3 text-gray-400">•</span>
            <span className="text-cosmic-300">{star.astronomy.distance}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Story Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-star-400 mb-4">
            {star.myth.title}
          </h2>
          <div className="w-24 h-1 bg-star-gradient mx-auto rounded-full"></div>
        </div>

        {/* Main Story */}
        <div className="bg-dark-400/50 backdrop-blur-lg rounded-lg p-8 mb-8 border border-white/10">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
              {getDetailedStory(star)}
            </p>
          </div>
        </div>

        {/* Characters & Themes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Characters */}
          <div className="bg-dark-400/30 backdrop-blur-lg rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-bold text-cosmic-300 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Karakterler
            </h3>
            <div className="space-y-2">
              {star.myth.characters.map((character, index) => (
                <div key={index} className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-star-400 rounded-full mr-3"></div>
                  {character}
                </div>
              ))}
            </div>
          </div>

          {/* Themes */}
          <div className="bg-dark-400/30 backdrop-blur-lg rounded-lg p-6 border border-white/10">
            <h3 className="text-xl font-bold text-cosmic-300 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Temalar
            </h3>
            <div className="flex flex-wrap gap-2">
              {star.myth.themes.map((theme, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-cosmic-400/20 text-cosmic-200 rounded-full text-sm"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Moral Lesson */}
        <div className="bg-star-gradient rounded-lg p-8 mb-8 text-center">
          <h3 className="text-xl font-bold text-white mb-4">
            Hikayenin Öğrettikleri
          </h3>
          <p className="text-white/90 text-lg italic">
            &ldquo;{star.myth.moralLesson}&rdquo;
          </p>
        </div>

        {/* Astronomical Facts */}
        <div className="bg-dark-400/50 backdrop-blur-lg rounded-lg p-8 mb-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-star-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Astronomik Gerçekler
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-star-400 mb-1">{star.astronomy.distance}</div>
              <div className="text-gray-400 text-sm">Uzaklık</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-star-400 mb-1">{star.astronomy.temperature}</div>
              <div className="text-gray-400 text-sm">Sıcaklık</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-star-400 mb-1">{star.astronomy.mass}</div>
              <div className="text-gray-400 text-sm">Kütle</div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-semibold text-white mb-3">İlginç Bilgiler</h4>
            <ul className="space-y-2">
              {star.astronomy.facts.map((fact, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <div className="w-2 h-2 bg-cosmic-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Link
            href="/stories"
            className="inline-flex items-center px-6 py-3 bg-dark-400 text-white rounded-lg hover:bg-dark-300 transition-colors focus-ring"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Tüm Hikayelere Dön
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-star-gradient text-white rounded-lg hover:opacity-90 transition-opacity focus-ring"
          >
            Gökyüzünde Keşfet
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Function to provide detailed stories for each star
function getDetailedStory(star: Star): string {
  const detailedStories: Record<string, string> = {
    'sirius': `Eski zamanlardan beri, Türk çobanları gece çadırlarından çıktıklarında ilk baktıkları yıldız Çoban Yıldızı'dır. Efsaneye göre, bu yıldız Gök Tengri'nin gözüdür ve yeryüzündeki tüm canlıları korur.

Bir zamanlar, kış mevsiminde sürüsüyle dağlarda kalan genç bir çoban, fırtınalı bir gecede yolunu kaybetmişti. Karanlıkta ne yönü ne de evinin yerini bilebiliyordu. Umudunu yitirmek üzereyken, gökyüzünde en parlak şekilde görünen bir yıldız dikkatini çekti.

"Ey Gök Tengri'nin gözü," diye dua etti çoban, "bana doğru yolu göster."

O anda, yıldızın ışığı sanki bir yol gibi uzandı ve çobanı güvenli bir mağaraya yönlendirdi. Sabah olduğunda çoban, mağaranın yakınında taze su kaynağı ve sürüsü için ot buldu. O günden sonra, tüm çobanlar Çoban Yıldızı'na saygı duydular ve onun koruması altında gecelerini huzur içinde geçirmeye başladılar.

Yaşlılar der ki: "Çoban Yıldızı parladığında, sürüler bereketli olur ve kayıp hayvanlar evlerine döner."`,

    'vega': `Türk mitolojisinin en büyük yaratıcısı Kayra Han, kendi tahtının üzerinde parlayan kutsal bir yıldızla gökyüzünü aydınlatmaya karar verdi. Bu yıldız, yolunu kaybetmiş ruhları doğru yola iletecek ve bilgelik arayanlara ilham verecekti.

Efsaneye göre, çok eski zamanlarda dünya karanlık ve soğuktu. İnsanlar ve hayvanlar yönlerini bulamıyor, gecenin karanlığında korku içinde yaşıyorlardı. Kayra Han bu durumu görerek, tahtının tam üzerinde parlayan kutsal yıldızını dünya ahalisine armağan etti.

Bu yıldızın ışığı o kadar kuvvetliydi ki, geceleyin bile gündüz gibi aydınlık sağlıyordu. Yıldızın altında, bilge şamanlar ayinlerini yaparak ruhlarla iletişim kuruyorlar, geleceği öngörebiliyorlardı.

Bir gece, kaybolmuş bir avcı bu yıldızı gördüğünde, içinde tuhaf bir huzur hissetti. Yıldızın ışığını takip ederek yürüdü ve sabaha kadar hiç yorgunluk duymadı. Sabah olduğunda kendini kendi kabilesinin çadırları arasında buldu.

O günden sonra, Kayra Han'ın yıldızı bilgelik ve rehberlik simgesi oldu. Şamanlar, bu yıldızın altında önemli kararlar alır ve topluma yol gösterirlerdi.`,

    'altair': `Türk mitolojisinin en büyük kuşu Simurg, tüm kuşların padişahıydı. Onun kalbi gökyüzündeki Kartal Yıldızı'nda atıyordu. Bu yıldız, Simurg'un gücünün ve cesaretinin kaynağıydı.

Çok eski zamanlarda, Simurg'un kalbi durduğunda, dünyada tüm kuşlar susmuş, gökyüzü sessizliğe gömülmüştü. İnsanlar bu sessizliği fark edince endişelendiler, çünkü kuşların şarkısı olmadan doğanın dengesi bozulmuştu.

O zamanlar yaşayan cesur bir savaşçı, Simurg'u bulmak için yola çıktı. Yedi dağ aştı, yedi deniz geçti. Sonunda Simurg'u uçurum kenarında hareketsiz buldu. Dev kuşun gözlerinde hüzün vardı.

"Ey Simurg, neden üzgünsün?" diye sordu savaşçı.

"Kalbim gökyüzünde tutsak, ben de uçamıyorum," diye cevapladı Simurg.

Savaşçı, Kartal Yıldızı'na bakarak ellerini göğe kaldırdı: "Ey yıldız! Simurg'un kalbini özgür bırak ki, dünya yeniden şarkılarla dolsun."

O anda yıldız daha da parladı ve Simurg'un kalbi güçlendi. Dev kuş kanatlarını açarak gökyüzüne yükseldi. Onunla birlikte tüm kuşlar tekrar şarkı söylemeye başladı.

Bu yüzden, Kartal Yıldızı'nı gören savaşçılar cesaret bulur, yüksek idealleri için mücadele etme gücünü hissederler.`,

    'polaris': `Eski Türk göçebelerinin en büyük sorunu, gece karanlığında yön bulamamaktı. Gökyüzü dev bir çadır gibiydi ve bu çadırın tam ortasında sağlam bir kazık olması gerekiyordu. Gök Tengri, göçebe halkının bu ihtiyacını görünce, gökyüzünün tam ortasına Demir Kazık'ı çaktı.

Bu kazık öyle sağlamdı ki, fırtınalar estirdiğinde bile yerinden oynamıyordu. Tüm yıldızlar onun etrafında dönerken, o hep aynı yerde duruyordu. Göçebeler artık geceleri bu kazığa bakarak yönlerini bulabiliyorlardı.

Efsaneye göre, büyük göç zamanlarında bir kabile lideri, kabilesini güvenli topraklara götürmeye çalışırken yolunu kaybetmişti. Günlerce çölde dolaştıktan sonra, su ve yiyecekleri tükenmişti. Kabile üyeleri umutsuzluğa kapılmıştı.

Lider, bir gece gökyüzüne bakarak Demir Kazık'ı fark etti. "İşte!" dedi. "Gök Tengri bize yolu gösteriyor!" Kazığın işaret ettiği yönde yürümeye başladılar. Üç gün sonra verimli bir ovaya ulaştılar.

O günden sonra, tüm Türk kabileleri Demir Kazık'a "Değişmeyen Yıldız" adını verdiler. Çünkü hayatta bir sabit noktan olduğunda, asla kaybolmazsın.

Bugün bile, denizci ve seyyahlar bu yıldızı kuzey yönünü bulmak için kullanırlar. Türk atasözünde denildiği gibi: "Demir Kazık gibi sabit ol, fırtınalarda da yerinden oynama."`,

    'capella': `Türk kültüründe doğum, en kutsal anlardan biridir. Ebe Ana, bu kutsal anın koruyucusudır ve onun yıldızı gökyüzünde parlayarak yeni yaşamları müjdeler.

Çok eski zamanlarda, zorlu bir kışta hamile bir kadın doğum yapmak üzereydi. Fakat o geceye kadar hiç doğum yapmış bir ebe bulunamıyordu. Köydeki yaşlı kadınlar endişe içindeydi.

O gece, gökyüzünde çok parlak bir yıldız belirdi. Yaşlı kadınlardan biri, "İşte! Ebe Ana'nın yıldızı parladı. Bu mübarek işaretidir," dedi.

Yıldızın ışığında, köyün en yaşlı ve bilge kadını ellerini yıkayarak doğuma yardım etmeye başladı. Sanki yıldızın ışığı ona güç veriyordu. Elleri titremiyor, kalbi huzurluydu.

Doğum başarıyla tamamlandı ve sağlıklı bir bebek dünyaya geldi. O andan itibaren, köydeki tüm kadınlar Ebe Ana Yıldızı'nın parlak göründüğü gecelerde doğum yaptıklarında işlerinin kolay geçeceğine inandılar.

Çobanlar da bu yıldızın parladığını gördüklerinde sürülerinin çoğalacağını, çiftçiler bol hasat alacaklarını bilirlerdi. Çünkü bu yıldız, her türlü bereketin ve yaşam döngüsünün simgesiydi.

Ebe Ana'nın yıldızı, bize şunu öğretir: Her son, aslında yeni bir başlangıçtır. Hayatta kapanan her kapı, yeni bir kapının açılmasına vesile olur.`
  }

  return detailedStories[star.id] || star.myth.story
}