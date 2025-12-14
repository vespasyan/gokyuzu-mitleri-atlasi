# VR Özelliği Kullanım Kılavuzu

## 🥽 VR Desteği Eklendi!

Gökyüzü Mitleri Atlası projesine **WebXR tabanlı VR desteği** eklendi. Artık hem **Gökyüzü Haritası** hem de **Çağdaş Sanat** bölümlerini VR cihazınızla deneyimleyebilirsiniz!

## 📱 Desteklenen Cihazlar

WebXR standardını destekleyen tüm VR cihazlarıyla uyumludur:

- **Meta Quest 1, 2, 3, Pro** ✅
- **Pico Neo 3, 4** ✅
- **HTC Vive** ✅
- **Valve Index** ✅
- **Windows Mixed Reality** ✅
- **PlayStation VR 2** (tarayıcı desteği varsa) ✅

> **Not:** Herhangi bir özel marka veya model gerekli değildir. WebXR destekli herhangi bir VR başlık kullanabilirsiniz.

## 🌐 Tarayıcı Gereksinimleri

VR özelliğini kullanmak için WebXR destekli bir tarayıcı gerekir:

- **Chrome** (Önerilen) ✅
- **Edge** ✅
- **Firefox Reality** (VR cihazlar için) ✅
- **Oculus Browser** (Meta Quest için) ✅

## 🎯 VR Modunu Kullanma

### 1. Ana Sayfa - Gökyüzü Haritası

1. [Ana sayfaya](/) gidin
2. Sağ alt köşede **"VR Modu"** butonunu bulun
3. VR başlığınızı takın
4. Butona tıklayın
5. Tarayıcı VR oturumunu başlatacak
6. Yıldızları keşfedin! 🌟

**VR'da Kontroller:**
- **Başınızı çevirin:** Etrafa bakın
- **Kontrolcüler:** Yıldızlarla etkileşim kurun
- **El izleme:** Destekleyen cihazlarda ellerinizle kontrol edin

### 2. Sanat Bölümü - Sanal Müze

1. [Sanat sayfasına](/art) gidin
2. **"3D Müze Görünümü"** butonuna tıklayın
3. Sağ alt köşede **"VR Modu"** butonunu görün
4. VR başlığınızı takın
5. VR Modu butonuna tıklayın
6. Sanal müzede gezinin! 🏛️

**Müze VR Deneyimi:**
- Sanat eserlerini yakından inceleyin
- Müzede özgürce dolaşın
- Eser bilgilerini okuyun
- 360° immersive deneyim

## 🛠️ Teknik Detaylar

### Kullanılan Teknolojiler

- **WebXR API:** Tarayıcı tabanlı VR standardı
- **Three.js & React Three Fiber:** 3D grafik motoru
- **@react-three/xr:** WebXR entegrasyonu ve VR bileşenleri
- **@react-three/drei:** 3D yardımcı bileşenler

### Özellikler

✅ **Otomatik cihaz algılama** - VR başlık yoksa buton devre dışı
✅ **Responsive tasarım** - Masaüstü ve mobilde çalışır
✅ **Performans optimizasyonu** - Yumuşak 60-90 FPS
✅ **El ve kontrolcü desteği** - Esneklik
✅ **6DOF hareket** - Tam hareket özgürlüğü

## 🔧 Geliştirici Notları

### VR Modu Ekleme (Yeni Bileşenlere)

```tsx
import { useMemo } from 'react'
import { XR, VRButton, createXRStore } from '@react-three/xr'

function MyComponent({ isVRMode }: { isVRMode: boolean }) {
  const store = useMemo(() => createXRStore(), [])
  
  return (
    <>
      <Canvas>
        {isVRMode ? (
          <XR store={store}>
            <YourScene />
          </XR>
        ) : (
          <YourScene />
        )}
      </Canvas>
      {isVRMode && <VRButton store={store} />}
    </>
  )
}
```

### VR Buton Ekleme

```tsx
import VRButton from '@/components/VRButton'

function Page() {
  const [isVRMode, setIsVRMode] = useState(false)
  
  return (
    <>
      <YourContent isVRMode={isVRMode} />
      <VRButton onVRModeChange={setIsVRMode} />
    </>
  )
}
```

## 🐛 Sorun Giderme

### "VR Desteği Yok" Mesajı

- VR başlığınızın bağlı olduğundan emin olun
- Chrome veya Edge kullanın
- Tarayıcınızı güncelleyin
- HTTPS bağlantısı kullanın (localhost hariç)

### VR Modu Çalışmıyor

- Tarayıcıya VR izinleri verin
- Başlığınızın WebXR desteklediğinden emin olun
- Sayfayı yenileyin ve tekrar deneyin

### Performans Sorunları

- Grafik kalitesini düşürün
- Arka plandaki uygulamaları kapatın
- Cihazınızı yeniden başlatın

## 📝 Lisans

Bu VR özelliği projenin lisansı altında sunulmaktadır.

## 🙏 Katkıda Bulunanlar

VR entegrasyonu GitHub Copilot tarafından oluşturulmuştur.

---

**Keyifli VR deneyimleri! 🌌🥽**
