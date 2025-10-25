import Phaser from 'phaser'
import { CharacterManager } from '../characters/CharacterManager'

export class ResultsScene extends Phaser.Scene {
  private fightResult: any
  private selectedCharacters: any

  constructor() {
    super({ key: 'ResultsScene' })
  }

  create() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Get fight result and selected characters from registry
    this.fightResult = this.registry.get('fightResult') || {
      result: 'PLAYER1_WINS',
      player1Health: 100,
      player2Health: 0
    }

    this.selectedCharacters = this.registry.get('selectedCharacters') || {
      player1: 'vitalik',
      player2: 'satoshi'
    }

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x0f0f23)

    // Title
    this.add.text(width / 2, 80, 'FIGHT RESULTS', {
      font: 'bold 32px Courier New',
      color: '#ffaa00'
    }).setOrigin(0.5)

    // Result display
    this.displayResult()

    // Stats display
    this.displayStats()

    // Buttons
    this.createButtons()

    // Add some crypto-themed celebration
    this.addCelebrationEffects()
  }

  private displayResult() {
    const width = this.cameras.main.width
    let resultText = ''
    let resultColor = '#ffffff'

    // Get character data for names
    const char1Data = CharacterManager.getCharacterById(this.selectedCharacters.player1) || CharacterManager.getAllCharacters()[0]
    const char2Data = CharacterManager.getCharacterById(this.selectedCharacters.player2) || CharacterManager.getAllCharacters()[1]

    switch (this.fightResult.result) {
      case 'PLAYER1_WINS':
        resultText = `🏆 ${char1Data.name.toUpperCase()} WINS! 🏆`
        resultColor = '#00ff00'
        break
      case 'PLAYER2_WINS':
        resultText = `🏆 ${char2Data.name.toUpperCase()} WINS! 🏆`
        resultColor = '#ff0000'
        break
      case 'TIME_UP':
        if (this.fightResult.player1Health > this.fightResult.player2Health) {
          resultText = `⏰ ${char1Data.name.toUpperCase()} WINS BY DECISION! ⏰`
          resultColor = '#00ff00'
        } else if (this.fightResult.player2Health > this.fightResult.player1Health) {
          resultText = `⏰ ${char2Data.name.toUpperCase()} WINS BY DECISION! ⏰`
          resultColor = '#ff0000'
        } else {
          resultText = '🤝 DRAW! 🤝'
          resultColor = '#ffff00'
        }
        break
      default:
        resultText = '🤝 DRAW! 🤝'
        resultColor = '#ffff00'
    }

    this.add.text(width / 2, 160, resultText, {
      font: 'bold 24px Courier New',
      color: resultColor,
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5)
  }

  private displayStats() {
    const width = this.cameras.main.width

    // Get character data for names
    const char1Data = CharacterManager.getCharacterById(this.selectedCharacters.player1) || CharacterManager.getAllCharacters()[0]
    const char2Data = CharacterManager.getCharacterById(this.selectedCharacters.player2) || CharacterManager.getAllCharacters()[1]

    // Stats container
    this.add.rectangle(width / 2, 280, 500, 120, 0x000000, 0.8)

    // Headers
    this.add.text(width / 2 - 150, 240, 'FINAL STATS', {
      font: 'bold 16px Courier New',
      color: '#ffaa00'
    }).setOrigin(0.5)

    // Player 1 stats
    this.add.text(width / 2 - 150, 270, char1Data.name.toUpperCase(), {
      font: 'bold 14px Courier New',
      color: '#00ff00'
    }).setOrigin(0.5)

    this.add.text(width / 2 - 150, 290, `Health: ${this.fightResult.player1Health}%`, {
      font: '12px Courier New',
      color: '#ffffff'
    }).setOrigin(0.5)

    this.add.text(width / 2 - 150, 310, `Status: ${this.fightResult.player1Health > 0 ? 'ALIVE' : 'REKT'}`, {
      font: '12px Courier New',
      color: this.fightResult.player1Health > 0 ? '#00ff00' : '#ff0000'
    }).setOrigin(0.5)

    // VS
    this.add.text(width / 2, 290, 'VS', {
      font: 'bold 16px Courier New',
      color: '#888888'
    }).setOrigin(0.5)

    // Player 2 stats
    this.add.text(width / 2 + 150, 270, char2Data.name.toUpperCase(), {
      font: 'bold 14px Courier New',
      color: '#ff0000'
    }).setOrigin(0.5)

    this.add.text(width / 2 + 150, 290, `Health: ${this.fightResult.player2Health}%`, {
      font: '12px Courier New',
      color: '#ffffff'
    }).setOrigin(0.5)

    this.add.text(width / 2 + 150, 310, `Status: ${this.fightResult.player2Health > 0 ? 'ALIVE' : 'REKT'}`, {
      font: '12px Courier New',
      color: this.fightResult.player2Health > 0 ? '#00ff00' : '#ff0000'
    }).setOrigin(0.5)

    // Rewards section
    this.add.text(width / 2, 360, '💰 REWARDS EARNED 💰', {
      font: 'bold 14px Courier New',
      color: '#ffaa00'
    }).setOrigin(0.5)

    const coins = Math.floor(Math.random() * 100) + 50
    const xp = Math.floor(Math.random() * 200) + 100

    this.add.text(width / 2, 380, `+${coins} CRYPTO COINS | +${xp} XP`, {
      font: '12px Courier New',
      color: '#00ff88'
    }).setOrigin(0.5)
  }

  private createButtons() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Fight Again button
    const fightAgainBtn = this.add.rectangle(width / 2 - 120, height - 80, 200, 40, 0x4a90e2)
    const fightAgainText = this.add.text(width / 2 - 120, height - 80, 'FIGHT AGAIN', {
      font: 'bold 14px Courier New',
      color: '#ffffff'
    }).setOrigin(0.5)

    fightAgainBtn.setInteractive()
    fightAgainBtn.on('pointerdown', () => {
      this.scene.start('SelectScene')
    })

    fightAgainBtn.on('pointerover', () => {
      fightAgainBtn.setFillStyle(0x357abd)
    })

    fightAgainBtn.on('pointerout', () => {
      fightAgainBtn.setFillStyle(0x4a90e2)
    })

    // Main Menu button
    const mainMenuBtn = this.add.rectangle(width / 2 + 120, height - 80, 200, 40, 0x666666)
    const mainMenuText = this.add.text(width / 2 + 120, height - 80, 'MAIN MENU', {
      font: 'bold 14px Courier New',
      color: '#ffffff'
    }).setOrigin(0.5)

    mainMenuBtn.setInteractive()
    mainMenuBtn.on('pointerdown', () => {
      this.scene.start('MenuScene')
    })

    mainMenuBtn.on('pointerover', () => {
      mainMenuBtn.setFillStyle(0x555555)
    })

    mainMenuBtn.on('pointerout', () => {
      mainMenuBtn.setFillStyle(0x666666)
    })

    // Share Result button (placeholder for future Telegram integration)
    const shareBtn = this.add.rectangle(width / 2, height - 120, 300, 30, 0x0088cc)
    const shareText = this.add.text(width / 2, height - 120, '📱 SHARE RESULT (Coming Soon)', {
      font: '12px Courier New',
      color: '#ffffff'
    }).setOrigin(0.5)

    shareBtn.setInteractive()
    shareBtn.on('pointerdown', () => {
      // Placeholder for Telegram sharing
      console.log('Share functionality will be implemented in Phase 4')
    })

    shareBtn.on('pointerover', () => {
      shareBtn.setFillStyle(0x0077bb)
    })

    shareBtn.on('pointerout', () => {
      shareBtn.setFillStyle(0x0088cc)
    })
  }

  private addCelebrationEffects() {
    const width = this.cameras.main.width

    // Add some floating crypto symbols
    const symbols = ['₿', '⟠', '💎', '🚀', '📈', '💰']
    
    for (let i = 0; i < 8; i++) {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)]
      const x = Math.random() * width
      const y = Math.random() * 100 + 400
      
      const symbolText = this.add.text(x, y, symbol, {
        font: '20px Arial',
        color: '#ffaa00'
      }).setOrigin(0.5)

      // Floating animation
      this.tweens.add({
        targets: symbolText,
        y: y - 100,
        alpha: 0,
        duration: 3000 + Math.random() * 2000,
        ease: 'Power2',
        repeat: -1,
        delay: Math.random() * 2000
      })
    }

    // Add winner glow effect if there's a clear winner
    if (this.fightResult.result !== 'TIME_UP' && !this.fightResult.result.includes('DRAW')) {
      const particles = this.add.particles(0, 0, 'white', {
        x: width / 2,
        y: 160,
        speed: { min: 50, max: 100 },
        scale: { start: 0.3, end: 0 },
        lifespan: 1000,
        quantity: 2
      })

      // Create a simple white texture for particles
      this.add.graphics()
        .fillStyle(0xffffff)
        .fillCircle(2, 2, 2)
        .generateTexture('white', 4, 4)
    }
  }
}