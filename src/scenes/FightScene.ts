import Phaser from 'phaser'
import { GAME_CONSTANTS } from '../config/GameConfig'
import { Character, CharacterState, AttackType } from '../characters/Character'
import { CharacterManager } from '../characters/CharacterManager'
import { gameData, ArenaData } from '../data/DataManager'
import defiTempleImg from '../assets/images/arenas/defi_temple.png'
import exchangesStreetImg from '../assets/images/arenas/exchanges_street.png'

export class FightScene extends Phaser.Scene {
  private player1!: Character
  private player2!: Character
  private roundTime: number = GAME_CONSTANTS.ROUND_TIME
  private timerText!: Phaser.GameObjects.Text
  private p1HealthBar!: Phaser.GameObjects.Rectangle
  private p2HealthBar!: Phaser.GameObjects.Rectangle
  private p1NameText!: Phaser.GameObjects.Text
  private p2NameText!: Phaser.GameObjects.Text
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private wasdKeys!: any
  private gameTimer!: Phaser.Time.TimerEvent
  private player1HasHit: boolean = false
  private player2HasHit: boolean = false
  private currentArena!: ArenaData

  constructor() {
    super({ key: 'FightScene' })
  }

  preload() {
    console.log('FightScene preload started')
    
    // Add load event listeners for debugging
    this.load.on('filecomplete', (key: string, type: string, data: any) => {
      console.log(`File loaded successfully: ${key} (${type})`)
    })
    
    this.load.on('loaderror', (file: any) => {
      console.error(`Failed to load file: ${file.key} from ${file.url}`)
    })
    
    this.load.on('complete', () => {
      console.log('All files loaded successfully')
    })
    
    // Load character assets
    CharacterManager.preloadAssets(this)
    
    // Load arena background images using Vite import
    console.log('Loading defi_temple image from:', defiTempleImg)
    this.load.image('defi_temple', defiTempleImg)
    
    console.log('Loading exchanges_street image from:', exchangesStreetImg)
    this.load.image('exchanges_street', exchangesStreetImg)
  }

  create() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Get selected characters and arena
    const selectedCharacters = this.registry.get('selectedCharacters') || {
      player1: 'hodler',
      player2: 'trader'
    }

    const selectedArenaId = this.registry.get('selectedArena') || 'crypto_exchange'
    this.currentArena = gameData.getArena(selectedArenaId) || gameData.getAllArenas()[0]

    // Background (arena)
    this.createArena()

    // Create UI
    this.createUI(selectedCharacters)

    // Create players
    this.createPlayers(selectedCharacters)

    // Setup input
    this.setupInput()

    // Start round timer
    this.startRoundTimer()

