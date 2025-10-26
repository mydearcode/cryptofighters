import Phaser from 'phaser'

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' })
  }

  create() {
    const { width, height } = this.cameras.main
    
    // Full screen background to eliminate any blue remnants
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a0a0a)
    
    // Add decorative elements - fiery border
    this.add.rectangle(width / 2, height / 2, width - 20, height - 20, 0x2a1a1a).setStrokeStyle(3, 0xff4444, 0.6)
    
    // Add title with enhanced glow effect - more dynamic font
    const title = this.add.text(width / 2, 120, 'CRYPTO FIGHTERS', {
      fontSize: '56px',
      color: '#ff6600',
      fontFamily: 'Impact, Arial Black, sans-serif',
      stroke: '#660000',
      strokeThickness: 6,
      shadow: {
        offsetX: 3,
        offsetY: 3,
        color: '#330000',
        blur: 5,
        fill: true
      }
    }).setOrigin(0.5)
    
    // Add subtitle with better styling
    const subtitle = this.add.text(width / 2, 170, 'The Most Powerful Warriors of Crypto World', {
      fontSize: '20px',
      color: '#ffccaa',
      fontFamily: 'Georgia, serif',
      fontStyle: 'italic',
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#660000',
        blur: 2,
        fill: true
      }
    }).setOrigin(0.5)
    subtitle.setAlpha(0.9)
    
    // Game mode selection title with better font
    const modeTitle = this.add.text(width / 2, 230, 'SELECT GAME MODE', {
      fontSize: '26px',
      color: '#ffddcc',
      fontFamily: 'Impact, Arial Black, sans-serif',
      letterSpacing: 2,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#330000',
        blur: 3,
        fill: true
      }
    }).setOrigin(0.5)
    
    // Single Player Button - dark red theme with better styling
    const singlePlayerButton = this.add.rectangle(width / 2, 300, 280, 70, 0x3d1a1a)
      .setStrokeStyle(3, 0xff4444)
      .setInteractive()
      .on('pointerdown', () => {
        // Set game mode to single player and go to character selection
        this.registry.set('gameMode', 'singlePlayer')
        this.scene.start('SelectScene')
      })
      .on('pointerover', () => {
        singlePlayerButton.setFillStyle(0x5d2a2a)
        singlePlayerButton.setStrokeStyle(3, 0xff6666)
      })
      .on('pointerout', () => {
        singlePlayerButton.setFillStyle(0x3d1a1a)
        singlePlayerButton.setStrokeStyle(3, 0xff4444)
      })
    
    const singlePlayerText = this.add.text(width / 2, 285, 'SINGLE PLAYER', {
      fontSize: '20px',
      color: '#ff6600',
      fontFamily: 'Impact, Arial Black, sans-serif',
      letterSpacing: 1,
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#330000',
        blur: 2,
        fill: true
      }
    }).setOrigin(0.5)
    
    const singlePlayerSubtext = this.add.text(width / 2, 310, 'Play vs CPU', {
      fontSize: '14px',
      color: '#ddaa88',
      fontFamily: 'Georgia, serif',
      fontStyle: 'italic'
    }).setOrigin(0.5)
    
    // Two Player Button - matching theme with better styling
    const twoPlayerButton = this.add.rectangle(width / 2, 400, 280, 70, 0x3d1a1a)
      .setStrokeStyle(3, 0xff4444)
      .setInteractive()
      .on('pointerdown', () => {
        // Set game mode to two player and go to character selection
        this.registry.set('gameMode', 'twoPlayer')
        this.scene.start('SelectScene')
      })
      .on('pointerover', () => {
        twoPlayerButton.setFillStyle(0x5d2a2a)
        twoPlayerButton.setStrokeStyle(3, 0xff6666)
      })
      .on('pointerout', () => {
        twoPlayerButton.setFillStyle(0x3d1a1a)
        twoPlayerButton.setStrokeStyle(3, 0xff4444)
      })
    
    const twoPlayerText = this.add.text(width / 2, 385, 'TWO PLAYER', {
      fontSize: '20px',
      color: '#ff6600',
      fontFamily: 'Impact, Arial Black, sans-serif',
      letterSpacing: 1,
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#330000',
        blur: 2,
        fill: true
      }
    }).setOrigin(0.5)
    
    const twoPlayerSubtext = this.add.text(width / 2, 410, 'Play with Friend', {
      fontSize: '14px',
      color: '#ddaa88',
      fontFamily: 'Georgia, serif',
      fontStyle: 'italic'
    }).setOrigin(0.5)
    
    // Add instructions - better styled and more readable
    const instructions = this.add.text(width / 2, 500, 
      'Movement: WASD (Player 1) / Arrow Keys (Player 2)\n' +
      'Attack: J, K, L (Player 1) / 1, 2, 3 (Player 2)', {
      fontSize: '13px',
      color: '#aa7766',
      fontFamily: 'Courier New, monospace',
      align: 'center',
      lineSpacing: 4
    }).setOrigin(0.5)
    instructions.setAlpha(0.8)
  }
}