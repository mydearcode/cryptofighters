# Crypto Fighters

2D piksel sanat dövüş oyunu - Kripto para dünyasının jargonu ve kültürüyle harmanlanmış Street Fighter tarzı dövüş deneyimi.

## Proje Hakkında

**Crypto Fighters**, blockchain terminolojisi ve kripto kültürüyle bezeli nostaljik bir dövüş oyunudur. Telegram Mini App olarak geliştirilmekte olup, modern web teknolojileri kullanılarak 960x540 çözünürlükte optimize edilmiştir.

### Özellikler

- 🥊 Street Fighter tarzı dövüş mekaniği
- 🪙 Kripto temalı saldırılar ("HODL Smash", "Liquidation Hook", vb.)
- 🏟️ Blockchain etkinliklerinden ilham alan arenalar
- 📱 Telegram Mini App uyumluluğu
- 🎮 Dokunmatik ve klavye kontrolü
- 🎨 Piksel sanat grafikleri

## Teknoloji Stack

- **Game Engine:** Phaser 3.70+
- **Language:** TypeScript 5.0+
- **Build Tool:** Vite
- **Platform:** Web (Telegram Mini App)

## Geliştirme

### Gereksinimler

- Node.js 18+
- npm veya yarn

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

### Proje Yapısı

```
src/
├── config/          # Oyun konfigürasyonları
├── scenes/          # Phaser sahneleri
├── characters/      # Karakter sınıfları
├── ui/             # Kullanıcı arayüzü bileşenleri
├── net/            # Ağ ve API işlemleri
└── main.ts         # Ana giriş noktası

assets/
├── sprites/        # Karakter ve nesne sprite'ları
├── audio/          # Ses dosyaları
└── data/           # JSON veri dosyaları

public/             # Statik dosyalar
```

## Geliştirme Yol Haritası

Detaylı geliştirme planı için [project-roadmap.md](./project-roadmap.md) dosyasına bakınız.

### Mevcut Durum: Faz 1.1 ✅

- [x] Phaser 3 proje kurulumu
- [x] Klasör yapısı oluşturma
- [x] Temel konfigürasyon
- [x] Geliştirme sunucusu
- [x] Git repository kurulumu

### Sonraki Adımlar: Faz 1.2

- [ ] Boot sahne (asset yükleme)
- [ ] Menu sahne (ana menü)
- [ ] Select sahne (karakter seçimi)
- [ ] Fight sahne (dövüş)
- [ ] Results sahne (sonuç)

## Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.

---

**Not:** Bu proje aktif geliştirme aşamasındadır. MVP (Minimum Viable Product) hedefi doğrultusunda fazlı bir yaklaşım benimsenmiştir.