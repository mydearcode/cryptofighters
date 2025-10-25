import Phaser from 'phaser'
import { CharacterManager } from '../characters/CharacterManager'
import { gameData } from '../data/DataManager'
import { GAME_CONSTANTS } from '../config/GameConfig'

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
  private characterIdMapping: { [key: string]: string } = {
    'hodler': 'hodl_master',
    'trader': 'paper_hands', 
    'whale': 'whale_trader',
    'degen': 'degen_ape'
  }
  private player1ReadyButton!: Phaser.GameObjects.Text
  private player2ReadyButton!: Phaser.GameObjects.Text
  private player1Indicator!: Phaser.GameObjects.Text
  private player2Indicator!: Phaser.GameObjects.Text
  private characterCards: Phaser.GameObjects.Rectangle[] = []
  private characterSprites: Phaser.GameObjects.Image[] = []
  
  private player1DisplayElements: Phaser.GameObjects.GameObject[] = []
  private player2DisplayElements: Phaser.GameObjects.GameObject[] = []

  constructor() {
    super({ key: 'SelectScene' })
  }

  preload() {
    this.load.image('vitalik-portrait', 'assets/sprites/vitalik/vitalik_single.png')
  }

  create() {
    const { width, height } = this.cameras.main
    const gameMode = this.registry.get('gameMode') || 'twoPlayer'

    // Background matching MenuScene
    this.add.rectangle(width / 2, height / 2, width, height, 0x0f0f23)
    
    // Add decorative border matching MenuScene
    this.add.rectangle(width / 2, height / 2, width - 20, height - 20, 0x1a1a2e).setStrokeStyle(3, 0x00d4ff, 0.3)
    
    // Title with glow effect matching MenuScene
    const titleText = gameMode === 'singlePlayer' ? 'SELECT FIGHTER' : 'FIGHTER SELECTION'
    this.add.text(width / 2, 60, titleText, {
      fontSize: '42px',
      color: '#00d4ff',
      fontFamily: 'Arial Black',
      stroke: '#003d5c',
      strokeThickness: 4
    }).setOrigin(0.5)
    
    // Subtitle matching MenuScene style
    const subtitleText = gameMode === 'singlePlayer' 
      ? 'Choose your crypto warrior'
      : 'Each player select your crypto warrior'
    const subtitle = this.add.text(width / 2, 100, subtitleText, {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)
    subtitle.setAlpha(0.9)

    // Create UI components
    this.createCharacterGrid()
    this.createSelectedDisplay()
    this.createReadyButtons()
    this.setupKeyboardInput()
    this.updatePlayerIndicators()
  }

  private setupKeyboardInput() {
    this.input.keyboard?.on('keydown-SPACE', () => {
      if (this.selectedCharacters.player1) {
        this.togglePlayerReady(1)
      }
    })

    this.input.keyboard?.on('keydown-ENTER', () => {
      if (this.selectedCharacters.player2) {
        this.togglePlayerReady(2)
      }
    })
  }

  updatePlayerIndicators() {
    const { width } = this.cameras.main
    const gameMode = this.registry.get('gameMode') || 'twoPlayer'
    
    // Remove existing indicators if they exist
    if (this.player1Indicator) this.player1Indicator.destroy()
    if (this.player2Indicator) this.player2Indicator.destroy()
    
    // Player indicators moved to bottom corners, smaller and less intrusive
    this.player1Indicator = this.add.text(80, 480, 'P1', {
      fontSize: '16px',
      color: this.currentPlayer === 1 ? '#00d4ff' : '#666666',
      fontFamily: 'Arial Bold'
    }).setOrigin(0.5)
    
    // Player 2 indicator (only for two player mode)
    if (gameMode === 'twoPlayer') {
      this.player2Indicator = this.add.text(width - 80, 480, 'P2', {
        fontSize: '16px',
        color: this.currentPlayer === 2 ? '#00d4ff' : '#666666',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
    }
  }

  private createCharacterGrid() {
    const { width, height } = this.cameras.main
    const characters = gameData.getAllCharacters()
    
    // Character selection title matching MenuScene style
    this.add.text(width / 2, 120, 'SELECT CHARACTER', {
      fontSize: '22px',
      color: '#ffffff',
      fontFamily: 'Arial Bold'
    }).setOrigin(0.5)
    
    // Character grid - smaller cards to prevent overflow
    const gridCols = 4
    const cardWidth = 100
    const cardHeight = 120
    const spacing = 15
    const startX = width / 2 - ((gridCols - 1) * (cardWidth + spacing)) / 2
    const startY = 170
    
    characters.forEach((character, index) => {
      const col = index % gridCols
      const row = Math.floor(index / gridCols)
      const x = startX + col * (cardWidth + spacing)
      const y = startY + row * (cardHeight + spacing)
      
      // Character card background matching MenuScene button style
      const card = this.add.rectangle(x, y, cardWidth, cardHeight, 0x16213e)
        .setStrokeStyle(2, 0x00d4ff)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          this.selectCharacter(character.id)
        })
        .on('pointerover', () => {
          card.setFillStyle(0x0f3460)
          card.setStrokeStyle(2, 0x00ffff)
        })
        .on('pointerout', () => {
          card.setFillStyle(0x16213e)
          card.setStrokeStyle(2, 0x00d4ff)
        })
      
      this.characterCards.push(card)
      
      // Character sprite - using centralized size constants
      let spriteKey = character.sprite
      if (character.id === 'vitalik') {
        // For Vitalik, create a sprite from the combat idle spritesheet with specific frame
        const sprite = this.add.sprite(x, y - 15, 'vitalik-idle', 2)  // Use frame 2 (3rd frame)
          .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.height)
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => {
            this.selectCharacter(character.id)
          })
        
        this.characterSprites.push(sprite)
      } else if (character.id === 'cz') {
        // For CZ, create a sprite from the spritesheet with specific frame
        const sprite = this.add.sprite(x, y - 15, 'cz-combat-idle-frames', 2)  // Use frame 2 (3rd frame)
          .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.height)
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => {
            this.selectCharacter(character.id)
          })
        
        this.characterSprites.push(sprite)
      } else if (character.id === 'elon') {
        // For Elon, create a sprite from the spritesheet with specific frame
        const sprite = this.add.sprite(x, y - 15, 'elon-combat-idle-frames', 2)  // Use frame 2 (3rd frame)
          .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.height)
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => {
            this.selectCharacter(character.id)
          })
        
        this.characterSprites.push(sprite)
      } else if (character.id === 'hoskinson') {
        // For Hoskinson, create a sprite from the spritesheet with specific frame
        const sprite = this.add.sprite(x, y - 15, 'hoskinson-combat-idle-frames', 2)  // Use frame 2 (3rd frame)
          .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.height)
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => {
            this.selectCharacter(character.id)
          })
        
        this.characterSprites.push(sprite)
      } else if (character.id === 'saylor') {
        // For Saylor, create a sprite from the spritesheet with specific frame
        const sprite = this.add.sprite(x, y - 15, 'saylor-combat-idle-frames', 2)  // Use frame 2 (3rd frame)
          .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.height)
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => {
            this.selectCharacter(character.id)
          })
        
        this.characterSprites.push(sprite)
      } else if (character.id === 'gavin') {
        // For Gavin, create a sprite from the spritesheet with specific frame
        const sprite = this.add.sprite(x, y - 15, 'gavin-combat-idle-frames', 2)  // Use frame 2 (3rd frame)
          .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.height)
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => {
            this.selectCharacter(character.id)
          })
        
        this.characterSprites.push(sprite)
      } else if (character.id === 'hodl_master') {
        // For Hodl Master, create a sprite from the spritesheet with specific frame
        const sprite = this.add.sprite(x, y - 15, 'hodl-master-combat-idle', 2)  // Use frame 2 (3rd frame)
          .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.height)
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => {
            this.selectCharacter(character.id)
          })
        
        this.characterSprites.push(sprite)
      } else if (character.id === 'trade_queen') {
        // For Trade Queen, create a sprite from the spritesheet with specific frame
        const sprite = this.add.sprite(x, y - 15, 'trade-queen-combat-idle-frames', 2)  // Use frame 2 (3rd frame)
          .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.height)
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => {
            this.selectCharacter(character.id)
          })
        
        this.characterSprites.push(sprite)
      } else if (character.id === 'defi_ninja') {
        // For Defi Ninja, create a sprite from the spritesheet with specific frame
        const sprite = this.add.sprite(x, y - 15, 'defi-ninja-combat-idle-frames', 2)  // Use frame 2 (3rd frame)
          .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.height)
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => {
            this.selectCharacter(character.id)
          })
        
        this.characterSprites.push(sprite)
      } else if (character.id === 'meme_lord') {
        // For Meme Lord, create a sprite from the spritesheet with specific frame
        const sprite = this.add.sprite(x, y - 15, 'meme-lord-combat-idle-frames', 2)  // Use frame 2 (3rd frame)
          .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.height)
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => {
            this.selectCharacter(character.id)
          })
        
        this.characterSprites.push(sprite)
      } else {
        const sprite = this.add.image(x, y - 15, spriteKey)
          .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.height)
          .setInteractive({ useHandCursor: true })
          .on('pointerdown', () => {
            this.selectCharacter(character.id)
          })

        this.characterSprites.push(sprite)
      }
      
      // Character name - smaller font to prevent overlap
      const nameText = this.add.text(x, y + 35, character.name, {
        fontSize: '12px',
        color: '#00d4ff',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      
      // Character special move - smaller font and positioned better
      const moveId = character.moves[0]
      const moveData = gameData.getMove(moveId)
      const moveName = moveData ? moveData.name : moveId.replace(/([A-Z])/g, ' $1').trim()
      
      const moveText = this.add.text(x, y + 48, moveName, {
        fontSize: '9px',
        color: '#cccccc',
        fontFamily: 'Arial'
      }).setOrigin(0.5)
    })
  }

  private createSelectedDisplay() {
    // Removed the unnecessary rectangle that was blocking character view
    // Characters will be displayed directly without background interference
  }

  private createReadyButtons() {
    const { width, height } = this.cameras.main
    const gameMode = this.registry.get('gameMode') || 'twoPlayer'
    
    // Player 1 ready button - positioned near selected character
    this.player1ReadyButton = this.add.text(120, height - 30, 'READY!', {
      fontSize: '14px',
      color: '#00d4ff',
      fontFamily: 'Arial Bold',
      backgroundColor: '#16213e',
      padding: { x: 12, y: 6 }
    }).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      if (this.selectedCharacters.player1) {
        this.togglePlayerReady(1)
      }
    })
    .on('pointerover', () => {
      if (this.selectedCharacters.player1) {
        this.player1ReadyButton.setStyle({ backgroundColor: '#0f3460' })
      }
    })
    .on('pointerout', () => {
      this.player1ReadyButton.setStyle({ backgroundColor: '#16213e' })
    })

    // Player 2 ready button (only for two player mode) - positioned near selected character
    if (gameMode === 'twoPlayer') {
      this.player2ReadyButton = this.add.text(width - 120, height - 30, 'READY!', {
        fontSize: '14px',
        color: '#00d4ff',
        fontFamily: 'Arial Bold',
        backgroundColor: '#16213e',
        padding: { x: 12, y: 6 }
      }).setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        if (this.selectedCharacters.player2) {
          this.togglePlayerReady(2)
        }
      })
      .on('pointerover', () => {
        if (this.selectedCharacters.player2) {
          this.player2ReadyButton.setStyle({ backgroundColor: '#0f3460' })
        }
      })
      .on('pointerout', () => {
        this.player2ReadyButton.setStyle({ backgroundColor: '#16213e' })
      })
    }

    // Instructions removed - no longer needed at the top
  }

  private selectCharacter(characterId: string) {
    const character = this.characters.find(c => c.id === characterId)
    if (!character) return
    
    const gameMode = this.registry.get('gameMode') || 'twoPlayer'

    if (gameMode === 'singlePlayer') {
      // Single player mode
      if (!this.playerReady.player1) {
        this.selectedCharacters.player1 = characterId
        this.updateSelectedDisplay(1, character)
        this.player1ReadyButton.setVisible(true)
        
        // Auto-select CPU character
        const availableCharacters = this.characters.filter(c => c.id !== characterId)
        const randomIndex = Math.floor(Math.random() * availableCharacters.length)
        const cpuCharacter = availableCharacters[randomIndex]

        this.selectedCharacters.player2 = cpuCharacter.id
        this.updateSelectedDisplay(2, cpuCharacter)
        this.playerReady.player2 = true
        this.updateReadyButton(2)
      } else {
        // Allow changing selection
        this.playerReady.player1 = false
        this.selectedCharacters.player1 = characterId
        this.updateSelectedDisplay(1, character)
        this.updateReadyButton(1)
        
        // Re-select CPU character
        const availableCharacters = this.characters.filter(c => c.id !== characterId)
        const randomIndex = Math.floor(Math.random() * availableCharacters.length)
        const cpuCharacter = availableCharacters[randomIndex]
        
        this.selectedCharacters.player2 = cpuCharacter.id
        this.updateSelectedDisplay(2, cpuCharacter)
        this.playerReady.player2 = true
        this.updateReadyButton(2)
      }
    } else {
      // Two player mode
      if (this.currentPlayer === 1 && !this.playerReady.player1) {
        this.selectedCharacters.player1 = characterId
        this.updateSelectedDisplay(1, character)
        this.player1ReadyButton.setVisible(true)
      } else if (this.currentPlayer === 2 && !this.playerReady.player2) {
        this.selectedCharacters.player2 = characterId
        this.updateSelectedDisplay(2, character)
        this.player2ReadyButton.setVisible(true)
      } else if (this.currentPlayer === 1 && this.playerReady.player1) {
        // Allow changing selection
        this.playerReady.player1 = false
        this.selectedCharacters.player1 = characterId
        this.updateSelectedDisplay(1, character)
        this.updateReadyButton(1)
      } else if (this.currentPlayer === 2 && this.playerReady.player2) {
        // Allow changing selection
        this.playerReady.player2 = false
        this.selectedCharacters.player2 = characterId
        this.updateSelectedDisplay(2, character)
        this.updateReadyButton(2)
      }
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

    // Check if button exists (player2ReadyButton might not exist in single player mode)
    if (!button) {
      return
    }

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
    if (this.playerReady.player1 && this.playerReady.player2) {
      this.showStartButton()
    }
  }

  private updateSelectedDisplay(player: 1 | 2, character: any) {
    const width = this.cameras.main.width
    const height = this.cameras.main.height
    
    // Position selected characters at the bottom corners, away from character grid
    const x = player === 1 ? 120 : width - 120
    const y = height - 100
    
    const gameMode = this.registry.get('gameMode') || 'twoPlayer'

    // Clear previous display elements
    const displayElements = player === 1 ? this.player1DisplayElements : this.player2DisplayElements
    displayElements.forEach(element => element.destroy())
    displayElements.length = 0

    // Use portrait for Vitalik, specific frame for CZ, regular sprite for others
    let spriteKey = character.sprite
    if (character.id === 'vitalik') {
      // For Vitalik, we'll create a specific frame from the spritesheet in the scene
      const selectedSprite = this.add.sprite(x, y - 30, 'vitalik-idle', 2)  // Use frame 2 (3rd frame)
        .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.height)
      displayElements.push(selectedSprite)
      
      // Skip the regular sprite creation and continue with other elements
      // Character name
      const nameText = this.add.text(x, y + 10, character.name, {
        fontSize: '12px',
        color: '#00d4ff',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(nameText)

      // Player indicator
      const playerLabel = `P${player}`
      const playerText = this.add.text(x, y - 60, playerLabel, {
        fontSize: '14px',
        color: player === 1 ? '#00ff00' : '#ff6600',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(playerText)

      // Status text - only show for CPU
      if (player === 2 && gameMode === 'singlePlayer') {
        const statusTextObj = this.add.text(x, y + 25, 'CPU', {
          fontSize: '10px',
          color: '#ff6600',
          fontFamily: 'Arial Bold'
        }).setOrigin(0.5)
        displayElements.push(statusTextObj)
      }
      return  // Exit early for Vitalik character
    } else if (character.id === 'cz') {
      // For CZ, we'll create a specific frame from the spritesheet in the scene
      const selectedSprite = this.add.sprite(x, y - 30, 'cz-combat-idle-frames', 2)  // Use frame 2 (3rd frame)
        .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.height)
      displayElements.push(selectedSprite)
      
      // Skip the regular sprite creation and continue with other elements
      // Character name
      const nameText = this.add.text(x, y + 10, character.name, {
        fontSize: '12px',
        color: '#00d4ff',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(nameText)

      // Player indicator
      const playerLabel = `P${player}`
      const playerText = this.add.text(x, y - 60, playerLabel, {
        fontSize: '14px',
        color: player === 1 ? '#00ff00' : '#ff6600',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(playerText)

      // Status text - only show for CPU
      if (player === 2 && gameMode === 'singlePlayer') {
        const statusTextObj = this.add.text(x, y + 25, 'CPU', {
          fontSize: '10px',
          color: '#ff6600',
          fontFamily: 'Arial Bold'
        }).setOrigin(0.5)
        displayElements.push(statusTextObj)
      }
      return  // Exit early for CZ character
    } else if (character.id === 'elon') {
      // For Elon, we'll create a specific frame from the spritesheet in the scene
      const selectedSprite = this.add.sprite(x, y - 30, 'elon-combat-idle-frames', 2)  // Use frame 2 (3rd frame)
        .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.height)
      displayElements.push(selectedSprite)
      
      // Skip the regular sprite creation and continue with other elements
      // Character name
      const nameText = this.add.text(x, y + 10, character.name, {
        fontSize: '12px',
        color: '#00d4ff',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(nameText)

      // Player indicator
      const playerLabel = `P${player}`
      const playerText = this.add.text(x, y - 60, playerLabel, {
        fontSize: '14px',
        color: player === 1 ? '#00ff00' : '#ff6600',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(playerText)

      // Status text - only show for CPU
      if (player === 2 && gameMode === 'singlePlayer') {
        const statusTextObj = this.add.text(x, y + 25, 'CPU', {
          fontSize: '10px',
          color: '#ff6600',
          fontFamily: 'Arial Bold'
        }).setOrigin(0.5)
        displayElements.push(statusTextObj)
      }
      return  // Exit early for Elon character
    } else if (character.id === 'hoskinson') {
      // For Hoskinson, we'll create a specific frame from the spritesheet in the scene
      const selectedSprite = this.add.sprite(x, y - 30, 'hoskinson-combat-idle-frames', 2)  // Use frame 2 (3rd frame)
        .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.height)
      displayElements.push(selectedSprite)
      
      // Skip the regular sprite creation and continue with other elements
      // Character name
      const nameText = this.add.text(x, y + 10, character.name, {
        fontSize: '12px',
        color: '#00d4ff',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(nameText)

      // Player indicator
      const playerLabel = `P${player}`
      const playerText = this.add.text(x, y - 60, playerLabel, {
        fontSize: '14px',
        color: player === 1 ? '#00ff00' : '#ff6600',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(playerText)

      // Status text - only show for CPU
      if (player === 2 && gameMode === 'singlePlayer') {
        const statusTextObj = this.add.text(x, y + 25, 'CPU', {
          fontSize: '10px',
          color: '#ff6600',
          fontFamily: 'Arial Bold'
        }).setOrigin(0.5)
        displayElements.push(statusTextObj)
      }
      return  // Exit early for Hoskinson character
    } else if (character.id === 'saylor') {
      // For Saylor, we'll create a specific frame from the spritesheet in the scene
      const selectedSprite = this.add.sprite(x, y - 30, 'saylor-combat-idle-frames', 2)  // Use frame 2 (3rd frame)
        .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.height)
      displayElements.push(selectedSprite)
      
      // Skip the regular sprite creation and continue with other elements
      // Character name
      const nameText = this.add.text(x, y + 10, character.name, {
        fontSize: '12px',
        color: '#00d4ff',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(nameText)

      // Player indicator
      const playerLabel = `P${player}`
      const playerText = this.add.text(x, y - 60, playerLabel, {
        fontSize: '14px',
        color: player === 1 ? '#00ff00' : '#ff6600',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(playerText)

      // Status text - only show for CPU
      if (player === 2 && gameMode === 'singlePlayer') {
        const statusTextObj = this.add.text(x, y + 25, 'CPU', {
          fontSize: '10px',
          color: '#ff6600',
          fontFamily: 'Arial Bold'
        }).setOrigin(0.5)
        displayElements.push(statusTextObj)
      }
      return  // Exit early for Saylor character
    } else if (character.id === 'gavin') {
      // For Gavin, we'll create a specific frame from the spritesheet in the scene
      const selectedSprite = this.add.sprite(x, y - 30, 'gavin-combat-idle-frames', 2)  // Use frame 2 (3rd frame)
        .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.height)
      displayElements.push(selectedSprite)
      
      // Skip the regular sprite creation and continue with other elements
      // Character name
      const nameText = this.add.text(x, y + 10, character.name, {
        fontSize: '12px',
        color: '#00d4ff',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(nameText)

      // Player indicator
      const playerLabel = `P${player}`
      const playerText = this.add.text(x, y - 60, playerLabel, {
        fontSize: '14px',
        color: player === 1 ? '#00ff00' : '#ff6600',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(playerText)

      // Status text - only show for CPU
      if (player === 2 && gameMode === 'singlePlayer') {
        const statusTextObj = this.add.text(x, y + 25, 'CPU', {
          fontSize: '10px',
          color: '#ff6600',
          fontFamily: 'Arial Bold'
        }).setOrigin(0.5)
        displayElements.push(statusTextObj)
      }
      return  // Exit early for Gavin character
    } else if (character.id === 'hodl_master') {
        // For Hodl Master, we'll create a specific frame from the spritesheet in the scene
        const selectedSprite = this.add.sprite(x, y - 30, 'hodl-master-combat-idle', 2)  // Use frame 2 (3rd frame)
          .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.height)
        displayElements.push(selectedSprite)
      
      // Skip the regular sprite creation and continue with other elements
      // Character name
      const nameText = this.add.text(x, y + 10, character.name, {
        fontSize: '12px',
        color: '#00d4ff',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(nameText)

      // Player indicator
      const playerLabel = `P${player}`
      const playerText = this.add.text(x, y - 60, playerLabel, {
        fontSize: '14px',
        color: player === 1 ? '#00ff00' : '#ff6600',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(playerText)

      // Status text - only show for CPU
      if (player === 2 && gameMode === 'singlePlayer') {
        const statusTextObj = this.add.text(x, y + 25, 'CPU', {
          fontSize: '10px',
          color: '#ff6600',
          fontFamily: 'Arial Bold'
        }).setOrigin(0.5)
        displayElements.push(statusTextObj)
      }
      return  // Exit early for Hodl Master character
    } else if (character.id === 'trade_queen') {
      // For Trade Queen, we'll create a specific frame from the spritesheet in the scene
      const selectedSprite = this.add.sprite(x, y - 30, 'trade-queen-combat-idle-frames', 2)  // Use frame 2 (3rd frame)
        .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.height)
      displayElements.push(selectedSprite)
      
      // Skip the regular sprite creation and continue with other elements
      // Character name
      const nameText = this.add.text(x, y + 10, character.name, {
        fontSize: '12px',
        color: '#00d4ff',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(nameText)

      // Player indicator
      const playerLabel = `P${player}`
      const playerText = this.add.text(x, y - 60, playerLabel, {
        fontSize: '14px',
        color: player === 1 ? '#00ff00' : '#ff6600',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(playerText)

      // Status text - only show for CPU
      if (player === 2 && gameMode === 'singlePlayer') {
        const statusTextObj = this.add.text(x, y + 25, 'CPU', {
          fontSize: '10px',
          color: '#ff6600',
          fontFamily: 'Arial Bold'
        }).setOrigin(0.5)
        displayElements.push(statusTextObj)
      }
      return  // Exit early for Trade Queen character
    } else if (character.id === 'defi_ninja') {
      // For Defi Ninja, we'll create a specific frame from the spritesheet in the scene
      const selectedSprite = this.add.sprite(x, y - 30, 'defi-ninja-combat-idle-frames', 2)  // Use frame 2 (3rd frame)
        .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.height)
      displayElements.push(selectedSprite)
      
      // Skip the regular sprite creation and continue with other elements
      // Character name
      const nameText = this.add.text(x, y + 10, character.name, {
        fontSize: '12px',
        color: '#00d4ff',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(nameText)

      // Player indicator
      const playerLabel = `P${player}`
      const playerText = this.add.text(x, y - 60, playerLabel, {
        fontSize: '14px',
        color: player === 1 ? '#00ff00' : '#ff6600',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(playerText)

      // Status text - only show for CPU
      if (player === 2 && gameMode === 'singlePlayer') {
        const statusTextObj = this.add.text(x, y + 25, 'CPU', {
          fontSize: '10px',
          color: '#ff6600',
          fontFamily: 'Arial Bold'
        }).setOrigin(0.5)
        displayElements.push(statusTextObj)
      }
      return  // Exit early for Defi Ninja character
    } else if (character.id === 'meme_lord') {
      // For Meme Lord, we'll create a specific frame from the spritesheet in the scene
      const selectedSprite = this.add.sprite(x, y - 30, 'meme-lord-combat-idle-frames', 2)  // Use frame 2 (3rd frame)
        .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.height)
      displayElements.push(selectedSprite)
      
      // Skip the regular sprite creation and continue with other elements
      // Character name
      const nameText = this.add.text(x, y + 10, character.name, {
        fontSize: '12px',
        color: '#00d4ff',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(nameText)

      // Player indicator
      const playerLabel = `P${player}`
      const playerText = this.add.text(x, y - 60, playerLabel, {
        fontSize: '14px',
        color: player === 1 ? '#00ff00' : '#ff6600',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(playerText)

      // Status text - only show for CPU
      if (player === 2 && gameMode === 'singlePlayer') {
        const statusTextObj = this.add.text(x, y + 25, 'CPU', {
          fontSize: '10px',
          color: '#ff6600',
          fontFamily: 'Arial Bold'
        }).setOrigin(0.5)
        displayElements.push(statusTextObj)
      }
      return  // Exit early for Meme Lord character
    }

    // Selected character sprite - positioned at bottom corners - using centralized size constants
    const selectedSprite = this.add.image(x, y - 30, spriteKey)
      .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.height)
    displayElements.push(selectedSprite)

    // Character name
    const nameText = this.add.text(x, y + 10, character.name, {
      fontSize: '12px',
      color: '#00d4ff',
      fontFamily: 'Arial Bold'
    }).setOrigin(0.5)
    displayElements.push(nameText)

    // Player indicator
    const playerLabel = `P${player}`
    const playerText = this.add.text(x, y - 60, playerLabel, {
      fontSize: '14px',
      color: player === 1 ? '#00ff00' : '#ff6600',
      fontFamily: 'Arial Bold'
    }).setOrigin(0.5)
    displayElements.push(playerText)

    // Status text - only show for CPU
    if (player === 2 && gameMode === 'singlePlayer') {
      const statusTextObj = this.add.text(x, y + 25, 'CPU', {
        fontSize: '10px',
        color: '#ff6600',
        fontFamily: 'Arial Bold'
      }).setOrigin(0.5)
      displayElements.push(statusTextObj)
    }
  }

  private showStartButton() {
    const { width, height } = this.cameras.main
    
    const startButton = this.add.text(width / 2, height - 100, 'START FIGHT!', {
      fontSize: '24px',
      color: '#00d4ff',
      fontFamily: 'Arial Black',
      backgroundColor: '#16213e',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      this.startFight()
    })
    .on('pointerover', () => {
      startButton.setStyle({ backgroundColor: '#0f3460' })
    })
    .on('pointerout', () => {
      startButton.setStyle({ backgroundColor: '#16213e' })
    })
  }

  private startFight() {
    // Store selected data in registry
    this.registry.set('selectedCharacters', this.selectedCharacters)
    
    // Go to arena selection scene
    this.scene.start('ArenaSelectScene')
  }

}