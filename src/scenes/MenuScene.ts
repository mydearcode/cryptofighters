import Phaser from 'phaser'

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' })
  }

  create() {
    // Add gradient background
    this.add.rectangle(400, 300, 800, 600, 0x0f0f23)
    
    // Add decorative elements
    this.add.rectangle(400, 300, 780, 580, 0x1a1a2e).setStrokeStyle(3, 0x00d4ff, 0.3)
    
    // Add title with glow effect
    const title = this.add.text(400, 120, 'CRYPTO FIGHTERS', {
      fontSize: '52px',
      color: '#00d4ff',
      fontFamily: 'Arial Black',
      stroke: '#003d5c',
      strokeThickness: 4
    }).setOrigin(0.5)
    
    // Add subtitle
    const subtitle = this.add.text(400, 170, 'The Most Powerful Warriors of Crypto World', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)
    subtitle.setAlpha(0.9)
    
    // Game mode selection title
    const modeTitle = this.add.text(400, 230, 'SELECT GAME MODE', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial Bold'
    }).setOrigin(0.5)
    
    // Single Player Button
    const singlePlayerButton = this.add.rectangle(400, 300, 280, 70, 0x16213e)
      .setStrokeStyle(3, 0x00d4ff)
      .setInteractive()
      .on('pointerdown', () => {
        // Set game mode to single player and go to character selection
        this.registry.set('gameMode', 'singlePlayer')
        this.scene.start('SelectScene')
      })
      .on('pointerover', () => {
        singlePlayerButton.setFillStyle(0x0f3460)
        singlePlayerButton.setStrokeStyle(3, 0x00ffff)
      })
      .on('pointerout', () => {
        singlePlayerButton.setFillStyle(0x16213e)
        singlePlayerButton.setStrokeStyle(3, 0x00d4ff)
      })
    
    const singlePlayerText = this.add.text(400, 285, 'SINGLE PLAYER', {
      fontSize: '18px',
      color: '#00d4ff',
      fontFamily: 'Arial Bold'
    }).setOrigin(0.5)
    
    const singlePlayerSubtext = this.add.text(400, 310, 'Play vs CPU', {
      fontSize: '14px',
      color: '#cccccc',
      fontFamily: 'Arial'
    }).setOrigin(0.5)
    
    // Two Player Button
    const twoPlayerButton = this.add.rectangle(400, 400, 280, 70, 0x16213e)
      .setStrokeStyle(3, 0x00d4ff)
      .setInteractive()
      .on('pointerdown', () => {
        // Set game mode to two player and go to character selection
        this.registry.set('gameMode', 'twoPlayer')
        this.scene.start('SelectScene')
      })
      .on('pointerover', () => {
        twoPlayerButton.setFillStyle(0x0f3460)
        twoPlayerButton.setStrokeStyle(3, 0x00ffff)
      })
      .on('pointerout', () => {
        twoPlayerButton.setFillStyle(0x16213e)
        twoPlayerButton.setStrokeStyle(3, 0x00d4ff)
      })
    
    const twoPlayerText = this.add.text(400, 385, 'TWO PLAYER', {
      fontSize: '18px',
      color: '#00d4ff',
      fontFamily: 'Arial Bold'
    }).setOrigin(0.5)
    
    const twoPlayerSubtext = this.add.text(400, 410, 'Play with Friend', {
      fontSize: '14px',
      color: '#cccccc',
      fontFamily: 'Arial'
    }).setOrigin(0.5)
    
    // Add instructions
    const instructions = this.add.text(400, 500, 
      'Movement: WASD (Player 1) / Arrow Keys (Player 2)\n' +
      'Attack: J, K, L (Player 1) / 1, 2, 3 (Player 2)', {
      fontSize: '13px',
      color: '#999999',
      fontFamily: 'Arial',
      align: 'center'
    }).setOrigin(0.5)
    instructions.setAlpha(0.8)
  }
}