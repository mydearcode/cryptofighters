import Phaser from 'phaser'
import { GAME_CONSTANTS } from '../config/GameConfig'
import { Projectile, ProjectileType } from './Projectile'
import { gameData } from '../data/DataManager'
import { SoundManager } from '../audio/SoundManager'

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

export class Character extends Phaser.Physics.Arcade.Sprite {
  public characterData: CharacterData
  public currentState: CharacterState = CharacterState.IDLE
  public currentAttackType: AttackType = AttackType.BASIC
  public health: number
  public maxHealth: number
  public facingRight: boolean = true
  public isBlocking: boolean = false
  public projectiles: Projectile[] = [] // Array to track projectiles fired by this character
  
  private isAnimatedSprite: boolean = false
  private stateTimer: number = 0
  private attackCooldown: number = 0
  private hurtTimer: number = 0
  private animationTimer: number = 0

  constructor(scene: Phaser.Scene, x: number, y: number, characterData: CharacterData) {
    super(scene, x, y, characterData.sprite)
    
    this.characterData = characterData
    this.health = characterData.stats.health
    this.maxHealth = characterData.stats.health
    
    // Add to scene
    scene.add.existing(this)
    scene.physics.add.existing(this)
    
    // Set up physics body
    const body = this.body as Phaser.Physics.Arcade.Body
    if (body) {
      body.setCollideWorldBounds(true)
      body.setSize(32, 48) // Smaller hitbox for better gameplay
      body.setOffset(0, 0)
      body.setBounce(0, 0) // No bounce
      body.setDrag(300, 0) // Add horizontal drag to stop sliding
    }
    
    // Set display size and create animations based on character
    this.setupCharacterSpecificSettings(scene, characterData)
    
    // Set initial state
    this.setCharacterState(CharacterState.IDLE)
  }

  private setupCharacterSpecificSettings(scene: Phaser.Scene, characterData: CharacterData) {
    // Set display size - all characters use the same size
    this.setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.GAME.width, GAME_CONSTANTS.CHARACTER_SIZES.GAME.height)
    this.isAnimatedSprite = true
    
