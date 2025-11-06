import Phaser from 'phaser'

export enum ProjectileType {
  BULLET = 'bullet',
  ARROW = 'arrow',
  MAGIC = 'magic',
  FIREBALL = 'fireball',
  // Character-specific projectiles - Existing
  HODL_DIAMOND = 'hodl_diamond',
  BITCOIN_LASER = 'bitcoin_laser',
  ETHEREUM_SHARD = 'ethereum_shard',
  BINANCE_BOLT = 'binance_bolt',
  MEME_ROCKET = 'meme_rocket',
  // New character-specific projectiles
  HODL_MASTER_PROJECTILE_1 = 'HODL_MASTER_PROJECTILE_1',
  HODL_MASTER_PROJECTILE_2 = 'HODL_MASTER_PROJECTILE_2',
  TRADE_QUEEN_PROJECTILE_1 = 'TRADE_QUEEN_PROJECTILE_1',
  TRADE_QUEEN_PROJECTILE_2 = 'TRADE_QUEEN_PROJECTILE_2',
  SAYLOR_PROJECTILE_1 = 'SAYLOR_PROJECTILE_1',
  SAYLOR_PROJECTILE_2 = 'SAYLOR_PROJECTILE_2',
  DEFI_NINJA_PROJECTILE_1 = 'DEFI_NINJA_PROJECTILE_1',
  DEFI_NINJA_PROJECTILE_2 = 'DEFI_NINJA_PROJECTILE_2',
  MEME_LORD_PROJECTILE_1 = 'MEME_LORD_PROJECTILE_1',
  MEME_LORD_PROJECTILE_2 = 'MEME_LORD_PROJECTILE_2',
  VITALIK_PROJECTILE_1 = 'VITALIK_PROJECTILE_1',
  VITALIK_PROJECTILE_2 = 'VITALIK_PROJECTILE_2',
  CZ_PROJECTILE_1 = 'CZ_PROJECTILE_1',
  CZ_PROJECTILE_2 = 'CZ_PROJECTILE_2',
  ELON_PROJECTILE_1 = 'ELON_PROJECTILE_1',
  ELON_PROJECTILE_2 = 'ELON_PROJECTILE_2',
  HOSKINSON_PROJECTILE_1 = 'HOSKINSON_PROJECTILE_1',
  HOSKINSON_PROJECTILE_2 = 'HOSKINSON_PROJECTILE_2',
  GAVIN_PROJECTILE_1 = 'GAVIN_PROJECTILE_1',
  GAVIN_PROJECTILE_2 = 'GAVIN_PROJECTILE_2',
  BRIAN_PROJECTILE_1 = 'BRIAN_PROJECTILE_1',
  BRIAN_PROJECTILE_2 = 'BRIAN_PROJECTILE_2',
  JESSE_PROJECTILE_1 = 'JESSE_PROJECTILE_1',
  JESSE_PROJECTILE_2 = 'JESSE_PROJECTILE_2',
  // New projectiles from existing SVGs
  BITCOIN_CIRCLE = 'bitcoin_circle',
  ETHEREUM_ALT = 'ethereum_alt',
  BINANCE_COIN = 'binance_coin',
  DOGE_COIN = 'doge_coin',
  DIAMOND_ORIGAMI = 'diamond_origami',
  FIRE_BOMB = 'fire_bomb',
  FIRE_BLAST = 'fire_blast',
  BOMB_CLASSIC = 'bomb_classic',
  BOMB_ADVANCED = 'bomb_advanced',
  ROCKET_CLASSIC = 'rocket_classic',
  ROCKET_ADVANCED = 'rocket_advanced',
  MOON_CLASSIC = 'moon_classic',
  MOON_STARS = 'moon_stars',
  MOON_ADVANCED = 'moon_advanced',
  SPACE_BLAST = 'space_blast',
  SPACE_COSMOS = 'space_cosmos',
  COMPUTER_CHIP = 'computer_chip',
  BLOCKCHAIN_SECURITY = 'blockchain_security',
  CANDLE_STICKS = 'candle_sticks',
  EXCHANGE_DOLLAR = 'exchange_dollar',
  HOLD_POWER = 'hold_power',
  TRENDING_DOWN = 'trending_down',
  ANNOUNCEMENT = 'announcement',
  NINJA_STAR = 'ninja_star',
  SWORD_HEAVY = 'sword_heavy',
  CARDANO_COIN = 'cardano_coin',
  ACADEMIC_PAPER = 'academic_paper',
  POLKADOT_CHAIN = 'polkadot_chain',
  COINBASE_COIN = 'coinbase_coin',
  BASE_LAYER = 'base_layer'
}

