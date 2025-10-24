# Crypto Fighters - Proje Yol Haritası

## Oyun Hakkında

**Crypto Fighters**, kripto para dünyasının jargonu ve kültürüyle harmanlanmış 2D piksel sanat dövüş oyunudur. Street Fighter tarzı klasik dövüş mekaniğini modern blockchain terminolojisiyle buluşturan bu oyun, Telegram Mini App olarak geliştirilmektedir.

Oyuncular kripto dünyasından ilham alan karakterlerle dövüşürken "HODL Smash", "Liquidation Hook", "Airdrop Kick" gibi saldırılar kullanacaklar. Token2049, Devcon gibi gerçek blockchain etkinliklerinden ilham alan arenalarda mücadele edecek, dövüş sırasında "Pump & Dump" olayları yaşayacaklar. Oyun, hem nostaljik dövüş oyunu deneyimi hem de kripto kültürünün eğlenceli bir yorumunu sunmayı hedefliyor.

Hedef platform Telegram Mini App olduğu için 960x540 çözünürlükte, dokunmatik kontrollere optimize edilmiş, hızlı yüklenen ve performanslı bir deneyim sunacak.

---

## 📊 Proje Durumu Özeti

### ✅ Tamamlanan Fazlar:
- **Faz 1.1**: Proje kurulumu ve altyapı
- **Faz 1.2**: Temel sahne sistemi
- **Faz 1.7**: Temel UI sistemi

### 🔄 Devam Eden/Kısmi Tamamlanan:
- **Faz 1.5**: Çarpışma ve hasar sistemi (temel seviye)
- **Faz 1.6**: Arena sistemi (temel tasarım)

