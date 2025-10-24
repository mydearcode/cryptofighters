import Phaser from 'phaser'

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' })
  }

  create() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a1a2e)

    // Title
    this.add.text(width / 2, height / 4, 'CRYPTO FIGHTERS', {
      font: 'bold 48px Courier New',
      color: '#00ff00'
    }).setOrigin(0.5)

    // Subtitle
    this.add.text(width / 2, height / 4 + 60, 'Blockchain Battle Arena', {
      font: '20px Courier New',
      color: '#ffffff'
    }).setOrigin(0.5)

    // Start button
    const startButton = this.add.text(width / 2, height / 2, 'START FIGHT', {
      font: 'bold 24px Courier New',
      color: '#ffffff',
      backgroundColor: '#333333',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      this.scene.start('SelectScene')
    })
    .on('pointerover', () => {
      startButton.setStyle({ backgroundColor: '#555555' })
    })
    .on('pointerout', () => {
      startButton.setStyle({ backgroundColor: '#333333' })
    })

    // Instructions
    this.add.text(width / 2, height - 100, 'Use WASD to move, SPACE to attack', {
      font: '16px Courier New',
      color: '#888888'
    }).setOrigin(0.5)

    // Version info
    this.add.text(20, height - 30, 'v0.1.0 - MVP', {
      font: '12px Courier New',
      color: '#666666'
    })
  }
}