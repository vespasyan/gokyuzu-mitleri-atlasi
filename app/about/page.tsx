import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hakkında',
  description: 'Gökyüzü Mitleri Atlası projesi hakkında bilgiler',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-500 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Hakkında
          </h1>
          <p className="text-xl text-gray-300">
            Gökyüzü Mitleri Atlası Projesi
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Project Description */}
          <section className="bg-dark-400/50 backdrop-blur-lg rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-star-400 mb-4">
              Proje Hakkında
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4">
                Gökyüzü Mitleri Atlası, Türk mitolojisindeki zengin yıldız hikayeleri ile çağdaş teknolojinin 
                buluştuğu interaktif bir dijital deneyimdir. Bu proje, atalarımızın gece gökyüzüne yükledikleri 
                anlamları ve hikayeleri, günümüz nesilleriyle buluşturmayı amaçlıyor.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Projemiz, sadece bir bilgi deposu değil, aynı zamanda kültürel mirasımızı yaşatan, 
                astronomi ile mitolojinin kesiştiği noktaları keşfeten ve çağdaş sanat yorumları 
                ile bu hikayelere yeni anlamlar katan bir platformdur.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section className="bg-dark-400/50 backdrop-blur-lg rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-star-400 mb-4">
              Misyonumuz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-star-400 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-dark-500 text-xs">🌟</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Kültürel Miras</h3>
                    <p className="text-gray-300 text-sm">
                      Türk mitolojisindeki yıldız hikayelerini gelecek nesillere aktarmak
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-cosmic-400 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-xs">🔬</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Bilim Eğitimi</h3>
                    <p className="text-gray-300 text-sm">
                      Astronomi bilgisini eğlenceli ve erişilebilir hale getirmek
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-star-400 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-dark-500 text-xs">🎨</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Çağdaş Sanat</h3>
                    <p className="text-gray-300 text-sm">
                      Geleneksel hikayeleri modern sanat dili ile yorumlamak
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-cosmic-400 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-xs">🌍</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Evrensel Erişim</h3>
                    <p className="text-gray-300 text-sm">
                      Tüm yaş gruplarından insanlara hitap eden içerik üretmek
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technology */}
          <section className="bg-dark-400/50 backdrop-blur-lg rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-star-400 mb-4">
              Teknoloji
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Bu proje, modern web teknolojileri kullanılarak geliştirilmiştir. 
              Interaktif 3D gökyüzü simülasyonu, responsive tasarım ve erişilebilirlik 
              standartları ile kullanıcı deneyimini en üst düzeyde tutmayı hedefliyoruz.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Next.js', 'TypeScript', 'Three.js', 'TailwindCSS'].map((tech) => (
                <div 
                  key={tech}
                  className="bg-cosmic-400/20 text-cosmic-200 rounded-lg p-3 text-center text-sm font-medium"
                >
                  {tech}
                </div>
              ))}
            </div>
          </section>

          {/* Team */}
          <section className="bg-dark-400/50 backdrop-blur-lg rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-star-400 mb-4">
              Ekip
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              “Gökyüzü Mitleri Atlası”, farklı disiplinlerden genç yaratıcıların bir araya gelerek Türk mitolojisini çağdaş sanat ve dijital teknolojilerle buluşturduğu bir proje olarak tasarlanmıştır. Web sitesinin tüm tasarım ve yazılım süreçleri Fazlı TOSUN tarafından geliştirilmiş, projenin dijital altyapısı ve deneyim tasarımı bu çalışma ile şekillenmiştir.

              Projenin sanatsal içeriği ise Şeyma Şimşek, Arya Deniz Altiokka, Mısra Oya Uzel, Yağmur Duman ve Alperen Akdağ tarafından üretilmiş; yıldız mitlerinden ilham alan özgün eserler, her öğrencinin kendi yorumuyla çağdaş bir estetik içerisinde yeniden hayat bulmuştur.

              Tüm süreç, projeden sorumlu öğretmen rehberliğinde yürütülmüş; hem araştırma aşamasında hem de sanatsal üretim sürecinde öğrencilere yönlendirme ve akademik destek sağlanmıştır.

              Bu proje, genç sanatçıların kültürel mirası dijital dünya ile buluşturarak yeni anlatım biçimleri geliştirmesine olanak tanıyan kolektif bir üretim deneyimidir.
            </p>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Daha fazla bilgi için bizimle iletişime geçebilirsiniz.
              </p>
            </div>
          </section>

          {/* Contact CTA */}
          <div className="text-center">
            <div className="bg-cosmic-gradient rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Projeye Katkıda Bulun
              </h2>
              <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                Türk mitolojisi, astronomi veya çağdaş sanat alanlarında uzmanıysanız 
                ve bu projeye katkıda bulunmak istiyorsanız, sizden haber almaktan mutluluk duyarız.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-white text-cosmic-500 font-semibold rounded-lg hover:bg-gray-100 transition-colors focus-ring"
                >
                  Atlası Keşfet
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors focus-ring"
                >
                  İletişime Geç
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}