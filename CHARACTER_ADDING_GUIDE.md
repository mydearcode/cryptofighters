# Yeni Karakter Ekleme Rehberi

Bu rehber, Crypto Fighters oyununa yeni bir karakter eklemek için gereken tüm adımları içerir.

## Gerekli Dosyalar ve Klasör Yapısı

### 1. Sprite Dosyaları
Yeni karakterin sprite dosyalarını `/assets/sprites/[karakter_adi]/` klasörüne yerleştirin:

**Gerekli sprite dosyaları:**
- `[karakter_adi]-combat-idle-frames.png` - Boşta durma animasyonu
- `[karakter_adi]-combat-walk-frames.png` - Yürüme animasyonu  
- `[karakter_adi]-combat-run-frames.png` - Koşma animasyonu
- `[karakter_adi]-combat-jump-frames.png` - Zıplama animasyonu
- `[karakter_adi]-combat-attack-frames.png` - Saldırı animasyonu
- `[karakter_adi]-combat-hurt-frames.png` - Hasar alma animasyonu
- `[karakter_adi]-combat-shoot-frames.png` - Atış animasyonu
- `[karakter_adi]-combat-spellcast-frames.png` - Büyü yapma animasyonu
- `[karakter_adi].png` - Varsayılan resim
- `[karakter_adi]_portrait.png` - Portre resmi

## Kod Değişiklikleri

### 1. characters.json Dosyasına Ekleme
`/src/data/characters.json` dosyasına yeni karakteri ekleyin:

```json
{
  "id": "karakter_adi",
  "name": "Karakter Adı",
  "sprite": "karakter-adi",
  "description": "Karakterin açıklaması",
  "stats": {
    "health": 100,
    "attack": 30,
    "defense": 25,
    "speed": 150
  },
  "moves": [
    "hareket1",
    "hareket2", 
    "hareket3"
  ],
  "rarity": "legendary", // legendary, epic, rare, common
  "element": "element_adi"
}
```

### 2. BootScene.ts - Sprite Yükleme
`/src/scenes/BootScene.ts` dosyasına sprite yükleme kodlarını ekleyin:

```typescript
// Karakter spritesheets
this.load.spritesheet('karakter-adi-combat-idle-frames', 'assets/sprites/karakter_adi/karakter-adi-combat-idle-frames.png', { frameWidth: 64, frameHeight: 64 })
this.load.spritesheet('karakter-adi-combat-walk-frames', 'assets/sprites/karakter_adi/karakter-adi-combat-walk-frames.png', { frameWidth: 64, frameHeight: 64 })
this.load.spritesheet('karakter-adi-combat-run-frames', 'assets/sprites/karakter_adi/karakter-adi-combat-run-frames.png', { frameWidth: 64, frameHeight: 64 })
this.load.spritesheet('karakter-adi-combat-jump-frames', 'assets/sprites/karakter_adi/karakter-adi-combat-jump-frames.png', { frameWidth: 64, frameHeight: 64 })
this.load.spritesheet('karakter-adi-combat-attack-frames', 'assets/sprites/karakter_adi/karakter-adi-combat-attack-frames.png', { frameWidth: 64, frameHeight: 64 })
this.load.spritesheet('karakter-adi-combat-hurt-frames', 'assets/sprites/karakter_adi/karakter-adi-combat-hurt-frames.png', { frameWidth: 64, frameHeight: 64 })
this.load.spritesheet('karakter-adi-combat-shoot-frames', 'assets/sprites/karakter_adi/karakter-adi-combat-shoot-frames.png', { frameWidth: 64, frameHeight: 64 })
this.load.spritesheet('karakter-adi-combat-spellcast-frames', 'assets/sprites/karakter_adi/karakter-adi-combat-spellcast-frames.png', { frameWidth: 64, frameHeight: 64 })

// Varsayılan resimler
this.load.image('karakter-adi', 'assets/sprites/karakter_adi/karakter-adi.png')
this.load.image('karakter-adi_portrait', 'assets/sprites/karakter_adi/karakter-adi_portrait.png')
```

### 3. Character.ts - Animasyon Sistemi
`/src/characters/Character.ts` dosyasında iki yer güncellenmeli:

#### A. Constructor'da karakter kontrolü ekleyin:
```typescript
if (characterId === 'karakter_adi') {
  this.createKarakterAdiAnimations(scene)
} else if (characterId === 'vitalik') {
  // mevcut kod...
}
```

