import Phaser from 'phaser'

export const GameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
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
  GROUND_Y: 450,
  PLAYER_SPEED: 200,
  JUMP_VELOCITY: -500,
  GRAVITY: 800
} as const