# SpellQuest: Cove — PRD

## Original Problem Statement
Build Phase 1 Bootstrap MVP for SpellQuest: Cove, then evolve to Phase 1.1 "2.5D Gamer Layer" with world map, level-based progression, enemy variety, battle VFX, and pet evolution. Game pages are vanilla HTML/CSS/JS static files served from the React dev server's `public/` directory. React `App.js` redirects `/` to `/map.html`.

## Architecture
- **Stack:** Vanilla HTML5 + CSS3 + ES Module JavaScript. React dev server as static file host only.
- **Serving:** Static files in `/app/frontend/public/` on port 3000. `App.js` redirects root `/` to `/map.html`.
- **Persistence:** localStorage only (keys: `spellquest_cove_crystals`, `spellquest_pet_stage`, `w1_unlocked_level`, `w1_completed_levels`, `w1_selected_level`)
- **Audio:** Web Speech API (browser TTS, en-US preferred, graceful fallback)
- **Data:** Static JSON stubs in `/data/` (enemies, worlds, avatars, pets)
- **No backend dependencies** for game logic

## User Personas
1. **Early readers (ages 4-7):** Primary users. Large touch targets, no reading required for navigation, audio support.
2. **Parents/teachers:** Secondary users. "For Adults" section explains what the MVP trains.

## Core Requirements (Static)
- 1 world: short-vowel CVC words only (Echo Harbor)
- 20 CVC words from existing word bank
- Map-based level progression (20 levels + 1 boss)
- Quest battle loop: spell word to defeat enemy, earn crystals
- Spell Helper: type a word, see letter breakdown, hear it spoken
- Crystal counter persists via localStorage
- Pet evolution: locked -> egg (25 crystals) -> hatched "Pebble" (75 crystals)
- No ads, no accounts, no loot boxes

## What's Been Implemented (Jan 2026)

### Phase 1 (Bootstrap MVP)
- [x] Hub page with avatar, pet slot, crystal counter, navigation
- [x] Quest Battle with 20 shuffled CVC words, QWERTY keyboard, HP bar, streak counter
- [x] Spell Helper with word input, letter chip breakdown, TTS
- [x] Web Speech API helpers (speakWord, speakLettersSlow, speakPhrase)
- [x] localStorage crystal counter shared across pages
- [x] Data stubs: worlds.json, enemies.json (5 enemies), avatars.json (3), pets.json (5)
- [x] Project docs: PHASE_1_BOOTSTRAP_MVP.md, ECOSYSTEM_VISION.md, copilot-instructions.md

### Phase 1.1 (2.5D Gamer Layer)
- [x] World Map screen (map.html) with 21 nodes in winding S-curve path
- [x] Level progression: locked/available/completed states, localStorage persistence
- [x] Level-mode quest: 1 word per normal level, 5 words for boss level
- [x] Deterministic enemy per level from enemies.json (4 levels per enemy)
- [x] HP scaling: hp = baseHP + (level-1) * 2
- [x] Battle VFX: enemy hit shake + particle burst (correct), red flash + slot shake (incorrect)
- [x] Pet evolution system: locked (0), egg (25+ crystals), hatched Pebble (75+)
- [x] Consistent hero/pet display across hub, map, and quest pages
- [x] Map as main entry point (/ redirects to /map.html)
- [x] Level completion flow: victory → localStorage update → map progression

### Manual Smoke-Check
- Map loads with 21 nodes, correct progression states
- Level 1 quest: "Static Wisp", HP 20/20, word "cat", 1 word
- Level 5 quest: "Echo Glitch", HP 28/28 (scaled), different word
- Level completion updates map: checkmark on completed, next level available
- Boss node (21) unlocks after level 20
- VFX trigger correctly on correct/incorrect
- Pet slot renders correctly per crystal threshold
- Crystal persistence across hub/map/quest/spellhelper
- Hub Quest Mode routes to map
- Spell helper fully functional
- No JavaScript console errors on any page

## Prioritized Backlog

### P0
- Kid usability testing with real children (ages 4-7)
- Touch target sizing validation on real mobile devices

### P1
- PWA manifest + service worker for offline play
- Sound effects (beyond TTS) for correct/incorrect
- Boss battle with unique visual treatment
- Avatar selection (Lyric/Chord/Melody from avatars.json)

### P2
- Wire pets.json unlock conditions into real gameplay
- Word difficulty tracking
- Session stats display
- Simplified keyboard layout option

## Next Tasks
1. Test with real kids for usability feedback
2. Add PWA install flow
3. Build avatar selection screen
4. Add boss battle unique visuals/dialogue
5. Plan World 2 (long-vowel CVCe)
