import Phaser from 'phaser'

export const GameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  width: 960,
  height: 540,
  parent: 'game',
  backgroundColor: '#1a1a2e',
  
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 800 },
      debug: false
    }
  },
  
  fps: {
    target: 60,
    forceSetTimeOut: true
  },
  
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 480,
      height: 270
    },
    max: {
      width: 1920,
      height: 1080
    }
  },
  
  render: {
    pixelArt: true,
    antialias: false,
    roundPixels: true
  },
  
  audio: {
    disableWebAudio: false
  },
  
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
    gamepad: false
  },
  
  dom: {
    createContainer: true
  }
}

export const GAME_CONSTANTS = {
  SCREEN_WIDTH: 960,
  SCREEN_HEIGHT: 540,
  GROUND_Y: 350,  // Lowered from 450 to keep characters on screen
  PLAYER_SPEED: 200,
  JUMP_VELOCITY: -500,
  GRAVITY: 800,
  ATTACK_COOLDOWN: 500, // milliseconds
  ROUND_TIME: 90, // seconds
  TIMER_UPDATE_INTERVAL: 1000, // milliseconds
  
  // Character Display Sizes - Simplified single size for all characters
  CHARACTER_SIZES: {
    // Game Scene Size (Fight Scene) - reduced for better balance
    GAME: { width: 200, height: 200 },
    
    // Selection Scene Sizes
    SELECTION_CARD: { width: 120, height: 150 },
    SELECTION_DISPLAY: { width: 120, height: 144 }
  }
} as const