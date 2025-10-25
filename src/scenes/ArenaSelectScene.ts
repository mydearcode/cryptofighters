import Phaser from 'phaser'
import { gameData } from '../data/DataManager'

export class ArenaSelectScene extends Phaser.Scene {
  private selectedArena: string = 'crypto_exchange'
  private arenaButtons: Phaser.GameObjects.Text[] = []
  private selectedCharacters: { player1: string | null, player2: string | null } = {
    player1: null,
    player2: null
  }

  constructor() {
    super({ key: 'ArenaSelectScene' })
  }

  create() {
    const { width, height } = this.cameras.main
    
    // Get selected characters from registry
    this.selectedCharacters = this.registry.get('selectedCharacters')

    // Background matching MenuScene
    this.add.rectangle(width / 2, height / 2, width, height, 0x0f0f23)
    
    // Add decorative border matching MenuScene
    this.add.rectangle(width / 2, height / 2, width - 20, height - 20, 0x1a1a2e).setStrokeStyle(3, 0x00d4ff, 0.3)
    
    // Title with glow effect matching MenuScene
    this.add.text(width / 2, 80, 'SELECT ARENA', {
      fontSize: '42px',
      color: '#00d4ff',
      fontFamily: 'Arial Black',
      stroke: '#003d5c',
      strokeThickness: 4
    }).setOrigin(0.5)
    
    // Subtitle matching MenuScene style
    const subtitle = this.add.text(width / 2, 120, 'Choose the battlefield for your fight', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)
    subtitle.setAlpha(0.9)

    // Create arena selection
    this.createArenaSelection()
    
    // Create fight button
    this.createFightButton()
  }

  private createArenaSelection() {
    const { width, height } = this.cameras.main
    const arenas = gameData.getAllArenas()
    
    // Arena selection title matching MenuScene style
    this.add.text(width / 2, 160, 'AVAILABLE ARENAS', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial Bold'
    }).setOrigin(0.5)
    
    // Arena grid - adjusted for better fit, smaller cards without descriptions
    const gridCols = 2
    const cardWidth = 240  // Smaller cards since no descriptions
    const cardHeight = 70  // Much smaller height without descriptions
    const spacing = 30     // Less spacing
    const startX = width / 2 - ((gridCols - 1) * (cardWidth + spacing)) / 2
    const startY = 200     // Moved up from 250
    
    arenas.forEach((arena, index) => {
      const col = index % gridCols
      const row = Math.floor(index / gridCols)
      const x = startX + col * (cardWidth + spacing)
      const y = startY + row * (cardHeight + spacing)
      
      // Ensure cards don't go below a certain point
      if (y + cardHeight / 2 > height - 120) {
        return // Skip cards that would be too low
      }
      
      // Arena card background matching MenuScene button style
      const isSelected = arena.id === this.selectedArena
      const card = this.add.rectangle(x, y, cardWidth, cardHeight, isSelected ? 0x0f3460 : 0x16213e)
        .setStrokeStyle(3, isSelected ? 0x00ffff : 0x00d4ff)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          this.selectArena(arena.id)
        })
        .on('pointerover', () => {
          if (!isSelected) {
            card.setFillStyle(0x0f3460)
            card.setStrokeStyle(3, 0x00ffff)
          }
        })
        .on('pointerout', () => {
          if (!isSelected) {
            card.setFillStyle(0x16213e)
            card.setStrokeStyle(3, 0x00d4ff)
          }
        })
      
      // Arena name - centered in the card, no description
      const nameText = this.add.text(x, y, arena.name, {
        fontSize: '16px',  // Slightly smaller font
        color: '#00d4ff',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      
      // Removed arena description to save space
      
      this.arenaButtons.push(card as any)
    })
  }

  private createFightButton() {
    const { width, height } = this.cameras.main
    
    const fightButton = this.add.text(width / 2, height - 80, 'START FIGHT!', {
      fontSize: '32px',
      color: '#00d4ff',
      fontFamily: 'Arial Black',
      backgroundColor: '#16213e',
      padding: { x: 30, y: 15 }
    }).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      this.startFight()
    })
    .on('pointerover', () => {
      fightButton.setStyle({ backgroundColor: '#0f3460' })
    })
    .on('pointerout', () => {
      fightButton.setStyle({ backgroundColor: '#16213e' })
    })
  }

  private selectArena(arenaId: string) {
    this.selectedArena = arenaId
    
    // Recreate arena selection to update visuals
    this.children.removeAll()
    this.create()
  }

  private startFight() {
    // Store selected arena in registry
    this.registry.set('selectedArena', this.selectedArena)
    
    // Start the fight scene
    this.scene.start('FightScene')
  }
}