    // Create character-specific animations
    if (characterData.id === 'vitalik') {
      this.createVitalikAnimations(scene)
    } else if (characterData.id === 'cz') {
      this.createCZAnimations(scene)
    } else if (characterData.id === 'elon') {
      this.createElonAnimations(scene)
    } else if (characterData.id === 'hoskinson') {
      this.createHoskinsonAnimations(scene)
    } else if (characterData.id === 'saylor') {
      this.createSaylorAnimations(scene)
    } else if (characterData.id === 'gavin') {
      this.createGavinAnimations(scene)
    } else if (characterData.id === 'hodl_master') {
      this.createHodlMasterAnimations(scene)
    } else if (characterData.id === 'trade_queen') {
      this.createTradeQueenAnimations(scene)
    } else if (characterData.id === 'defi_ninja') {
      this.createDefiNinjaAnimations(scene)
    } else if (characterData.id === 'meme_lord') {
      this.createMemeLordAnimations(scene)
    } else if (characterData.id === 'brian') {
      this.createBrianAnimations(scene)
    } else if (characterData.id === 'jesse') {
      this.createJesseAnimations(scene)
    } else {
      // For new characters, use automatic animation creation
      this.createGenericAnimations(scene, characterData.id)
    }
  }

  private createDefiNinjaAnimations(scene: Phaser.Scene) {
    // Create animations for Defi Ninja (using only side views - same as other characters)
    if (!scene.anims.exists('defi_ninja-idle-anim')) {
      scene.anims.create({
        key: 'defi_ninja-idle-anim',
        frames: scene.anims.generateFrameNumbers('defi-ninja-combat-idle', { start: 2, end: 3 }), // Row 1 (left side view)
        frameRate: 8,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('defi_ninja-walk-anim')) {
      scene.anims.create({
        key: 'defi_ninja-walk-anim',
        frames: scene.anims.generateFrameNumbers('defi-ninja-walk', { start: 9, end: 17 }), // Row 1 (left side view)
        frameRate: 12,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('defi_ninja-attack-anim')) {
      scene.anims.create({
        key: 'defi_ninja-attack-anim',
        frames: scene.anims.generateFrameNumbers('defi-ninja-slash', { start: 6, end: 11 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    if (!scene.anims.exists('defi_ninja-hurt-anim')) {
      scene.anims.create({
        key: 'defi_ninja-hurt-anim',
        frames: scene.anims.generateFrameNumbers('defi-ninja-hurt', { start: 0, end: 5 }), // All frames (side view only)
        frameRate: 10,
        repeat: 0
      })
    }
    
    // Add jump animation
    if (!scene.anims.exists('defi_ninja-jump-anim')) {
      scene.anims.create({
        key: 'defi_ninja-jump-anim',
        frames: scene.anims.generateFrameNumbers('defi-ninja-jump', { start: 0, end: 4 }),
        frameRate: 6,
        repeat: -1
      })
    }
    
    // Add shoot animation
    if (!scene.anims.exists('defi_ninja-shoot-anim')) {
      scene.anims.create({
        key: 'defi_ninja-shoot-anim',
        frames: scene.anims.generateFrameNumbers('defi-ninja-shoot', { start: 13, end: 25 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    // Add spellcast animation
    if (!scene.anims.exists('defi_ninja-spellcast-anim')) {
      scene.anims.create({
        key: 'defi_ninja-spellcast-anim',
        frames: scene.anims.generateFrameNumbers('defi-ninja-spellcast', { start: 0, end: 6 }),
        frameRate: 12,
        repeat: 0
      })
    }
  }

  private createMemeLordAnimations(scene: Phaser.Scene) {
    // Add idle animation
    if (!scene.anims.exists('meme_lord-idle-anim')) {
      scene.anims.create({
        key: 'meme_lord-idle-anim',
        frames: scene.anims.generateFrameNumbers('meme-lord-combat-idle', { start: 2, end: 3 }),
        frameRate: 8,
        repeat: -1
      })
    }

    // Add walk animation
    if (!scene.anims.exists('meme_lord-walk-anim')) {
      scene.anims.create({
        key: 'meme_lord-walk-anim',
        frames: scene.anims.generateFrameNumbers('meme-lord-walk', { start: 9, end: 17 }),
        frameRate: 12,
        repeat: -1
      })
    }

    // Add attack animation
    if (!scene.anims.exists('meme_lord-attack-anim')) {
      scene.anims.create({
        key: 'meme_lord-attack-anim',
        frames: scene.anims.generateFrameNumbers('meme-lord-slash', { start: 6, end: 11 }),
        frameRate: 15,
        repeat: 0
      })
    }

    // Add hurt animation
    if (!scene.anims.exists('meme_lord-hurt-anim')) {
      scene.anims.create({
        key: 'meme_lord-hurt-anim',
        frames: scene.anims.generateFrameNumbers('meme-lord-hurt', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0
      })
    }

    // Add jump animation
    if (!scene.anims.exists('meme_lord-jump-anim')) {
      scene.anims.create({
        key: 'meme_lord-jump-anim',
        frames: scene.anims.generateFrameNumbers('meme-lord-jump', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
      })
    }

    // Add shoot animation
    if (!scene.anims.exists('meme_lord-shoot-anim')) {
      scene.anims.create({
        key: 'meme_lord-shoot-anim',
        frames: scene.anims.generateFrameNumbers('meme-lord-shoot', { start: 13, end: 25 }),
        frameRate: 12,
        repeat: 0
      })
    }

    // Add spellcast animation
    if (!scene.anims.exists('meme_lord-spellcast-anim')) {
      scene.anims.create({
        key: 'meme_lord-spellcast-anim',
        frames: scene.anims.generateFrameNumbers('meme-lord-spellcast', { start: 0, end: 6 }),
        frameRate: 12,
        repeat: 0
      })
    }
  }

  /**
   * Generic animation creator for new characters
   * This function automatically creates standard animations for any new character
   * following the same pattern as existing characters
   */
  private createGenericAnimations(scene: Phaser.Scene, characterId: string) {
    const animationConfigs = [
      {
        key: `${characterId}-idle-anim`,
        spriteKey: `${characterId}-combat-idle`,
        frames: { start: 2, end: 3 },
        frameRate: 8,
        repeat: -1
      },
      {
        key: `${characterId}-walk-anim`,
        spriteKey: `${characterId}-walk`,
        frames: { start: 9, end: 17 },
        frameRate: 12,
        repeat: -1
      },
      {
        key: `${characterId}-attack-anim`,
        spriteKey: `${characterId}-slash`,
        frames: { start: 6, end: 11 },
        frameRate: 16,
        repeat: 0
      },
      {
        key: `${characterId}-hurt-anim`,
        spriteKey: `${characterId}-hurt`,
        frames: { start: 0, end: 5 },
        frameRate: 10,
        repeat: 0
      },
      {
        key: `${characterId}-jump-anim`,
        spriteKey: `${characterId}-jump`,
        frames: { start: 0, end: 4 },
        frameRate: 6,
        repeat: -1
      },
      {
        key: `${characterId}-shoot-anim`,
        spriteKey: `${characterId}-shoot`,
        frames: { start: 13, end: 25 },
        frameRate: 16,
        repeat: 0
      },
      {
        key: `${characterId}-spellcast-anim`,
        spriteKey: `${characterId}-spellcast`,
        frames: { start: 0, end: 6 },
        frameRate: 12,
        repeat: 0
      }
    ]

    // Create all animations for the character
    animationConfigs.forEach(config => {
      if (!scene.anims.exists(config.key)) {
        try {
          scene.anims.create({
            key: config.key,
            frames: scene.anims.generateFrameNumbers(config.spriteKey, config.frames),
            frameRate: config.frameRate,
            repeat: config.repeat
          })
        } catch (error) {
          console.warn(`Could not create animation ${config.key} for sprite ${config.spriteKey}:`, error)
        }
      }
    })
  }

  private createVitalikAnimations(scene: Phaser.Scene) {
    // Create animations for Vitalik (using only side views)
    if (!scene.anims.exists('vitalik-idle-anim')) {
      scene.anims.create({
        key: 'vitalik-idle-anim',
        frames: scene.anims.generateFrameNumbers('vitalik-idle', { start: 2, end: 3 }), // Row 1 (left side view)
        frameRate: 8,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('vitalik-walk-anim')) {
      scene.anims.create({
        key: 'vitalik-walk-anim',
        frames: scene.anims.generateFrameNumbers('vitalik-walk', { start: 9, end: 17 }), // Row 1 (left side view)
        frameRate: 12,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('vitalik-attack-anim')) {
      scene.anims.create({
        key: 'vitalik-attack-anim',
        frames: scene.anims.generateFrameNumbers('vitalik-slash', { start: 6, end: 11 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    if (!scene.anims.exists('vitalik-hurt-anim')) {
      scene.anims.create({
        key: 'vitalik-hurt-anim',
        frames: scene.anims.generateFrameNumbers('vitalik-hurt', { start: 0, end: 5 }), // All frames (side view only)
        frameRate: 10,
        repeat: 0
      })
    }
    
    // Add jump animation
    if (!scene.anims.exists('vitalik-jump-anim')) {
      scene.anims.create({
        key: 'vitalik-jump-anim',
        frames: scene.anims.generateFrameNumbers('vitalik-jump', { start: 0, end: 4 }),
        frameRate: 6,
        repeat: -1
      })
    }
    
    // Add shoot animation
    if (!scene.anims.exists('vitalik-shoot-anim')) {
      scene.anims.create({
        key: 'vitalik-shoot-anim',
        frames: scene.anims.generateFrameNumbers('vitalik-shoot', { start: 13, end: 25 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    // Add spellcast animation
    if (!scene.anims.exists('vitalik-spellcast-anim')) {
      scene.anims.create({
        key: 'vitalik-spellcast-anim',
        frames: scene.anims.generateFrameNumbers('vitalik-spellcast', { start: 0, end: 6 }),
        frameRate: 12,
        repeat: 0
      })
    }
  }

  private createCZAnimations(scene: Phaser.Scene) {
    // Create animations for CZ (using only side views)
    if (!scene.anims.exists('cz-idle-anim')) {
      scene.anims.create({
        key: 'cz-idle-anim',
        frames: scene.anims.generateFrameNumbers('cz-combat-idle', { start: 2, end: 3 }), // Row 1 (left side view) - same as Vitalik
        frameRate: 8,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('cz-walk-anim')) {
      scene.anims.create({
        key: 'cz-walk-anim',
        frames: scene.anims.generateFrameNumbers('cz-walk', { start: 9, end: 17 }), // Row 1 (left side view) - same as Vitalik
        frameRate: 12,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('cz-attack-anim')) {
      scene.anims.create({
        key: 'cz-attack-anim',
        frames: scene.anims.generateFrameNumbers('cz-slash', { start: 6, end: 11 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    if (!scene.anims.exists('cz-hurt-anim')) {
      scene.anims.create({
        key: 'cz-hurt-anim',
        frames: scene.anims.generateFrameNumbers('cz-hurt', { start: 0, end: 5 }), // All frames (side view only)
        frameRate: 10,
        repeat: 0
      })
    }
    
    // Add jump animation
    if (!scene.anims.exists('cz-jump-anim')) {
      scene.anims.create({
        key: 'cz-jump-anim',
        frames: scene.anims.generateFrameNumbers('cz-jump', { start: 0, end: 4 }), // Same as Vitalik
        frameRate: 6,
        repeat: -1
      })
    }
    
    // Add shoot animation
    if (!scene.anims.exists('cz-shoot-anim')) {
      scene.anims.create({
        key: 'cz-shoot-anim',
        frames: scene.anims.generateFrameNumbers('cz-shoot', { start: 13, end: 25 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    // Add spellcast animation
    if (!scene.anims.exists('cz-spellcast-anim')) {
      scene.anims.create({
        key: 'cz-spellcast-anim',
        frames: scene.anims.generateFrameNumbers('cz-spellcast', { start: 0, end: 6 }), // Same as Vitalik
        frameRate: 12,
        repeat: 0
      })
    }
  }

  private createElonAnimations(scene: Phaser.Scene) {
    // Create animations for Elon (using only side views - same as Vitalik)
    if (!scene.anims.exists('elon-idle-anim')) {
      scene.anims.create({
        key: 'elon-idle-anim',
        frames: scene.anims.generateFrameNumbers('elon-combat-idle', { start: 2, end: 3 }), // Row 1 (left side view) - same as Vitalik
        frameRate: 8,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('elon-walk-anim')) {
      scene.anims.create({
        key: 'elon-walk-anim',
        frames: scene.anims.generateFrameNumbers('elon-walk', { start: 9, end: 17 }), // Row 1 (left side view) - same as Vitalik
        frameRate: 12,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('elon-attack-anim')) {
      scene.anims.create({
        key: 'elon-attack-anim',
        frames: scene.anims.generateFrameNumbers('elon-slash', { start: 6, end: 11 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    if (!scene.anims.exists('elon-hurt-anim')) {
      scene.anims.create({
        key: 'elon-hurt-anim',
        frames: scene.anims.generateFrameNumbers('elon-hurt', { start: 0, end: 5 }), // All frames (side view only)
        frameRate: 10,
        repeat: 0
      })
    }
    
    // Add jump animation
    if (!scene.anims.exists('elon-jump-anim')) {
      scene.anims.create({
        key: 'elon-jump-anim',
        frames: scene.anims.generateFrameNumbers('elon-jump', { start: 0, end: 4 }), // Same as Vitalik
        frameRate: 6,
        repeat: -1
      })
    }
    
    // Add shoot animation
    if (!scene.anims.exists('elon-shoot-anim')) {
      scene.anims.create({
        key: 'elon-shoot-anim',
        frames: scene.anims.generateFrameNumbers('elon-shoot', { start: 13, end: 25 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    // Add spellcast animation
    if (!scene.anims.exists('elon-spellcast-anim')) {
      scene.anims.create({
        key: 'elon-spellcast-anim',
        frames: scene.anims.generateFrameNumbers('elon-spellcast', { start: 0, end: 6 }), // Same as Vitalik
        frameRate: 12,
        repeat: 0
      })
    }
  }

  private createHoskinsonAnimations(scene: Phaser.Scene) {
    // Create animations for Hoskinson (using only side views - same as other characters)
    if (!scene.anims.exists('hoskinson-idle-anim')) {
      scene.anims.create({
        key: 'hoskinson-idle-anim',
        frames: scene.anims.generateFrameNumbers('hoskinson-combat-idle', { start: 2, end: 3 }), // Row 1 (left side view)
        frameRate: 8,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('hoskinson-walk-anim')) {
      scene.anims.create({
        key: 'hoskinson-walk-anim',
        frames: scene.anims.generateFrameNumbers('hoskinson-walk', { start: 9, end: 17 }), // Row 1 (left side view)
        frameRate: 12,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('hoskinson-attack-anim')) {
      scene.anims.create({
        key: 'hoskinson-attack-anim',
        frames: scene.anims.generateFrameNumbers('hoskinson-slash', { start: 6, end: 11 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    if (!scene.anims.exists('hoskinson-hurt-anim')) {
      scene.anims.create({
        key: 'hoskinson-hurt-anim',
        frames: scene.anims.generateFrameNumbers('hoskinson-hurt', { start: 0, end: 5 }), // All frames (side view only)
        frameRate: 10,
        repeat: 0
      })
    }
    
    // Add jump animation
    if (!scene.anims.exists('hoskinson-jump-anim')) {
      scene.anims.create({
        key: 'hoskinson-jump-anim',
        frames: scene.anims.generateFrameNumbers('hoskinson-jump', { start: 0, end: 4 }),
        frameRate: 6,
        repeat: -1
      })
    }
    
    // Add shoot animation
    if (!scene.anims.exists('hoskinson-shoot-anim')) {
      scene.anims.create({
        key: 'hoskinson-shoot-anim',
        frames: scene.anims.generateFrameNumbers('hoskinson-shoot', { start: 13, end: 25 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    // Add spellcast animation
    if (!scene.anims.exists('hoskinson-spellcast-anim')) {
      scene.anims.create({
        key: 'hoskinson-spellcast-anim',
        frames: scene.anims.generateFrameNumbers('hoskinson-spellcast', { start: 0, end: 6 }),
        frameRate: 12,
        repeat: 0
      })
    }
  }

  private createSaylorAnimations(scene: Phaser.Scene) {
    // Create animations for Saylor (using only side views - same as other characters)
    if (!scene.anims.exists('saylor-idle-anim')) {
      scene.anims.create({
        key: 'saylor-idle-anim',
        frames: scene.anims.generateFrameNumbers('saylor-combat-idle', { start: 2, end: 3 }), // Row 1 (left side view)
        frameRate: 8,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('saylor-walk-anim')) {
      scene.anims.create({
        key: 'saylor-walk-anim',
        frames: scene.anims.generateFrameNumbers('saylor-walk', { start: 9, end: 17 }), // Row 1 (left side view)
        frameRate: 12,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('saylor-attack-anim')) {
      scene.anims.create({
        key: 'saylor-attack-anim',
        frames: scene.anims.generateFrameNumbers('saylor-slash', { start: 6, end: 11 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    if (!scene.anims.exists('saylor-hurt-anim')) {
      scene.anims.create({
        key: 'saylor-hurt-anim',
        frames: scene.anims.generateFrameNumbers('saylor-hurt', { start: 0, end: 5 }), // All frames (side view only)
        frameRate: 10,
        repeat: 0
      })
    }
    
    // Add jump animation
    if (!scene.anims.exists('saylor-jump-anim')) {
      scene.anims.create({
        key: 'saylor-jump-anim',
        frames: scene.anims.generateFrameNumbers('saylor-jump', { start: 0, end: 4 }),
        frameRate: 6,
        repeat: -1
      })
    }
    
    // Add shoot animation
    if (!scene.anims.exists('saylor-shoot-anim')) {
      scene.anims.create({
        key: 'saylor-shoot-anim',
        frames: scene.anims.generateFrameNumbers('saylor-shoot', { start: 13, end: 25 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    // Add spellcast animation
    if (!scene.anims.exists('saylor-spellcast-anim')) {
      scene.anims.create({
        key: 'saylor-spellcast-anim',
        frames: scene.anims.generateFrameNumbers('saylor-spellcast', { start: 0, end: 6 }),
        frameRate: 12,
        repeat: 0
      })
    }
  }

  private createGavinAnimations(scene: Phaser.Scene) {
    // Create animations for Gavin (using only side views - same as other characters)
    if (!scene.anims.exists('gavin-idle-anim')) {
      scene.anims.create({
        key: 'gavin-idle-anim',
        frames: scene.anims.generateFrameNumbers('gavin-combat-idle', { start: 2, end: 3 }), // Row 1 (left side view)
        frameRate: 8,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('gavin-walk-anim')) {
      scene.anims.create({
        key: 'gavin-walk-anim',
        frames: scene.anims.generateFrameNumbers('gavin-walk', { start: 9, end: 17 }), // Row 1 (left side view)
        frameRate: 12,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('gavin-attack-anim')) {
      scene.anims.create({
        key: 'gavin-attack-anim',
        frames: scene.anims.generateFrameNumbers('gavin-slash', { start: 6, end: 11 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    if (!scene.anims.exists('gavin-hurt-anim')) {
      scene.anims.create({
        key: 'gavin-hurt-anim',
        frames: scene.anims.generateFrameNumbers('gavin-hurt', { start: 0, end: 5 }), // All frames (side view only)
        frameRate: 10,
        repeat: 0
      })
    }
    
    // Add jump animation
    if (!scene.anims.exists('gavin-jump-anim')) {
      scene.anims.create({
        key: 'gavin-jump-anim',
        frames: scene.anims.generateFrameNumbers('gavin-jump', { start: 0, end: 4 }),
        frameRate: 6,
        repeat: -1
      })
    }
    
    // Add shoot animation
    if (!scene.anims.exists('gavin-shoot-anim')) {
      scene.anims.create({
        key: 'gavin-shoot-anim',
        frames: scene.anims.generateFrameNumbers('gavin-shoot', { start: 13, end: 25 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    // Add spellcast animation
    if (!scene.anims.exists('gavin-spellcast-anim')) {
      scene.anims.create({
        key: 'gavin-spellcast-anim',
        frames: scene.anims.generateFrameNumbers('gavin-spellcast', { start: 0, end: 6 }),
        frameRate: 12,
        repeat: 0
      })
    }
  }

  private createHodlMasterAnimations(scene: Phaser.Scene) {
    // Create animations for Hodl Master (using only side views - same as other characters)
    if (!scene.anims.exists('hodl_master-idle-anim')) {
      scene.anims.create({
        key: 'hodl_master-idle-anim',
        frames: scene.anims.generateFrameNumbers('hodl-master-combat-idle', { start: 2, end: 3 }), // Row 1 (left side view) - same as other characters
        frameRate: 8,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('hodl_master-walk-anim')) {
      scene.anims.create({
        key: 'hodl_master-walk-anim',
        frames: scene.anims.generateFrameNumbers('hodl-master-walk', { start: 9, end: 17 }), // Row 1 (left side view) - same as other characters
        frameRate: 12,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('hodl_master-attack-anim')) {
      scene.anims.create({
        key: 'hodl_master-attack-anim',
        frames: scene.anims.generateFrameNumbers('hodl-master-slash', { start: 0, end: 5 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    if (!scene.anims.exists('hodl_master-hurt-anim')) {
      scene.anims.create({
        key: 'hodl_master-hurt-anim',
        frames: scene.anims.generateFrameNumbers('hodl-master-hurt', { start: 0, end: 5 }), // All frames (side view only)
        frameRate: 10,
        repeat: 0
      })
    }
    
    // Add jump animation
    if (!scene.anims.exists('hodl_master-jump-anim')) {
      scene.anims.create({
        key: 'hodl_master-jump-anim',
        frames: scene.anims.generateFrameNumbers('hodl-master-jump', { start: 0, end: 4 }),
        frameRate: 6,
        repeat: -1
      })
    }
    
    // Add shoot animation
    if (!scene.anims.exists('hodl_master-shoot-anim')) {
      scene.anims.create({
        key: 'hodl_master-shoot-anim',
        frames: scene.anims.generateFrameNumbers('hodl-master-shoot', { start: 0, end: 12 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    // Add spellcast animation
    if (!scene.anims.exists('hodl_master-spellcast-anim')) {
      scene.anims.create({
        key: 'hodl_master-spellcast-anim',
        frames: scene.anims.generateFrameNumbers('hodl-master-spellcast', { start: 0, end: 6 }),
        frameRate: 12,
        repeat: 0
      })
    }
  }

  private createTradeQueenAnimations(scene: Phaser.Scene) {
    // Create animations for Trade Queen (using only side views - same as other characters)
    if (!scene.anims.exists('trade_queen-idle-anim')) {
      scene.anims.create({
        key: 'trade_queen-idle-anim',
        frames: scene.anims.generateFrameNumbers('trade-queen-combat-idle', { start: 2, end: 3 }), // Row 1 (left side view)
        frameRate: 8,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('trade_queen-walk-anim')) {
      scene.anims.create({
        key: 'trade_queen-walk-anim',
        frames: scene.anims.generateFrameNumbers('trade-queen-walk', { start: 9, end: 17 }), // Row 1 (left side view)
        frameRate: 12,
        repeat: -1
      })
    }
    
    if (!scene.anims.exists('trade_queen-attack-anim')) {
      scene.anims.create({
        key: 'trade_queen-attack-anim',
        frames: scene.anims.generateFrameNumbers('trade-queen-slash', { start: 6, end: 11 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    if (!scene.anims.exists('trade_queen-hurt-anim')) {
      scene.anims.create({
        key: 'trade_queen-hurt-anim',
        frames: scene.anims.generateFrameNumbers('trade-queen-hurt', { start: 0, end: 5 }), // All frames (side view only)
        frameRate: 10,
        repeat: 0
      })
    }
    
    // Add jump animation
    if (!scene.anims.exists('trade_queen-jump-anim')) {
      scene.anims.create({
        key: 'trade_queen-jump-anim',
        frames: scene.anims.generateFrameNumbers('trade-queen-jump', { start: 0, end: 4 }),
        frameRate: 6,
        repeat: -1
      })
    }
    
    // Add shoot animation
    if (!scene.anims.exists('trade_queen-shoot-anim')) {
      scene.anims.create({
        key: 'trade_queen-shoot-anim',
        frames: scene.anims.generateFrameNumbers('trade-queen-shoot', { start: 13, end: 25 }), // Row 1 (left side view)
        frameRate: 16,
        repeat: 0
      })
    }
    
    // Add spellcast animation
    if (!scene.anims.exists('trade_queen-spellcast-anim')) {
      scene.anims.create({
        key: 'trade_queen-spellcast-anim',
        frames: scene.anims.generateFrameNumbers('trade-queen-spellcast', { start: 0, end: 6 }),
        frameRate: 12,
        repeat: 0
      })
    }
  }

  private createBrianAnimations(scene: Phaser.Scene) {
    // Create animations for Brian (using only side views - same as other characters)
    if (!scene.anims.exists('brian-idle-anim')) {
      scene.anims.create({
        key: 'brian-idle-anim',
        frames: scene.anims.generateFrameNumbers('brian-combat-idle', { start: 2, end: 3 }),
        frameRate: 8,
        repeat: -1
      })
    }

    // Add walk animation
    if (!scene.anims.exists('brian-walk-anim')) {
      scene.anims.create({
        key: 'brian-walk-anim',
        frames: scene.anims.generateFrameNumbers('brian-walk', { start: 9, end: 17 }),
        frameRate: 12,
        repeat: -1
      })
    }

    // Add attack animation
    if (!scene.anims.exists('brian-attack-anim')) {
      scene.anims.create({
        key: 'brian-attack-anim',
        frames: scene.anims.generateFrameNumbers('brian-slash', { start: 6, end: 11 }),
        frameRate: 15,
        repeat: 0
      })
    }

    // Add hurt animation
    if (!scene.anims.exists('brian-hurt-anim')) {
      scene.anims.create({
        key: 'brian-hurt-anim',
        frames: scene.anims.generateFrameNumbers('brian-hurt', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0
      })
    }

    // Add jump animation
    if (!scene.anims.exists('brian-jump-anim')) {
      scene.anims.create({
        key: 'brian-jump-anim',
        frames: scene.anims.generateFrameNumbers('brian-jump', { start: 0, end: 4 }),
        frameRate: 6,
        repeat: -1
      })
    }

    // Add shoot animation
    if (!scene.anims.exists('brian-shoot-anim')) {
      scene.anims.create({
        key: 'brian-shoot-anim',
        frames: scene.anims.generateFrameNumbers('brian-shoot', { start: 13, end: 25 }),
        frameRate: 16,
        repeat: 0
      })
    }

    // Add spellcast animation
    if (!scene.anims.exists('brian-spellcast-anim')) {
      scene.anims.create({
        key: 'brian-spellcast-anim',
        frames: scene.anims.generateFrameNumbers('brian-spellcast', { start: 0, end: 6 }),
        frameRate: 12,
        repeat: 0
      })
    }
  }

  private createJesseAnimations(scene: Phaser.Scene) {
    // Create animations for Jesse (using only side views - same as other characters)
    if (!scene.anims.exists('jesse-idle-anim')) {
      scene.anims.create({
        key: 'jesse-idle-anim',
        frames: scene.anims.generateFrameNumbers('jesse-combat-idle', { start: 2, end: 3 }),
        frameRate: 8,
        repeat: -1
      })
    }

    // Add walk animation
    if (!scene.anims.exists('jesse-walk-anim')) {
      scene.anims.create({
        key: 'jesse-walk-anim',
        frames: scene.anims.generateFrameNumbers('jesse-walk', { start: 9, end: 17 }),
        frameRate: 12,
        repeat: -1
      })
    }

    // Add attack animation
    if (!scene.anims.exists('jesse-attack-anim')) {
      scene.anims.create({
        key: 'jesse-attack-anim',
        frames: scene.anims.generateFrameNumbers('jesse-slash', { start: 6, end: 11 }),
        frameRate: 15,
        repeat: 0
      })
    }

    // Add hurt animation
    if (!scene.anims.exists('jesse-hurt-anim')) {
      scene.anims.create({
        key: 'jesse-hurt-anim',
        frames: scene.anims.generateFrameNumbers('jesse-hurt', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0
      })
    }

    // Add jump animation
    if (!scene.anims.exists('jesse-jump-anim')) {
      scene.anims.create({
        key: 'jesse-jump-anim',
        frames: scene.anims.generateFrameNumbers('jesse-jump', { start: 0, end: 4 }),
        frameRate: 6,
        repeat: -1
      })
    }

    // Add shoot animation
    if (!scene.anims.exists('jesse-shoot-anim')) {
      scene.anims.create({
        key: 'jesse-shoot-anim',
        frames: scene.anims.generateFrameNumbers('jesse-shoot', { start: 13, end: 25 }),
        frameRate: 16,
        repeat: 0
      })
    }

    // Add spellcast animation
    if (!scene.anims.exists('jesse-spellcast-anim')) {
      scene.anims.create({
        key: 'jesse-spellcast-anim',
        frames: scene.anims.generateFrameNumbers('jesse-spellcast', { start: 0, end: 6 }),
        frameRate: 12,
        repeat: 0
      })
    }
  }

  public update(deltaTime: number) {
    // Update physics using Phaser's built-in physics system
    // No manual physics calculations needed as Phaser handles this
    
    // Check if character has landed
    if (this.body && (this.body as Phaser.Physics.Arcade.Body).onFloor() && this.currentState === CharacterState.JUMPING) {
      this.setCharacterState(CharacterState.IDLE)
    }

    // Update timers
    this.stateTimer += deltaTime
    this.animationTimer += deltaTime
    
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

    // Update projectiles
    this.projectiles = this.projectiles.filter(projectile => {
      return projectile.update(deltaTime)
    })

    // Update sprite based on state and facing direction
    this.updateVisuals()
  }



  updateVisuals() {
    if (!this.isAnimatedSprite) return
    
    // Use generic animation system for all characters
    const characterId = this.characterData.id
    
    switch (this.currentState) {
      case CharacterState.IDLE:
        this.play(`${characterId}-idle-anim`, true)
        break
      case CharacterState.WALKING:
        this.play(`${characterId}-walk-anim`, true)
        break
      case CharacterState.JUMPING:
        this.play(`${characterId}-jump-anim`, true)
        break
      case CharacterState.ATTACKING:
        // Handle different attack types
        if (this.currentAttackType === AttackType.SPECIAL1) {
          this.play(`${characterId}-shoot-anim`, true)
        } else if (this.currentAttackType === AttackType.SPECIAL2) {
          this.play(`${characterId}-spellcast-anim`, true)
        } else {
          this.play(`${characterId}-attack-anim`, true)
        }
        break
      case CharacterState.HURT:
        this.play(`${characterId}-hurt-anim`, true)
        break
    }
    
    // Handle facing direction
    // All sprites face left by default, so we flip when facing right
    if (this.facingRight) {
      this.setFlipX(true)  // Flip to face right
    } else {
      this.setFlipX(false) // Don't flip to face left (default)
    }
    
    // Handle hurt effect
    if (this.currentState === CharacterState.HURT) {
      this.setTint(0xff6666) // Red tint when hurt
    } else {
      this.clearTint()
    }
  }

  public setCharacterState(newState: CharacterState) {
    if (this.currentState === newState) return
    
    this.currentState = newState
    this.stateTimer = 0
    
    // Handle state-specific logic - animations are handled in updateVisuals()
  }

  public moveLeft() {
    if (this.currentState !== CharacterState.ATTACKING && this.currentState !== CharacterState.HURT) {
      if (this.body) {
        (this.body as Phaser.Physics.Arcade.Body).setVelocityX(-GAME_CONSTANTS.PLAYER_SPEED)
      }
      this.facingRight = false
      if (this.currentState !== CharacterState.JUMPING) {
        this.setCharacterState(CharacterState.WALKING)
      }
    }
  }

  public moveRight() {
    if (this.currentState !== CharacterState.ATTACKING && this.currentState !== CharacterState.HURT) {
      if (this.body) {
        (this.body as Phaser.Physics.Arcade.Body).setVelocityX(GAME_CONSTANTS.PLAYER_SPEED)
      }
      this.facingRight = true
      if (this.currentState !== CharacterState.JUMPING) {
        this.setCharacterState(CharacterState.WALKING)
      }
    }
  }

  public jump() {
    if (this.body && (this.body as Phaser.Physics.Arcade.Body).onFloor()) {
      (this.body as Phaser.Physics.Arcade.Body).setVelocityY(GAME_CONSTANTS.JUMP_VELOCITY)
      this.setCharacterState(CharacterState.JUMPING)
      // Jump SFX
      SoundManager.playSfx(this.scene, 'sfx_jump', { volume: 0.4 })
    }
  }

  public attack(attackType: AttackType = AttackType.BASIC): boolean {
    if (this.attackCooldown > 0 || this.currentState === CharacterState.HURT) {
      return false
    }
    
    this.currentAttackType = attackType
    this.setCharacterState(CharacterState.ATTACKING)
    
    // Get character-specific move data
    const moveData = this.getCharacterMoveData(attackType)
    
    // Different cooldowns for different attack types
    switch (attackType) {
      case AttackType.BASIC:
        this.attackCooldown = moveData?.cooldown || 400 // Fast basic attack
        // SFX for basic melee
        SoundManager.playSfx(this.scene, 'sfx_attack_basic', { volume: 0.5 })
        // Show battle cry for BASIC attack as well
        if (moveData?.id) {
          this.showBattleCry(moveData.id, attackType)
        }
        break
      case AttackType.SPECIAL1:
        this.attackCooldown = moveData?.cooldown || 800 // Slower but stronger
        // Spawn character-specific projectile
        if (moveData?.id) {
          this.createProjectileFromMove(moveData.id)
          this.showBattleCry(moveData.id, attackType)
        } else {
          this.createProjectile(ProjectileType.BULLET)
        }
        // SFX for special/projectile
        SoundManager.playSfx(this.scene, 'sfx_attack_special', { volume: 0.5 })
        break
      case AttackType.SPECIAL2:
        this.attackCooldown = moveData?.cooldown || 600 // Medium speed
        // Spawn character-specific projectile
        if (moveData?.id) {
          this.createProjectileFromMove(moveData.id)
          this.showBattleCry(moveData.id, attackType)
        } else {
          this.createProjectile(ProjectileType.MAGIC)
        }
        // SFX for special/projectile
        SoundManager.playSfx(this.scene, 'sfx_attack_special', { volume: 0.5 })
        break
    }
    
    this.stateTimer = 0 // Reset state timer for attack duration
    return true
  }

  public getAttackDamage(): number {
    const baseAttack = this.characterData.stats.attack
    
    switch (this.currentAttackType) {
      case AttackType.BASIC:
        return Math.floor(baseAttack * 0.06) // Basic attacks do 6% of base attack (very low for long fights)
      case AttackType.SPECIAL1:
        return Math.floor(baseAttack * 0.08) // Special1 does 8% of base attack
      case AttackType.SPECIAL2:
        return Math.floor(baseAttack * 0.10) // Special2 does 10% of base attack
      default:
        return Math.floor(baseAttack * 0.06)
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
    if (this.body && knockbackX !== 0) {
      (this.body as Phaser.Physics.Arcade.Body).setVelocityX(knockbackX)
    }
    
    // Hit SFX
    SoundManager.playSfx(this.scene, 'sfx_hit', { volume: 0.55 })

    if (this.health <= 0) {
      this.health = 0
      return true // Character is defeated
    }
    
    this.setCharacterState(CharacterState.HURT)
    this.hurtTimer = 500 // Set hurt duration to 500ms
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
    if (this.body) {
      (this.body as Phaser.Physics.Arcade.Body).setVelocityX(0)
    }
    if (this.currentState === CharacterState.WALKING) {
      this.setCharacterState(CharacterState.IDLE)
    }
  }

  private createProjectile(projectileType: ProjectileType) {
    // Calculate projectile spawn position (slightly in front of character)
    const offsetX = this.facingRight ? 30 : -30
    const projectileX = this.x + offsetX
    const projectileY = this.y - 10 // Slightly above center
    
    // Create projectile with appropriate direction
    const direction = this.facingRight ? 1 : -1
    const damage = this.getAttackDamage()
    
    const projectile = new Projectile(
      this.scene,
      projectileX,
      projectileY,
      projectileType,
      direction,
      damage,
      this
    )
    
    this.projectiles.push(projectile)
  }

  // New methods: character-specific projectile and battle cry
  public createProjectileFromMove(moveId: string): void {
    const moveData = gameData.getMove(moveId)
    if (!moveData || !moveData.projectileType) return

    // Resolve appropriate type from ProjectileType enum
    const projectileType = ProjectileType[moveData.projectileType as keyof typeof ProjectileType]
    if (projectileType) {
      this.createProjectile(projectileType)
      // Projectile spawn SFX
      SoundManager.playSfx(this.scene, 'sfx_projectile', { volume: 0.5 })
    }
  }

  public showBattleCry(moveId: string, attackType: AttackType): void {
    const moveData = gameData.getMove(moveId)
    if (!moveData || !moveData.battleCries || moveData.battleCries.length === 0) return

    // Pick a random slogan — now all slogans are used
    const battleCryIndex = Math.floor(Math.random() * moveData.battleCries.length)
    const battleCry = moveData.battleCries[battleCryIndex]

    // Choose color based on attack type to visually differentiate
    let battleCryColor = '#FFD700' // gold for basic
    if (attackType === AttackType.SPECIAL1) {
      battleCryColor = '#00FFFF' // cyan for special1
    } else if (attackType === AttackType.SPECIAL2) {
      battleCryColor = '#FF00FF' // magenta for special2
    }

    // Display the battle cry on screen
    const battleCryText = this.scene.add.text(
      this.x,
      this.y - 60,
      battleCry,
      {
        fontSize: '14px',
        color: battleCryColor,
        stroke: '#000000',
        strokeThickness: 2,
        fontFamily: 'Bangers, Impact, Arial Black, Helvetica Neue, Arial, sans-serif'
      }
    ).setOrigin(0.5)

    // Animation: float upward and fade out
    this.scene.tweens.add({
      targets: battleCryText,
      y: battleCryText.y - 30,
      alpha: 0,
      duration: 2000,
      ease: 'Power2',
      onComplete: () => {
        battleCryText.destroy()
      }
    })
  }

  public getCharacterMoveData(attackType: AttackType): any {
    // Find appropriate move from the character's moves list
    const characterMoves = gameData.getCharacterMoves(this.characterData.id)
    if (characterMoves.length === 0) return null

    // Select move based on AttackType
    let targetMoveType: string
    switch (attackType) {
      case AttackType.BASIC:
        targetMoveType = 'basic'
        break
      case AttackType.SPECIAL1:
        targetMoveType = 'special1'
        break
      case AttackType.SPECIAL2:
        targetMoveType = 'special2'
        break
      default:
        targetMoveType = 'basic'
    }

    // Find the first move of this type
    const move = characterMoves.find(m => m.type === targetMoveType)
    return move || characterMoves[0] // Fallback to the first move if not found
  }
}