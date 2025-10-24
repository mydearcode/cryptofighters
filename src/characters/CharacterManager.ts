import { CharacterData } from './Character'

export class CharacterManager {
  private static characters: CharacterData[] = [
    {
      id: 'hodl_master',
      name: 'HODL Master',
      sprite: 'hodl_master',
      stats: {
        health: 100,
        attack: 25,
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
        attack: 30,
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
        attack: 35,
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
        attack: 40,
        defense: 15,
        speed: 180
      },
      moves: ['ape_in', 'diamond_hands', 'moon_shot']
    }
  ]

  public static getAllCharacters(): CharacterData[] {
    return [...this.characters] // Return a copy
  }

  public static getCharacterById(id: string): CharacterData | undefined {
    return this.characters.find(char => char.id === id)
  }

  public static getCharacterByName(name: string): CharacterData | undefined {
    return this.characters.find(char => char.name === name)
  }

  public static getRandomCharacter(): CharacterData {
    const randomIndex = Math.floor(Math.random() * this.characters.length)
    return this.characters[randomIndex]
  }

  public static preloadAssets(scene: Phaser.Scene) {
    // Load all character sprites
    this.characters.forEach(character => {
      scene.load.image(character.sprite, `assets/sprites/${character.sprite}.svg`)
    })
  }
}