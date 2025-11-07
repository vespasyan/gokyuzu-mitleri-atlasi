import Navigation from '@/components/Navigation';

export default function AboutPage() {
  return (
    <>
      <Navigation />
      
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-cosmic-gold">
              Hakkında
            </h1>
            <p className="text-xl text-foreground/80">
              Geçmişten geleceğe uzanan bir yolculuk
            </p>
          </div>

          <div className="space-y-12">
            <section className="bg-cosmic-blue/30 backdrop-blur-sm border border-cosmic-gold/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-cosmic-light-gold">
                Proje Vizyonu
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Gökyüzü Mitleri Atlası, Türk mitolojisindeki zengin gökyüzü hikayelerini modern teknoloji ile 
                buluşturan interaktif bir web projesidir. Binlerce yıllık kültürel mirası, Three.js ve React 
                Three Fiber kullanarak 3 boyutlu bir deneyimle hayata geçiriyoruz.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Amacımız, genç nesillere atalarımızın gökyüzüne bakış açısını tanıtmak ve bu değerli kültürel 
                mirası dijital çağda yaşatmaktır.
              </p>
            </section>

            <section className="bg-cosmic-blue/30 backdrop-blur-sm border border-cosmic-gold/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-cosmic-light-gold">
                Teknolojiler
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cosmic-gold">Next.js 16</h3>
                  <p className="text-foreground/70">
                    Modern React framework ile performanslı ve SEO uyumlu web uygulaması
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cosmic-gold">TypeScript</h3>
                  <p className="text-foreground/70">
                    Tip güvenli kod geliştirme ve daha az hata
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cosmic-gold">Three.js</h3>
                  <p className="text-foreground/70">
                    3D grafik motoruyla gökyüzünün gerçekçi görselleştirmesi
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cosmic-gold">React Three Fiber</h3>
                  <p className="text-foreground/70">
                    React ile Three.js entegrasyonu için güçlü bir araç
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cosmic-gold">Tailwind CSS</h3>
                  <p className="text-foreground/70">
                    Minimalist ve kozmik temalı responsive tasarım
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-cosmic-gold">@react-three/drei</h3>
                  <p className="text-foreground/70">
                    Three.js için kullanışlı yardımcı bileşenler
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-cosmic-blue/30 backdrop-blur-sm border border-cosmic-gold/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-cosmic-light-gold">
                Tasarım Felsefesi
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-cosmic-gold text-2xl flex-shrink-0">🌌</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-cosmic-gold">Kozmik Tema</h3>
                    <p className="text-foreground/70">
                      Koyu mavi ve altın tonlarıyla gökyüzünün mistik atmosferini yansıtıyoruz.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-cosmic-gold text-2xl flex-shrink-0">✨</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-cosmic-gold">Minimalist Yaklaşım</h3>
                    <p className="text-foreground/70">
                      Sade ve şık tasarımla içeriğin ön planda olmasını sağlıyoruz.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-cosmic-gold text-2xl flex-shrink-0">📱</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-cosmic-gold">Responsive Tasarım</h3>
                    <p className="text-foreground/70">
                      Tüm cihazlarda kusursuz bir deneyim sunuyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-cosmic-blue/30 backdrop-blur-sm border border-cosmic-gold/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-cosmic-light-gold">
                Özelleştirme
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Bu proje açık kaynaklıdır ve katkılarınıza açıktır. Kendi 3D yıldız modellerinizi 
                <code className="bg-cosmic-dark-blue/50 px-2 py-1 rounded mx-1 text-cosmic-gold">
                  /public/models
                </code> 
                klasörüne .glb formatında ekleyebilir, hikayeleri genişletebilir veya tasarımda 
                değişiklikler yapabilirsiniz.
              </p>
              <div className="bg-cosmic-dark-blue/50 rounded p-4 mt-4">
                <p className="text-sm text-cosmic-gold mb-2">Örnek model kullanımı:</p>
                <code className="text-foreground/70 text-sm">
                  /public/models/star.glb
                </code>
              </div>
            </section>

            <section className="text-center bg-cosmic-dark-blue/50 backdrop-blur-sm border border-cosmic-gold/20 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 text-cosmic-gold">
                Katkıda Bulunun
              </h2>
              <p className="text-foreground/80 mb-6">
                Bu projeyi geliştirmek ve Türk mitolojisini daha geniş kitlelere ulaştırmak için 
                katkılarınızı bekliyoruz.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a 
                  href="https://github.com" 
                  className="px-8 py-3 bg-cosmic-gold hover:bg-cosmic-light-gold text-cosmic-dark-blue font-semibold rounded-full transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repository
                </a>
              </div>
            </section>
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
