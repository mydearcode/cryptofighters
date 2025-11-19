import Phaser from 'phaser'
import { gameData } from '../data/DataManager'

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  preload() {
    // Loading bar setup
    const width = this.cameras.main.width
    const height = this.cameras.main.height
    
    const progressBar = this.add.graphics()
    const progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50)
    
    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
      font: '20px Courier New',
      color: '#ffffff'
    }).setOrigin(0.5, 0.5)
    
    const percentText = this.add.text(width / 2, height / 2, '0%', {
      font: '18px Courier New',
      color: '#ffffff'
    }).setOrigin(0.5, 0.5)
    
    const assetText = this.add.text(width / 2, height / 2 + 50, '', {
      font: '12px Courier New',
      color: '#ffffff'
    }).setOrigin(0.5, 0.5)

    // Loading progress events
    this.load.on('progress', (value: number) => {
      progressBar.clear()
      progressBar.fillStyle(0x00ff00, 1)
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30)
      
      percentText.setText(Math.floor(value * 100) + '%')
    })
    
    this.load.on('fileprogress', (file: any) => {
      assetText.setText('Loading asset: ' + file.key)
    })
    
    this.load.on('complete', () => {
      progressBar.destroy()
      progressBox.destroy()
      loadingText.destroy()
      percentText.destroy()
      assetText.destroy()
    })

    // Load placeholder assets for now
    this.loadPlaceholderAssets()

    // Prefix all asset requests with the current URL path
    // This ensures assets load correctly when the game is hosted under a subdirectory
    // Remove loader base override; use plain relative paths like 'sprites/...', 'audio/...'

    // Load audio assets (served from publicDir 'assets')
    this.load.audio('bg_menu', 'audio/bg_menu.mp3')
    this.load.audio('bg_fight1', 'audio/bg_fight1.mp3')
    this.load.audio('bg_fight2', 'audio/bg_fight2.mp3')
    this.load.audio('countdown', 'audio/countdown.mp3')
    this.load.audio('ready_fight', 'audio/ready_fight.mp3')
    this.load.audio('sfx_attack_basic', 'audio/sfx_attack_basic.mp3')
    this.load.audio('sfx_attack_special', 'audio/sfx_attack_special.mp3')
    this.load.audio('sfx_hit', 'audio/sfx_hit.mp3')
    this.load.audio('sfx_projectile', 'audio/sfx_projectile.mp3')
  }

  private loadPlaceholderAssets() {
    // Create simple colored rectangles as placeholders
    this.load.image('player1', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
    this.load.image('player2', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
    this.load.image('background', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
    
    // Load existing projectile SVG sprites (served from publicDir 'assets')
    this.load.image('hodl_diamond', 'sprites/projectiles/diamond-origami-paper-svgrepo-com.svg')
    this.load.image('bitcoin', 'sprites/projectiles/bitcoin-svgrepo-com.svg')
    this.load.image('ethereum', 'sprites/projectiles/ethereum-svgrepo-com.svg')
    this.load.image('binance', 'sprites/projectiles/binance-svgrepo-com.svg')
    this.load.image('binance_bolt', 'sprites/projectiles/binance-svgrepo-com.svg')
    this.load.image('meme_rocket', 'sprites/projectiles/rocket-svgrepo-com.svg')
    
    // Load additional projectile SVG sprites
    this.load.image('bitcoin-circle', 'sprites/projectiles/bitcoin-circle-svgrepo-com.svg')
    this.load.image('ethereum-alt', 'sprites/projectiles/ethereum-svgrepo-com_2.svg')
    this.load.image('binance-coin', 'sprites/projectiles/binance-bnb-coin-2-svgrepo-com.svg')
    this.load.image('doge-coin', 'sprites/projectiles/doge-svgrepo-com.svg')
    this.load.image('diamond-origami', 'sprites/projectiles/diamond-origami-paper-svgrepo-com.svg')
    this.load.image('fire-bomb', 'sprites/projectiles/fire-bomb-svgrepo-com.svg')
    this.load.image('fire-blast', 'sprites/projectiles/fire-svgrepo-com.svg')
    this.load.image('bomb-classic', 'sprites/projectiles/bomb-svgrepo-com.svg')
    this.load.image('bomb-advanced', 'sprites/projectiles/bomb-svgrepo-com_black.svg')
    this.load.image('rocket-classic', 'sprites/projectiles/rocket-svgrepo-com.svg')
    this.load.image('rocket-advanced', 'sprites/projectiles/rocket-svgrepo-com_2.svg')
    this.load.image('moon-classic', 'sprites/projectiles/moon-svgrepo-com.svg')
    this.load.image('moon-stars', 'sprites/projectiles/moon-and-stars-svgrepo-com.svg')
    this.load.image('moon-advanced', 'sprites/projectiles/moon-svgrepo-com_2.svg')
    this.load.image('space-blast', 'sprites/projectiles/space-2-svgrepo-com.svg')
    this.load.image('space-cosmos', 'sprites/projectiles/space-pace-cosmos-gravity-svgrepo-com.svg')
    this.load.image('computer-chip', 'sprites/projectiles/computer-chip-svgrepo-com.svg')
    this.load.image('blockchain-security', 'sprites/projectiles/blockchain-digital-future-system-security-svgrepo-com.svg')
    this.load.image('candle-sticks', 'sprites/projectiles/candle-sticks-svgrepo-com.svg')
    this.load.image('exchange-dollar', 'sprites/projectiles/exchange-dollar-svgrepo-com.svg')
    this.load.image('hold-power', 'sprites/projectiles/hold-svgrepo-com.svg')
    this.load.image('trending-down', 'sprites/projectiles/trending-down-svgrepo-com.svg')
    this.load.image('announcement', 'sprites/projectiles/announcement-shout-svgrepo-com.svg')
    this.load.image('ninja-star', 'sprites/projectiles/ninja-star-svgrepo-com.svg')
    this.load.image('sword-heavy', 'sprites/projectiles/sword-heavy-svgrepo-com.svg')
    
    // Load new projectile SVG sprites for updated characters
    this.load.image('rocket-svgrepo-com_2', 'sprites/projectiles/rocket-svgrepo-com_2.svg')
    this.load.image('pile-of-poo', 'sprites/projectiles/pile-of-poo-svgrepo-com.svg')
    this.load.image('ethereum-svgrepo-com_2', 'sprites/projectiles/ethereum-svgrepo-com_2.svg')
    this.load.image('announcement-shout', 'sprites/projectiles/announcement-shout-svgrepo-com.svg')
    this.load.image('space-2', 'sprites/projectiles/space-2-svgrepo-com.svg')
    this.load.image('rocket', 'sprites/projectiles/rocket-svgrepo-com.svg')
    this.load.image('circle-dashed', 'sprites/projectiles/circle-dashed-svgrepo-com.svg')
    this.load.image('blockchain-digital-future-system-security', 'sprites/projectiles/blockchain-digital-future-system-security-svgrepo-com.svg')
    this.load.image('coinbase-v2', 'sprites/projectiles/coinbase-v2-svgrepo-com.svg')
    this.load.image('moon', 'sprites/projectiles/moon-svgrepo-com.svg')
    this.load.image('diamond-origami-paper', 'sprites/projectiles/diamond-origami-paper-svgrepo-com.svg')
    this.load.image('computer-chip-svgrepo-com', 'sprites/projectiles/computer-chip-svgrepo-com.svg')
    this.load.image('ninja-star-svgrepo-com', 'sprites/projectiles/ninja-star-svgrepo-com.svg')
    this.load.image('sword-heavy-svgrepo-com', 'sprites/projectiles/sword-heavy-svgrepo-com.svg')
    this.load.image('pile-of-poo-svgrepo-com', 'sprites/projectiles/pile-of-poo-svgrepo-com.svg')
    this.load.image('binance-svgrepo-com', 'sprites/projectiles/binance-svgrepo-com.svg')
    this.load.image('announcement-shout-svgrepo-com', 'sprites/projectiles/announcement-shout-svgrepo-com.svg')
    this.load.image('space-2-svgrepo-com', 'sprites/projectiles/space-2-svgrepo-com.svg')
    this.load.image('rocket-svgrepo-com', 'sprites/projectiles/rocket-svgrepo-com.svg')
    this.load.image('bitcoin-svgrepo-com', 'sprites/projectiles/bitcoin-svgrepo-com.svg')
    this.load.image('fire-bomb-svgrepo-com', 'sprites/projectiles/fire-bomb-svgrepo-com.svg')
    this.load.image('circle-dashed-svgrepo-com', 'sprites/projectiles/circle-dashed-svgrepo-com.svg')
    this.load.image('blockchain-digital-future-system-security-svgrepo-com', 'sprites/projectiles/blockchain-digital-future-system-security-svgrepo-com.svg')
    this.load.image('coinbase-v2-svgrepo-com', 'sprites/projectiles/coinbase-v2-svgrepo-com.svg')
    this.load.image('moon-svgrepo-com', 'sprites/projectiles/moon-svgrepo-com.svg')
    this.load.image('diamond-origami-paper-svgrepo-com', 'sprites/projectiles/diamond-origami-paper-svgrepo-com.svg')
    
    // Load Vitalik character sprites as spritesheets (only side views - left and right)
    // combat_idle: 128x256 (2 frames horizontal, 4 directions vertical) - use row 1 (left) and row 3 (right)
    this.load.spritesheet('vitalik-idle', 'sprites/vitalik/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // walk: 576x256 (9 frames horizontal, 4 directions vertical) - use row 1 (left) and row 3 (right)  
    this.load.spritesheet('vitalik-walk', 'sprites/vitalik/walk.png', { frameWidth: 64, frameHeight: 64 })
    
    // run: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left) and row 3 (right)
    this.load.spritesheet('vitalik-run', 'sprites/vitalik/run.png', { frameWidth: 64, frameHeight: 64 })
    
    // jump: 320x256 (5 frames horizontal, 4 directions vertical) - use row 1 (left) and row 3 (right)
    this.load.spritesheet('vitalik-jump', 'sprites/vitalik/jump.png', { frameWidth: 64, frameHeight: 64 })
    
    // slash: 384x256 (6 frames horizontal, 4 directions vertical) - use row 1 (left) and row 3 (right)
    this.load.spritesheet('vitalik-slash', 'sprites/vitalik/slash.png', { frameWidth: 64, frameHeight: 64 })
    
    // hurt: 384x64 (6 frames horizontal, 1 direction) - this one seems to be side view only
    this.load.spritesheet('vitalik-hurt', 'sprites/vitalik/hurt.png', { frameWidth: 64, frameHeight: 64 })
    
    // shoot: 832x256 (13 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('vitalik-shoot', 'sprites/vitalik/shoot.png', { frameWidth: 64, frameHeight: 64 })
    
    // spellcast: 448x256 (7 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('vitalik-spellcast', 'sprites/vitalik/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default vitalik sprite (use first frame of combat_idle)
    this.load.image('vitalik', 'sprites/vitalik/combat_idle.png')
    

    
    // Load CZ character sprites
    // idle: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-idle', 'sprites/cz/idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // combat_idle: 256x256 (4 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-combat-idle', 'sprites/cz/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // walk: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-walk', 'sprites/cz/walk.png', { frameWidth: 64, frameHeight: 64 })
    
    // run: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-run', 'sprites/cz/run.png', { frameWidth: 64, frameHeight: 64 })
    
    // jump: 192x256 (3 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-jump', 'sprites/cz/jump.png', { frameWidth: 64, frameHeight: 64 })
    
    // slash: 384x256 (6 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-slash', 'sprites/cz/slash.png', { frameWidth: 64, frameHeight: 64 })
    
    // thrust: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-thrust', 'sprites/cz/thrust.png', { frameWidth: 64, frameHeight: 64 })
    
    // hurt: 384x64 (6 frames horizontal, 1 direction) - this one seems to be side view only
    this.load.spritesheet('cz-hurt', 'sprites/cz/hurt.png', { frameWidth: 64, frameHeight: 64 })
    
    // shoot: 832x256 (13 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-shoot', 'sprites/cz/shoot.png', { frameWidth: 64, frameHeight: 64 })
    
    // spellcast: 448x256 (7 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-spellcast', 'sprites/cz/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default cz sprite (use first frame of combat_idle)
    this.load.image('cz', 'sprites/cz/combat_idle.png')
    
    // Load CZ portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('cz-combat-idle-frames', 'sprites/cz/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // Load Elon character sprites
    // idle: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-idle', 'sprites/elon/idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // combat_idle: 256x256 (4 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-combat-idle', 'sprites/elon/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // walk: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-walk', 'sprites/elon/walk.png', { frameWidth: 64, frameHeight: 64 })
    
    // run: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-run', 'sprites/elon/run.png', { frameWidth: 64, frameHeight: 64 })
    
    // jump: 192x256 (3 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-jump', 'sprites/elon/jump.png', { frameWidth: 64, frameHeight: 64 })
    
    // slash: 384x256 (6 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-slash', 'sprites/elon/slash.png', { frameWidth: 64, frameHeight: 64 })
    
    // thrust: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-thrust', 'sprites/elon/thrust.png', { frameWidth: 64, frameHeight: 64 })
    
    // hurt: 384x64 (6 frames horizontal, 1 direction) - this one seems to be side view only
    this.load.spritesheet('elon-hurt', 'sprites/elon/hurt.png', { frameWidth: 64, frameHeight: 64 })
    
    // shoot: 832x256 (13 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-shoot', 'sprites/elon/shoot.png', { frameWidth: 64, frameHeight: 64 })
    
    // spellcast: 448x256 (7 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-spellcast', 'sprites/elon/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default elon sprite (use first frame of combat_idle)
    this.load.image('elon', 'sprites/elon/combat_idle.png')
    
    // Load Elon portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('elon-combat-idle-frames', 'sprites/elon/combat_idle.png', { frameWidth: 64, frameHeight: 64 })

    // Load Hoskinson sprites
    this.load.spritesheet('hoskinson-idle', 'sprites/hoskinson/idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-combat-idle', 'sprites/hoskinson/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-walk', 'sprites/hoskinson/walk.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-run', 'sprites/hoskinson/run.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-jump', 'sprites/hoskinson/jump.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-slash', 'sprites/hoskinson/slash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-thrust', 'sprites/hoskinson/thrust.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-hurt', 'sprites/hoskinson/hurt.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-shoot', 'sprites/hoskinson/shoot.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-spellcast', 'sprites/hoskinson/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default hoskinson sprite (use first frame of combat_idle)
    this.load.image('hoskinson', 'sprites/hoskinson/combat_idle.png')
    
    // Load Hoskinson portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('hoskinson-combat-idle-frames', 'sprites/hoskinson/combat_idle.png', { frameWidth: 64, frameHeight: 64 })

    // Load Saylor sprites
    this.load.spritesheet('saylor-idle', 'sprites/saylor/idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-combat-idle', 'sprites/saylor/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-walk', 'sprites/saylor/walk.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-run', 'sprites/saylor/run.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-jump', 'sprites/saylor/jump.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-slash', 'sprites/saylor/slash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-thrust', 'sprites/saylor/thrust.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-hurt', 'sprites/saylor/hurt.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-shoot', 'sprites/saylor/shoot.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-spellcast', 'sprites/saylor/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default saylor sprite (use first frame of combat_idle)
    this.load.image('saylor', 'sprites/saylor/combat_idle.png')
    
    // Load Saylor portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('saylor-combat-idle-frames', 'sprites/saylor/combat_idle.png', { frameWidth: 64, frameHeight: 64 })

    // Load Gavin sprites
    this.load.spritesheet('gavin-idle', 'sprites/gavin/idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-combat-idle', 'sprites/gavin/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-walk', 'sprites/gavin/walk.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-run', 'sprites/gavin/run.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-jump', 'sprites/gavin/jump.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-slash', 'sprites/gavin/slash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-halfslash', 'sprites/gavin/halfslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-backslash', 'sprites/gavin/backslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-thrust', 'sprites/gavin/thrust.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-hurt', 'sprites/gavin/hurt.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-shoot', 'sprites/gavin/shoot.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-spellcast', 'sprites/gavin/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-climb', 'sprites/gavin/climb.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-sit', 'sprites/gavin/sit.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-emote', 'sprites/gavin/emote.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default gavin sprite (use first frame of combat_idle)
    this.load.image('gavin', 'sprites/gavin/combat_idle.png')
    
    // Load Gavin portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('gavin-combat-idle-frames', 'sprites/gavin/combat_idle.png', { frameWidth: 64, frameHeight: 64 })

    // Load Hodl Master sprites
    this.load.spritesheet('hodl-master-idle', 'sprites/hold_master/idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-combat-idle', 'sprites/hold_master/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-walk', 'sprites/hold_master/walk.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-run', 'sprites/hold_master/run.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-jump', 'sprites/hold_master/jump.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-slash', 'sprites/hold_master/slash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-halfslash', 'sprites/hold_master/halfslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-backslash', 'sprites/hold_master/backslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-thrust', 'sprites/hold_master/thrust.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-hurt', 'sprites/hold_master/hurt.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-shoot', 'sprites/hold_master/shoot.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-spellcast', 'sprites/hold_master/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-climb', 'sprites/hold_master/climb.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-sit', 'sprites/hold_master/sit.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-emote', 'sprites/hold_master/emote.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default hodl master sprite (use first frame of combat_idle)
    this.load.image('hodl-master', 'sprites/hold_master/combat_idle.png')
    
    // Load Trade Queen sprites
    this.load.spritesheet('trade-queen-idle', 'sprites/trade_queen/idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-combat-idle', 'sprites/trade_queen/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-walk', 'sprites/trade_queen/walk.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-run', 'sprites/trade_queen/run.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-jump', 'sprites/trade_queen/jump.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-slash', 'sprites/trade_queen/slash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-halfslash', 'sprites/trade_queen/halfslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-backslash', 'sprites/trade_queen/backslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-thrust', 'sprites/trade_queen/thrust.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-hurt', 'sprites/trade_queen/hurt.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-shoot', 'sprites/trade_queen/shoot.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-spellcast', 'sprites/trade_queen/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-climb', 'sprites/trade_queen/climb.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-sit', 'sprites/trade_queen/sit.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-emote', 'sprites/trade_queen/emote.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default trade queen sprite (use first frame of combat_idle)
    this.load.image('trade-queen', 'sprites/trade_queen/combat_idle.png')
    
    // Load Trade Queen portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('trade-queen-combat-idle-frames', '/sprites/trade_queen/combat_idle.png', { frameWidth: 64, frameHeight: 64 })

    // Load DeFi Ninja character sprites
    // idle: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-idle', '/sprites/defi_ninja/idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // combat_idle: 128x256 (2 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-combat-idle', '/sprites/defi_ninja/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // walk: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-walk', '/sprites/defi_ninja/walk.png', { frameWidth: 64, frameHeight: 64 })
    
    // run: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-run', '/sprites/defi_ninja/run.png', { frameWidth: 64, frameHeight: 64 })
    
    // jump: 192x256 (3 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-jump', '/sprites/defi_ninja/jump.png', { frameWidth: 64, frameHeight: 64 })
    
    // slash: 384x256 (6 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-slash', '/sprites/defi_ninja/slash.png', { frameWidth: 64, frameHeight: 64 })
    
    // halfslash: 192x256 (3 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-halfslash', '/sprites/defi_ninja/halfslash.png', { frameWidth: 64, frameHeight: 64 })
    
    // backslash: 256x256 (4 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-backslash', '/sprites/defi_ninja/backslash.png', { frameWidth: 64, frameHeight: 64 })
    
    // thrust: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-thrust', '/sprites/defi_ninja/thrust.png', { frameWidth: 64, frameHeight: 64 })
    
    // hurt: 192x256 (3 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-hurt', '/sprites/defi_ninja/hurt.png', { frameWidth: 64, frameHeight: 64 })
    
    // shoot: 832x256 (13 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-shoot', '/sprites/defi_ninja/shoot.png', { frameWidth: 64, frameHeight: 64 })
    
    // spellcast: 448x256 (7 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-spellcast', '/sprites/defi_ninja/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    
    // climb: 256x256 (4 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-climb', '/sprites/defi_ninja/climb.png', { frameWidth: 64, frameHeight: 64 })
    
    // sit: 64x256 (1 frame horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-sit', '/sprites/defi_ninja/sit.png', { frameWidth: 64, frameHeight: 64 })
    
    // emote: 256x256 (4 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-emote', '/sprites/defi_ninja/emote.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default defi-ninja sprite (use first frame of combat_idle)
    this.load.image('defi-ninja', '/sprites/defi_ninja/combat_idle.png')
    
    // Load DeFi Ninja portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('defi-ninja-combat-idle-frames', '/sprites/defi_ninja/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // Load defi_ninja as separate sprite for character selection
    this.load.image('defi_ninja', '/sprites/defi_ninja/combat_idle.png')

    // Load Meme Lord character sprites
    this.load.spritesheet('meme-lord-idle', '/sprites/meme_lord/idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-combat-idle', '/sprites/meme_lord/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-walk', '/sprites/meme_lord/walk.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-run', '/sprites/meme_lord/run.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-jump', '/sprites/meme_lord/jump.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-slash', '/sprites/meme_lord/slash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-halfslash', '/sprites/meme_lord/halfslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-backslash', '/sprites/meme_lord/backslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-thrust', '/sprites/meme_lord/thrust.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-hurt', '/sprites/meme_lord/hurt.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-shoot', '/sprites/meme_lord/shoot.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-spellcast', '/sprites/meme_lord/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-climb', '/sprites/meme_lord/climb.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-sit', '/sprites/meme_lord/sit.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-emote', '/sprites/meme_lord/emote.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default meme-lord sprite (use first frame of combat_idle)
    this.load.image('meme-lord', '/sprites/meme_lord/combat_idle.png')
    
    // Load Meme Lord portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('meme-lord-combat-idle-frames', '/sprites/meme_lord/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // Load meme_lord as separate sprite for character selection
    this.load.image('meme_lord', '/sprites/meme_lord/combat_idle.png')

    // Load Brian sprites
    this.load.spritesheet('brian-idle', '/sprites/brian/idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-combat-idle', '/sprites/brian/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-walk', '/sprites/brian/walk.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-run', '/sprites/brian/run.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-jump', '/sprites/brian/jump.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-slash', '/sprites/brian/slash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-halfslash', '/sprites/brian/halfslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-backslash', '/sprites/brian/backslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-thrust', '/sprites/brian/thrust.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-hurt', '/sprites/brian/hurt.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-shoot', '/sprites/brian/shoot.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-spellcast', '/sprites/brian/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-climb', '/sprites/brian/climb.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-sit', '/sprites/brian/sit.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-emote', '/sprites/brian/emote.png', { frameWidth: 64, frameHeight: 64 })

    // Load Brian portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('brian-combat-idle-frames', '/sprites/brian/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // Load brian as separate sprite for character selection
    this.load.image('brian', '/sprites/brian/combat_idle.png')

    // Load Jesse sprites
    this.load.spritesheet('jesse-idle', '/sprites/jesse/idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-combat-idle', '/sprites/jesse/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-walk', '/sprites/jesse/walk.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-run', '/sprites/jesse/run.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-jump', '/sprites/jesse/jump.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-slash', '/sprites/jesse/slash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-halfslash', '/sprites/jesse/halfslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-backslash', '/sprites/jesse/backslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-thrust', '/sprites/jesse/thrust.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-hurt', '/sprites/jesse/hurt.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-shoot', '/sprites/jesse/shoot.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-spellcast', '/sprites/jesse/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-climb', '/sprites/jesse/climb.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-sit', '/sprites/jesse/sit.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-emote', '/sprites/jesse/emote.png', { frameWidth: 64, frameHeight: 64 })

    // Load Jesse portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('jesse-combat-idle-frames', '/sprites/jesse/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // Load jesse as separate sprite for character selection
    this.load.image('jesse', '/sprites/jesse/combat_idle.png')

    // Load placeholder images for characters that don't have sprites yet
    this.load.image('trade_queen', '/sprites/trade_queen/combat_idle.png')
    this.load.image('hodl_master', '/sprites/hold_master/combat_idle.png')
  }

  create() {
    // Initialize game data system
    // Game data loaded successfully

    // Initialize legacy game registry (for backward compatibility)
    this.registry.set('gameData', {
      characters: gameData.getAllCharacters(),
      moves: gameData.getAllMoves(),
      arenas: gameData.getAllArenas(),
      events: [],
      sponsors: []
    })

    // Transition to Menu scene
    this.scene.start('MenuScene')
  }
}