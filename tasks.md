
# Crypto Fighters Task List

A two-dimensional pixel fighting game built with Phaser 3. Street Fighter-style gameplay. Target: Telegram Mini App-compatible web distribution.

## A. Project Skeleton and Core Scenes

1. Phaser 3 project setup
   Target JavaScript or TypeScript. Local dev server via Vite or Webpack.
   Resolution 960 x 540. Game loop at 60 FPS.

2. Folder structure
   src, assets, src/scenes, src/characters, src/ui, src/config, src/net.
   Static files go into `public`.

3. Core scenes
   Boot, Menu, Select, Fight, Results.
   Boot loads all assets and JSON configurations.
   Menu provides a Start Fight option.
   Select includes character selection and arena preview.
   Fight is the main scene where combat happens.
   Results displays match outcome and replay options.

4. Data-driven loading
   Use Phaser Loader for atlases and JSON files.
   Load the following JSONs and make them accessible across the game:
   characters.json
   moves.json
   arenas.json
   events.json
   sponsors.json

5. Acceptance criteria
   All scenes run sequentially. Flow is Menu → Select → Fight. Placeholder sprites and backgrounds verify the flow.

## B. Character and Move System

1. Character selection
   Separate selection flow for two players in Select scene. CPU option configurable from the menu.

2. Animation and state machine
   Idle, walk, jump, crouch, light punch, heavy punch, light kick, heavy kick, block, take hit, fall, rise, victory, defeat.
   Animations defined via Aseprite atlases and frame indices.

3. Hitbox and hurtbox
   Read frame-based hitbox and hurtbox from moves.json.
   Startup, active, recovery values work in frames.
   Single trigger on collision and apply recovery windows.

4. Energy and damage logic
   Each move has damage, stun, and energy cost values in moves.json.
   Incoming damage is reduced while blocking.

5. Acceptance criteria
   Two characters on the same device can perform basic movement and attacks. Collisions and damage behave correctly. Round end works.

## C. Arena and Scene Management

1. Random arena selection
   At fight start, select a random scene from arenas.json.

2. Example arena names and visuals
   Token2049 Dubai Arena
   Token2049 Singapore Arena
   Devcon Argentina
   Istanbul Blockchain Stage
   Additional event-themed arenas will be added later.

3. Layered backgrounds
   Far, mid, near layers. Simple parallax. Ground line and scene boundaries.

4. Acceptance criteria
   A different arena can appear at each match start. Ground and wall boundaries work correctly.

## D. Mid-fight Event System

1. Pump/Dump event
   During the fight, a commentator character may enter randomly and announce a Market Alert.
   Event activates in one of two modes.

2. Dump mode
   Red candles drop from the ceiling. Avoiding them prevents damage.
   Touching a candle deals standard enemy hit damage.
   Event duration and frequency are defined in events.json.

3. Pump mode
   Green candles rise from the ground. Touching a green candle grants energy.
   Healing amount is defined in events.json.

4. Combat continuity
   Regular attack and defense flow remains unchanged during events.

5. Acceptance criteria
   With warning, active, and cooldown states, the event is timed correctly. Collisions and effects behave as expected.

## E. Sponsor Heal Objects

1. Logic
   If admin-approved, a sponsor-branded heal object drops mid-match.
   The player who collects it fully restores energy.

2. Configuration
   sponsors.json contains sponsor name, logo, drop chance, and match range.
   The object does not drop until the admin approval field is true.

3. Acceptance criteria
   Approved sponsor heal object appears at the right time and fully restores energy when collected.

## F. Crypto Jargon and Status Messages

1. Attack names
   HODL Smash, Airdrop Kick, Rekt Uppercut, Liquidation Hook, Degen Dash and similar names are stored in moves.json under the name field.

2. Status texts
   Short status texts like Rekt, dumped, liquidated appear briefly at the top of the screen.
   The UI layer displays these texts for a few seconds.

3. Acceptance criteria
   Attack names and colored effects appear at the correct times. Status texts are readable.

## G. Game UI

1. Health and energy bars
   Two bars at the top for both players. Values update in real-time.

2. Round and time info
   Countdown timer in the middle. On timeout, transition to the results screen.

3. Input hints
   Movement hints at the bottom. Different indicators for touch and keyboard.

4. Acceptance criteria
   UI works consistently across all arenas and characters. Supports dark and light themes.

## H. Match Flow and CPU Mode

1. Quick match
   Player starts a match with one button. If no opponent is found, CPU takes over.

2. CPU selection
   CPU character selection is automatic. Three difficulty levels.

3. Acceptance criteria
   If no opponent is found, CPU match starts without delay.

## I. Global Leaderboard

1. Scoring
   Score is calculated from victory, time, hit accuracy, and bonus objectives.

2. Storage
   Local or mock service initially. Server persistence later.

3. Acceptance criteria
   At match end, results appear in the Results scene and are listed on the leaderboard screen.

## J. Bonus Mini Games

1. Break the Ice Save the Lambo
   Extra points if ice is broken within time. Points increase per hit.

2. Dump Rain Challenge
   Dodge-focused mini game. Score based on how many candles are avoided.

3. Kill the Scammer
   Messages flow on screen. Hit bad messages, avoid trustworthy ones. Mistakes reduce points.

4. Acceptance criteria
   Each mini game runs in its own scene independently. Scores feed into the Results scene.

## K. Telegram Mini App Compatibility

1. Initialization
   Telegram initData validation is performed server-side. Username and avatar reflect on in-game cards.

2. Theme
   Telegram Mini App theme variables are applied to UI components.

3. Acceptance criteria
   Performance and input flow are smooth within the WebView.

## L. Audio and Effects

1. Sound set
   Short sounds for hits, blocks, special moves, and event alerts. Dual-pack OGG and M4A.

2. VFX
   Hit flashes, dust, and candle effects via sprite atlases. Keep alpha cost low.

3. Acceptance criteria
   Audio triggers align with frame timing. Effects don’t degrade performance.

## M. Testing and Balancing

1. Training mode
   Input viewer and frame data overlay.
   Option to visualize hitboxes.

2. Balance
   Adjust values in moves.json for balancing. No code changes required.

3. Acceptance criteria
   Training scene quickly exposes frame and collision issues. Complete a basic balance pass.

## N. Release and Optimization

1. Package size
   Split atlases, compress images, remove unused assets.

2. Performance
   Profile for 60 FPS on mobile and micro-optimize.

3. Acceptance criteria
   The first MVP build runs stably within Telegram Mini App. Enter match from menu and exit to results smoothly.

---