export class Projectile extends Phaser.GameObjects.Container {
  private projectileSprite!: Phaser.GameObjects.GameObject
  private velocity: { x: number, y: number }
  private damage: number
  private lifespan: number
  private maxLifespan: number
  private projectileType: ProjectileType
  private owner: any // Reference to the character who fired this projectile
  
  // Wave motion properties
  private waveAmplitude: number = 0
  private waveFrequency: number = 0
  private waveTime: number = 0
  private initialY: number = 0
  private hasWaveMotion: boolean = false

  // Glow effect properties
  private glowTime: number = 0
  private glowIntensity: number = 1
  private glowSpeed: number = 3
  private hasGlowEffect: boolean = true
  private glowSprite?: Phaser.GameObjects.Graphics
  private glowColors: number[] = [0x40E0D0, 0xFF8C00] // Turquoise and Orange

  constructor(
    scene: Phaser.Scene, 
    x: number, 
    y: number, 
    projectileType: ProjectileType,
    direction: number, // 1 for right, -1 for left
    damage: number,
    owner: any
  ) {
    super(scene, x, y)
    
    this.projectileType = projectileType
    this.damage = damage
    this.owner = owner
    this.lifespan = 0
    this.maxLifespan = 2000 // 2 seconds max lifespan
    this.initialY = y // Store initial Y position for wave motion
    
    // DEBUG: Console log to see which projectile type is being created
    console.log(`🚀 PROJECTILE CREATED: ${projectileType} by ${owner?.characterId || 'unknown'}`)
    
    // Set velocity based on projectile type and direction
    switch (projectileType) {
      case ProjectileType.BULLET:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createBullet()
        this.setupWaveMotion(30, 10)
        break
      case ProjectileType.ARROW:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createArrow()
        this.setupWaveMotion(35, 9)
        break
      case ProjectileType.MAGIC:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createMagicOrb()
        this.setupWaveMotion(40, 8)
        break
      case ProjectileType.FIREBALL:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createFireball()
        this.setupWaveMotion(35, 9)
        break
      // Character-specific projectiles
      case ProjectileType.HODL_DIAMOND:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createHodlDiamond()
        this.setupWaveMotion(40, 8)
        break
      case ProjectileType.BITCOIN_LASER:
        this.velocity = { x: 750 * direction, y: 0 }
        this.createBitcoinCircle()
        this.setupWaveMotion(30, 12)
        break
      case ProjectileType.ETHEREUM_SHARD:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createEthereumShard()
        this.setupWaveMotion(35, 10)
        break
      case ProjectileType.BINANCE_BOLT:
        this.velocity = { x: 700 * direction, y: 0 }
        this.createBinanceBolt()
        this.setupWaveMotion(30, 11)
        break
      case ProjectileType.MEME_ROCKET:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createMemeRocket()
        this.setupWaveMotion(35, 10)
        break
      // New projectiles from existing SVGs
      case ProjectileType.BITCOIN_CIRCLE:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createBitcoinCircle()
        this.setupWaveMotion(35, 10)
        break
      case ProjectileType.ETHEREUM_ALT:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createEthereumAlt()
        this.setupWaveMotion(35, 10)
        break
      case ProjectileType.BINANCE_COIN:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createBinanceCoin()
        this.setupWaveMotion(30, 10)
        break
      case ProjectileType.DOGE_COIN:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createDogeCoin()
        this.setupWaveMotion(35, 9)
        break
      case ProjectileType.DIAMOND_ORIGAMI:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createDiamondOrigami()
        this.setupWaveMotion(40, 8)
        break
      case ProjectileType.FIRE_BOMB:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createFireBomb()
        this.setupWaveMotion(40, 8)
        break
      case ProjectileType.FIRE_BLAST:
        this.velocity = { x: 700 * direction, y: 0 }
        this.createFireBlast()
        this.setupWaveMotion(30, 11)
        break
      case ProjectileType.BOMB_CLASSIC:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createBombClassic()
        this.setupWaveMotion(45, 7)
        break
      case ProjectileType.BOMB_ADVANCED:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createBombAdvanced()
        this.setupWaveMotion(45, 7)
        break
      case ProjectileType.ROCKET_CLASSIC:
        this.velocity = { x: 750 * direction, y: 0 }
        this.createRocketClassic()
        this.setupWaveMotion(30, 12)
        break
      case ProjectileType.ROCKET_ADVANCED:
        this.velocity = { x: 800 * direction, y: 0 }
        this.createRocketAdvanced()
        this.setupWaveMotion(25, 14)
        break
      case ProjectileType.MOON_CLASSIC:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createMoonClassic()
        this.setupWaveMotion(40, 8)
        break
      case ProjectileType.MOON_STARS:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createMoonStars()
        this.setupWaveMotion(40, 8)
        break
      case ProjectileType.MOON_ADVANCED:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createMoonAdvanced()
        this.setupWaveMotion(35, 9)
        break
      case ProjectileType.SPACE_BLAST:
        this.velocity = { x: 850 * direction, y: 0 }
        this.createSpaceBlast()
        this.setupWaveMotion(25, 15)
        break
      case ProjectileType.SPACE_COSMOS:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createSpaceCosmos()
        this.setupWaveMotion(30, 10)
        break
      case ProjectileType.COMPUTER_CHIP:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createComputerChip()
        this.setupWaveMotion(35, 10)
        break
      case ProjectileType.BLOCKCHAIN_SECURITY:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createBlockchainSecurity()
        this.setupWaveMotion(35, 10)
        break
      case ProjectileType.CANDLE_STICKS:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createCandleSticks()
        this.setupWaveMotion(40, 8)
        break
      case ProjectileType.EXCHANGE_DOLLAR:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createExchangeDollar()
        this.setupWaveMotion(30, 10)
        break
      case ProjectileType.HOLD_POWER:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createHoldPower()
        this.setupWaveMotion(40, 8)
        break
      case ProjectileType.TRENDING_DOWN:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createTrendingDown()
        this.setupWaveMotion(35, 10)
        break
      case ProjectileType.ANNOUNCEMENT:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createAnnouncement()
        this.setupWaveMotion(35, 9)
        break
      case ProjectileType.NINJA_STAR:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createNinjaStar()
        this.setupWaveMotion(30, 10)
        break
      case ProjectileType.SWORD_HEAVY:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createSwordHeavy()
        this.setupWaveMotion(40, 8)
        break
      case ProjectileType.CARDANO_COIN:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createCardanoCoin()
        this.setupWaveMotion(35, 10)
        break
      case ProjectileType.ACADEMIC_PAPER:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createAcademicPaper()
        this.setupWaveMotion(35, 9)
        break
      case ProjectileType.POLKADOT_CHAIN:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createPolkadotChain()
        this.setupWaveMotion(35, 10)
        break
      case ProjectileType.COINBASE_COIN:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createCoinbaseCoin()
        this.setupWaveMotion(30, 10)
        break
      case ProjectileType.BASE_LAYER:
        this.velocity = { x: 700 * direction, y: 0 }
        this.createBaseLayer()
        this.setupWaveMotion(30, 11)
        break
      // Character-specific projectiles
      case ProjectileType.HODL_MASTER_PROJECTILE_1:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createDiamondOrigami()
        this.setupWaveMotion(40, 8)
        break
      case ProjectileType.HODL_MASTER_PROJECTILE_2:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createHoldPower()
        this.setupWaveMotion(40, 8)
        break
      case ProjectileType.TRADE_QUEEN_PROJECTILE_1:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createCandleSticks()
        this.setupWaveMotion(30, 10)
        break
      case ProjectileType.TRADE_QUEEN_PROJECTILE_2:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createExchangeDollar()
        this.setupWaveMotion(35, 10)
        break
      case ProjectileType.SAYLOR_PROJECTILE_1:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createBitcoinCircle()
        this.setupWaveMotion(35, 10) // Fast vertical oscillation for fast projectile
        break
      case ProjectileType.SAYLOR_PROJECTILE_2:
        this.velocity = { x: 750 * direction, y: 0 }
        this.createBlockchainSecurity()
        this.setupWaveMotion(30, 12) // Very fast vertical oscillation for very fast projectile
        break
      case ProjectileType.DEFI_NINJA_PROJECTILE_1:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createComputerChip()
        this.setupWaveMotion(30, 10)
        break
      case ProjectileType.DEFI_NINJA_PROJECTILE_2:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createSwordHeavy()
        this.setupWaveMotion(40, 8)
        break
      case ProjectileType.MEME_LORD_PROJECTILE_1:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createRocketAdvanced()
        this.setupWaveMotion(35, 9)
        break
      case ProjectileType.MEME_LORD_PROJECTILE_2:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createMoonStars()
        this.setupWaveMotion(35, 10)
        break
      case ProjectileType.VITALIK_PROJECTILE_1:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createEthereumAlt()
        this.setupWaveMotion(35, 10)
        break
      case ProjectileType.VITALIK_PROJECTILE_2:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createFireBlast()
        this.setupWaveMotion(35, 10)
        break
      case ProjectileType.CZ_PROJECTILE_1:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createBinanceCoin()
        this.setupWaveMotion(30, 10)
        break
      case ProjectileType.CZ_PROJECTILE_2:
        this.velocity = { x: 700 * direction, y: 0 }
        this.createAnnouncement()
        this.setupWaveMotion(30, 11)
        break
      case ProjectileType.ELON_PROJECTILE_1:
        this.velocity = { x: 750 * direction, y: 0 }
        this.createDogeCoin()
        this.setupWaveMotion(30, 12)
        break
      case ProjectileType.ELON_PROJECTILE_2:
        this.velocity = { x: 800 * direction, y: 0 }
        this.createRocketAdvanced()
        this.setupWaveMotion(25, 14)
        break
      case ProjectileType.HOSKINSON_PROJECTILE_1:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createBitcoinCircle()
        this.setupWaveMotion(35, 10)
        break
      case ProjectileType.HOSKINSON_PROJECTILE_2:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createFireBomb()
        this.setupWaveMotion(35, 9)
        break
      case ProjectileType.GAVIN_PROJECTILE_1:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createEthereumShard()
        this.setupWaveMotion(35, 10)
        break
      case ProjectileType.GAVIN_PROJECTILE_2:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createBlockchainSecurity()
        this.setupWaveMotion(35, 10)
        break
      case ProjectileType.BRIAN_PROJECTILE_1:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createBinanceBolt()
        this.setupWaveMotion(30, 10)
        break
      case ProjectileType.BRIAN_PROJECTILE_2:
        this.velocity = { x: 700 * direction, y: 0 }
        this.createFireBlast()
        this.setupWaveMotion(30, 11)
        break
      case ProjectileType.JESSE_PROJECTILE_1:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createHodlDiamond()
        this.setupWaveMotion(40, 8) // Fast vertical oscillation for slower projectile
        break
      case ProjectileType.JESSE_PROJECTILE_2:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createComputerChip()
        this.setupWaveMotion(35, 10) // Fast vertical oscillation for medium speed projectile
        break
      default:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createBullet()
        this.setupWaveMotion(30, 10)
        break
    }
    
    // Initialize glow effect for all projectiles
    this.setupGlowEffect()
    
    scene.add.existing(this)
  }

