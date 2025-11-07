import Navigation from '@/components/Navigation';
import StarScene from '@/components/StarScene';

export default function Home() {
  return (
    <>
      <Navigation />
      
      <main className="relative">
        {/* Hero Section with 3D Stars */}
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <StarScene />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-cosmic-gold drop-shadow-lg">
              Gökyüzü Mitleri Atlası
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 mb-8 drop-shadow-md">
              Türk mitolojisindeki yıldız hikâyelerini çağdaş sanat ve dijital teknolojiyle birleştiren interaktif deneyim
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a 
                href="#explore" 
                className="px-8 py-3 bg-cosmic-gold hover:bg-cosmic-light-gold text-cosmic-dark-blue font-semibold rounded-full transition-colors"
              >
                Keşfet
              </a>
              <a 
                href="/stories" 
                className="px-8 py-3 border-2 border-cosmic-gold hover:bg-cosmic-gold/20 text-cosmic-gold font-semibold rounded-full transition-colors"
              >
                Hikayeleri Oku
              </a>
            </div>
          </div>
        </section>

        {/* Explore Section */}
        <section id="explore" className="py-20 px-6 bg-cosmic-dark-blue/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-cosmic-gold">
              Türk Mitolojisinde Yıldızlar
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-cosmic-blue/30 backdrop-blur-sm border border-cosmic-gold/20 rounded-lg p-6 hover:border-cosmic-gold/50 transition-all">
                <div className="text-cosmic-gold text-4xl mb-4">✨</div>
                <h3 className="text-2xl font-semibold mb-3 text-cosmic-light-gold">İnteraktif 3B Deneyim</h3>
                <p className="text-foreground/80">
                  Gökyüzündeki yıldız kümeleri ve takımyıldızları Three.js ile 3 boyutlu olarak keşfedin.
                </p>
              </div>
              
              <div className="bg-cosmic-blue/30 backdrop-blur-sm border border-cosmic-gold/20 rounded-lg p-6 hover:border-cosmic-gold/50 transition-all">
                <div className="text-cosmic-gold text-4xl mb-4">📖</div>
                <h3 className="text-2xl font-semibold mb-3 text-cosmic-light-gold">Mitolojik Hikayeler</h3>
                <p className="text-foreground/80">
                  Her yıldız kümesinin arkasındaki Türk mitolojisine ait efsaneleri ve hikayeleri okuyun.
                </p>
              </div>
              
              <div className="bg-cosmic-blue/30 backdrop-blur-sm border border-cosmic-gold/20 rounded-lg p-6 hover:border-cosmic-gold/50 transition-all">
                <div className="text-cosmic-gold text-4xl mb-4">🎨</div>
                <h3 className="text-2xl font-semibold mb-3 text-cosmic-light-gold">Sanat Galerisi</h3>
                <p className="text-foreground/80">
                  Gökyüzü mitlerinden ilham alan çağdaş dijital sanat eserlerini görüntüleyin.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 text-center">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cosmic-gold">
              Gökyüzü Yolculuğuna Başlayın
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Binlerce yıllık bilgeliği modern teknoloji ile buluşturan bu benzersiz deneyime katılın.
            </p>
            <a 
              href="/art" 
              className="inline-block px-8 py-3 bg-cosmic-gold hover:bg-cosmic-light-gold text-cosmic-dark-blue font-semibold rounded-full transition-colors"
            >
              Sanat Galerisini Gör
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-cosmic-dark-blue border-t border-cosmic-gold/20 py-8 px-6">
        <div className="container mx-auto text-center text-foreground/60">
          <p>© 2024 Gökyüzü Mitleri Atlası. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </>
  );
}
