# SpellQuest: Cove — PRD

## North Star (from README)
SpellQuest: Cove is a fantasy spelling/literacy adventure where kids progress across themed worlds by completing short, high-feedback spelling quests, battling "Spelling Bosses," evolving a companion pet, and earning achievements—without requiring strong reading skills to navigate the UI. Must measurably improve encoding/decoding skills through systematic progression and repeated retrieval practice.

## Architecture
- **Stack:** Vanilla HTML5 + CSS3 + ES Module JavaScript. React dev server as static file host only.
- **Serving:** Static files in `/app/frontend/public/` on port 3000. Root `/` redirects instantly to `/map.html` via meta refresh + inline script.
- **Persistence:** localStorage (crystals, pet stage, level progression)
- **Audio:** Web Speech API (browser TTS, en-US preferred)
- **Data:** Static JSON stubs in `/data/` (enemies, worlds, avatars, pets)

## User Personas
1. **Early readers (ages 4-7):** Primary. Large touch targets, icon-first navigation, TTS support.
2. **Parents/teachers:** Secondary. "For Adults" section, 60-second explainable progression.

## Learning Design
- Systematic phonics progression (one skill focus per session)
- Retrieval practice (attempt → feedback → fix → succeed)
- Spacing/distributed practice (review scheduling planned)
- Multi-modal input (typed baseline, voice optional future)

## Implemented

### Phase 1 (Bootstrap MVP)
- [x] Hub page: avatar "Lyric", pet slot, crystal counter, navigation
- [x] Quest Battle: 20 CVC words, QWERTY keyboard, HP bar, streak counter, victory screen
- [x] Spell Helper: word input, letter chip breakdown, TTS
- [x] speechHelpers.js (speakWord, speakLettersSlow, speakPhrase)
- [x] localStorage crystal counter, data stubs (enemies, worlds, avatars, pets)
- [x] Project docs (PHASE_1_BOOTSTRAP_MVP.md, ECOSYSTEM_VISION.md, copilot-instructions.md)

### Phase 1.1 (2.5D Gamer Layer)
- [x] World Map (map.html): 21 nodes winding S-curve, level progression
- [x] Level-mode quest: 1 word/level, 5 words for boss, HP scaling
- [x] Deterministic enemy per level from enemies.json (4 levels per enemy)
- [x] Battle VFX: hit shake + particles (correct), red flash + slot shake (incorrect)
- [x] Pet evolution: locked → egg (25 crystals) → hatched "Pebble" (75 crystals)
- [x] Consistent hero/pet across hub, map, quest
- [x] Instant root redirect, README aligned with North Star

## Backlog (from README §10–11)

### P0 — Next Build
- [ ] Achievements v1 (streak, first-try correct, boss clear)
- [ ] Boss battle special treatment (Glitchling Prime, unique visuals)
- [ ] Real kid testing (ages 4-7)

### P1
- [ ] PWA manifest + service worker (offline)
- [ ] Avatar selection (Lyric/Chord/Melody)
- [ ] Wire pets.json unlock conditions
- [ ] Review scheduling ("echo quests" for previous words)

### P2 — Future Worlds
- [ ] World 2: Prism Peaks (Blends) — Boss: Snarejaw
- [ ] World 3: Byte Hollow (Digraphs) — Boss: Static Moth
- [ ] Helper NPCs (Captain Echo)
- [ ] Roblox adaptation

## Product Rules
1. If it doesn't reinforce a spelling pattern, it's decoration.
2. No long instructions. Game teaches by doing.
3. Rewards tied to mastery signals, not time spent.
4. Progression explainable to a parent in 60 seconds.
5. Every feature must answer: "What skill does this practice?"
