# New Character Addition Guide

This guide covers all the steps required to add a new character to Crypto Fighters.

## Required Files and Folder Structure

### 1. Sprite Files
Place the new character’s sprite files in `/assets/sprites/[character_name]/`:

**Required sprite files:**
- `[character_name]-combat-idle-frames.png` — Idle animation
- `[character_name]-combat-walk-frames.png` — Walk animation  
- `[character_name]-combat-run-frames.png` — Run animation
- `[character_name]-combat-jump-frames.png` — Jump animation
- `[character_name]-combat-attack-frames.png` — Attack animation
- `[character_name]-combat-hurt-frames.png` — Hurt animation
- `[character_name]-combat-shoot-frames.png` — Shoot animation
- `[character_name]-combat-spellcast-frames.png` — Spellcast animation
- `[character_name].png` — Default image
- `[character_name]_portrait.png` — Portrait image

## Code Changes

### 1. Add to characters.json
Add the new character to `/src/data/characters.json`:

```json
{
  "id": "character_name",
  "name": "Character Name",
  "sprite": "character-name",
  "description": "Character description",
  "stats": {
    "health": 100,
    "attack": 30,
    "defense": 25,
    "speed": 150
  },
  "moves": [
    "move1",
    "move2", 
    "move3"
  ],
  "rarity": "legendary", // legendary, epic, rare, common
  "element": "element_name"
}
```

### 2. BootScene.ts — Load Sprites
Add sprite loading code to `/src/scenes/BootScene.ts`:

```typescript
// Character spritesheets
this.load.spritesheet('character-name-combat-idle-frames', 'assets/sprites/character_name/character-name-combat-idle-frames.png', { frameWidth: 64, frameHeight: 64 })
this.load.spritesheet('character-name-combat-walk-frames', 'assets/sprites/character_name/character-name-combat-walk-frames.png', { frameWidth: 64, frameHeight: 64 })
this.load.spritesheet('character-name-combat-run-frames', 'assets/sprites/character_name/character-name-combat-run-frames.png', { frameWidth: 64, frameHeight: 64 })
this.load.spritesheet('character-name-combat-jump-frames', 'assets/sprites/character_name/character-name-combat-jump-frames.png', { frameWidth: 64, frameHeight: 64 })
this.load.spritesheet('character-name-combat-attack-frames', 'assets/sprites/character_name/character-name-combat-attack-frames.png', { frameWidth: 64, frameHeight: 64 })
this.load.spritesheet('character-name-combat-hurt-frames', 'assets/sprites/character_name/character-name-combat-hurt-frames.png', { frameWidth: 64, frameHeight: 64 })
this.load.spritesheet('character-name-combat-shoot-frames', 'assets/sprites/character_name/character-name-combat-shoot-frames.png', { frameWidth: 64, frameHeight: 64 })
this.load.spritesheet('character-name-combat-spellcast-frames', 'assets/sprites/character_name/character-name-combat-spellcast-frames.png', { frameWidth: 64, frameHeight: 64 })

// Default images
this.load.image('character-name', 'assets/sprites/character_name/character-name.png')
this.load.image('character-name_portrait', 'assets/sprites/character_name/character-name_portrait.png')
```

### 3. Character.ts — Animation System
Two updates are needed in `/src/characters/Character.ts`:

#### A. Add character check in constructor:
```typescript
if (characterId === 'character_name') {
  this.createCharacterNameAnimations(scene)
} else if (characterId === 'vitalik') {
  // existing code...
}
```

