# 📊 Analytics Dashboard

Gökyüzü Mitleri Atlası için gelişmiş analitik sistemi.

## 🎯 Özellikler

### Ana Metrikler
- **Toplam Ziyaret**: Tüm zamanların toplam ziyaret sayısı
- **Benzersiz Ziyaretçi**: Session bazlı benzersiz ziyaretçi takibi
- **Bugünkü Ziyaret**: Günlük ziyaret sayısı

### 📈 Grafikler

#### 1. **Ziyaret Trendi (7 Günlük)**
- Son 7 günün ziyaret istatistikleri
- Sütun grafik (Bar Chart) ile görselleştirme
- Hover ile detaylı bilgi
- Özet istatistikler:
  - 7 günlük toplam
  - Günlük ortalama
  - En yüksek ziyaret günü

#### 2. **Sayfa Görüntülemeleri**
- **Donut Chart (Pasta Grafik)**: Sayfa dağılımının yüzdelik görünümü
- **Renkli Bar Grafik**: Detaylı sayfa istatistikleri
- Her sayfa için:
  - Görüntüleme sayısı
  - Yüzdelik oran
  - Renkli görseller

#### 3. **Ek Metrikler**
- **Ortalama Oturum**: Oturum başına sayfa görüntüleme
- **Hemen Çıkma Oranı**: Tek sayfa ziyaret yüzdesi
- **En Popüler Sayfa**: En çok görüntülenen sayfa

### ⏱️ Son Aktiviteler
- Son 20 ziyaretin listesi
- Tarih ve saat bilgisi
- Ziyaret edilen sayfa

## 🔧 Teknik Detaylar

### Veri Saklama
- **LocalStorage** kullanılarak tarayıcıda saklanır
- Sunucuya veri gönderilmez (gizlilik dostu)
- 30 günlük geçmiş tutulur
- Otomatik eski veri temizleme

### Takip Edilen Sayfalar
- Ana Sayfa (/)
- Hikayeler (/stories)
- Sanat Galerisi (/art)
- Hakkında (/about)
- İletişim (/contact)

### Otomatik Güncelleme
- Sayfa her 5 saniyede bir güncellenir
- Gerçek zamanlı veri takibi
- Animasyonlu sayı artışları

## 🎨 Renkler

- **Mavi** (#3b82f6): Ana Sayfa
- **Mor** (#a855f7): Hikayeler
- **Pembe** (#ec4899): Sanat Galerisi
- **Yeşil** (#10b981): Hakkında
- **Sarı** (#eab308): İletişim

## 📱 Responsive Tasarım

- Desktop: 3 sütun grid düzeni
- Tablet: 2 sütun grid düzeni
- Mobile: 1 sütun grid düzeni

## 🚀 Kullanım

1. Navbar'dan **"📊 Analitik"** linkine tıklayın
2. Veya direkt `/analytics` adresine gidin
3. Siteyi kullandıkça veriler otomatik toplanır
4. Grafikler gerçek zamanlı güncellenir

## 🧹 Veri Temizleme

Tarayıcı verilerini temizlerseniz:
- Tüm istatistikler sıfırlanır
- Yeni baştan takip başlar
- Geçmiş veriler kaybolur

## 🔒 Gizlilik

- Veriler yalnızca tarayıcınızda saklanır
- Hiçbir sunucuya gönderilmez
- IP adresi kaydedilmez
- Kişisel bilgi toplanmaz
- Session ID ile anonimleştirme
