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
      moves: ['hodl_smash', 'diamond_punch', 'bull_rush']
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
      moves: ['panic_sell', 'fomo_strike', 'weak_slap']
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
      moves: ['market_manipulation', 'whale_splash', 'pump_dump']
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
      moves: ['ape_in', 'diamond_hands', 'moon_shot']
    }
  ]

  // Convert JSON character data to game character data format
  private static convertJSONToCharacterData(jsonChar: JSONCharacterData): CharacterData {
    return {
      id: jsonChar.id,
      name: jsonChar.name,
      sprite: jsonChar.sprite.replace('-', '_'), // Convert kebab-case to snake_case for sprites
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