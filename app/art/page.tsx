import Navigation from '@/components/Navigation';

export default function ArtPage() {
  const artworks = [
    {
      title: 'Göktürk Yıldızları',
      description: 'Göktürk döneminden günümüze uzanan yıldız mitolojisinin dijital yorumu',
      colors: 'from-blue-900 to-purple-900',
    },
    {
      title: 'Altın Takımyıldız',
      description: 'Türk mitolojisinde kutsal sayılan yıldız kümeleri',
      colors: 'from-yellow-800 to-orange-900',
    },
    {
      title: 'Gök Tanrı ve Yıldızlar',
      description: 'Tengri inancında gökyüzünün kutsallığı',
      colors: 'from-indigo-900 to-blue-900',
    },
    {
      title: 'Ay ve Yıldız',
      description: 'Türk sembolizminde ay ve yıldızın önemi',
      colors: 'from-cyan-900 to-teal-900',
    },
    {
      title: 'Yedi Ulu Yıldız',
      description: 'Büyük Ayı takımyıldızının Türk kültüründeki yeri',
      colors: 'from-purple-900 to-pink-900',
    },
    {
      title: 'Çoban Yıldızı',
      description: 'Göçebe kültürde yön bulan yıldız',
      colors: 'from-emerald-900 to-green-900',
    },
  ];

  return (
    <>
      <Navigation />
      
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-cosmic-gold">
              Sanat Galerisi
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Türk mitolojisindeki gökyüzü hikayelerinden ilham alan çağdaş dijital sanat eserleri
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-cosmic-gold/20 hover:border-cosmic-gold/50 transition-all cursor-pointer"
              >
                <div className={`aspect-square bg-gradient-to-br ${artwork.colors} flex items-center justify-center relative overflow-hidden`}>
                  {/* Decorative stars */}
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-cosmic-gold rounded-full animate-pulse"
                        style={{
                          width: `${Math.random() * 3 + 1}px`,
                          height: `${Math.random() * 3 + 1}px`,
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="relative z-10 text-cosmic-gold text-6xl">✨</div>
                </div>
                
                <div className="bg-cosmic-blue/30 backdrop-blur-sm p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-cosmic-light-gold group-hover:text-cosmic-gold transition-colors">
                    {artwork.title}
                  </h3>
                  <p className="text-foreground/70">
                    {artwork.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-cosmic-blue/30 backdrop-blur-sm border border-cosmic-gold/20 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-cosmic-gold">
              Kendi Eserlerinizi Paylaşın
            </h2>
            <p className="text-foreground/80 mb-6">
              Türk mitolojisinden ilham alarak yarattığınız sanat eserlerini bu galeriyle paylaşabilirsiniz.
            </p>
            <button className="px-8 py-3 bg-cosmic-gold hover:bg-cosmic-light-gold text-cosmic-dark-blue font-semibold rounded-full transition-colors">
              Eser Gönder
            </button>
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
