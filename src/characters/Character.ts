import Phaser from 'phaser'
import { GAME_CONSTANTS } from '../config/GameConfig'

export interface CharacterData {
  id: string
  name: string
  sprite: string
  stats: {
    health: number
    attack: number
    defense: number
    speed: number
  }
  moves: string[]
}

export enum AttackType {
  BASIC = 'basic',
  SPECIAL1 = 'special1', 
  SPECIAL2 = 'special2'
}

export enum CharacterState {
  IDLE = 'idle',
  WALKING = 'walking',
  JUMPING = 'jumping',
  ATTACKING = 'attacking',
  HURT = 'hurt',
  BLOCKING = 'blocking'
}

export class Character extends Phaser.GameObjects.Container {
  public characterData: CharacterData
  public currentState: CharacterState = CharacterState.IDLE
  public currentAttackType: AttackType = AttackType.BASIC
  public health: number
  public maxHealth: number
  public facingRight: boolean = true
  public velocity: { x: number, y: number } = { x: 0, y: 0 }
  public onGround: boolean = true
  public isBlocking: boolean = false
  
  private sprite: Phaser.GameObjects.Image
  private stateTimer: number = 0
  private attackCooldown: number = 0
  private hurtTimer: number = 0
  private gravity: number = 800

  constructor(scene: Phaser.Scene, x: number, y: number, characterData: CharacterData) {
    super(scene, x, y)
    
    this.characterData = characterData
    this.health = characterData.stats.health
    this.maxHealth = characterData.stats.health
    
    // Create sprite
    this.sprite = scene.add.image(0, 0, characterData.sprite)
    this.sprite.setDisplaySize(64, 64)
    this.add(this.sprite)
    
    // Add to scene
    scene.add.existing(this)
    
    // Set up physics body bounds
    this.setSize(64, 64)
  }

  public update(deltaTime: number) {
    // Apply gravity
    if (this.y < GAME_CONSTANTS.GROUND_Y - 40) {
      this.velocity.y += this.gravity * (deltaTime / 1000)
    } else {
      // On ground
      this.y = GAME_CONSTANTS.GROUND_Y - 40
      this.velocity.y = 0
      this.onGround = true
      if (this.currentState === CharacterState.JUMPING) {
        this.setCharacterState(CharacterState.IDLE)
      }
    }

    // Apply horizontal movement
    this.x += this.velocity.x * (deltaTime / 1000)
    
    // Apply vertical movement
    this.y += this.velocity.y * (deltaTime / 1000)

    // Apply friction to horizontal movement
    this.velocity.x *= 0.85

    // Update timers
    if (this.attackCooldown > 0) {
      this.attackCooldown -= deltaTime
      if (this.attackCooldown <= 0) {
        this.setCharacterState(CharacterState.IDLE)
      }
    }

    if (this.hurtTimer > 0) {
      this.hurtTimer -= deltaTime
      if (this.hurtTimer <= 0) {
        this.setCharacterState(CharacterState.IDLE)
      }
    }

    // Update sprite based on state and facing direction
    this.updateVisuals()
  }



  private updateVisuals() {
    // Flip sprite based on facing direction
    this.sprite.setFlipX(!this.facingRight)
    
    // State-based visual effects
    switch (this.currentState) {
      case CharacterState.HURT:
        // Flash red when hurt
        const flashIntensity = Math.sin(this.stateTimer * 0.02) * 0.5 + 0.5
        this.sprite.setTint(Phaser.Display.Color.GetColor(255, 255 * flashIntensity, 255 * flashIntensity))
        break
        
      case CharacterState.BLOCKING:
        // Slight blue tint when blocking
        this.sprite.setTint(0xCCCCFF)
        break
        
      default:
        this.sprite.clearTint()
        break
    }
  }

