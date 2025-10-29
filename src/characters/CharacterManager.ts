import { CharacterData } from './Character'
import { gameData, CharacterData as JSONCharacterData } from '../data/DataManager'

export class CharacterManager {
  // Legacy hardcoded characters (kept for backward compatibility)
  private static legacyCharacters: CharacterData[] = [
    {
      id: 'hodl_master',
      name: 'HODL Master',
      sprite: 'hodl_master',
      stats: {
        health: 100,
        attack: 6, // 100/6 = ~17 hits to kill
        defense: 20,
        speed: 150
      },
      moves: ['hodl_master_move_1', 'hodl_master_move_2', 'hodl_master_move_3']
    },
    {
      id: 'paper_hands',
      name: 'Paper Hands',
      sprite: 'paper_hands',
      stats: {
        health: 80,
        attack: 5, // 80/5 = 16 hits to kill
        defense: 10,
        speed: 200
      },
      moves: ['paper_hands_move_1', 'paper_hands_move_2', 'paper_hands_move_3']
    },
    {
      id: 'whale_trader',
      name: 'Whale Trader',
      sprite: 'whale_trader',
      stats: {
        health: 120,
        attack: 7, // 120/7 = ~17 hits to kill
        defense: 25,
        speed: 120
      },
      moves: ['whale_trader_move_1', 'whale_trader_move_2', 'whale_trader_move_3']
    },
    {
      id: 'degen_ape',
      name: 'Degen Ape',
      sprite: 'degen_ape',
      stats: {
        health: 90,
        attack: 6, // 90/6 = 15 hits to kill
        defense: 15,
        speed: 180
      },
      moves: ['degen_ape_move_1', 'degen_ape_move_2', 'degen_ape_move_3']
    }
  ]

  // Convert JSON character data to game character data format
  private static convertJSONToCharacterData(jsonChar: JSONCharacterData): CharacterData {
    return {
      id: jsonChar.id,
      name: jsonChar.name,
      sprite: jsonChar.spritePath.replace(/^sprites\/characters\//, '').replace(/\.png$/, ''), // Extract sprite name from path
      stats: jsonChar.stats,
      moves: jsonChar.moves
    }
  }

  public static getAllCharacters(): CharacterData[] {
    // Try to get characters from JSON data first
    if (gameData.isDataLoaded()) {
      const jsonCharacters = gameData.getAllCharacters()
      return jsonCharacters.map(char => this.convertJSONToCharacterData(char))
    }
    
    // Fallback to legacy characters
    return this.legacyCharacters
  }

  public static getCharacterById(id: string): CharacterData | undefined {
    // Try JSON data first
    if (gameData.isDataLoaded()) {
      const jsonChar = gameData.getCharacter(id)
      if (jsonChar) {
        return this.convertJSONToCharacterData(jsonChar)
      }
    }
    
    // Fallback to legacy characters
    return this.legacyCharacters.find(char => char.id === id)
  }

  public static getCharacterByName(name: string): CharacterData | undefined {
    return this.getAllCharacters().find(char => char.name === name)
  }

  public static getRandomCharacter(): CharacterData {
    const characters = this.getAllCharacters()
    const randomIndex = Math.floor(Math.random() * characters.length)
    return characters[randomIndex]
  }

  public static preloadAssets(scene: Phaser.Scene) {
    const characters = this.getAllCharacters()
    characters.forEach(character => {
      scene.load.image(character.sprite, `assets/characters/${character.sprite}.png`)
    })
  }

  // New methods for JSON data system
  public static getCharactersByRarity(rarity: string): CharacterData[] {
    if (gameData.isDataLoaded()) {
      const jsonCharacters = gameData.getCharactersByRarity(rarity)
      return jsonCharacters.map(char => this.convertJSONToCharacterData(char))
    }
    return []
  }

  public static getCharactersByElement(element: string): CharacterData[] {
    if (gameData.isDataLoaded()) {
      const jsonCharacters = gameData.getCharactersByElement(element)
      return jsonCharacters.map(char => this.convertJSONToCharacterData(char))
    }
    return []
  }

  public static getDataStats(): { total: number, fromJSON: boolean } {
    const characters = this.getAllCharacters()
    return {
      total: characters.length,
      fromJSON: gameData.isDataLoaded()
    }
  }
}