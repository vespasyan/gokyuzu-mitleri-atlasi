# Gökyüzü Mitleri Atlası

Türk mitolojisindeki yıldız hikayeleri ve çağdaş sanat yorumları ile interaktif gökyüzü deneyimi.

## Özellikler

- 🌟 **Interaktif 3D Gökyüzü**: Three.js ile oluşturulmuş gerçekçi gökyüzü simülasyonu
- 📖 **Mitoloji Hikayeleri**: Türk mitolojisindeki zengin yıldız efsaneleri
- 🎨 **Çağdaş Sanat**: Geleneksel hikayelerin modern sanat yorumları
- 📱 **Responsive Tasarım**: Mobil ve masaüstü uyumlu arayüz
- ♿ **Erişilebilirlik**: WCAG standartlarına uygun geliştirme
- 🚀 **Performans**: SSR devre dışı Three.js, optimized loading

## Teknoloji Stack

- **Framework**: Next.js 14 (App Router)
- **Dil**: TypeScript
- **Stil**: TailwindCSS
- **3D Grafik**: Three.js, @react-three/fiber, @react-three/drei
- **SEO**: Next.js metadata API, sitemap.xml
- **Responsive**: Mobile-first yaklaşım

## Kurulum

### Gereksinimler

- Node.js 18+ 
- npm, yarn veya pnpm

### Adımlar

1. **Depo klonlama**:
   ```bash
   git clone https://github.com/vespasyan/gokyuzu-mitleri-atlasi.git
   cd gokyuzu-mitleri-atlasi
   ```

2. **Bağımlılıkları yükle**:
   ```bash
   npm install
   # veya
   yarn install
   # veya
   pnpm install
   ```

3. **Geliştirme sunucusunu başlat**:
   ```bash
   npm run dev
   # veya
   yarn dev
   # veya
   pnpm dev
   ```

4. **Tarayıcıda aç**: http://localhost:3000

## Proje Yapısı

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Ana sayfa (gökyüzü haritası)
│   ├── stories/           # Mitoloji hikayeleri
│   ├── art/               # Çağdaş sanat yorumları
│   ├── about/             # Hakkında sayfası
│   ├── globals.css        # Global stiller
│   └── sitemap.ts         # SEO sitemap
├── components/            # React bileşenleri
│   ├── Navbar.tsx         # Navigasyon
│   ├── StarFieldCanvas.tsx # 3D gökyüzü
│   └── StarInfoPanel.tsx  # Yıldız bilgi paneli
├── data/                  # Veri dosyaları
│   └── stars.json         # Yıldız verileri
├── lib/                   # Utility fonksiyonlar
│   └── types.ts           # TypeScript tipleri
├── public/                # Statik dosyalar
│   ├── robots.txt         # SEO robots
│   └── manifest.json      # PWA manifest
└── tailwind.config.js     # TailwindCSS yapılandırması
```

## Geliştirme

### Yeni Yıldız Ekleme

1. `data/stars.json` dosyasına yeni yıldız verisi ekle:
   ```json
   {
     "id": "yeni-yildiz",
     "name": "Aldebaran",
     "turkishName": "Dört Başlı Yıldız",
     "constellation": "Taurus",
     "coordinates": {
       "ra": 4.6,
       "dec": 16.5,
       "x": 3.0,
       "y": 2.0,
       "z": 8.0
     },
     "magnitude": 0.85,
     "spectralClass": "K5III",
     "color": "#ff8c42",
     "myth": {
       "title": "Dört Başlı Ejder",
       "story": "Mitolojik hikaye...",
       "origin": "Türk Mitolojisi",
       "characters": ["Karakterler"],
       "themes": ["Temalar"]
     },
     "astronomy": {
       "distance": "65 ışık yılı",
       "temperature": "4,010 K",
       "mass": "1.16 Güneş kütlesi",
       "radius": "44.2 Güneş yarıçapı", 
       "age": "6.4 milyar yıl",
       "facts": ["Bilgiler"]
     }
   }
   ```

2. Three.js sahnesinde koordinatları ayarla
3. Test et ve commit yap

### Stil Özelleştirme

TailwindCSS kullanarak:
- `tailwind.config.js` içinde özel renkler ve animasyonlar
- `app/globals.css` içinde custom CSS sınıfları
- Koyu tema odaklı tasarım

### Performance Optimizations

- Three.js bileşenleri `dynamic` import ile SSR devre dışı
- Image optimizasyonu için `next/image`
- Lazy loading ve code splitting
- Minimize bundle size

## Deployment

### Vercel (Önerilen)

1. GitHub'a push yap
2. Vercel hesabı oluştur
3. Projeyi import et
4. Otomatik deployment

### Diğer Platformlar

```bash
# Build oluştur
npm run build

# Production server başlat
npm run start
```

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Commit yapın (`git commit -am 'Yeni özellik eklendi'`)
4. Push yapın (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## İletişim

- **Proje Sahibi**: [İsim]
- **E-posta**: [email@example.com]
- **GitHub**: [github.com/username]

## Teşekkürler

- Türk mitolojisi araştırmacılarına
- Açık kaynak topluluğuna
- Three.js ve Next.js ekiplerine

---

⭐ **Gökyüzü Mitleri Atlası** - Geçmişin bilgeliği, geleceğin teknolojisi