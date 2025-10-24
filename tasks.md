
# Crypto Fighters görev listesi

Phaser 3 ile geliştirilecek iki boyutlu piksel dövüş oyunu. Street Fighter tarzı oynanış. Telegram Mini App uyumlu web dağıtımı hedeflenir.

## A. Proje iskeleti ve temel sahneler

1. Phaser 3 proje kurulumu
   Hedef JavaScript veya TypeScript. Vite ya da Webpack ile yerel geliştirme sunucusu.
   Çözünürlük 960 x 540. Oyun döngüsü 60 FPS.

2. Klasör yapısı
   src, assets, src/scenes, src/characters, src/ui, src/config, src/net.
   public içine statik dosyalar.

3. Temel sahneler
   Boot, Menu, Select, Fight, Results.
   Boot sahnesi tüm asset ve JSON konfigürasyonları yükler.
   Menu sahnesi Start Fight seçeneği sunar.
   Select sahnesi karakter seçimi ve arena ön izlemesi içerir.
   Fight sahnesi dövüşün oynandığı ana sahnedir.
   Results sahnesi maç sonucu ve tekrar oyun seçeneklerini gösterir.

4. Veri odaklı yükleme
   Phaser Loader ile atlas ve JSON dosyaları.
   Aşağıdaki JSON’lar yüklensin ve oyun genelinde erişilebilir olsun
   characters.json
   moves.json
   arenas.json
   events.json
   sponsors.json

5. Kabul kriterleri
   Tüm sahneler art arda çalışır. Menüden Select sahnesine, oradan Fight sahnesine geçiş yapılır. Yer tutucu sprite ve arka planlar ile akış doğrulanır.

## B. Karakter ve hareket sistemi

1. Karakter seçimi
   Select sahnesinde iki oyuncu için ayrı seçim akışı. CPU seçeneği menüden belirlenebilir.

2. Animasyon ve durum makinesi
   Idle, yürüme, zıplama, eğilme, hafif yumruk, ağır yumruk, hafif tekme, ağır tekme, savunma, hasar alma, düşüş, kalkış, zafer, kaybetme.
   Animasyonlar Aseprite atlasları ve kare numaraları ile tanımlanır.

3. Hitbox ve hurtbox
   moves.json içinden kare bazlı hitbox ve hurtbox okunur.
   Startup, active, recovery değerleri kare cinsinden çalışır.
   Çarpışma anında tek tetikleme ve toparlanma penceresi uygulanır.

4. Enerji ve hasar mantığı
   Her hareketin damage, stun ve enerji maliyeti değerleri moves.json içinde bulunur.
   Savunma aktifken alınan hasar azalır.

5. Kabul kriterleri
   İki karakter aynı cihazda temel hareket ve saldırıları oynar. Çarpışma ve hasar doğru işler. Raund bitişi çalışır.

## C. Arena ve sahne yönetimi

1. Rastgele arena seçimi
   Fight başlangıcında arenas.json içinden rastgele sahne seçilir.

2. Örnek arena isimleri ve görseller
   Token2049 Dubai Arena
   Token2049 Singapore Arena
   Devcon Argentina
   Istanbul Blockchain Stage
   Ek etkinlik temalı arenalar ileride eklenecek.

3. Katmanlı arka plan
   Uzak, orta, ön katman. Basit paralaks. Zemin çizgisi ve sahne sınırları.

4. Kabul kriterleri
   Her maç başında farklı arena gelebilir. Zemin ve duvar sınırları doğru çalışır.

## D. Mid fight event sistemi

1. Pump Dump olayı
   Dövüş sırasında rastgele bir anda yorumcu karakter ekrana girer ve Market Alert duyurusu verir.
   Olay iki moddan biri olarak aktif olur.

2. Dump modu
   Tavandan kırmızı mumlar yağar. Oyuncu mumlardan kaçarsa hasar almaz.
   Muma temas eden oyuncu standart rakip darbesi kadar hasar alır.
   Olay süresi ve frekansı events.json içinde tanımlıdır.

3. Pump modu
   Zeminden yeşil mumlar yükselir. Yeşil muma temas eden oyuncu enerji kazanır.
   Healing miktarı events.json içinde tanımlıdır.

4. Kavga devamlılığı
   Event esnasında normal saldırı ve savunma akışı değişmez.

5. Kabul kriterleri
   Uyarı, aktif ve soğuma durumları ile olay doğru zamanlanır. Çarpışmalar ve etkileri beklendiği gibi işler.

## E. Sponsor heal nesneleri

1. Mantık
   Admin onayı varsa maçın ortasında sponsor logolu bir heal objesi düşer.
   Alan oyuncunun enerjisi tamamen dolar.