  public setCharacterState(newState: CharacterState) {
    if (this.currentState === newState) return
    
    this.currentState = newState
    this.stateTimer = 0
    
    // State entry logic
    switch (newState) {
      case CharacterState.ATTACKING:
        this.attackCooldown = 1000 // 1 second cooldown
        break
        
      case CharacterState.HURT:
        this.hurtTimer = 300 // 300ms hurt state
        this.isBlocking = false
        break
        
      case CharacterState.JUMPING:
        if (this.onGround) {
          this.velocity.y = -400 // Jump velocity
          this.onGround = false
        }
        break
    }
  }

  public moveLeft() {
    if (this.currentState === CharacterState.ATTACKING || this.currentState === CharacterState.HURT) {
      return
    }
    
    this.velocity.x = -this.characterData.stats.speed
    this.facingRight = false
    this.setCharacterState(CharacterState.WALKING)
  }

  public moveRight() {
    if (this.currentState === CharacterState.ATTACKING || this.currentState === CharacterState.HURT) {
      return
    }
    
    this.velocity.x = this.characterData.stats.speed
    this.facingRight = true
    this.setCharacterState(CharacterState.WALKING)
  }

  public jump() {
    if (this.onGround && this.currentState !== CharacterState.ATTACKING && this.currentState !== CharacterState.HURT) {
      this.velocity.y = -400 // Jump velocity
      this.onGround = false
      this.setCharacterState(CharacterState.JUMPING)
    }
  }

  public attack(attackType: AttackType = AttackType.BASIC): boolean {
    if (this.attackCooldown > 0 || this.currentState === CharacterState.HURT) {
      return false
    }
    
    this.currentAttackType = attackType
    this.setCharacterState(CharacterState.ATTACKING)
    
    // Different cooldowns for different attack types
    switch (attackType) {
      case AttackType.BASIC:
        this.attackCooldown = 400 // Fast basic attack
        break
      case AttackType.SPECIAL1:
        this.attackCooldown = 800 // Slower but stronger
        break
      case AttackType.SPECIAL2:
        this.attackCooldown = 600 // Medium speed
        break
    }
    
    this.stateTimer = 0 // Reset state timer for attack duration
    return true
  }

  public getAttackDamage(): number {
    const baseAttack = this.characterData.stats.attack
    
    switch (this.currentAttackType) {
      case AttackType.BASIC:
        return baseAttack // Normal damage
      case AttackType.SPECIAL1:
        return Math.floor(baseAttack * 1.8) // 80% more damage
      case AttackType.SPECIAL2:
        return Math.floor(baseAttack * 0.7) // 30% less damage but faster
      default:
        return baseAttack
    }
  }

  public block(blocking: boolean) {
    if (this.currentState === CharacterState.HURT || this.currentState === CharacterState.ATTACKING) return
    
    this.isBlocking = blocking
    if (blocking) {
      this.setCharacterState(CharacterState.BLOCKING)
    } else if (this.currentState === CharacterState.BLOCKING) {
      this.setCharacterState(CharacterState.IDLE)
    }
  }

  public takeDamage(damage: number, knockbackX: number = 0): boolean {
    if (this.isBlocking) {
      damage *= 0.3 // Reduce damage when blocking
      knockbackX *= 0.2 // Reduce knockback when blocking
    }
    
    this.health -= damage
    this.velocity.x += knockbackX
    
    if (this.health <= 0) {
      this.health = 0
      return true // Character is defeated
    }
    
    this.setCharacterState(CharacterState.HURT)
    return false
  }

  public getAttackHitbox(): Phaser.Geom.Rectangle {
    const hitboxWidth = 80
    const hitboxHeight = 40
    const offsetX = this.facingRight ? 32 : -32 - hitboxWidth
    
    return new Phaser.Geom.Rectangle(
      this.x + offsetX,
      this.y - 20,
      hitboxWidth,
      hitboxHeight
    )
  }

  public getHurtbox(): Phaser.Geom.Rectangle {
    return new Phaser.Geom.Rectangle(
      this.x - 32,
      this.y - 32,
      64,
      64
    )
  }

  public stopMovement() {
    this.velocity.x = 0
    if (this.currentState === CharacterState.WALKING) {
      this.setCharacterState(CharacterState.IDLE)
    }
  }
}