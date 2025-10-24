import Phaser from 'phaser'
import { GameConfig } from './config/GameConfig'
import { BootScene } from './scenes/BootScene'
import { MenuScene } from './scenes/MenuScene'
import { SelectScene } from './scenes/SelectScene'
import { FightScene } from './scenes/FightScene'
import { ResultsScene } from './scenes/ResultsScene'

// Register all scenes
const config: Phaser.Types.Core.GameConfig = {
  ...GameConfig,
  scene: [BootScene, MenuScene, SelectScene, FightScene, ResultsScene]
}

// Initialize the game
const game = new Phaser.Game(config)

// Make game globally accessible for debugging
;(window as any).game = game

export default game