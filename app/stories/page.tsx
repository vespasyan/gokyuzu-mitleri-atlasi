import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function StoriesPage() {
  const stories = [
    {
      title: 'Yedi Ulu Yıldız ve Kutup Yıldızı',
      excerpt: 'Türk mitolojisinde Büyük Ayı takımyıldızı olarak bilinen Yedi Ulu Yıldız, göçebe toplumlar için yön bulma aracıydı.',
      content: 'Eski Türk inancında, gökyüzü kutsal bir mekandı. Yedi Ulu Yıldız, yedi büyük ruhun gökyüzündeki temsili olarak görülürdü. Bu yıldızlar, geceleri yön bulmak isteyen göçebelere rehberlik eder, onları güvenli bir şekilde yolculuklarında korurdu.',
      constellation: 'Ursa Major',
    },
    {
      title: 'Ay ve Yıldız',
      excerpt: 'Türk bayrağındaki ay ve yıldız sembolü, binlerce yıllık bir geleneğin ürünüdür.',
      content: 'Göktürk döneminden itibaren ay ve yıldız, Türk kültürünün en önemli sembollerinden biri olmuştur. Ay, zamanın döngüsünü ve yeniden doğuşu; yıldız ise yol göstereni ve umudu temsil eder. Bu semboller, Türk halklarının gökyüzüne verdikleri önemi gösterir.',
      constellation: 'Luna & Stella',
    },
    {
      title: 'Çoban Yıldızı',
      excerpt: 'Sabah ve akşam gökyüzünde parlayan Venüs gezegeni, Türk kültüründe Çoban Yıldızı olarak bilinir.',
      content: 'Çobanlar için en önemli gökyüzü işaretlerinden biri olan bu parlak yıldız, sürülerin otlatılması ve eve dönüş zamanını belirlemede kullanılırdı. Akşam gökyüzünde belirdiğinde, çobanların sürülerini toparlama vakti gelmiş demekti.',
      constellation: 'Venus',
    },
    {
      title: 'Samanyolu ve Gökyüzü Yolu',
      excerpt: 'Samanyolu galaksisi, Türk mitolojisinde ruhların gökyüzündeki yolu olarak görülürdü.',
      content: 'Eski Türk inanışına göre, Samanyolu ölen kahramanların ve atların ruhlarının gökyüzüne çıktığı bir yoldu. Bu ışıltılı kuşak, ölümden sonraki hayata geçiş yolunu simgeler ve atalara duyulan saygıyı temsil ederdi.',
      constellation: 'Milky Way',
    },
    {
      title: 'Üç Yıldız (Orion\'un Kemeri)',
      excerpt: 'Orion takımyıldızının kemeri olarak bilinen üç parlak yıldız, Türk kültüründe özel bir yere sahiptir.',
      content: 'Bu üç yıldız, üç büyük kahramanı veya üç kutsal dağı temsil eder. Bazı efsanelerde bu yıldızlar, Türk halkının üç temel değeri olan cesaret, bilgelik ve adalet olarak yorumlanır.',
      constellation: 'Orion\'s Belt',
    },
  ];

  return (
    <>
      <Navigation />
      
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-cosmic-gold">
              Mitolojik Hikayeler
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Binlerce yıldır nesilden nesile aktarılan gökyüzü hikayeleri
            </p>
          </div>

          <div className="space-y-8">
            {stories.map((story, index) => (
              <article
                key={index}
                className="bg-cosmic-blue/30 backdrop-blur-sm border border-cosmic-gold/20 rounded-lg p-8 hover:border-cosmic-gold/50 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-cosmic-gold text-3xl flex-shrink-0">⭐</div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2 text-cosmic-light-gold">
                      {story.title}
                    </h2>
                    <p className="text-sm text-cosmic-gold/70 mb-4">
                      Takımyıldız: {story.constellation}
                    </p>
                  </div>
                </div>
                
                <p className="text-lg text-foreground/90 italic mb-4 pl-16">
                  {story.excerpt}
                </p>
                
                <p className="text-foreground/80 leading-relaxed pl-16">
                  {story.content}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center bg-cosmic-dark-blue/50 backdrop-blur-sm border border-cosmic-gold/20 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-cosmic-gold">
              Daha Fazla Hikaye Keşfedin
            </h2>
            <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
              Türk mitolojisi, gökyüzü ile ilgili zengin bir hikaye koleksiyonuna sahiptir. 
              Her yıldız, her gezegen, her takımyıldız farklı bir hikaye anlatır.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                href="/" 
                className="px-8 py-3 border-2 border-cosmic-gold hover:bg-cosmic-gold/20 text-cosmic-gold font-semibold rounded-full transition-colors"
              >
                3B Gökyüzünü Keşfet
              </Link>
              <Link 
                href="/about" 
                className="px-8 py-3 bg-cosmic-gold hover:bg-cosmic-light-gold text-cosmic-dark-blue font-semibold rounded-full transition-colors"
              >
                Proje Hakkında
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-cosmic-dark-blue border-t border-cosmic-gold/20 py-8 px-6">
        <div className="container mx-auto text-center text-foreground/60">
          <p>© 2024 Gökyüzü Mitleri Atlası. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </>
  );
}
