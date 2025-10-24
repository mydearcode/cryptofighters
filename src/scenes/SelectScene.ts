import Phaser from 'phaser'
import { CharacterManager } from '../characters/CharacterManager'

export class SelectScene extends Phaser.Scene {
  private selectedCharacters: { player1: string | null, player2: string | null } = {
    player1: null,
    player2: null
  }
  private playerReady: { player1: boolean, player2: boolean } = {
    player1: false,
    player2: false
  }
  private currentPlayer: 1 | 2 = 1
  private characters = CharacterManager.getAllCharacters()
  private player1ReadyButton!: Phaser.GameObjects.Text
  private player2ReadyButton!: Phaser.GameObjects.Text
  private player1Indicator!: Phaser.GameObjects.Text
  private player2Indicator!: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'SelectScene' })
  }

  create() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x0f0f23)

    // Title
    this.add.text(width / 2, 60, 'SELECT YOUR FIGHTER', {
      font: 'bold 32px Courier New',
      color: '#00ff00'
    }).setOrigin(0.5)

    // Player indicators
    this.player1Indicator = this.add.text(width / 4, 120, 'PLAYER 1', {
      font: 'bold 20px Courier New',
      color: this.currentPlayer === 1 ? '#ffff00' : '#666666'
    }).setOrigin(0.5)

    this.player2Indicator = this.add.text(3 * width / 4, 120, 'PLAYER 2', {
      font: 'bold 20px Courier New',
      color: this.currentPlayer === 2 ? '#ffff00' : '#666666'
    }).setOrigin(0.5)

    // Character selection grid
    this.createCharacterGrid()

    // Selected characters display
    this.createSelectedDisplay()

    // Ready buttons for each player
    this.createReadyButtons()

    // Instructions
    this.add.text(width / 2, height - 100, 'Click to select character, then press READY', {
      font: '16px Courier New',
      color: '#888888'
    }).setOrigin(0.5)

    this.add.text(width / 2, height - 80, 'Player 1: SPACE to Ready | Player 2: ENTER to Ready', {
      font: '14px Courier New',
      color: '#666666'
    }).setOrigin(0.5)

    // Start fight button (initially hidden)
    const startButton = this.add.text(width / 2, height - 40, 'START FIGHT!', {
      font: 'bold 20px Courier New',
      color: '#ffffff',
      backgroundColor: '#333333',
      padding: { x: 20, y: 8 }
    }).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .setVisible(false)
    .on('pointerdown', () => {
      this.startFight()
    })
    .on('pointerover', () => {
      startButton.setStyle({ backgroundColor: '#555555' })
    })
    .on('pointerout', () => {
      startButton.setStyle({ backgroundColor: '#333333' })
    })

    this.registry.set('startButton', startButton)

    // Setup keyboard input
    this.setupKeyboardInput()
  }

  private createReadyButtons() {
    const width = this.cameras.main.width

    // Player 1 Ready Button
    this.player1ReadyButton = this.add.text(width / 4, 400, 'READY', {
      font: 'bold 16px Courier New',
      color: '#666666',
      backgroundColor: '#333333',
      padding: { x: 15, y: 8 }
    }).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .setVisible(false)
    .on('pointerdown', () => {
      this.togglePlayerReady(1)
    })

    // Player 2 Ready Button
    this.player2ReadyButton = this.add.text(3 * width / 4, 400, 'READY', {
      font: 'bold 16px Courier New',
      color: '#666666',
      backgroundColor: '#333333',
      padding: { x: 15, y: 8 }
    }).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .setVisible(false)
    .on('pointerdown', () => {
      this.togglePlayerReady(2)
    })
  }

  private setupKeyboardInput() {
    // Space key for Player 1 ready
    this.input.keyboard!.on('keydown-SPACE', () => {
      if (this.selectedCharacters.player1) {
        this.togglePlayerReady(1)
      }
    })

    // Enter key for Player 2 ready
    this.input.keyboard!.on('keydown-ENTER', () => {
      if (this.selectedCharacters.player2) {
        this.togglePlayerReady(2)
      }
    })
  }

  private createCharacterGrid() {
    const width = this.cameras.main.width
    const startX = width / 2 - 150
    const startY = 200
    const spacing = 100

    // Color mapping for characters
    const characterColors: { [key: string]: number } = {
      'hodler': 0x00ff00,
      'trader': 0xff0000,
      'whale': 0x0066ff,
      'degen': 0xff6600
    }

    this.characters.forEach((character, index) => {
      const x = startX + (index % 2) * spacing * 3
      const y = startY + Math.floor(index / 2) * 120

      // Character placeholder (colored rectangle)
      const charColor = characterColors[character.id] || 0x888888
      const charRect = this.add.rectangle(x, y, 80, 100, charColor)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          this.selectCharacter(character.id)
        })
        .on('pointerover', () => {
          charRect.setStrokeStyle(3, 0xffffff)
        })
        .on('pointerout', () => {
          charRect.setStrokeStyle(0)
        })

      // Character name
      this.add.text(x, y + 70, character.name, {
        font: '12px Courier New',
        color: '#ffffff'
      }).setOrigin(0.5)

      // Special moves preview
      const movesText = character.moves.slice(0, 2).join('\n') || 'Special Moves'
      this.add.text(x, y + 85, movesText, {
        font: '8px Courier New',
        color: '#888888',
        align: 'center'
      }).setOrigin(0.5)
    })
  }

  private createSelectedDisplay() {
    const width = this.cameras.main.width

    // Player 1 selection area
    const p1Area = this.add.rectangle(width / 4, 180, 120, 140, 0x333333, 0.5)
    this.add.text(width / 4, 180, 'Select\nCharacter', {
      font: '14px Courier New',
      color: '#666666',
      align: 'center'
    }).setOrigin(0.5)

    // Player 2 selection area  
    const p2Area = this.add.rectangle(3 * width / 4, 180, 120, 140, 0x333333, 0.5)
    this.add.text(3 * width / 4, 180, 'Select\nCharacter', {
      font: '14px Courier New',
      color: '#666666',
      align: 'center'
    }).setOrigin(0.5)

    this.registry.set('p1Area', p1Area)
    this.registry.set('p2Area', p2Area)
  }

  private selectCharacter(characterId: string) {
    const character = this.characters.find(c => c.id === characterId)
    if (!character) return

    // Allow players to change their selection if they haven't readied up
    if (this.currentPlayer === 1 && !this.playerReady.player1) {
      this.selectedCharacters.player1 = characterId
      this.updateSelectedDisplay(1, character)
      this.player1ReadyButton.setVisible(true)
    } else if (this.currentPlayer === 2 && !this.playerReady.player2) {
      this.selectedCharacters.player2 = characterId
      this.updateSelectedDisplay(2, character)
      this.player2ReadyButton.setVisible(true)
    } else if (this.currentPlayer === 1 && this.playerReady.player1) {
      // Allow changing selection if player unreadies first
      this.playerReady.player1 = false
      this.selectedCharacters.player1 = characterId
      this.updateSelectedDisplay(1, character)
      this.updateReadyButton(1)
    } else if (this.currentPlayer === 2 && this.playerReady.player2) {
      // Allow changing selection if player unreadies first
      this.playerReady.player2 = false
      this.selectedCharacters.player2 = characterId
      this.updateSelectedDisplay(2, character)
      this.updateReadyButton(2)
    }

    this.updatePlayerIndicators()
    this.checkStartCondition()
  }

  private togglePlayerReady(player: 1 | 2) {
    if (player === 1 && this.selectedCharacters.player1) {
      this.playerReady.player1 = !this.playerReady.player1
      this.updateReadyButton(1)
      if (this.playerReady.player1) {
        this.currentPlayer = 2
      }
    } else if (player === 2 && this.selectedCharacters.player2) {
      this.playerReady.player2 = !this.playerReady.player2
      this.updateReadyButton(2)
      if (this.playerReady.player2) {
        this.currentPlayer = 1
      }
    }

    this.updatePlayerIndicators()
    this.checkStartCondition()
  }

  private updateReadyButton(player: 1 | 2) {
    const button = player === 1 ? this.player1ReadyButton : this.player2ReadyButton
    const isReady = player === 1 ? this.playerReady.player1 : this.playerReady.player2

    if (isReady) {
      button.setStyle({
        color: '#00ff00',
        backgroundColor: '#004400'
      })
      button.setText('READY ✓')
    } else {
      button.setStyle({
        color: '#666666',
        backgroundColor: '#333333'
      })
      button.setText('READY')
    }
  }

  private checkStartCondition() {
    const startButton = this.registry.get('startButton')
    if (this.playerReady.player1 && this.playerReady.player2) {
      startButton.setVisible(true)
    } else {
      startButton.setVisible(false)
    }
  }

  private updateSelectedDisplay(player: 1 | 2, character: any) {
    const width = this.cameras.main.width
    const x = player === 1 ? width / 4 : 3 * width / 4

    // Color mapping for characters
    const characterColors: { [key: string]: number } = {
      'hodler': 0x00ff00,
      'trader': 0xff0000,
      'whale': 0x0066ff,
      'degen': 0xff6600
    }

    // Clear previous display
    const area = this.registry.get(`p${player}Area`)
    const charColor = characterColors[character.id] || 0x888888
    area.setFillStyle(charColor, 0.8)

    // Add character info
    this.add.text(x, x === width / 4 ? 160 : 160, character.name, {
      font: 'bold 12px Courier New',
      color: '#ffffff'
    }).setOrigin(0.5)

    this.add.text(x, x === width / 4 ? 200 : 200, 'READY!', {
      font: 'bold 16px Courier New',
      color: '#00ff00'
    }).setOrigin(0.5)
  }

  private updatePlayerIndicators() {
    // Update Player 1 indicator
    const player1Status = this.playerReady.player1 ? 'READY' : 'SELECTING'
    const player1Color = this.currentPlayer === 1 ? '#ffff00' : '#888888'
    const player1ReadyColor = this.playerReady.player1 ? '#00ff00' : player1Color
    
    this.player1Indicator.setText(`Player 1: ${player1Status}`)
    this.player1Indicator.setColor(player1ReadyColor)

    // Update Player 2 indicator
    const player2Status = this.playerReady.player2 ? 'READY' : 'SELECTING'
    const player2Color = this.currentPlayer === 2 ? '#ffff00' : '#888888'
    const player2ReadyColor = this.playerReady.player2 ? '#00ff00' : player2Color
    
    this.player2Indicator.setText(`Player 2: ${player2Status}`)
    this.player2Indicator.setColor(player2ReadyColor)
  }

  private showStartButton() {
    // This method is no longer needed as we use checkStartCondition instead
    // Keeping for compatibility but it does nothing
  }

  private startFight() {
    // Store selected characters in registry for Fight scene
    this.registry.set('selectedCharacters', this.selectedCharacters)
    
    // Transition to Fight scene
    this.scene.start('FightScene')
  }
}