import Phaser from 'phaser'
import { SoundManager } from '../audio/SoundManager'

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
      fontSize: '72px',
      color: '#ff6600',
      fontFamily: '"Bangers", Impact, "Arial Black", "Helvetica Neue", Arial, sans-serif',
      stroke: '#660000',
      strokeThickness: 8,
      shadow: {
        offsetX: 4,
        offsetY: 4,
        color: '#330000',
        blur: 6,
        fill: true
      }
    }).setOrigin(0.5)

    // Subtle beta badge next to the title
    const titleBounds = title.getBounds()
    this.add.text(titleBounds.right + 10, titleBounds.top + 8, '(beta)', {
      fontSize: '20px',
      color: '#ffddcc',
      fontFamily: '"Geo", "Courier New", monospace, sans-serif',
      fontStyle: 'italic',
      stroke: '#5a1a1a',
      strokeThickness: 2,
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#330000',
        blur: 2,
        fill: true
      }
    }).setOrigin(0, 0).setAlpha(0.9)
    
    // Add subtitle with better styling
    const subtitle = this.add.text(width / 2, 170, 'The Most Powerful Warriors of Crypto World', {
      fontSize: '20px',
      color: '#ffccaa',
      fontFamily: '"Geo", "Courier New", monospace, sans-serif',
      fontStyle: 'normal',
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
    this.add.text(width / 2, 230, 'SELECT GAME MODE', {
      fontSize: '32px',
      color: '#ffddcc',
      fontFamily: '"Bangers", Impact, "Arial Black", "Helvetica Neue", Arial, sans-serif',
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
    
    this.add.text(width / 2, 285, 'SINGLE PLAYER', {
      fontSize: '24px',
      color: '#ff6600',
      fontFamily: '"Bangers", Impact, "Arial Black", "Helvetica Neue", Arial, sans-serif',
      letterSpacing: 1,
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#330000',
        blur: 2,
        fill: true
      }
    }).setOrigin(0.5)

    this.add.text(width / 2, 310, 'Play vs CPU', {
      fontSize: '14px',
      color: '#ddaa88',
      fontFamily: '"Geo", "Courier New", monospace, sans-serif',
      fontStyle: 'normal'
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
    
    this.add.text(width / 2, 385, 'TWO PLAYER', {
      fontSize: '24px',
      color: '#ff6600',
      fontFamily: '"Bangers", Impact, "Arial Black", "Helvetica Neue", Arial, sans-serif',
      letterSpacing: 1,
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#330000',
        blur: 2,
        fill: true
      }
    }).setOrigin(0.5)

    this.add.text(width / 2, 410, 'Play with Friend', {
      fontSize: '14px',
      color: '#ddaa88',
      fontFamily: '"Geo", "Courier New", monospace, sans-serif',
      fontStyle: 'normal'
    }).setOrigin(0.5)
    
    // Add instructions - better styled and more readable
    const instructions = this.add.text(width / 2, 500, 
      'Movement: WASD (Player 1) / Arrow Keys (Player 2)\n' +
      'Attack: SPACE/Q/E (Player 1) / P (Punch), Shift/Enter (Shots) (Player 2)', {
      fontSize: '13px',
      color: '#aa7766',
      fontFamily: '"Geo", "Courier New", monospace, sans-serif',
      align: 'center',
      lineSpacing: 4
    }).setOrigin(0.5)
    instructions.setAlpha(0.8)

    // Play menu background music (if available)
    SoundManager.playBgm(this, 'bg_menu', { loop: true, volume: 0.3 })

    // Fallbacks for autoplay policies: resume on unlock or first interaction
    this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
      SoundManager.playBgm(this, 'bg_menu', { loop: true, volume: 0.3 })
    })
    this.input.once('pointerdown', () => {
      SoundManager.playBgm(this, 'bg_menu', { loop: true, volume: 0.3 })
    })

    // Ensure music stops when leaving this scene
    this.events.once('shutdown', () => {
      SoundManager.stopBgm(this)
    })
  }
}