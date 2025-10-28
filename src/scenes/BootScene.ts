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
  }

  private loadPlaceholderAssets() {
    // Create simple colored rectangles as placeholders
    this.load.image('player1', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
    this.load.image('player2', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
    this.load.image('background', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
    
    // Load projectile SVG sprites
    this.load.image('bitcoin', 'src/assets/sprites/projectiles/bitcoin-svgrepo-com.svg')
    this.load.image('ethereum', 'src/assets/sprites/projectiles/ethereum-svgrepo-com.svg')
    this.load.image('tesla', 'src/assets/sprites/projectiles/tesla.svg') // Bu dosya yok, placeholder olarak bırakıyorum
    this.load.image('hodl_diamond', 'src/assets/sprites/projectiles/hold-svgrepo-com.svg')
    this.load.image('trade_coin', 'src/assets/sprites/projectiles/trade_coin.svg') // Bu dosya yok, placeholder olarak bırakıyorum
    this.load.image('binance_bolt', 'src/assets/sprites/projectiles/binance-svgrepo-com.svg')
    this.load.image('cardano_wave', 'src/assets/sprites/projectiles/cardano_wave.svg') // Bu dosya yok, placeholder
    this.load.image('polkadot_link', 'src/assets/sprites/projectiles/polkadot_link.svg') // Bu dosya yok, placeholder
    this.load.image('crypto_punch', 'src/assets/sprites/projectiles/crypto_punch.svg') // Bu dosya yok, placeholder
    this.load.image('ninja_star', 'src/assets/sprites/projectiles/ninja_star.svg') // Bu dosya yok, placeholder
    this.load.image('defi_orb', 'src/assets/sprites/projectiles/defi_orb.svg') // Bu dosya yok, placeholder
    this.load.image('meme_rocket', 'src/assets/sprites/projectiles/rocket-svgrepo-com.svg')
    
    // Load additional projectile SVG sprites
    this.load.image('bitcoin-circle', 'src/assets/sprites/projectiles/bitcoin-circle-svgrepo-com.svg')
    this.load.image('ethereum-alt', 'src/assets/sprites/projectiles/ethereum-svgrepo-com (1).svg')
    this.load.image('binance-coin', 'src/assets/sprites/projectiles/binance-bnb-coin-2-svgrepo-com.svg')
    this.load.image('doge-coin', 'src/assets/sprites/projectiles/doge-svgrepo-com.svg')
    this.load.image('diamond-origami', 'src/assets/sprites/projectiles/diamond-origami-paper-svgrepo-com.svg')
    this.load.image('fire-bomb', 'src/assets/sprites/projectiles/fire-bomb-svgrepo-com.svg')
    this.load.image('fire-blast', 'src/assets/sprites/projectiles/fire-svgrepo-com.svg')
    this.load.image('bomb-classic', 'src/assets/sprites/projectiles/bomb-svgrepo-com.svg')
    this.load.image('bomb-advanced', 'src/assets/sprites/projectiles/bomb-svgrepo-com_black.svg')
    this.load.image('rocket-classic', 'src/assets/sprites/projectiles/rocket-svgrepo-com.svg')
    this.load.image('rocket-advanced', 'src/assets/sprites/projectiles/rocket-svgrepo-com (1).svg')
    this.load.image('moon-classic', 'src/assets/sprites/projectiles/moon-svgrepo-com.svg')
    this.load.image('moon-stars', 'src/assets/sprites/projectiles/moon-and-stars-svgrepo-com.svg')
    this.load.image('moon-advanced', 'src/assets/sprites/projectiles/moon-svgrepo-com_2.svg')
    this.load.image('space-blast', 'src/assets/sprites/projectiles/space-2-svgrepo-com.svg')
    this.load.image('space-cosmos', 'src/assets/sprites/projectiles/space-pace-cosmos-gravity-svgrepo-com.svg')
    this.load.image('computer-chip', 'src/assets/sprites/projectiles/computer-chip-svgrepo-com.svg')
    this.load.image('blockchain-security', 'src/assets/sprites/projectiles/blockchain-digital-future-system-security-svgrepo-com.svg')
    this.load.image('candle-sticks', 'src/assets/sprites/projectiles/candle-sticks-svgrepo-com.svg')
    this.load.image('exchange-dollar', 'src/assets/sprites/projectiles/exchange-dollar-svgrepo-com.svg')
    this.load.image('hold-power', 'src/assets/sprites/projectiles/hold-svgrepo-com.svg')
    this.load.image('trending-down', 'src/assets/sprites/projectiles/trending-down-svgrepo-com.svg')
    this.load.image('announcement', 'src/assets/sprites/projectiles/announcement-shout-svgrepo-com.svg')
    
    // Load Vitalik character sprites as spritesheets (only side views - left and right)
    // combat_idle: 128x256 (2 frames horizontal, 4 directions vertical) - use row 1 (left) and row 3 (right)
    this.load.spritesheet('vitalik-idle', 'assets/sprites/vitalik/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // walk: 576x256 (9 frames horizontal, 4 directions vertical) - use row 1 (left) and row 3 (right)  
    this.load.spritesheet('vitalik-walk', 'assets/sprites/vitalik/walk.png', { frameWidth: 64, frameHeight: 64 })
    
    // run: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left) and row 3 (right)
    this.load.spritesheet('vitalik-run', 'assets/sprites/vitalik/run.png', { frameWidth: 64, frameHeight: 64 })
    
    // jump: 320x256 (5 frames horizontal, 4 directions vertical) - use row 1 (left) and row 3 (right)
    this.load.spritesheet('vitalik-jump', 'assets/sprites/vitalik/jump.png', { frameWidth: 64, frameHeight: 64 })
    
    // slash: 384x256 (6 frames horizontal, 4 directions vertical) - use row 1 (left) and row 3 (right)
    this.load.spritesheet('vitalik-slash', 'assets/sprites/vitalik/slash.png', { frameWidth: 64, frameHeight: 64 })
    
    // hurt: 384x64 (6 frames horizontal, 1 direction) - this one seems to be side view only
    this.load.spritesheet('vitalik-hurt', 'assets/sprites/vitalik/hurt.png', { frameWidth: 64, frameHeight: 64 })
    
    // shoot: 832x256 (13 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('vitalik-shoot', 'assets/sprites/vitalik/shoot.png', { frameWidth: 64, frameHeight: 64 })
    
    // spellcast: 448x256 (7 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('vitalik-spellcast', 'assets/sprites/vitalik/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default vitalik sprite (use first frame of combat_idle)
    this.load.image('vitalik', 'assets/sprites/vitalik/combat_idle.png')
    
    // Load Vitalik portrait for character selection (single frame)
    this.load.image('vitalik-portrait', 'assets/sprites/vitalik/vitalik_single.png')
    
    // Load vitalik_single as separate sprite for character selection
    this.load.image('vitalik_single', 'assets/sprites/vitalik/vitalik_single.png')
    
    // Load CZ character sprites
    // idle: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-idle', 'assets/sprites/cz/idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // combat_idle: 256x256 (4 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-combat-idle', 'assets/sprites/cz/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // walk: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-walk', 'assets/sprites/cz/walk.png', { frameWidth: 64, frameHeight: 64 })
    
    // run: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-run', 'assets/sprites/cz/run.png', { frameWidth: 64, frameHeight: 64 })
    
    // jump: 192x256 (3 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-jump', 'assets/sprites/cz/jump.png', { frameWidth: 64, frameHeight: 64 })
    
    // slash: 384x256 (6 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-slash', 'assets/sprites/cz/slash.png', { frameWidth: 64, frameHeight: 64 })
    
    // thrust: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-thrust', 'assets/sprites/cz/thrust.png', { frameWidth: 64, frameHeight: 64 })
    
    // hurt: 384x64 (6 frames horizontal, 1 direction) - this one seems to be side view only
    this.load.spritesheet('cz-hurt', 'assets/sprites/cz/hurt.png', { frameWidth: 64, frameHeight: 64 })
    
    // shoot: 832x256 (13 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-shoot', 'assets/sprites/cz/shoot.png', { frameWidth: 64, frameHeight: 64 })
    
    // spellcast: 448x256 (7 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('cz-spellcast', 'assets/sprites/cz/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default cz sprite (use first frame of combat_idle)
    this.load.image('cz', 'assets/sprites/cz/combat_idle.png')
    
    // Load CZ portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('cz-combat-idle-frames', 'assets/sprites/cz/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // Load Elon character sprites
    // idle: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-idle', 'assets/sprites/elon/idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // combat_idle: 256x256 (4 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-combat-idle', 'assets/sprites/elon/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // walk: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-walk', 'assets/sprites/elon/walk.png', { frameWidth: 64, frameHeight: 64 })
    
    // run: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-run', 'assets/sprites/elon/run.png', { frameWidth: 64, frameHeight: 64 })
    
    // jump: 192x256 (3 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-jump', 'assets/sprites/elon/jump.png', { frameWidth: 64, frameHeight: 64 })
    
    // slash: 384x256 (6 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-slash', 'assets/sprites/elon/slash.png', { frameWidth: 64, frameHeight: 64 })
    
    // thrust: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-thrust', 'assets/sprites/elon/thrust.png', { frameWidth: 64, frameHeight: 64 })
    
    // hurt: 384x64 (6 frames horizontal, 1 direction) - this one seems to be side view only
    this.load.spritesheet('elon-hurt', 'assets/sprites/elon/hurt.png', { frameWidth: 64, frameHeight: 64 })
    
    // shoot: 832x256 (13 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-shoot', 'assets/sprites/elon/shoot.png', { frameWidth: 64, frameHeight: 64 })
    
    // spellcast: 448x256 (7 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('elon-spellcast', 'assets/sprites/elon/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default elon sprite (use first frame of combat_idle)
    this.load.image('elon', 'assets/sprites/elon/combat_idle.png')
    
    // Load Elon portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('elon-combat-idle-frames', 'assets/sprites/elon/combat_idle.png', { frameWidth: 64, frameHeight: 64 })

    // Load Hoskinson sprites
    this.load.spritesheet('hoskinson-idle', 'assets/sprites/hoskinson/idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-combat-idle', 'assets/sprites/hoskinson/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-walk', 'assets/sprites/hoskinson/walk.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-run', 'assets/sprites/hoskinson/run.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-jump', 'assets/sprites/hoskinson/jump.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-slash', 'assets/sprites/hoskinson/slash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-thrust', 'assets/sprites/hoskinson/thrust.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-hurt', 'assets/sprites/hoskinson/hurt.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-shoot', 'assets/sprites/hoskinson/shoot.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hoskinson-spellcast', 'assets/sprites/hoskinson/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default hoskinson sprite (use first frame of combat_idle)
    this.load.image('hoskinson', 'assets/sprites/hoskinson/combat_idle.png')
    
    // Load Hoskinson portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('hoskinson-combat-idle-frames', 'assets/sprites/hoskinson/combat_idle.png', { frameWidth: 64, frameHeight: 64 })

    // Load Saylor sprites
    this.load.spritesheet('saylor-idle', 'assets/sprites/saylor/idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-combat-idle', 'assets/sprites/saylor/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-walk', 'assets/sprites/saylor/walk.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-run', 'assets/sprites/saylor/run.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-jump', 'assets/sprites/saylor/jump.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-slash', 'assets/sprites/saylor/slash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-thrust', 'assets/sprites/saylor/thrust.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-hurt', 'assets/sprites/saylor/hurt.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-shoot', 'assets/sprites/saylor/shoot.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('saylor-spellcast', 'assets/sprites/saylor/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default saylor sprite (use first frame of combat_idle)
    this.load.image('saylor', 'assets/sprites/saylor/combat_idle.png')
    
    // Load Saylor portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('saylor-combat-idle-frames', 'assets/sprites/saylor/combat_idle.png', { frameWidth: 64, frameHeight: 64 })

    // Load Gavin sprites
    this.load.spritesheet('gavin-idle', 'assets/sprites/gavin/idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-combat-idle', 'assets/sprites/gavin/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-walk', 'assets/sprites/gavin/walk.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-run', 'assets/sprites/gavin/run.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-jump', 'assets/sprites/gavin/jump.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-slash', 'assets/sprites/gavin/slash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-halfslash', 'assets/sprites/gavin/halfslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-backslash', 'assets/sprites/gavin/backslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-thrust', 'assets/sprites/gavin/thrust.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-hurt', 'assets/sprites/gavin/hurt.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-shoot', 'assets/sprites/gavin/shoot.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-spellcast', 'assets/sprites/gavin/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-climb', 'assets/sprites/gavin/climb.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-sit', 'assets/sprites/gavin/sit.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('gavin-emote', 'assets/sprites/gavin/emote.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default gavin sprite (use first frame of combat_idle)
    this.load.image('gavin', 'assets/sprites/gavin/combat_idle.png')
    
    // Load Gavin portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('gavin-combat-idle-frames', 'assets/sprites/gavin/combat_idle.png', { frameWidth: 64, frameHeight: 64 })

    // Load Hodl Master sprites
    this.load.spritesheet('hodl-master-idle', 'assets/sprites/hold_master/idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-combat-idle', 'assets/sprites/hold_master/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-walk', 'assets/sprites/hold_master/walk.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-run', 'assets/sprites/hold_master/run.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-jump', 'assets/sprites/hold_master/jump.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-slash', 'assets/sprites/hold_master/slash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-halfslash', 'assets/sprites/hold_master/halfslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-backslash', 'assets/sprites/hold_master/backslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-thrust', 'assets/sprites/hold_master/thrust.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-hurt', 'assets/sprites/hold_master/hurt.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-shoot', 'assets/sprites/hold_master/shoot.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-spellcast', 'assets/sprites/hold_master/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-climb', 'assets/sprites/hold_master/climb.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-sit', 'assets/sprites/hold_master/sit.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('hodl-master-emote', 'assets/sprites/hold_master/emote.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default hodl master sprite (use first frame of combat_idle)
    this.load.image('hodl-master', 'assets/sprites/hold_master/combat_idle.png')
    
    // Load Trade Queen sprites
    this.load.spritesheet('trade-queen-idle', 'assets/sprites/trade_queen/idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-combat-idle', 'assets/sprites/trade_queen/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-walk', 'assets/sprites/trade_queen/walk.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-run', 'assets/sprites/trade_queen/run.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-jump', 'assets/sprites/trade_queen/jump.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-slash', 'assets/sprites/trade_queen/slash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-halfslash', 'assets/sprites/trade_queen/halfslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-backslash', 'assets/sprites/trade_queen/backslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-thrust', 'assets/sprites/trade_queen/thrust.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-hurt', 'assets/sprites/trade_queen/hurt.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-shoot', 'assets/sprites/trade_queen/shoot.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-spellcast', 'assets/sprites/trade_queen/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-climb', 'assets/sprites/trade_queen/climb.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-sit', 'assets/sprites/trade_queen/sit.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('trade-queen-emote', 'assets/sprites/trade_queen/emote.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default trade queen sprite (use first frame of combat_idle)
    this.load.image('trade-queen', 'assets/sprites/trade_queen/combat_idle.png')
    
    // Load Trade Queen portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('trade-queen-combat-idle-frames', 'assets/sprites/trade_queen/combat_idle.png', { frameWidth: 64, frameHeight: 64 })

    // Load DeFi Ninja character sprites
    // idle: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-idle', 'assets/sprites/defi_ninja/idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // combat_idle: 128x256 (2 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-combat-idle', 'assets/sprites/defi_ninja/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // walk: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-walk', 'assets/sprites/defi_ninja/walk.png', { frameWidth: 64, frameHeight: 64 })
    
    // run: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-run', 'assets/sprites/defi_ninja/run.png', { frameWidth: 64, frameHeight: 64 })
    
    // jump: 192x256 (3 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-jump', 'assets/sprites/defi_ninja/jump.png', { frameWidth: 64, frameHeight: 64 })
    
    // slash: 384x256 (6 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-slash', 'assets/sprites/defi_ninja/slash.png', { frameWidth: 64, frameHeight: 64 })
    
    // halfslash: 192x256 (3 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-halfslash', 'assets/sprites/defi_ninja/halfslash.png', { frameWidth: 64, frameHeight: 64 })
    
    // backslash: 256x256 (4 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-backslash', 'assets/sprites/defi_ninja/backslash.png', { frameWidth: 64, frameHeight: 64 })
    
    // thrust: 512x256 (8 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-thrust', 'assets/sprites/defi_ninja/thrust.png', { frameWidth: 64, frameHeight: 64 })
    
    // hurt: 192x256 (3 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-hurt', 'assets/sprites/defi_ninja/hurt.png', { frameWidth: 64, frameHeight: 64 })
    
    // shoot: 832x256 (13 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-shoot', 'assets/sprites/defi_ninja/shoot.png', { frameWidth: 64, frameHeight: 64 })
    
    // spellcast: 448x256 (7 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-spellcast', 'assets/sprites/defi_ninja/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    
    // climb: 256x256 (4 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-climb', 'assets/sprites/defi_ninja/climb.png', { frameWidth: 64, frameHeight: 64 })
    
    // sit: 64x256 (1 frame horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-sit', 'assets/sprites/defi_ninja/sit.png', { frameWidth: 64, frameHeight: 64 })
    
    // emote: 256x256 (4 frames horizontal, 4 directions vertical) - use row 1 (left side view)
    this.load.spritesheet('defi-ninja-emote', 'assets/sprites/defi_ninja/emote.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default defi-ninja sprite (use first frame of combat_idle)
    this.load.image('defi-ninja', 'assets/sprites/defi_ninja/combat_idle.png')
    
    // Load DeFi Ninja portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('defi-ninja-combat-idle-frames', 'assets/sprites/defi_ninja/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // Load defi_ninja as separate sprite for character selection
    this.load.image('defi_ninja', 'assets/sprites/defi_ninja/combat_idle.png')

    // Load Meme Lord character sprites
    this.load.spritesheet('meme-lord-idle', 'assets/sprites/meme_lord/idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-combat-idle', 'assets/sprites/meme_lord/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-walk', 'assets/sprites/meme_lord/walk.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-run', 'assets/sprites/meme_lord/run.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-jump', 'assets/sprites/meme_lord/jump.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-slash', 'assets/sprites/meme_lord/slash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-halfslash', 'assets/sprites/meme_lord/halfslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-backslash', 'assets/sprites/meme_lord/backslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-thrust', 'assets/sprites/meme_lord/thrust.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-hurt', 'assets/sprites/meme_lord/hurt.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-shoot', 'assets/sprites/meme_lord/shoot.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-spellcast', 'assets/sprites/meme_lord/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-climb', 'assets/sprites/meme_lord/climb.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-sit', 'assets/sprites/meme_lord/sit.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('meme-lord-emote', 'assets/sprites/meme_lord/emote.png', { frameWidth: 64, frameHeight: 64 })
    
    // Set default meme-lord sprite (use first frame of combat_idle)
    this.load.image('meme-lord', 'assets/sprites/meme_lord/combat_idle.png')
    
    // Load Meme Lord portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('meme-lord-combat-idle-frames', 'assets/sprites/meme_lord/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // Load meme_lord as separate sprite for character selection
    this.load.image('meme_lord', 'assets/sprites/meme_lord/combat_idle.png')

    // Load Brian sprites
    this.load.spritesheet('brian-idle', 'assets/sprites/brian/idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-combat-idle', 'assets/sprites/brian/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-walk', 'assets/sprites/brian/walk.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-run', 'assets/sprites/brian/run.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-jump', 'assets/sprites/brian/jump.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-slash', 'assets/sprites/brian/slash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-halfslash', 'assets/sprites/brian/halfslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-backslash', 'assets/sprites/brian/backslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-thrust', 'assets/sprites/brian/thrust.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-hurt', 'assets/sprites/brian/hurt.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-shoot', 'assets/sprites/brian/shoot.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-spellcast', 'assets/sprites/brian/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-climb', 'assets/sprites/brian/climb.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-sit', 'assets/sprites/brian/sit.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('brian-emote', 'assets/sprites/brian/emote.png', { frameWidth: 64, frameHeight: 64 })

    // Load Brian portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('brian-combat-idle-frames', 'assets/sprites/brian/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // Load brian as separate sprite for character selection
    this.load.image('brian', 'assets/sprites/brian/combat_idle.png')

    // Load Jesse sprites
    this.load.spritesheet('jesse-idle', 'assets/sprites/jesse/idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-combat-idle', 'assets/sprites/jesse/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-walk', 'assets/sprites/jesse/walk.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-run', 'assets/sprites/jesse/run.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-jump', 'assets/sprites/jesse/jump.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-slash', 'assets/sprites/jesse/slash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-halfslash', 'assets/sprites/jesse/halfslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-backslash', 'assets/sprites/jesse/backslash.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-thrust', 'assets/sprites/jesse/thrust.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-hurt', 'assets/sprites/jesse/hurt.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-shoot', 'assets/sprites/jesse/shoot.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-spellcast', 'assets/sprites/jesse/spellcast.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-climb', 'assets/sprites/jesse/climb.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-sit', 'assets/sprites/jesse/sit.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('jesse-emote', 'assets/sprites/jesse/emote.png', { frameWidth: 64, frameHeight: 64 })

    // Load Jesse portrait for character selection (specific frame from combat_idle spritesheet)
    this.load.spritesheet('jesse-combat-idle-frames', 'assets/sprites/jesse/combat_idle.png', { frameWidth: 64, frameHeight: 64 })
    
    // Load jesse as separate sprite for character selection
    this.load.image('jesse', 'assets/sprites/jesse/combat_idle.png')

    // Load placeholder images for characters that don't have sprites yet
    this.load.image('trade_queen', 'assets/sprites/trade_queen/combat_idle.png')
    this.load.image('hodl_master', 'assets/sprites/hold_master/combat_idle.png')
  }

  create() {
    // Initialize game data system
    const dataStats = gameData.getDataStats()
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