#### B. Animasyon metodunu ekleyin:
```typescript
private createKarakterAdiAnimations(scene: Phaser.Scene) {
  // Idle animasyonu
  if (!scene.anims.exists('karakter_adi-idle-anim')) {
    scene.anims.create({
      key: 'karakter_adi-idle-anim',
      frames: scene.anims.generateFrameNumbers('karakter-adi-combat-idle', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1
    })
  }

  // Walk animasyonu
  if (!scene.anims.exists('karakter_adi-walk-anim')) {
    scene.anims.create({
      key: 'karakter_adi-walk-anim',
      frames: scene.anims.generateFrameNumbers('karakter-adi-walk', { start: 0, end: 7 }),
      frameRate: 12,
      repeat: -1
    })
  }

  // Attack animasyonu
  if (!scene.anims.exists('karakter_adi-attack-anim')) {
    scene.anims.create({
      key: 'karakter_adi-attack-anim',
      frames: scene.anims.generateFrameNumbers('karakter-adi-slash', { start: 0, end: 5 }),
      frameRate: 15,
      repeat: 0
    })
  }

  // Hurt animasyonu
  if (!scene.anims.exists('karakter_adi-hurt-anim')) {
    scene.anims.create({
      key: 'karakter_adi-hurt-anim',
      frames: scene.anims.generateFrameNumbers('karakter-adi-hurt', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: 0
    })
  }

  // Jump animasyonu
  if (!scene.anims.exists('karakter_adi-jump-anim')) {
    scene.anims.create({
      key: 'karakter_adi-jump-anim',
      frames: scene.anims.generateFrameNumbers('karakter-adi-jump', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 0
    })
  }

  // Shoot animasyonu
  if (!scene.anims.exists('karakter_adi-shoot-anim')) {
    scene.anims.create({
      key: 'karakter_adi-shoot-anim',
      frames: scene.anims.generateFrameNumbers('karakter-adi-shoot', { start: 0, end: 4 }),
      frameRate: 12,
      repeat: 0
    })
  }

  // Spellcast animasyonu
  if (!scene.anims.exists('karakter_adi-spellcast-anim')) {
    scene.anims.create({
      key: 'karakter_adi-spellcast-anim',
      frames: scene.anims.generateFrameNumbers('karakter-adi-spellcast', { start: 0, end: 6 }),
      frameRate: 10,
      repeat: 0
    })
  }
}
```

### 4. SelectScene.ts - Karakter Seçim Ekranı
`/src/scenes/SelectScene.ts` dosyasında iki yerde güncelleme yapın:

#### A. Karakter kartları bölümünde (createCharacterGrid metodunda):
```typescript
} else if (character.id === 'karakter_adi') {
  // Karakter için spritesheet'ten belirli frame kullan
  const sprite = this.add.sprite(x, y - 15, 'karakter-adi-combat-idle-frames', 2)  // Frame 2 kullan
    .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.height)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      this.selectCharacter(character.id)
    })
  
  this.characterSprites.push(sprite)
} else {
```

#### B. Seçilen karakter görüntüleme bölümünde (updateSelectedDisplay metodunda):
```typescript
} else if (character.id === 'karakter_adi') {
  // Karakter için spritesheet'ten belirli frame kullan
  const selectedSprite = this.add.sprite(x, y - 30, 'karakter-adi-combat-idle-frames', 2)  // Frame 2 kullan
    .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.height)
  displayElements.push(selectedSprite)
  
  // Diğer UI elementleri (isim, player indicator, vs.) ekle
  // ... (mevcut kod örneğini takip edin)
  
  return  // Erken çıkış
} else {
```

## Kontrol Listesi

- [ ] Sprite dosyaları doğru klasöre yerleştirildi
- [ ] characters.json'a karakter eklendi
- [ ] BootScene.ts'ye sprite yükleme kodları eklendi
- [ ] Character.ts'ye animasyon sistemi eklendi
- [ ] SelectScene.ts'ye karakter seçim kodları eklendi
- [ ] Oyun test edildi ve karakter görünüyor
- [ ] Karakter animasyonları çalışıyor
- [ ] Dövüş sahnesinde karakter düzgün çalışıyor

## Notlar

- Frame boyutları genellikle 64x64'tür, ancak sprite dosyalarına göre ayarlanabilir
- Animasyon frame sayıları sprite dosyalarındaki gerçek frame sayısına göre ayarlanmalıdır
- Karakter ID'si dosya adlarıyla tutarlı olmalıdır
- Rarity ve element değerleri oyun dengesini etkileyebilir

## Sorun Giderme

**Karakter görünmüyor:** BootScene.ts'de sprite yükleme kodlarını kontrol edin
**Animasyonlar çalışmıyor:** Character.ts'deki animasyon tanımlarını ve frame sayılarını kontrol edin
**Seçim ekranında sorun:** SelectScene.ts'deki sprite frame kullanımını kontrol edin
**Konsol hataları:** Dosya yollarının ve sprite isimlerinin doğru olduğundan emin olun