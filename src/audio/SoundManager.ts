import Phaser from 'phaser'

type BgmOptions = { loop?: boolean; volume?: number }
type SfxOptions = { volume?: number }

/**
 * Centralized sound utilities with safe guards when assets are missing.
 * Keys expected (placeholders; add files under `assets/audio/` to enable):
 * - BGM: 'bg_menu', 'bg_fight1', 'bg_fight2'
 * - SFX: 'sfx_attack_basic', 'sfx_attack_special', 'sfx_projectile', 'sfx_hit', 'sfx_jump'
 */
export class SoundManager {
  /** Play looping background music. Skips silently if audio not loaded. */
  static playBgm(scene: Phaser.Scene, key: string, opts: BgmOptions = {}) {
    const volume = opts.volume ?? 0.25
    const loop = opts.loop ?? true

    // Stop any previous BGM tracked for this scene
    this.stopBgm(scene)

    // Only play if the audio key is loaded
    const existing = scene.sound.get(key)
    if (!existing) {
      // Attempt to add only if cached; if not cached, skip safely
      try {
        const snd = scene.sound.add(key, { loop, volume })
        snd.play()
        // Track current bgm sound instance by key on the registry
        scene.registry.set('currentBgmKey', key)
        scene.registry.set('currentBgmInstance', snd)
      } catch {
        // Asset not present; ignore
      }
      return
    }

    // Restart with desired config to ensure loop/volume without using setters
    try {
      if (existing.isPlaying) {
        existing.stop()
      }
      existing.play({ loop, volume })
    } catch {}
    scene.registry.set('currentBgmKey', key)
    scene.registry.set('currentBgmInstance', existing)
  }

  /** Stop current background music if playing. */
  static stopBgm(scene: Phaser.Scene) {
    const current = scene.registry.get('currentBgmInstance') as Phaser.Sound.BaseSound | undefined
    if (current && current.isPlaying) {
      try { current.stop() } catch {}
    }
    scene.registry.set('currentBgmKey', undefined)
    scene.registry.set('currentBgmInstance', undefined)
  }

  /** Play a one-shot SFX; skips silently if audio not loaded. */
  static playSfx(scene: Phaser.Scene, key: string, opts: SfxOptions = {}) {
    const volume = opts.volume ?? 0.5
    // Try using existing sound if available; otherwise try add; else skip
    const existing = scene.sound.get(key)
    if (existing) {
      try {
        existing.play({ volume })
      } catch {}
      return
    }
    try {
      const snd = scene.sound.add(key, { volume })
      snd.play()
    } catch {
      // Asset not present; ignore
    }
  }
}