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

    // Background matching MenuScene - darker, more aggressive
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a0a0a)
    
    // Add decorative border matching MenuScene - fiery border
    this.add.rectangle(width / 2, height / 2, width - 20, height - 20, 0x2a1a1a).setStrokeStyle(3, 0xff4444, 0.6)
    
    // Title with enhanced styling matching other scenes
    this.add.text(width / 2, 80, 'SELECT ARENA', {
      fontSize: '42px',
      color: '#ff6600',
      fontFamily: 'Jacquard 12, Impact, Arial Black, sans-serif',
      stroke: '#660000',
      strokeThickness: 5,
      letterSpacing: 2,
      shadow: {
        offsetX: 3,
        offsetY: 3,
        color: '#330000',
        blur: 5,
        fill: true
      }
    }).setOrigin(0.5)
    
    // Subtitle with better styling
    const subtitle = this.add.text(width / 2, 120, 'Choose the battlefield for your fight', {
      fontSize: '18px',
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

    // Create arena selection
    this.createArenaSelection()
    
    // Create fight button
    this.createFightButton()
  }

  private createArenaSelection() {
    const { width, height } = this.cameras.main
    const arenas = gameData.getAllArenas()
    
    // Arena selection title matching MenuScene style
    const titleText = this.add.text(width / 2, 160, 'AVAILABLE ARENAS', {
      fontSize: '24px',
      color: '#ffddcc',
      fontFamily: 'Jacquard 12, Impact, Arial Black, sans-serif',
      letterSpacing: 1,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#330000',
        blur: 3,
        fill: true
      }
    }).setOrigin(0.5)
    
    // Set higher depth for the title to ensure it appears above arena cards
    titleText.setDepth(100)
    
    // Arena grid - adjusted for 7 arenas, 3 columns to fit all
    const gridCols = 3  // Changed from 2 to 3 columns
    const cardWidth = 200  // Smaller cards to fit 3 columns
    const cardHeight = 60  // Smaller height
    const spacing = 20     // Less spacing
    const startX = width / 2 - ((gridCols - 1) * (cardWidth + spacing)) / 2
    const startY = 220     // Moved down from 190 to avoid overlap with title
    
    console.log('Creating arena cards for', arenas.length, 'arenas')
    
    arenas.forEach((arena, index) => {
      const col = index % gridCols
      const row = Math.floor(index / gridCols)
      const x = startX + col * (cardWidth + spacing)
      const y = startY + row * (cardHeight + spacing)
      
      console.log(`Arena ${index}: ${arena.name} at position (${x}, ${y})`)
      
      // More generous height check - allow cards to go lower
      if (y + cardHeight / 2 > height - 80) {
        console.log(`Skipping arena ${arena.name} - would be too low`)
        return // Skip cards that would be too low
      }
      
      // Arena card background matching MenuScene button style - dark red theme
      const isSelected = arena.id === this.selectedArena
      const card = this.add.rectangle(x, y, cardWidth, cardHeight, isSelected ? 0x5d2a2a : 0x3d1a1a)
        .setStrokeStyle(3, isSelected ? 0xff6666 : 0xff4444)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          this.selectArena(arena.id)
        })
        .on('pointerover', () => {
          if (!isSelected) {
            card.setFillStyle(0x5d2a2a)
            card.setStrokeStyle(3, 0xff6666)
          }
        })
        .on('pointerout', () => {
          if (!isSelected) {
            card.setFillStyle(0x3d1a1a)
            card.setStrokeStyle(3, 0xff4444)
          }
        })
      
      // Arena name - centered in the card, smaller font for 3 columns
      const nameText = this.add.text(x, y, arena.name, {
        fontSize: '14px',  // Smaller font for 3 columns
        color: '#ff6600',
        fontFamily: 'Jacquard 12, Arial Bold'
      }).setOrigin(0.5)
      
      this.arenaButtons.push(card as any)
    })
  }

  private createFightButton() {
    const { width, height } = this.cameras.main
    
    const fightButton = this.add.text(width / 2, height - 80, 'START FIGHT!', {
      fontSize: '32px',
      color: '#ff6600',
      fontFamily: 'Jacquard 12, Impact, Arial Black, sans-serif',
      backgroundColor: '#3d1a1a',
      padding: { x: 20, y: 10 },
      stroke: '#660000',
      strokeThickness: 3,
      letterSpacing: 1,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#330000',
        blur: 4,
        fill: true
      }
    }).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      this.startFight()
    })
    .on('pointerover', () => {
      fightButton.setStyle({ backgroundColor: '#5d2a2a' })
    })
    .on('pointerout', () => {
      fightButton.setStyle({ backgroundColor: '#3d1a1a' })
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