2. Konfigürasyon
   sponsors.json içinde sponsor adı, logo, düşme olasılığı, etkin olduğu maç aralığı alanları bulunur.
   Admin onay alanı true olana kadar nesne düşmez.

3. Kabul kriterleri
   Onaylı sponsor heal nesnesi doğru zamanda görülür ve alındığında enerji tam dolar.

## F. Kripto jargonu ve durum bildirimleri

1. Saldırı adları
   HODL Smash, Airdrop Kick, Rekt Uppercut, Liquidation Hook, Degen Dash gibi adlar moves.json içinde isim alanında tutulur.

2. Durum metinleri
   Rekt, dumped, liquidated gibi kısa durum metinleri ekran üstünde anlık olarak görünür.
   UI katmanı bu metinleri birkaç saniye gösterir.

3. Kabul kriterleri
   Saldırıya ait ad ve renkli efektler doğru zamanda görünür. Durum metinleri okunabilirdir.

## G. Oyun arayüzü

1. Sağlık ve enerji çubukları
   Üstte iki oyuncu için sağlık ve enerji barı. Değerler anlık güncellenir.

2. Raund ve süre bilgisi
   Ortada geri sayım sayacı. Süre dolunca sonuç ekranına geçiş.

3. Girdi ipuçları
   Ekranın alt kısmında hareket ipuçları. Dokunmatik ve klavye için farklı göstergeler.

4. Kabul kriterleri
   UI tüm arenalarda ve karakterlerde tutarlı çalışır. Tema karanlık ve aydınlık ile uyumludur.

## H. Eşleşme akışı ve CPU modu

1. Hızlı maç
   Oyuncu tek tuşla maç arar. Rakip bulunamazsa CPU devreye girer.

2. CPU seçimi
   CPU karakter seçimi otomatik yapılır. Zorluk seviyesi üç kademeli olur.

3. Kabul kriterleri
   Rakip bulunamadığında CPU ile maç gecikmeden başlar.

## I. Global leaderboard

1. Skor hesaplama
   Galibiyet, süre, isabet verimi ve bonus hedefleri ile puan hesaplanır.

2. Saklama
   İlk aşamada yerel ya da mock servis. Sonraki aşamada sunucuya yazılır.

3. Kabul kriterleri
   Maç bitiminde sonuçlar Results sahnesinde görünür ve sıralama ekranında listelenir.

## J. Bonus mini oyunlar

1. Break the Ice Save the Lambo
   Belirli sürede buz kırılırsa ekstra puan. Darbe başına puan artışı.

2. Dump Rain Challenge
   Sadece kaçınma odaklı mini oyun. Süre sonunda kaç mumdan kaçıldığına göre skor.

3. Kill the Scammer
   Ekrana akan mesajlar. Kötü mesajlara vur, güven veren mesajlara vurma. Hata yapınca puan kesintisi.

4. Kabul kriterleri
   Her mini oyun kendi sahnesinde bağımsız çalışır. Skorlar Results sahnesine aktarılır.

## K. Telegram Mini App uyumu

1. Başlangıç
   Telegram initData doğrulaması sunucu tarafında yapılır. Kullanıcı adı ve avatar oyun içi kartlara yansıtılır.

2. Tema
   Telegram Mini App tema değişkenleri UI bileşenlerine uygulanır.

3. Kabul kriterleri
   WebView içinde performans ve giriş akışı sorunsuzdur.

## L. Ses ve efektler

1. Ses seti
   Vuruş, savunma, özel hareket, event uyarıları için kısa sesler. OGG ve M4A çift paket.

2. VFX
   Vuruş flaşları, toz ve mum efektleri sprite atlaslarından çalışır. Alfa maliyeti düşük tutulur.

3. Kabul kriterleri
   Ses tetiklemeleri kare zamanlaması ile uyumlu olur. Efektler performansı düşürmez.

## M. Test ve dengeleme

1. Eğitim modu
   Girdi görüntüleyici ve kare verisi overlay.
   Hitbox görünür kılma seçeneği.

2. Denge
   moves.json üzerinde değer değiştirerek dengeleme. Kod değişimine gerek kalmaz.

3. Kabul kriterleri
   Eğitim sahnesi ile kare ve çarpışma sorunları hızla tespit edilir. Temel denge turu tamamlanır.

## N. Yayın ve optimizasyon

1. Paket boyutu
   Atlasların bölünmesi, görsellerin sıkıştırılması, gereksiz asset temizliği.

2. Performans
   Mobil cihazlarda 60 FPS için profil çıkarma ve mikro iyileştirmeler.

3. Kabul kriterleri
   İlk MVP build’i Telegram Mini App içinde stabil çalışır. Menüden maça giriş ve sonuç ekranı sorunsuzdur.

---


