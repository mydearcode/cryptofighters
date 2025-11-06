# Crypto Fighters - Project Roadmap

## About the Game

**Crypto Fighters** is a 2D pixel art fighting game infused with the jargon and culture of the crypto world. It blends classic Street Fighter-style mechanics with modern blockchain terminology and is developed as a Telegram Mini App.

Players fight with characters inspired by the crypto space using attacks like "HODL Smash", "Liquidation Hook", and "Airdrop Kick". Arenas are inspired by real blockchain events like Token2049 and Devcon, and fights can trigger "Pump & Dump" events. The goal is to deliver a nostalgic fighting game experience with a fun take on crypto culture.

The target platform is Telegram Mini App, optimized for 960x540 resolution, touch controls, fast loading, and high performance.

---

## 📊 Project Status Summary

### ✅ Completed Phases:
- **Phase 1.1**: Project setup and infrastructure
- **Phase 1.2**: Basic scene system
- **Phase 1.5**: Collision and damage system (advanced)
- **Phase 1.7**: Basic UI system

### 🔄 In Progress / Partially Complete:
- **Phase 1.3**: Character system (SVG sprites added, animation needed)
- **Phase 1.6**: Arena system (basic design)

### 🎯 Next Priorities:
1. **Phase 1.3**: Character animation system
2. **Phase 1.4**: JSON data system
3. **Phase 1.6**: Multiple arena support
4. **Phase 2.1**: Advanced character system

### 🎮 Current Playable Features:
- Full scene loop (Menu → Select → Fight → Results)
- Two-player combat (WASD vs Arrow keys)
- **NEW:** Multiple attack types (3 per player)
- **NEW:** Balanced damage system (15+ hits required)
- **NEW:** Character sprites (4 crypto characters)
- Health bars and timer
- Results screen and scoring

---

## Phase 1: MVP (Minimum Viable Product) - Core Game

### ✅ 1.1 Project Setup and Infrastructure **[COMPLETED]**
**Goal:** Working Phaser 3 project and development environment

- [x] Phaser 3 project setup (TypeScript + Vite)
- [x] Folder structure (`src/`, `assets/`, `public/`)
- [x] Basic configuration (960x540, 60 FPS)
- [x] Development server setup
- [x] Git repository and basic README

**Acceptance Criteria:** ✅ Empty Phaser scene runs and is visible in the browser.

### ✅ 1.2 Basic Scene System **[COMPLETED]**
**Goal:** Skeleton of the game flow

- [x] Boot scene (asset loading)
- [x] Menu scene (main menu)
- [x] Select scene (character selection)
- [x] Fight scene (combat)
- [x] Results scene (results)
- [x] Scene transitions

**Acceptance Criteria:** ✅ All scenes run in order starting from the Menu.

**Current Status:** Full game loop is working - Menu → Select → Fight → Results

### ✅ 1.3 Character System **[PARTIALLY COMPLETED]**
**Goal:** Playable character mechanics

- [x] Character sprite system (4 characters in SVG)
- [x] Basic state machine (idle, walk, jump, attack)
- [x] Input handling (keyboard)
- [x] Character physics and movement
- [x] Two-player control
- [x] Multiple attack types (3 types)
- [ ] Character animation system
- [ ] Touch control support

**Acceptance Criteria:** ✅ Two characters move on screen and perform different attacks.

**Current Status:** Character sprites and core mechanics are done; animation system needed.

### 1.4 Data Structures and JSON System
**Goal:** Centralized management of game data

- [ ] `characters.json` schema and sample data
- [ ] `moves.json` schema and sample data
- [ ] `arenas.json` schema and sample data
- [ ] JSON loading and access system
- [ ] Data validation mechanism

**Acceptance Criteria:** JSON files load and are accessible across the game.

### ✅ 1.5 Collision and Damage System **[COMPLETED]**
**Goal:** Foundation of the combat mechanics

- [x] Advanced damage calculation
- [x] Health system
- [x] Hitbox system (distance-based collisions)
- [x] Attack cooldown system
- [x] Multiple attack type support
- [x] Balanced damage values (15+ hits required)
- [x] One-hit protection
- [ ] Frame data implementation
- [ ] Basic defense mechanics

**Acceptance Criteria:** ✅ Attacks apply balanced damage, health decreases, the round ends.

**Current Status:** Advanced damage system completed. 3 attack types: Basic (100%), Strong (180%), Fast (70%).

### 1.6 Basic Arena System **[PARTIALLY COMPLETED]**
**Goal:** Combat environment

- [x] Arena background system (basic)
- [x] Ground and boundary definitions
- [ ] Random arena selection
- [ ] 2–3 basic arena designs

**Acceptance Criteria:** Fights can occur across different arenas.

**Current Status:** "TOKEN2049 DUBAI ARENA" basic design is available.

### ✅ 1.7 Basic UI System **[COMPLETED]**
**Goal:** Player feedback

- [x] Health bars
- [x] Round counter
- [x] Timer display
- [x] Basic control hints

**Acceptance Criteria:** ✅ UI works consistently across all scenes.

---

## Phase 2: Gameplay Enhancements

### 2.1 Advanced Character System
- [ ] Special move animations
- [ ] Combo system
- [ ] Energy/mana system
- [ ] Character-specific abilities

### 2.2 Crypto Theme Integration
- [ ] Crypto-jargon attack names
- [ ] Status notifications ("Rekt!", "Liquidated!")
- [ ] Themed sound effects
- [ ] Visual effects

### 2.3 CPU Opponent System
- [ ] AI behavior system
- [ ] Difficulty levels
- [ ] CPU character selection
- [ ] Matchmaking system

---

## Phase 3: Advanced Features

### 3.1 Event System
- [ ] Pump & Dump events
- [ ] Random event triggering
- [ ] Event animations and effects
- [ ] Event balancing

### 3.2 Sponsor System
- [ ] Sponsor heal objects
- [ ] Admin approval system
- [ ] Sponsor logo integration

### 3.3 Audio and Visual Effects
- [ ] Comprehensive audio library
- [ ] Particle effects
- [ ] Screen shakes
- [ ] Transition animations

---

## Phase 4: Platform Integration

### 4.1 Telegram Mini App
- [ ] Telegram WebApp API integration
- [ ] User authentication
- [ ] Theme compatibility
- [ ] Performance optimization

### 4.2 Leaderboard System
- [ ] Score calculation algorithm
- [ ] Local score storage
- [ ] Leaderboard screen
- [ ] Server integration (optional)

---

## Phase 5: Bonus Content (Optional)

### 5.1 Mini Games
- [ ] Break the Ice Save the Lambo
- [ ] Dump Rain Challenge
- [ ] Kill the Scammer
- [ ] Mini-game scores

### 5.2 Advanced Features
- [ ] Training mode
- [ ] Frame data viewer
- [ ] Replay system
- [ ] Tournament mode

---

## Technical Requirements

### Performance Targets
- Steady 60 FPS
- Initial load under 3 seconds
- Total size under 10MB
- Smooth operation on mobile devices

### Compatibility
- Modern web browsers
- iOS Safari and Android Chrome
- Telegram WebView
- Touch and keyboard controls

### Development Tools
- Phaser 3.70+
- TypeScript 5.0+
- Vite build system
- Aseprite (sprite editor)

---

## Getting Started

1. **Start from Phase 1.1** — Project setup is critical
2. **Test at the end of each phase** — Early feedback is important
3. **Complete the MVP first** — A working game is the main goal
4. **Monitor performance continuously** — Telegram Mini App has constraints
5. **Run user tests** — Touch controls are critical

This roadmap is flexible. Reassess at the end of each phase to decide next steps.