import Phaser from 'phaser'
import { SoundManager } from '../audio/SoundManager'
import creditsRaw from '../../credits.md?raw'

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' })
  }

  create() {
    const { width, height } = this.cameras.main
    
    // Full screen background to eliminate any blue remnants
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a0a0a)
    
    // Add decorative elements - fiery border
    this.add.rectangle(width / 2, height / 2, width - 20, height - 20, 0x2a1a1a).setStrokeStyle(3, 0xff4444, 0.6)
    
    // Add title with enhanced glow effect - more dynamic font
    const title = this.add.text(width / 2, 120, 'CRYPTO FIGHTERS', {
      fontSize: '72px',
      color: '#ff6600',
      fontFamily: '"Bangers", Impact, "Arial Black", "Helvetica Neue", Arial, sans-serif',
      stroke: '#660000',
      strokeThickness: 8,
      shadow: {
        offsetX: 4,
        offsetY: 4,
        color: '#330000',
        blur: 6,
        fill: true
      }
    }).setOrigin(0.5)

    // Subtle beta badge next to the title
    const titleBounds = title.getBounds()
    this.add.text(titleBounds.right + 10, titleBounds.top + 8, '(beta)', {
      fontSize: '20px',
      color: '#ffddcc',
      fontFamily: '"Geo", "Courier New", monospace, sans-serif',
      fontStyle: 'italic',
      stroke: '#5a1a1a',
      strokeThickness: 2,
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#330000',
        blur: 2,
        fill: true
      }
    }).setOrigin(0, 0).setAlpha(0.9)
    
    // Add subtitle with better styling
    const subtitle = this.add.text(width / 2, 170, 'The Most Powerful Warriors of Crypto World', {
      fontSize: '20px',
      color: '#ffccaa',
      fontFamily: '"Geo", "Courier New", monospace, sans-serif',
      fontStyle: 'normal',
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#660000',
        blur: 2,
        fill: true
      }
    }).setOrigin(0.5)
    subtitle.setAlpha(0.9)
    
    // Game mode selection title with better font
    this.add.text(width / 2, 230, 'SELECT GAME MODE', {
      fontSize: '32px',
      color: '#ffddcc',
      fontFamily: '"Bangers", Impact, "Arial Black", "Helvetica Neue", Arial, sans-serif',
      letterSpacing: 2,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#330000',
        blur: 3,
        fill: true
      }
    }).setOrigin(0.5)
    
    // Single Player Button - dark red theme with better styling
    const singlePlayerButton = this.add.rectangle(width / 2, 300, 280, 70, 0x3d1a1a)
      .setStrokeStyle(3, 0xff4444)
      .setInteractive()
      .on('pointerdown', () => {
        // Set game mode to single player and go to character selection
        this.registry.set('gameMode', 'singlePlayer')
        this.scene.start('SelectScene')
      })
      .on('pointerover', () => {
        singlePlayerButton.setFillStyle(0x5d2a2a)
        singlePlayerButton.setStrokeStyle(3, 0xff6666)
      })
      .on('pointerout', () => {
        singlePlayerButton.setFillStyle(0x3d1a1a)
        singlePlayerButton.setStrokeStyle(3, 0xff4444)
      })
    
    this.add.text(width / 2, 285, 'SINGLE PLAYER', {
      fontSize: '24px',
      color: '#ff6600',
      fontFamily: '"Bangers", Impact, "Arial Black", "Helvetica Neue", Arial, sans-serif',
      letterSpacing: 1,
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#330000',
        blur: 2,
        fill: true
      }
    }).setOrigin(0.5)

    this.add.text(width / 2, 310, 'Play vs CPU', {
      fontSize: '14px',
      color: '#ddaa88',
      fontFamily: '"Geo", "Courier New", monospace, sans-serif',
      fontStyle: 'normal'
    }).setOrigin(0.5)
    
    // Two Player Button - matching theme with better styling
    const twoPlayerButton = this.add.rectangle(width / 2, 400, 280, 70, 0x3d1a1a)
      .setStrokeStyle(3, 0xff4444)
      .setInteractive()
      .on('pointerdown', () => {
        // Set game mode to two player and go to character selection
        this.registry.set('gameMode', 'twoPlayer')
        this.scene.start('SelectScene')
      })
      .on('pointerover', () => {
        twoPlayerButton.setFillStyle(0x5d2a2a)
        twoPlayerButton.setStrokeStyle(3, 0xff6666)
      })
      .on('pointerout', () => {
        twoPlayerButton.setFillStyle(0x3d1a1a)
        twoPlayerButton.setStrokeStyle(3, 0xff4444)
      })
    
    this.add.text(width / 2, 385, 'TWO PLAYER', {
      fontSize: '24px',
      color: '#ff6600',
      fontFamily: '"Bangers", Impact, "Arial Black", "Helvetica Neue", Arial, sans-serif',
      letterSpacing: 1,
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#330000',
        blur: 2,
        fill: true
      }
    }).setOrigin(0.5)

    this.add.text(width / 2, 410, 'Play with Friend', {
      fontSize: '14px',
      color: '#ddaa88',
      fontFamily: '"Geo", "Courier New", monospace, sans-serif',
      fontStyle: 'normal'
    }).setOrigin(0.5)
    
    // Add instructions - better styled and more readable
    const instructions = this.add.text(width / 2, 500, 
      'Movement: WASD (Player 1) / Arrow Keys (Player 2)\n' +
      'Attack: SPACE/Q/E (Player 1) / P (Punch), Shift/Enter (Shots) (Player 2)', {
      fontSize: '13px',
      color: '#aa7766',
      fontFamily: '"Geo", "Courier New", monospace, sans-serif',
      align: 'center',
      lineSpacing: 4
    }).setOrigin(0.5)
    instructions.setAlpha(0.8)

    // Play menu background music (if available)
    SoundManager.playBgm(this, 'bg_menu', { loop: true, volume: 0.3 })

    // Fallbacks for autoplay policies: resume on unlock or first interaction
    this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
      SoundManager.playBgm(this, 'bg_menu', { loop: true, volume: 0.3 })
    })
    this.input.once('pointerdown', () => {
      SoundManager.playBgm(this, 'bg_menu', { loop: true, volume: 0.3 })
    })

    // Menü müziği FightScene başlayana kadar devam etsin, burada durdurmuyoruz.

    // Credits button (top-left)
    const creditsButtonBg = this.add.rectangle(80, 30, 120, 36, 0x3d1a1a)
      .setStrokeStyle(2, 0xff4444)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.showCreditsPanel())
      .on('pointerover', () => {
        creditsButtonBg.setFillStyle(0x5d2a2a)
        creditsButtonText.setColor('#ff8800')
      })
      .on('pointerout', () => {
        creditsButtonBg.setFillStyle(0x3d1a1a)
        creditsButtonText.setColor('#ff6600')
      })
    creditsButtonBg.setOrigin(0.5)
    const creditsButtonText = this.add.text(80, 30, 'CREDITS', {
      fontSize: '18px',
      color: '#ff6600',
      fontFamily: 'Bangers, Impact, Arial Black, sans-serif',
      stroke: '#660000',
      strokeThickness: 2
    }).setOrigin(0.5)
  }

  private showCreditsPanel() {
    const { width, height } = this.cameras.main
    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.55)
      .setInteractive()
      .setDepth(1000)

    const panelWidth = Math.min(820, Math.floor(width * 0.9))
    const panelHeight = Math.min(440, Math.floor(height * 0.85))

    // credits.md içeriğini işle: ilk paragrafta Tipbox.co'yu linkle ve daha büyük göster
    const creditsText = (creditsRaw || '').trim()
    const parts = creditsText.split(/\n\s*\n/)
    const intro = parts.shift() || ''
    const introLinked = intro.replace(/Tipbox\.co/g, '<a href="https://tipbox.co" target="_blank" rel="noopener noreferrer" style="color:#ffccaa; text-decoration: underline;">Tipbox.co</a>')
    const rest = parts.join('\n\n')

    const html = `
      <div id="credits-panel" style="
        width: ${panelWidth}px;
        height: ${panelHeight}px;
        background: #1f1f29;
        color: #ffd8b0;
        border: 2px solid #ff4444;
        box-shadow: 0 8px 24px rgba(0,0,0,0.6);
        border-radius: 8px;
        font-family: 'Geo', 'Courier New', monospace, sans-serif;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      ">
        <div style="
          display:flex;
          align-items:center;
          justify-content: space-between;
          padding: 10px 14px;
          background: #2a1a1a;
          border-bottom: 1px solid #ff4444;
        ">
          <div style="
            font-family: 'Bangers', Impact, 'Arial Black', sans-serif;
            font-size: 20px; color:#ff8800; letter-spacing:1px;
            text-shadow: 1px 1px #330000;
          ">CREDITS</div>
          <button id="closeCredits" style="
            background:#3d1a1a; color:#ffddcc; border:1px solid #ff6666; border-radius:4px;
            font-weight:bold; cursor:pointer; padding:6px 10px;
          ">X</button>
        </div>
        <div style="padding:14px; overflow:auto; flex:1;">
          <div style="white-space: pre-wrap; line-height:1.4;">
            <div style="font-size: 18px; margin-bottom: 12px;">${introLinked}</div>
            <div style="font-size: 14px;">${rest}</div>
          </div>
        </div>
      </div>
    `

    const dom = this.add.dom(width / 2, height / 2).createFromHTML(html)
    dom.setDepth(1001)

    const close = () => {
      dom.destroy()
      overlay.destroy()
    }

    // Close button wiring
    const node = dom.node as HTMLElement
    const btn = node.querySelector('#closeCredits') as HTMLButtonElement | null
    if (btn) {
      btn.addEventListener('click', (e) => { e.preventDefault(); close() })
    }

    // Click outside the panel to close; clicks inside panel do NOT close
    overlay.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const cx = width / 2
      const cy = height / 2
      const insidePanel = Math.abs(pointer.x - cx) <= panelWidth / 2 && Math.abs(pointer.y - cy) <= panelHeight / 2
      if (!insidePanel) close()
    })
  }
}