    // Add some fight instructions
    this.add.text(width / 2, height - 30, 'P1: WASD + Space | P2: Arrow Keys + Enter', {
      font: '12px Courier New',
      color: '#888888'
    }).setOrigin(0.5)
  }

  private createArena() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Check if arena has a PNG background image
    if (this.currentArena.background.endsWith('.png')) {
      // Use image background - use the filename without extension as key
      const bgKey = this.currentArena.background.replace('.png', '')
      const bgImage = this.add.image(width / 2, height / 2, bgKey)
      
      // Scale image to fit screen while maintaining aspect ratio
      const scaleX = width / bgImage.width
      const scaleY = height / bgImage.height
      const scale = Math.max(scaleX, scaleY)
      bgImage.setScale(scale)
    } else {
      // Parse arena background color (fallback)
      const bgColor = this.parseColor(this.currentArena.background)
      
      // Arena background with theme-based color
      this.add.rectangle(width / 2, height / 2, width, height, bgColor)
    }

    // Create invisible physics ground for collision (no visual ground since BG has its own)
    const ground = this.add.rectangle(width / 2, GAME_CONSTANTS.GROUND_Y + 25, width, 50, 0x000000, 0) // Alpha 0 = invisible
    ground.setName('ground') // Set name for later reference
    
    // Add physics to ground for collision
    this.physics.add.existing(ground, true) // true makes it static
    const groundBody = ground.body as Phaser.Physics.Arcade.StaticBody
    if (groundBody) {
      groundBody.setSize(width, 50)
    }

    // Arena name (dynamic)
    this.add.text(width / 2, 30, this.currentArena.name.toUpperCase(), {
      font: 'bold 16px Courier New',
      color: this.getThemeColor(this.currentArena.theme)
    }).setOrigin(0.5)

    // Theme-specific visual effects
    this.createArenaEffects()

    // Crowd simulation with theme colors
    this.createCrowd()
  }

  private parseColor(colorStr: string): number {
    // Convert color string to hex number
    if (colorStr.startsWith('#')) {
      return parseInt(colorStr.substring(1), 16)
    }
    // Default colors for named themes
    const themeColors: { [key: string]: number } = {
      'cyberpunk': 0x1a1a2e,
      'neon': 0x0f0f23,
      'industrial': 0x2c2c2c,
      'mystical': 0x1e1e3f,
      'artistic': 0xf5f5dc,
      'playful': 0xff69b4
    }
    return themeColors[colorStr] || 0x1a1a2e
  }

  private getGroundColor(theme: string): number {
    const groundColors: { [key: string]: number } = {
      'cyberpunk': 0x444444,
      'neon': 0x333366,
      'industrial': 0x555555,
      'mystical': 0x4a4a6a,
      'artistic': 0xdaa520,
      'playful': 0xff1493
    }
    return groundColors[theme] || 0x444444
  }

  private getThemeColor(theme: string): string {
    const themeColors: { [key: string]: string } = {
      'cyberpunk': '#00ffff',
      'neon': '#ff00ff',
      'industrial': '#ffaa00',
      'mystical': '#9370db',
      'artistic': '#ffd700',
      'playful': '#ff69b4'
    }
    return themeColors[theme] || '#ffaa00'
  }

  private createArenaEffects() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Add theme-specific visual elements
    switch (this.currentArena.theme) {
      case 'cyberpunk':
        // Add grid lines
        for (let i = 0; i < width; i += 50) {
          this.add.line(0, 0, i, 0, i, height, 0x00ffff, 0.1)
        }
        break
      
      case 'neon':
        // Add glowing borders
        this.add.rectangle(width / 2, height / 2, width - 10, height - 10, 0x000000, 0)
          .setStrokeStyle(3, 0xff00ff, 0.8)
        break
      
      case 'industrial':
        // Add metal beams
        this.add.rectangle(100, height / 2, 20, height, 0x666666)
        this.add.rectangle(width - 100, height / 2, 20, height, 0x666666)
        break
      
      case 'mystical':
        // Add floating orbs
        for (let i = 0; i < 5; i++) {
          const x = 100 + i * (width - 200) / 4
          const y = 150 + Math.sin(i) * 50
          this.add.circle(x, y, 8, 0x9370db, 0.6)
        }
        break
      
      case 'artistic':
        // Add decorative frames
        this.add.rectangle(50, height / 2, 10, height - 100, 0xdaa520)
        this.add.rectangle(width - 50, height / 2, 10, height - 100, 0xdaa520)
        break
      
      case 'playful':
        // Add colorful shapes
        for (let i = 0; i < 8; i++) {
          const x = 80 + i * 80
          const y = 120 + Math.random() * 60
          const colors = [0xff69b4, 0x00ff7f, 0xffd700, 0xff6347]
          this.add.star(x, y, 5, 10, 20, colors[i % colors.length], 0.7)
        }
        break
    }
  }

  private createCrowd() {
    const width = this.cameras.main.width
    const crowdColor = this.parseColor(this.currentArena.lighting)

    // Crowd simulation with arena-specific colors
    for (let i = 0; i < 20; i++) {
      const x = 50 + i * 40
      const y = 100 + Math.random() * 50
      const variation = Phaser.Math.Between(-0x111111, 0x111111)
      this.add.rectangle(x, y, 8, 15, crowdColor + variation)
    }
  }

  private createUI(selectedCharacters: any) {
    const width = this.cameras.main.width

    // Get character data for names
    const char1Data = CharacterManager.getCharacterById(selectedCharacters.player1) || CharacterManager.getAllCharacters()[0]
    const char2Data = CharacterManager.getCharacterById(selectedCharacters.player2) || CharacterManager.getAllCharacters()[1]

    // Health bars background
    this.add.rectangle(width / 2, 80, width - 40, 60, 0x000000, 0.7)

    // Player 1 UI (left side)
    this.p1NameText = this.add.text(30, 60, char1Data.name.toUpperCase(), {
      font: 'bold 14px Courier New',
      color: '#00ff00'
    })

    this.add.rectangle(30, 85, 200, 20, 0x333333).setOrigin(0, 0.5)
    this.p1HealthBar = this.add.rectangle(30, 85, 200, 18, 0x00ff00).setOrigin(0, 0.5)

    // Player 2 UI (right side)
    this.p2NameText = this.add.text(width - 30, 60, char2Data.name.toUpperCase(), {
      font: 'bold 14px Courier New',
      color: '#ff0000'
    }).setOrigin(1, 0)

    this.add.rectangle(width - 30, 85, 200, 20, 0x333333).setOrigin(1, 0.5)
    this.p2HealthBar = this.add.rectangle(width - 30, 85, 200, 18, 0xff0000).setOrigin(1, 0.5)

    // Round timer
    this.timerText = this.add.text(width / 2, 70, GAME_CONSTANTS.ROUND_TIME.toString(), {
      font: 'bold 24px Courier New',
      color: '#ffffff'
    }).setOrigin(0.5)

    // Round indicator
    this.add.text(width / 2, 95, 'ROUND 1', {
      font: '12px Courier New',
      color: '#888888'
    }).setOrigin(0.5)
  }

  private createPlayers(selectedCharacters: any) {
    // Get character data
    const char1Data = CharacterManager.getCharacterById(selectedCharacters.player1) || CharacterManager.getAllCharacters()[0]
    const char2Data = CharacterManager.getCharacterById(selectedCharacters.player2) || CharacterManager.getAllCharacters()[1]

    // Create character instances at ground level
    this.player1 = new Character(this, 200, GAME_CONSTANTS.GROUND_Y - 40, char1Data)
    this.player2 = new Character(this, 760, GAME_CONSTANTS.GROUND_Y - 40, char2Data)
    
    // Player 2 faces left initially
    this.player2.facingRight = false
    
    // Add collision between characters and ground
    const ground = this.children.getByName('ground') as Phaser.Physics.Arcade.Sprite
    if (ground) {
      this.physics.add.collider(this.player1, ground)
      this.physics.add.collider(this.player2, ground)
    }
  }

  private setupInput() {
    // Cursor keys for Player 2
    this.cursors = this.input.keyboard!.createCursorKeys()

    // WASD keys for Player 1
    this.wasdKeys = this.input.keyboard!.addKeys('W,S,A,D,SPACE,Q,E,ENTER,CTRL')
  }

  private startRoundTimer() {
    // Reset timer to initial value
    this.roundTime = GAME_CONSTANTS.ROUND_TIME
    this.timerText.setText(this.roundTime.toString())
    
    this.gameTimer = this.time.addEvent({
      delay: GAME_CONSTANTS.TIMER_UPDATE_INTERVAL,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    })
  }

  private updateTimer() {
    this.roundTime--
    this.timerText.setText(this.roundTime.toString())

    if (this.roundTime <= 0) {
      this.endRound('TIME_UP')
    }
  }

  update() {
    this.handleInput()
    this.player1.update(this.game.loop.delta)
    this.player2.update(this.game.loop.delta)
    this.checkCollisions()
    this.updateHealthBars()
  }

  private updateHealthBars() {
    // Update health bar widths based on character health
    const p1HealthPercent = this.player1.health / this.player1.maxHealth
    const p2HealthPercent = this.player2.health / this.player2.maxHealth
    
    this.p1HealthBar.width = 200 * p1HealthPercent
    this.p2HealthBar.width = 200 * p2HealthPercent
  }

  private handleInput() {
    // Player 1 controls (WASD)
    if (this.wasdKeys.A.isDown) {
      this.player1.moveLeft()
    } else if (this.wasdKeys.D.isDown) {
      this.player1.moveRight()
    } else {
      this.player1.stopMovement()
    }

    if (Phaser.Input.Keyboard.JustDown(this.wasdKeys.W)) {
      this.player1.jump()
    }

    // Player 2 controls (Arrow keys)
    if (this.cursors.left!.isDown) {
      this.player2.moveLeft()
    } else if (this.cursors.right!.isDown) {
      this.player2.moveRight()
    } else {
      this.player2.stopMovement()
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up!)) {
      this.player2.jump()
    }

    // Attack inputs - different attack types with different damage
    if (Phaser.Input.Keyboard.JustDown(this.wasdKeys.SPACE)) {
      this.player1.attack(AttackType.BASIC) // Basic attack - normal damage, fast
    }
    if (Phaser.Input.Keyboard.JustDown(this.wasdKeys.Q)) {
      this.player1.attack(AttackType.SPECIAL1) // Special move 1 - high damage, slow
    }
    if (Phaser.Input.Keyboard.JustDown(this.wasdKeys.E)) {
      this.player1.attack(AttackType.SPECIAL2) // Special move 2 - low damage, medium speed
    }
    
    if (Phaser.Input.Keyboard.JustDown(this.cursors.shift!)) {
      this.player2.attack(AttackType.BASIC) // Basic attack - normal damage, fast
    }
    if (Phaser.Input.Keyboard.JustDown(this.wasdKeys.ENTER)) {
      this.player2.attack(AttackType.SPECIAL1) // Special move 1 - high damage, slow
    }
    if (Phaser.Input.Keyboard.JustDown(this.wasdKeys.CTRL)) {
      this.player2.attack(AttackType.SPECIAL2) // Special move 2 - low damage, medium speed
    }

    // Keep players on screen
    this.player1.x = Phaser.Math.Clamp(this.player1.x, 50, this.cameras.main.width - 50)
    this.player2.x = Phaser.Math.Clamp(this.player2.x, 50, this.cameras.main.width - 50)
  }

  private checkProjectileCollisions() {
    // Check Player 1's projectiles hitting Player 2
    for (let i = this.player1.projectiles.length - 1; i >= 0; i--) {
      const projectile = this.player1.projectiles[i]
      const projectileHitbox = projectile.getHitbox()
      const player2Hitbox = { x: this.player2.x - 32, y: this.player2.y - 32, width: 64, height: 64 }
      
      if (this.checkRectangleCollision(projectileHitbox, player2Hitbox)) {
        // Projectile hit Player 2
        this.player2.takeDamage(projectile.getDamage())
        projectile.destroy()
        this.player1.projectiles.splice(i, 1)
      }
    }

    // Check Player 2's projectiles hitting Player 1
    for (let i = this.player2.projectiles.length - 1; i >= 0; i--) {
      const projectile = this.player2.projectiles[i]
      const projectileHitbox = projectile.getHitbox()
      const player1Hitbox = { x: this.player1.x - 32, y: this.player1.y - 32, width: 64, height: 64 }
      
      if (this.checkRectangleCollision(projectileHitbox, player1Hitbox)) {
        // Projectile hit Player 1
        this.player1.takeDamage(projectile.getDamage())
        projectile.destroy()
        this.player2.projectiles.splice(i, 1)
      }
    }
  }

  private checkRectangleCollision(rect1: { x: number, y: number, width: number, height: number }, rect2: { x: number, y: number, width: number, height: number }): boolean {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y
  }

  private checkCollisions() {
    const distance = Math.abs(this.player1.x - this.player2.x)
    
    // Prevent players from overlapping - allow closer combat but prevent complete overlap
    if (distance < 40) {
      if (this.player1.x < this.player2.x) {
        this.player1.x -= 1
        this.player2.x += 1
      } else {
        this.player1.x += 1
        this.player2.x -= 1
      }
    }

    // Check for attack collisions - increased attack range for better combat feel
    if (this.player1.currentState === CharacterState.ATTACKING && distance < 120 && !this.player1HasHit) {
      // Player 1 attacks Player 2 - use character's attack damage based on attack type
      const damage = this.player1.getAttackDamage()
      this.player2.takeDamage(damage)
      this.player1HasHit = true
    }
    if (this.player2.currentState === CharacterState.ATTACKING && distance < 150 && !this.player2HasHit) {
      // Player 2 attacks Player 1 - use character's attack damage based on attack type
      const damage = this.player2.getAttackDamage()
      this.player1.takeDamage(damage)
      this.player2HasHit = true
    }

    // Check projectile collisions
    this.checkProjectileCollisions()

    // Reset hit flags when not attacking
    if (this.player1.currentState !== CharacterState.ATTACKING) {
      this.player1HasHit = false
    }
    if (this.player2.currentState !== CharacterState.ATTACKING) {
      this.player2HasHit = false
    }

    // Check for KO
    if (this.player1.health <= 0) {
      this.endRound('PLAYER2_WINS')
    } else if (this.player2.health <= 0) {
      this.endRound('PLAYER1_WINS')
    }
  }

  private endRound(result: string) {
    this.gameTimer.destroy()

    // Show result
    const resultText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, result, {
      font: 'bold 32px Courier New',
      color: '#ffff00',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5)

    // Transition to results after delay
    this.time.delayedCall(3000, () => {
      this.registry.set('fightResult', {
        result: result,
        player1Health: this.player1.health,
        player2Health: this.player2.health
      })
      this.scene.start('ResultsScene')
    })
  }
}