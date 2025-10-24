import Phaser from 'phaser'
import { GAME_CONSTANTS } from '../config/GameConfig'
import { Character, CharacterState } from '../characters/Character'
import { CharacterManager } from '../characters/CharacterManager'

export class FightScene extends Phaser.Scene {
  private player1!: Character
  private player2!: Character
  private roundTime = 99
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

  constructor() {
    super({ key: 'FightScene' })
  }

  preload() {
    // Load character assets
    CharacterManager.preloadAssets(this)
  }

  create() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Get selected characters
    const selectedCharacters = this.registry.get('selectedCharacters') || {
      player1: 'hodler',
      player2: 'trader'
    }

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

    // Arena background
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a1a2e)

    // Ground
    this.add.rectangle(width / 2, GAME_CONSTANTS.GROUND_Y + 25, width, 50, 0x444444)

    // Arena name
    this.add.text(width / 2, 30, 'TOKEN2049 DUBAI ARENA', {
      font: 'bold 16px Courier New',
      color: '#ffaa00'
    }).setOrigin(0.5)

    // Crowd simulation (simple rectangles)
    for (let i = 0; i < 20; i++) {
      const x = 50 + i * 40
      const y = 100 + Math.random() * 50
      this.add.rectangle(x, y, 8, 15, Phaser.Math.Between(0x333333, 0x666666))
    }
  }

  private createUI(selectedCharacters: any) {
    const width = this.cameras.main.width

    // Health bars background
    this.add.rectangle(width / 2, 80, width - 40, 60, 0x000000, 0.7)

    // Player 1 UI (left side)
    this.p1NameText = this.add.text(30, 60, 'HODL MASTER', {
      font: 'bold 14px Courier New',
      color: '#00ff00'
    })

    this.add.rectangle(30, 85, 200, 20, 0x333333).setOrigin(0, 0.5)
    this.p1HealthBar = this.add.rectangle(30, 85, 200, 18, 0x00ff00).setOrigin(0, 0.5)

    // Player 2 UI (right side)
    this.p2NameText = this.add.text(width - 30, 60, 'DAY TRADER', {
      font: 'bold 14px Courier New',
      color: '#ff0000'
    }).setOrigin(1, 0)

    this.add.rectangle(width - 30, 85, 200, 20, 0x333333).setOrigin(1, 0.5)
    this.p2HealthBar = this.add.rectangle(width - 30, 85, 200, 18, 0xff0000).setOrigin(1, 0.5)

    // Round timer
    this.timerText = this.add.text(width / 2, 70, '99', {
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

    // Create character instances
    this.player1 = new Character(this, 200, 400, char1Data)
    this.player2 = new Character(this, 760, 400, char2Data)
    
    // Player 2 faces left initially
    this.player2.facingRight = false
  }

  private setupInput() {
    // Cursor keys for Player 2
    this.cursors = this.input.keyboard!.createCursorKeys()

    // WASD keys for Player 1
    this.wasdKeys = this.input.keyboard!.addKeys('W,S,A,D,SPACE,Q,E,ENTER,CTRL')
  }

  private startRoundTimer() {
    this.gameTimer = this.time.addEvent({
      delay: 1000,
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

    // Attack inputs - different attack types
    if (Phaser.Input.Keyboard.JustDown(this.wasdKeys.SPACE)) {
      this.player1.attack() // Basic attack
    }
    if (Phaser.Input.Keyboard.JustDown(this.wasdKeys.Q)) {
      this.player1.attack() // Special move 1 (for now same as basic)
    }
    if (Phaser.Input.Keyboard.JustDown(this.wasdKeys.E)) {
      this.player1.attack() // Special move 2 (for now same as basic)
    }
    
    if (Phaser.Input.Keyboard.JustDown(this.cursors.shift!)) {
      this.player2.attack() // Basic attack
    }
    if (Phaser.Input.Keyboard.JustDown(this.wasdKeys.ENTER)) {
      this.player2.attack() // Special move 1 (for now same as basic)
    }
    if (Phaser.Input.Keyboard.JustDown(this.wasdKeys.CTRL)) {
      this.player2.attack() // Special move 2 (for now same as basic)
    }

    // Keep players on screen
    this.player1.x = Phaser.Math.Clamp(this.player1.x, 50, this.cameras.main.width - 50)
    this.player2.x = Phaser.Math.Clamp(this.player2.x, 50, this.cameras.main.width - 50)
  }

  private checkCollisions() {
    const distance = Math.abs(this.player1.x - this.player2.x)
    
    // Prevent players from overlapping
    if (distance < 80) {
      if (this.player1.x < this.player2.x) {
        this.player1.x -= 2
        this.player2.x += 2
      } else {
        this.player1.x += 2
        this.player2.x -= 2
      }
    }

    // Check for attack collisions - only damage the other player once per attack
    if (this.player1.currentState === CharacterState.ATTACKING && distance < 100 && !this.player1HasHit) {
      // Player 1 attacks Player 2 - use character's attack stat
      const damage = this.player1.characterData.stats.attack
      this.player2.takeDamage(damage)
      this.player1HasHit = true
    }
    if (this.player2.currentState === CharacterState.ATTACKING && distance < 100 && !this.player2HasHit) {
      // Player 2 attacks Player 1 - use character's attack stat
      const damage = this.player2.characterData.stats.attack
      this.player1.takeDamage(damage)
      this.player2HasHit = true
    }

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