import Phaser from 'phaser'

export enum ProjectileType {
  BULLET = 'bullet',
  ARROW = 'arrow',
  MAGIC = 'magic',
  FIREBALL = 'fireball',
  // Character-specific projectiles - Existing
  HODL_DIAMOND = 'hodl_diamond',
  TRADE_COIN = 'trade_coin',
  BITCOIN_LASER = 'bitcoin_laser',
  ETHEREUM_SHARD = 'ethereum_shard',
  BINANCE_BOLT = 'binance_bolt',
  TESLA_SPARK = 'tesla_spark',
  CARDANO_WAVE = 'cardano_wave',
  POLKADOT_LINK = 'polkadot_link',
  CRYPTO_PUNCH = 'crypto_punch',
  NINJA_STAR = 'ninja_star',
  DEFI_ORB = 'defi_orb',
  MEME_ROCKET = 'meme_rocket',
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
  ANNOUNCEMENT = 'announcement'
}

export class Projectile extends Phaser.GameObjects.Container {
  private projectileSprite!: Phaser.GameObjects.GameObject
  private velocity: { x: number, y: number }
  private damage: number
  private lifespan: number
  private maxLifespan: number
  private projectileType: ProjectileType
  private owner: any // Reference to the character who fired this projectile

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
    
    // Set velocity based on projectile type and direction
    switch (projectileType) {
      case ProjectileType.BULLET:
        this.velocity = { x: 600 * direction, y: 0 }
        this.createBullet()
        break
      case ProjectileType.ARROW:
        this.velocity = { x: 500 * direction, y: 0 }
        this.createArrow()
        break
      case ProjectileType.MAGIC:
        this.velocity = { x: 400 * direction, y: 0 }
        this.createMagicOrb()
        break
      case ProjectileType.FIREBALL:
        this.velocity = { x: 450 * direction, y: 0 }
        this.createFireball()
        break
      // Character-specific projectiles
      case ProjectileType.HODL_DIAMOND:
        this.velocity = { x: 350 * direction, y: 0 }
        this.createHodlDiamond()
        break
      case ProjectileType.TRADE_COIN:
        this.velocity = { x: 550 * direction, y: 0 }
        this.createTradeCoin()
        break
      case ProjectileType.BITCOIN_LASER:
        this.velocity = { x: 700 * direction, y: 0 }
        this.createBitcoinLaser()
        break
      case ProjectileType.ETHEREUM_SHARD:
        this.velocity = { x: 500 * direction, y: 0 }
        this.createEthereumShard()
        break
      case ProjectileType.BINANCE_BOLT:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createBinanceBolt()
        break
      case ProjectileType.TESLA_SPARK:
        this.velocity = { x: 600 * direction, y: 0 }
        this.createTeslaSpark()
        break
      case ProjectileType.CARDANO_WAVE:
        this.velocity = { x: 400 * direction, y: 0 }
        this.createCardanoWave()
        break
      case ProjectileType.POLKADOT_LINK:
        this.velocity = { x: 450 * direction, y: 0 }
        this.createPolkadotLink()
        break
      case ProjectileType.CRYPTO_PUNCH:
        this.velocity = { x: 300 * direction, y: 0 }
        this.createCryptoPunch()
        break
      case ProjectileType.NINJA_STAR:
        this.velocity = { x: 750 * direction, y: 0 }
        this.createNinjaStar()
        break
      case ProjectileType.DEFI_ORB:
        this.velocity = { x: 400 * direction, y: 0 }
        this.createDefiOrb()
        break
      case ProjectileType.MEME_ROCKET:
        this.velocity = { x: 500 * direction, y: 0 }
        this.createMemeRocket()
        break
      // New projectiles from existing SVGs
      case ProjectileType.BITCOIN_CIRCLE:
        this.velocity = { x: 550 * direction, y: 0 }
        this.createBitcoinCircle()
        break
      case ProjectileType.ETHEREUM_ALT:
        this.velocity = { x: 500 * direction, y: 0 }
        this.createEthereumAlt()
        break
      case ProjectileType.BINANCE_COIN:
        this.velocity = { x: 600 * direction, y: 0 }
        this.createBinanceCoin()
        break
      case ProjectileType.DOGE_COIN:
        this.velocity = { x: 450 * direction, y: 0 }
        this.createDogeCoin()
        break
      case ProjectileType.DIAMOND_ORIGAMI:
        this.velocity = { x: 400 * direction, y: 0 }
        this.createDiamondOrigami()
        break
      case ProjectileType.FIRE_BOMB:
        this.velocity = { x: 350 * direction, y: 0 }
        this.createFireBomb()
        break
      case ProjectileType.FIRE_BLAST:
        this.velocity = { x: 650 * direction, y: 0 }
        this.createFireBlast()
        break
      case ProjectileType.BOMB_CLASSIC:
        this.velocity = { x: 300 * direction, y: 0 }
        this.createBombClassic()
        break
      case ProjectileType.BOMB_ADVANCED:
        this.velocity = { x: 320 * direction, y: 0 }
        this.createBombAdvanced()
        break
      case ProjectileType.ROCKET_CLASSIC:
        this.velocity = { x: 700 * direction, y: 0 }
        this.createRocketClassic()
        break
      case ProjectileType.ROCKET_ADVANCED:
        this.velocity = { x: 750 * direction, y: 0 }
        this.createRocketAdvanced()
        break
      case ProjectileType.MOON_CLASSIC:
        this.velocity = { x: 400 * direction, y: 0 }
        this.createMoonClassic()
        break
      case ProjectileType.MOON_STARS:
        this.velocity = { x: 420 * direction, y: 0 }
        this.createMoonStars()
        break
      case ProjectileType.MOON_ADVANCED:
        this.velocity = { x: 450 * direction, y: 0 }
        this.createMoonAdvanced()
        break
      case ProjectileType.SPACE_BLAST:
        this.velocity = { x: 800 * direction, y: 0 }
        this.createSpaceBlast()
        break
      case ProjectileType.SPACE_COSMOS:
        this.velocity = { x: 600 * direction, y: 0 }
        this.createSpaceCosmos()
        break
      case ProjectileType.COMPUTER_CHIP:
        this.velocity = { x: 550 * direction, y: 0 }
        this.createComputerChip()
        break
      case ProjectileType.BLOCKCHAIN_SECURITY:
        this.velocity = { x: 500 * direction, y: 0 }
        this.createBlockchainSecurity()
        break
      case ProjectileType.CANDLE_STICKS:
        this.velocity = { x: 400 * direction, y: 0 }
        this.createCandleSticks()
        break
      case ProjectileType.EXCHANGE_DOLLAR:
        this.velocity = { x: 600 * direction, y: 0 }
        this.createExchangeDollar()
        break
      case ProjectileType.HOLD_POWER:
        this.velocity = { x: 350 * direction, y: 0 }
        this.createHoldPower()
        break
      case ProjectileType.TRENDING_DOWN:
        this.velocity = { x: 500 * direction, y: 0 }
        this.createTrendingDown()
        break
      case ProjectileType.ANNOUNCEMENT:
        this.velocity = { x: 450 * direction, y: 0 }
        this.createAnnouncement()
        break
      default:
        this.velocity = { x: 400 * direction, y: 0 }
        this.createBullet()
        break
    }
    
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
    this.projectileSprite = this.scene.add.image(0, 0, 'hodl_diamond')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createTradeCoin() {
    // Load SVG image for Trade coin
    this.projectileSprite = this.scene.add.image(0, 0, 'trade_coin')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createBitcoinLaser() {
    // Load SVG image for Bitcoin laser
    this.projectileSprite = this.scene.add.image(0, 0, 'bitcoin')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createEthereumShard() {
    // Load SVG image for Ethereum shard
    this.projectileSprite = this.scene.add.image(0, 0, 'ethereum')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createBinanceBolt() {
    // Load SVG image for Binance bolt
    this.projectileSprite = this.scene.add.image(0, 0, 'binance_bolt')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createTeslaSpark() {
    // Load SVG image for Tesla spark
    this.projectileSprite = this.scene.add.image(0, 0, 'tesla')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createCardanoWave() {
    // Load SVG image for Cardano wave
    this.projectileSprite = this.scene.add.image(0, 0, 'cardano_wave')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createPolkadotLink() {
    // Load SVG image for Polkadot link
    this.projectileSprite = this.scene.add.image(0, 0, 'polkadot_link')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createCryptoPunch() {
    // Load SVG image for Crypto punch
    this.projectileSprite = this.scene.add.image(0, 0, 'crypto_punch')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createNinjaStar() {
    // Load SVG image for Ninja star
    this.projectileSprite = this.scene.add.image(0, 0, 'ninja_star')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createDefiOrb() {
    // Load SVG image for DeFi orb
    this.projectileSprite = this.scene.add.image(0, 0, 'defi_orb')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createMemeRocket() {
    // Load SVG image for Meme rocket
    this.projectileSprite = this.scene.add.image(0, 0, 'meme_rocket')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  // New projectile creation methods
  private createBitcoinCircle() {
    this.projectileSprite = this.scene.add.image(0, 0, 'bitcoin-circle')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createEthereumAlt() {
    this.projectileSprite = this.scene.add.image(0, 0, 'ethereum-alt')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createBinanceCoin() {
    this.projectileSprite = this.scene.add.image(0, 0, 'binance-coin')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createDogeCoin() {
    this.projectileSprite = this.scene.add.image(0, 0, 'doge-coin')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createDiamondOrigami() {
    this.projectileSprite = this.scene.add.image(0, 0, 'diamond-origami')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createFireBomb() {
    this.projectileSprite = this.scene.add.image(0, 0, 'fire-bomb')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createFireBlast() {
    this.projectileSprite = this.scene.add.image(0, 0, 'fire-blast')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createBombClassic() {
    this.projectileSprite = this.scene.add.image(0, 0, 'bomb-classic')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createBombAdvanced() {
    this.projectileSprite = this.scene.add.image(0, 0, 'bomb-advanced')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createRocketClassic() {
    this.projectileSprite = this.scene.add.image(0, 0, 'rocket-classic')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createRocketAdvanced() {
    this.projectileSprite = this.scene.add.image(0, 0, 'rocket-advanced')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createMoonClassic() {
    this.projectileSprite = this.scene.add.image(0, 0, 'moon-classic')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createMoonStars() {
    this.projectileSprite = this.scene.add.image(0, 0, 'moon-stars')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createMoonAdvanced() {
    this.projectileSprite = this.scene.add.image(0, 0, 'moon-advanced')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createSpaceBlast() {
    this.projectileSprite = this.scene.add.image(0, 0, 'space-blast')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createSpaceCosmos() {
    this.projectileSprite = this.scene.add.image(0, 0, 'space-cosmos')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createComputerChip() {
    this.projectileSprite = this.scene.add.image(0, 0, 'computer-chip')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createBlockchainSecurity() {
    this.projectileSprite = this.scene.add.image(0, 0, 'blockchain-security')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createCandleSticks() {
    this.projectileSprite = this.scene.add.image(0, 0, 'candle-sticks')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createExchangeDollar() {
    this.projectileSprite = this.scene.add.image(0, 0, 'exchange-dollar')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createHoldPower() {
    this.projectileSprite = this.scene.add.image(0, 0, 'hold-power')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createTrendingDown() {
    this.projectileSprite = this.scene.add.image(0, 0, 'trending-down')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  private createAnnouncement() {
    this.projectileSprite = this.scene.add.image(0, 0, 'announcement')
    ;(this.projectileSprite as Phaser.GameObjects.Image).setDisplaySize(20, 20)
    this.add(this.projectileSprite)
  }

  public update(deltaTime: number) {
    // Update position
    this.x += this.velocity.x * deltaTime / 1000
    this.y += this.velocity.y * deltaTime / 1000
    
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
    super.destroy()
  }
}