  private createBullet() {
    // Simple yellow rectangle for bullet
    this.projectileSprite = this.scene.add.rectangle(0, 0, 8, 3, 0xFFFF00)
    this.add(this.projectileSprite)
  }

  private createArrow() {
    // Brown rectangle with pointed end for arrow
    this.projectileSprite = this.scene.add.rectangle(0, 0, 12, 2, 0x8B4513)
    this.add(this.projectileSprite)
  }

  private createMagicOrb() {
    // Purple glowing circle for magic
    this.projectileSprite = this.scene.add.circle(0, 0, 6, 0x9932CC)
    this.add(this.projectileSprite)
  }

  private createFireball() {
    // Orange-red circle for fireball
    this.projectileSprite = this.scene.add.circle(0, 0, 8, 0xFF4500)
    this.add(this.projectileSprite)
  }

  // Character-specific projectile creation methods
  private createHodlDiamond() {
    // Load SVG image for HODL diamond
    console.log(`💎 HODL_DIAMOND using SVG: diamond-origami-paper-svgrepo-com`)
    this.projectileSprite = this.scene.add.image(0, 0, 'diamond-origami-paper-svgrepo-com')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createMemeRocket() {
    // Load SVG image for Meme rocket
    console.log(`🚀 MEME_ROCKET using SVG: rocket-svgrepo-com_2`)
    this.projectileSprite = this.scene.add.image(0, 0, 'rocket-svgrepo-com_2')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  // New projectile creation methods
  private createBitcoinCircle() {
    console.log(`₿ BITCOIN_CIRCLE using SVG: bitcoin-circle`)
    this.projectileSprite = this.scene.add.image(0, 0, 'bitcoin-circle')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createEthereumShard() {
    console.log(`⟠ ETHEREUM_SHARD using SVG: circle-dashed-svgrepo-com`)
    this.projectileSprite = this.scene.add.image(0, 0, 'circle-dashed-svgrepo-com')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createEthereumAlt() {
    console.log(`⟠ ETHEREUM_ALT using SVG: ethereum-svgrepo-com_2`)
    this.projectileSprite = this.scene.add.image(0, 0, 'ethereum-svgrepo-com_2')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createBinanceCoin() {
    console.log(`🟡 BINANCE_COIN using SVG: binance-svgrepo-com`)
    this.projectileSprite = this.scene.add.image(0, 0, 'binance-svgrepo-com')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createBinanceBolt() {
    console.log(`⚡ BINANCE_BOLT using SVG: coinbase-v2-svgrepo-com`)
    this.projectileSprite = this.scene.add.image(0, 0, 'coinbase-v2-svgrepo-com')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createDogeCoin() {
    console.log(`🐕 DOGE_COIN using SVG: space-2-svgrepo-com`)
    this.projectileSprite = this.scene.add.image(0, 0, 'space-2-svgrepo-com')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createDiamondOrigami() {
    console.log(`💎 DIAMOND_ORIGAMI using SVG: diamond-origami`)
    this.projectileSprite = this.scene.add.image(0, 0, 'diamond-origami')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createFireBomb() {
    console.log(`💣 FIRE_BOMB using SVG: fire-bomb`)
    this.projectileSprite = this.scene.add.image(0, 0, 'fire-bomb')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createFireBlast() {
    console.log(`🔥 FIRE_BLAST using SVG: computer-chip-svgrepo-com`)
    this.projectileSprite = this.scene.add.image(0, 0, 'computer-chip-svgrepo-com')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createBombClassic() {
    console.log(`💣 BOMB_CLASSIC using SVG: bomb-classic`)
    this.projectileSprite = this.scene.add.image(0, 0, 'bomb-classic')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createBombAdvanced() {
    console.log(`💣 BOMB_ADVANCED using SVG: bomb-advanced`)
    this.projectileSprite = this.scene.add.image(0, 0, 'bomb-advanced')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createRocketClassic() {
    console.log(`🚀 ROCKET_CLASSIC using SVG: rocket-classic`)
    this.projectileSprite = this.scene.add.image(0, 0, 'rocket-classic')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createRocketAdvanced() {
    console.log(`🚀 ROCKET_ADVANCED using SVG: rocket-svgrepo-com`)
    this.projectileSprite = this.scene.add.image(0, 0, 'rocket-svgrepo-com')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createMoonClassic() {
    this.projectileSprite = this.scene.add.image(0, 0, 'moon-classic')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createMoonStars() {
    this.projectileSprite = this.scene.add.image(0, 0, 'pile-of-poo-svgrepo-com')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createMoonAdvanced() {
    this.projectileSprite = this.scene.add.image(0, 0, 'moon-advanced')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createSpaceBlast() {
    this.projectileSprite = this.scene.add.image(0, 0, 'space-blast')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createSpaceCosmos() {
    this.projectileSprite = this.scene.add.image(0, 0, 'space-cosmos')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createComputerChip() {
    console.log(`💻 COMPUTER_CHIP using SVG: computer-chip-svgrepo-com`)
    this.projectileSprite = this.scene.add.image(0, 0, 'computer-chip')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createBlockchainSecurity() {
    console.log('🔐 BLOCKCHAIN_SECURITY using SVG: blockchain-security-svgrepo-com')
    this.projectileSprite = this.scene.add.image(0, 0, 'blockchain-security')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createCandleSticks() {
    this.projectileSprite = this.scene.add.image(0, 0, 'candle-sticks')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createExchangeDollar() {
    this.projectileSprite = this.scene.add.image(0, 0, 'exchange-dollar')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createHoldPower() {
    console.log(`💪 HOLD_POWER using SVG: hold-power`)
    this.projectileSprite = this.scene.add.image(0, 0, 'hold-power')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createTrendingDown() {
    console.log(`📉 TRENDING_DOWN using SVG: trending-down`)
    this.projectileSprite = this.scene.add.image(0, 0, 'trending-down')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createAnnouncement() {
    console.log(`📢 ANNOUNCEMENT using SVG: announcement-shout-svgrepo-com`)
    this.projectileSprite = this.scene.add.image(0, 0, 'announcement-shout-svgrepo-com')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createNinjaStar() {
    console.log(`⭐ NINJA_STAR using SVG: ninja-star-svgrepo-com`)
    this.projectileSprite = this.scene.add.image(0, 0, 'ninja-star-svgrepo-com')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createSwordHeavy() {
    console.log(`⚔️ SWORD_HEAVY using SVG: sword-heavy-svgrepo-com`)
    this.projectileSprite = this.scene.add.image(0, 0, 'sword-heavy-svgrepo-com')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createCardanoCoin() {
    console.log(`🪙 CARDANO_COIN using SVG: bitcoin-svgrepo-com`)
    this.projectileSprite = this.scene.add.image(0, 0, 'bitcoin-svgrepo-com')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createAcademicPaper() {
    console.log(`📄 ACADEMIC_PAPER using SVG: fire-bomb-svgrepo-com`)
    this.projectileSprite = this.scene.add.image(0, 0, 'fire-bomb-svgrepo-com')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createPolkadotChain() {
    console.log(`🔗 POLKADOT_CHAIN using SVG: blockchain-digital-future-system-security-svgrepo-com`)
    this.projectileSprite = this.scene.add.image(0, 0, 'blockchain-digital-future-system-security-svgrepo-com')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createCoinbaseCoin() {
    console.log(`🌙 COINBASE_COIN using SVG: moon-svgrepo-com`)
    this.projectileSprite = this.scene.add.image(0, 0, 'moon-svgrepo-com')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  private createBaseLayer() {
    console.log(`💻 BASE_LAYER using SVG: computer-chip-svgrepo-com`)
    this.projectileSprite = this.scene.add.image(0, 0, 'computer-chip-svgrepo-com')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(40, 40)
    this.add(this.projectileSprite)
  }

  public update(deltaTime: number) {
    // Update position
    this.x += this.velocity.x * deltaTime / 1000
    this.y += this.velocity.y * deltaTime / 1000
    
    // Update wave motion (this will override y position if wave motion is enabled)
    this.updateWaveMotion(deltaTime)
    
    // Update glow effect
    this.updateGlowEffect(deltaTime)
    
    // Update lifespan
    this.lifespan += deltaTime
    
    // Check if projectile should be destroyed
    if (this.lifespan >= this.maxLifespan || this.isOffScreen()) {
      this.destroy()
      return false
    }
    
    return true
  }

  private isOffScreen(): boolean {
    const camera = this.scene.cameras.main
    return (
      this.x < camera.scrollX - 50 ||
      this.x > camera.scrollX + camera.width + 50 ||
      this.y < camera.scrollY - 50 ||
      this.y > camera.scrollY + camera.height + 50
    )
  }

  public getDamage(): number {
    return this.damage
  }

  public getOwner(): any {
    return this.owner
  }

  // Wave motion functions
  private setupWaveMotion(amplitude: number, frequency: number) {
    this.waveAmplitude = amplitude
    this.waveFrequency = frequency
    this.waveTime = 0
    this.hasWaveMotion = true
  }

  private updateWaveMotion(deltaTime: number) {
    if (!this.hasWaveMotion) return
    
    this.waveTime += deltaTime * 0.001 // Convert to seconds
    const waveOffset = Math.sin(this.waveTime * this.waveFrequency) * this.waveAmplitude
    this.y = this.initialY + waveOffset
  }

  private setupGlowEffect() {
    this.hasGlowEffect = true
    this.glowTime = 0
    this.glowIntensity = 1
    this.glowSpeed = 1.5 // Slower, more subtle pulsing
    
    // Create separate glow sprite for SVG projectiles
    if (this.projectileSprite instanceof Phaser.GameObjects.Image) {
      this.createGlowSprite()
    }
  }

  private createGlowSprite() {
    // Create a graphics object for the glow effect
    this.glowSprite = this.scene.add.graphics()
    
    // Add it to the container behind the main projectile
    this.add(this.glowSprite)
    this.sendToBack(this.glowSprite)
    
    // Set initial glow properties
    this.updateGlowSprite(0.5) // Start with medium intensity
  }

  private updateGlowSprite(intensity: number) {
    if (!this.glowSprite) return
    
    this.glowSprite.clear()
    
    // Choose random color from turquoise and orange (less frequently)
    const colorIndex = Math.floor(this.glowTime / 2000) % this.glowColors.length // Change color every 2 seconds
    const glowColor = this.glowColors[colorIndex]
    
    // Create balanced feather-like glow effect with multiple layers
    const baseSize = 45 // Slightly larger base size
    const glowSize = baseSize + intensity * 15 // More size variation
    
    // Outer glow (larger, more visible on dark backgrounds)
    this.glowSprite.fillStyle(glowColor, 0.12 + intensity * 0.18) // More visible
    this.glowSprite.fillEllipse(0, 0, glowSize * 1.4, glowSize * 0.8)
    
    // Middle glow (increased opacity)
    this.glowSprite.fillStyle(glowColor, 0.15 + intensity * 0.2)
    this.glowSprite.fillEllipse(0, 0, glowSize * 1.0, glowSize * 0.6)
    
    // Inner glow (more intense but still balanced)
    this.glowSprite.fillStyle(glowColor, 0.18 + intensity * 0.25)
    this.glowSprite.fillEllipse(0, 0, glowSize * 0.6, glowSize * 0.35)
    
    // Add a subtle center highlight for better visibility
    this.glowSprite.fillStyle(glowColor, 0.08 + intensity * 0.12)
    this.glowSprite.fillEllipse(0, 0, glowSize * 0.3, glowSize * 0.2)
  }

  private updateGlowEffect(deltaTime: number) {
    if (!this.hasGlowEffect || !this.projectileSprite) return
    
    this.glowTime += deltaTime * 0.001 * this.glowSpeed
    
    // Create pulsing glow effect using sine wave
    const glowValue = Math.sin(this.glowTime) // Oscillates between -1 and 1
    const intensity = (glowValue + 1) * 0.5 // Convert -1,1 to 0,1
    
    // Check if this is an SVG-based projectile (Image type)
    if (this.projectileSprite instanceof Phaser.GameObjects.Image) {
      // For SVG projectiles, update the separate glow sprite
      this.updateGlowSprite(intensity)
      
    } else {
      // For non-SVG projectiles (shapes), use tint and alpha
      if (this.projectileSprite instanceof Phaser.GameObjects.Sprite) {
        // Create dramatic color pulsing effect - optimized for dark/black projectiles
        if (intensity > 0.7) {
          // Bright cyan/electric blue - very visible on dark objects
          this.projectileSprite.setTint(0x00ffff)
        } else if (intensity > 0.4) {
          // Bright green - excellent contrast with black
          this.projectileSprite.setTint(0x00ff00)
        } else {
          // Bright magenta/pink - stands out on any dark surface
          this.projectileSprite.setTint(0xff00ff)
        }
        
        // Very dramatic alpha pulsing for maximum visibility
        this.projectileSprite.setAlpha(0.3 + intensity * 0.7) // Alpha between 0.3 and 1.0
      }
    }
  }

  public getHitbox(): Phaser.Geom.Rectangle {
    return new Phaser.Geom.Rectangle(
      this.x - 6,
      this.y - 6,
      12,
      12
    )
  }

  public destroy() {
    if (this.projectileSprite) {
      this.projectileSprite.destroy()
    }
    if (this.glowSprite) {
      this.glowSprite.destroy()
    }
    super.destroy()
  }
}