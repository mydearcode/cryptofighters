# Crypto Fighters

2D pixel art fighting game — Street Fighter-style combat infused with crypto culture and jargon.

## About the Project

**Crypto Fighters** is a nostalgic fighting game themed around blockchain terminology and crypto culture. It is developed as a Telegram Mini App and optimized to run at 960x540 using modern web technologies.

### Features

- 🥊 Street Fighter-style combat mechanics
- 🪙 Crypto-themed attacks ("HODL Smash", "Liquidation Hook", etc.)
- 🏟️ Arenas inspired by blockchain events
- 📱 Telegram Mini App compatibility
- 🎮 Touch and keyboard controls
- 🎨 Pixel art graphics

## Tech Stack

- **Game Engine:** Phaser 3.70+
- **Language:** TypeScript 5.0+
- **Build Tool:** Vite
- **Platform:** Web (Telegram Mini App)

## Development

### Requirements

- Node.js 18+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Production build
npm run build
```

### Project Structure

```
src/
├── config/          # Game configuration
├── scenes/          # Phaser scenes
├── characters/      # Character classes
├── ui/              # User interface components
├── net/             # Networking and API handling
└── main.ts          # Main entry point

assets/
├── sprites/         # Character and object sprites
├── audio/           # Audio files
└── data/            # JSON data files

public/              # Static assets
```

## Development Roadmap

See [project-roadmap.md](./project-roadmap.md) for the detailed development plan.

### Current Status: Phase 1.1 ✅

- [x] Phaser 3 project setup
- [x] Create folder structure
- [x] Basic configuration
- [x] Development server
- [x] Initialize Git repository

### Next Steps: Phase 1.2

- [ ] Boot scene (asset loading)
- [ ] Menu scene (main menu)
- [ ] Select scene (character selection)
- [ ] Fight scene (combat)
- [ ] Results scene (results)

## Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

**Note:** This project is under active development. We follow a phased approach aligned with an MVP (Minimum Viable Product) target.