### 🎯 Sonraki Öncelikler:
1. **Faz 1.3**: Karakter sistemi (sprite'lar ve animasyonlar)
2. **Faz 1.4**: JSON veri sistemi
3. **Faz 1.5**: Gelişmiş hitbox sistemi
4. **Faz 1.6**: Çoklu arena desteği

### 🎮 Mevcut Oynanabilir Özellikler:
- Tam sahne döngüsü (Menu → Select → Fight → Results)
- İki oyunculu dövüş (WASD vs Arrow keys)
- Temel saldırı sistemi (Space vs Shift)
- Sağlık barları ve zamanlayıcı
- Sonuç ekranı ve skor sistemi

---

## Faz 1: MVP (Minimum Viable Product) - Temel Oyun

### ✅ 1.1 Proje Kurulumu ve Altyapı **[TAMAMLANDI]**
**Hedef:** Çalışan Phaser 3 projesi ve geliştirme ortamı

- [x] Phaser 3 proje kurulumu (TypeScript + Vite)
- [x] Klasör yapısı oluşturma (`src/`, `assets/`, `public/`)
- [x] Temel konfigürasyon (960x540, 60 FPS)
- [x] Geliştirme sunucusu kurulumu
- [x] Git repository ve temel README

**Kabul Kriteri:** ✅ Boş Phaser sahne çalışır ve tarayıcıda görüntülenir.

### ✅ 1.2 Temel Sahne Sistemi **[TAMAMLANDI]**
**Hedef:** Oyun akışının iskelet yapısı

- [x] Boot sahne (asset yükleme)
- [x] Menu sahne (ana menü)
- [x] Select sahne (karakter seçimi)
- [x] Fight sahne (dövüş)
- [x] Results sahne (sonuç)
- [x] Sahneler arası geçiş sistemi

**Kabul Kriteri:** ✅ Menüden başlayarak tüm sahneler sırayla çalışır.

**Mevcut Durum:** Tam oyun döngüsü çalışıyor - Menu → Select → Fight → Results

### 🔄 1.3 Karakter Sistemi **[SONRAKİ HEDEF]**
**Hedef:** Oynanabilir karakter mekaniği

- [ ] Karakter sprite ve animasyon sistemi
- [ ] Temel durum makinesi (idle, walk, jump, attack)
- [ ] Input handling (klavye + dokunmatik)
- [ ] Karakter fizik ve hareket
- [ ] İki oyuncu kontrolü

**Kabul Kriteri:** İki karakter ekranda hareket eder ve temel saldırılar yapar.

**Mevcut Durum:** Placeholder karakterler (renkli dikdörtgenler) mevcut, gerçek sprite'lar gerekli.

### 1.4 Veri Yapıları ve JSON Sistemi
**Hedef:** Oyun verilerinin merkezi yönetimi

- [ ] `characters.json` şeması ve örnek veri
- [ ] `moves.json` şeması ve örnek veri
- [ ] `arenas.json` şeması ve örnek veri
- [ ] JSON yükleme ve erişim sistemi
- [ ] Veri doğrulama mekanizması

**Kabul Kriteri:** JSON dosyaları yüklenir ve oyun genelinde erişilebilir.

### 🔄 1.5 Çarpışma ve Hasar Sistemi **[KISMİ TAMAMLANDI]**
**Hedef:** Dövüş mekaniğinin temeli

- [x] Temel hasar hesaplama
- [x] Sağlık sistemi
- [ ] Hitbox/hurtbox sistemi (geliştirilmeli)
- [ ] Frame data implementasyonu
- [ ] Temel savunma mekaniği

**Kabul Kriteri:** Saldırılar hasar verir, sağlık azalır, raund biter.

**Mevcut Durum:** Temel hasar sistemi çalışıyor, hitbox sistemi basit mesafe kontrolü ile yapılmış.

### 1.6 Temel Arena Sistemi **[KISMİ TAMAMLANDI]**
**Hedef:** Dövüş ortamı

- [x] Arena arka plan sistemi (temel)
- [x] Zemin ve sınır tanımları
- [ ] Rastgele arena seçimi
- [ ] 2-3 temel arena tasarımı

**Kabul Kriteri:** Farklı arenalarda dövüş yapılabilir.

**Mevcut Durum:** "TOKEN2049 DUBAI ARENA" temel tasarımı mevcut.

### ✅ 1.7 Temel UI Sistemi **[TAMAMLANDI]**
**Hedef:** Oyuncu bilgilendirmesi

- [x] Sağlık barları
- [x] Raund sayacı
- [x] Süre göstergesi
- [x] Temel kontrol ipuçları

**Kabul Kriteri:** ✅ UI tüm sahnelerde tutarlı çalışır.

---

## Faz 2: Oyun Deneyimi Geliştirmeleri

### 2.1 Gelişmiş Karakter Sistemi
- [ ] Özel hareket animasyonları
- [ ] Kombo sistemi
- [ ] Enerji/mana sistemi
- [ ] Karakter özel yetenekleri

### 2.2 Kripto Teması Entegrasyonu
- [ ] Kripto jargonlu saldırı isimleri
- [ ] Durum bildirimleri ("Rekt!", "Liquidated!")
- [ ] Tema uygun ses efektleri
- [ ] Görsel efektler

### 2.3 CPU Rakip Sistemi
- [ ] AI davranış sistemi
- [ ] Zorluk seviyeleri
- [ ] CPU karakter seçimi
- [ ] Eşleşme sistemi

---

## Faz 3: İleri Özellikler

### 3.1 Event Sistemi
- [ ] Pump & Dump olayları
- [ ] Rastgele event tetikleme
- [ ] Event animasyonları ve efektleri
- [ ] Event dengeleme

### 3.2 Sponsor Sistemi
- [ ] Sponsor heal nesneleri
- [ ] Admin onay sistemi
- [ ] Sponsor logo entegrasyonu

### 3.3 Ses ve Görsel Efektler
- [ ] Kapsamlı ses kütüphanesi
- [ ] Parçacık efektleri
- [ ] Ekran sarsıntıları
- [ ] Geçiş animasyonları

---

## Faz 4: Platform Entegrasyonu

### 4.1 Telegram Mini App
- [ ] Telegram WebApp API entegrasyonu
- [ ] Kullanıcı kimlik doğrulama
- [ ] Tema uyumluluğu
- [ ] Performans optimizasyonu

### 4.2 Leaderboard Sistemi
- [ ] Skor hesaplama algoritması
- [ ] Yerel skor saklama
- [ ] Sıralama ekranı
- [ ] Sunucu entegrasyonu (opsiyonel)

---

## Faz 5: Bonus İçerikler (Opsiyonel)

### 5.1 Mini Oyunlar
- [ ] Break the Ice Save the Lambo
- [ ] Dump Rain Challenge
- [ ] Kill the Scammer
- [ ] Mini oyun skorları

### 5.2 İleri Özellikler
- [ ] Eğitim modu
- [ ] Frame data görüntüleyici
- [ ] Replay sistemi
- [ ] Turnuva modu

---

## Teknik Gereksinimler

### Performans Hedefleri
- 60 FPS sabit kare hızı
- 3 saniye altında ilk yükleme
- 10MB altında toplam boyut
- Mobil cihazlarda sorunsuz çalışım

### Uyumluluk
- Modern web tarayıcıları
- iOS Safari ve Android Chrome
- Telegram WebView
- Dokunmatik ve klavye kontrolü

### Geliştirme Araçları
- Phaser 3.70+
- TypeScript 5.0+
- Vite build sistemi
- Aseprite (sprite editörü)

---

## Başlangıç Adımları

1. **Faz 1.1'den başlayın** - Proje kurulumu kritik
2. **Her faz sonunda test edin** - Erken geri bildirim önemli
3. **MVP'yi önce tamamlayın** - Çalışan oyun en önemli hedef
4. **Performansı sürekli izleyin** - Telegram Mini App sınırları var
5. **Kullanıcı testleri yapın** - Dokunmatik kontroller kritik

Bu yol haritası esnek bir plandır. Her fazın sonunda değerlendirme yaparak sonraki adımları belirleyebilirsiniz.