#### B. Add the animation method:
```typescript
private createCharacterNameAnimations(scene: Phaser.Scene) {
  // Idle animation
  if (!scene.anims.exists('character_name-idle-anim')) {
    scene.anims.create({
      key: 'character_name-idle-anim',
      frames: scene.anims.generateFrameNumbers('character-name-combat-idle-frames', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1
    })
  }

  // Walk animation
  if (!scene.anims.exists('character_name-walk-anim')) {
    scene.anims.create({
      key: 'character_name-walk-anim',
      frames: scene.anims.generateFrameNumbers('character-name-combat-walk-frames', { start: 0, end: 7 }),
      frameRate: 12,
      repeat: -1
    })
  }

  // Attack animation
  if (!scene.anims.exists('character_name-attack-anim')) {
    scene.anims.create({
      key: 'character_name-attack-anim',
      frames: scene.anims.generateFrameNumbers('character-name-combat-attack-frames', { start: 0, end: 5 }),
      frameRate: 15,
      repeat: 0
    })
  }

  // Hurt animation
  if (!scene.anims.exists('character_name-hurt-anim')) {
    scene.anims.create({
      key: 'character_name-hurt-anim',
      frames: scene.anims.generateFrameNumbers('character-name-combat-hurt-frames', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: 0
    })
  }

  // Jump animation
  if (!scene.anims.exists('character_name-jump-anim')) {
    scene.anims.create({
      key: 'character_name-jump-anim',
      frames: scene.anims.generateFrameNumbers('character-name-combat-jump-frames', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 0
    })
  }

  // Shoot animation
  if (!scene.anims.exists('character_name-shoot-anim')) {
    scene.anims.create({
      key: 'character_name-shoot-anim',
      frames: scene.anims.generateFrameNumbers('character-name-combat-shoot-frames', { start: 0, end: 4 }),
      frameRate: 12,
      repeat: 0
    })
  }

  // Spellcast animation
  if (!scene.anims.exists('character_name-spellcast-anim')) {
    scene.anims.create({
      key: 'character_name-spellcast-anim',
      frames: scene.anims.generateFrameNumbers('character-name-combat-spellcast-frames', { start: 0, end: 6 }),
      frameRate: 10,
      repeat: 0
    })
  }
}
```

### 4. SelectScene.ts — Character Selection Screen
Make two updates in `/src/scenes/SelectScene.ts`:

#### A. Character cards section (in `createCharacterGrid`):
```typescript
} else if (character.id === 'character_name') {
  // Use a specific frame from the spritesheet for the character
  const sprite = this.add.sprite(x, y - 15, 'character-name-combat-idle-frames', 2)  // Use frame 2
    .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_CARD.height)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      this.selectCharacter(character.id)
    })
  
  this.characterSprites.push(sprite)
} else {
```

#### B. Selected character display section (in `updateSelectedDisplay`):
```typescript
} else if (character.id === 'character_name') {
  // Use a specific frame from the spritesheet for the character
  const selectedSprite = this.add.sprite(x, y - 30, 'character-name-combat-idle-frames', 2)  // Use frame 2
    .setDisplaySize(GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.width, GAME_CONSTANTS.CHARACTER_SIZES.SELECTION_DISPLAY.height)
  displayElements.push(selectedSprite)
  
  // Add other UI elements (name, player indicator, etc.)
  // ... (follow the existing code example)
  
  return  // Early return
} else {
```

## Checklist

- [ ] Sprite files placed in the correct folder
- [ ] Character added to characters.json
- [ ] Sprite loading code added to BootScene.ts
- [ ] Animation system added to Character.ts
- [ ] Character selection code added to SelectScene.ts
- [ ] Game tested and character is visible
- [ ] Character animations work
- [ ] Character works correctly in the combat scene

## Notes

- Frame sizes are typically 64x64, but adjust according to the sprite files
- Animation frame counts should match the actual frame counts in the sprite files
- Character ID should be consistent with file names
- Rarity and element values can affect game balance

## Troubleshooting

**Character not visible:** Check sprite loading code in BootScene.ts
**Animations not working:** Check animation definitions and frame counts in Character.ts
**Issue in selection screen:** Check sprite frame usage in SelectScene.ts
**Console errors:** Ensure file paths and sprite names are correct