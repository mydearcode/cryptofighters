import Phaser from 'phaser'

export enum ProjectileType {
  BULLET = 'bullet',
  ARROW = 'arrow',
  MAGIC = 'magic',
  FIREBALL = 'fireball'
}

export class Projectile extends Phaser.GameObjects.Container {
  private projectileSprite!: Phaser.GameObjects.Rectangle | Phaser.GameObjects.Sprite | Phaser.GameObjects.Arc
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