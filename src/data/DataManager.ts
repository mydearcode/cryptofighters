import charactersData from './characters.json'
import movesData from './moves.json'
import arenasData from './arenas.json'

export interface CharacterData {
  id: string
  name: string
  description: string
  stats: {
    health: number
    attack: number
    defense: number
    speed: number
    mana: number
  }
  moves: string[]
  specialProjectiles: string[]
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  element: string
  spritePath: string
  projectileSvgPaths: {
    [key: string]: string
  }
}

export interface MoveData {
  id: string
  name: string
  description: string
  type: 'basic' | 'special1' | 'special2'
  cooldown: number
  range: number
  effects: string[]
  animation: string
  projectileType?: string
  battleCries?: string[]
}

export interface ArenaData {
  id: string
  name: string
  description: string
  background: string
  theme: string
  music: string
  lighting: string
  effects: {
    particles: string
    ambient: string
  }
  boundaries: {
    left: number
    right: number
    ground: number
  }
  special_features: string[]
}

export class DataManager {
  private static instance: DataManager
  private characters: Map<string, CharacterData> = new Map()
  private moves: Map<string, MoveData> = new Map()
  private arenas: Map<string, ArenaData> = new Map()
  private isLoaded: boolean = false

  private constructor() {
    this.loadData()
  }

  public static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager()
    }
    return DataManager.instance
  }

  private loadData(): void {
    try {
      // Load characters
      charactersData.characters.forEach(character => {
        if (this.validateCharacterData(character)) {
          this.characters.set(character.id, character as unknown as CharacterData)
        } else {
          console.warn(`Invalid character data for: ${character.id}`)
        }
      })

      // Load moves
      movesData.moves.forEach(move => {
        if (this.validateMoveData(move)) {
          this.moves.set(move.id, move as MoveData)
        } else {
          console.warn(`Invalid move data for: ${move.id}`)
        }
      })

      // Load arenas
      arenasData.arenas.forEach(arena => {
        if (this.validateArenaData(arena)) {
          this.arenas.set(arena.id, arena as ArenaData)
        } else {
          console.warn(`Invalid arena data for: ${arena.id}`, arena)
        }
      })

      this.isLoaded = true
      // Data loaded successfully
    } catch (error) {
      console.error('Failed to load game data:', error)
    }
  }

  private validateCharacterData(data: any): boolean {
    return (
      typeof data.id === 'string' &&
      typeof data.name === 'string' &&
      typeof data.description === 'string' &&
      data.stats &&
      typeof data.stats.health === 'number' &&
      typeof data.stats.attack === 'number' &&
      typeof data.stats.defense === 'number' &&
      typeof data.stats.speed === 'number' &&
      typeof data.stats.mana === 'number' &&
      Array.isArray(data.moves) &&
      Array.isArray(data.specialProjectiles) &&
      typeof data.rarity === 'string' &&
      typeof data.element === 'string' &&
      typeof data.spritePath === 'string' &&
      data.projectileSvgPaths &&
      typeof data.projectileSvgPaths === 'object'
    )
  }

  private validateMoveData(data: any): boolean {
    return (
      typeof data.id === 'string' &&
      typeof data.name === 'string' &&
      typeof data.description === 'string' &&
      ['basic', 'special1', 'special2'].includes(data.type) &&
      typeof data.cooldown === 'number' &&
      typeof data.range === 'number' &&
      Array.isArray(data.effects) &&
      typeof data.animation === 'string'
    )
  }

  private validateArenaData(data: any): boolean {
    return (
      typeof data.id === 'string' &&
      typeof data.name === 'string' &&
      typeof data.description === 'string' &&
      typeof data.background === 'string' &&
      typeof data.theme === 'string' &&
      data.boundaries &&
      typeof data.boundaries.left === 'number' &&
      typeof data.boundaries.right === 'number' &&
      typeof data.boundaries.ground === 'number' &&
      Array.isArray(data.special_features)
    )
  }

  // Character methods
  public getCharacter(id: string): CharacterData | undefined {
    return this.characters.get(id)
  }

  public getAllCharacters(): CharacterData[] {
    return Array.from(this.characters.values())
  }

  public getCharactersByRarity(rarity: string): CharacterData[] {
    return this.getAllCharacters().filter(char => char.rarity === rarity)
  }

  public getCharactersByElement(element: string): CharacterData[] {
    return this.getAllCharacters().filter(char => char.element === element)
  }

  // Move methods
  public getMove(id: string): MoveData | undefined {
    return this.moves.get(id)
  }

  public getAllMoves(): MoveData[] {
    return Array.from(this.moves.values())
  }

  public getMovesByType(type: string): MoveData[] {
    return this.getAllMoves().filter(move => move.type === type)
  }

  public getCharacterMoves(characterId: string): MoveData[] {
    const character = this.getCharacter(characterId)
    if (!character) return []
    
    return character.moves
      .map(moveId => this.getMove(moveId))
      .filter(move => move !== undefined) as MoveData[]
  }

  // Arena methods
  public getArena(id: string): ArenaData | undefined {
    return this.arenas.get(id)
  }

  public getAllArenas(): ArenaData[] {
    return Array.from(this.arenas.values())
  }

  public getArenasByTheme(theme: string): ArenaData[] {
    return this.getAllArenas().filter(arena => arena.theme === theme)
  }

  public getRandomArena(): ArenaData | undefined {
    const arenas = this.getAllArenas()
    if (arenas.length === 0) return undefined
    
    const randomIndex = Math.floor(Math.random() * arenas.length)
    return arenas[randomIndex]
  }

  // Utility methods
  public isDataLoaded(): boolean {
    return this.isLoaded
  }

  public getDataStats(): { characters: number, moves: number, arenas: number } {
    return {
      characters: this.characters.size,
      moves: this.moves.size,
      arenas: this.arenas.size
    }
  }
}

// Export singleton instance
export const gameData = DataManager.getInstance()