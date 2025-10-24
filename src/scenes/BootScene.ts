import Phaser from 'phaser'

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  preload() {
    // Loading bar setup
    const width = this.cameras.main.width
    const height = this.cameras.main.height
    
    const progressBar = this.add.graphics()
    const progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50)
    
    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
      font: '20px Courier New',
      color: '#ffffff'
    }).setOrigin(0.5, 0.5)
    
    const percentText = this.add.text(width / 2, height / 2, '0%', {
      font: '18px Courier New',
      color: '#ffffff'
    }).setOrigin(0.5, 0.5)
    
    const assetText = this.add.text(width / 2, height / 2 + 50, '', {
      font: '12px Courier New',
      color: '#ffffff'
    }).setOrigin(0.5, 0.5)

    // Loading progress events
    this.load.on('progress', (value: number) => {
      progressBar.clear()
      progressBar.fillStyle(0x00ff00, 1)
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30)
      
      percentText.setText(Math.floor(value * 100) + '%')
    })
    
    this.load.on('fileprogress', (file: any) => {
      assetText.setText('Loading asset: ' + file.key)
    })
    
    this.load.on('complete', () => {
      progressBar.destroy()
      progressBox.destroy()
      loadingText.destroy()
      percentText.destroy()
      assetText.destroy()
    })

    // Load placeholder assets for now
    this.loadPlaceholderAssets()
  }

  private loadPlaceholderAssets() {
    // Create simple colored rectangles as placeholders
    this.load.image('player1', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
    this.load.image('player2', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
    this.load.image('background', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
  }

  create() {
    // Initialize game data
    this.registry.set('gameData', {
      characters: [],
      moves: [],
      arenas: [],
      events: [],
      sponsors: []
    })

    // Transition to Menu scene
    this.scene.start('MenuScene')
  }
}