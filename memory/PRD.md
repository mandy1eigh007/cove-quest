# SpellQuest: Cove — PRD

## Original Problem Statement
Build Phase 1 Bootstrap MVP for SpellQuest: Cove. Game pages are vanilla HTML/CSS/JS static files served from the React dev server's `public/` directory. The React app (`/app/frontend/src/App.js`) was modified to redirect `/` to `/hub.html`. No bundler or build step is used for the game files themselves.

## Architecture
- **Stack:** Vanilla HTML5 + CSS3 + ES Module JavaScript (game pages). React dev server used only as static file host + redirect.
- **Serving:** Static files in `/app/frontend/public/` served via React dev server (port 3000). `/app/frontend/src/App.js` redirects root `/` to `/hub.html`.
- **Persistence:** localStorage only (key: `spellquest_cove_crystals`)
- **Audio:** Web Speech API (browser TTS, en-US preferred)
- **No backend dependencies** for game logic

## User Personas
1. **Early readers (ages 4–7):** Primary users. Large touch targets, no reading required for navigation, audio support.
2. **Parents/teachers:** Secondary users. "For Adults" section explains what the MVP trains. They may type words in Spell Helper.

## Core Requirements (Static)
- 1 world: short-vowel CVC words only
- 20 CVC words from existing word bank
- Quest battle loop: spell words to damage enemy, earn crystals
- Spell Helper: type a word, see letter breakdown, hear it spoken
- Crystal counter persists via localStorage
- Graceful TTS fallback if Web Speech API unavailable
- No ads, no accounts, no loot boxes

## What's Been Implemented (Jan 2026)
- [x] Project docs: `/docs/PHASE_1_BOOTSTRAP_MVP.md`, `/docs/ECOSYSTEM_VISION.md`, `/.github/copilot-instructions.md`
- [x] Hub page (`/hub.html`) — title, crystal counter, avatar silhouette + pet slot, Quest + Spell Helper navigation
- [x] Quest Battle (`/quest.html`) — 20 shuffled CVC words, QWERTY keyboard, neon HP bar, hero panel (avatar "Lyric", pet slot placeholder), streak counter, slots, feedback, victory screen with best streak
- [x] Spell Helper (`/spellhelper.html`) — word input, letter chip breakdown, TTS integration
- [x] `js/speechHelpers.js` — speakWord, speakLettersSlow, speakPhrase (Web Speech API)
- [x] `js/data_w1_words.js` — 20 CVC words across all 5 short vowels
- [x] `js/hub.js` — localStorage crystal counter shared across pages
- [x] `styles.css` — dark theme, neon HUD, hero panel, kid-friendly large targets, responsive
- [x] Data stubs: `/data/worlds.json`, `/data/enemies.json`, `/data/avatars.json`, `/data/pets.json`
- [x] React `App.js` redirects `/` to `/hub.html` (only React file modified)
- Manual smoke-check completed:
  - Hub loads with crystal counter, avatar, pet slot, and both navigation buttons
  - Quest page renders enemy HP bar, letter slots, QWERTY keyboard, hero panel with streak
  - Spell Helper shows input, breakdown area, letter chips
  - Navigation between all three pages works
  - Crystal counter persists across pages via localStorage
  - Correct/incorrect spelling feedback triggers properly
  - No JavaScript console errors on any page

## Prioritized Backlog

### P0 (Critical for Phase 1 completion)
- Kid usability testing (weeks 5–8)
- Touch target sizing validation on real mobile devices

### P1 (Important)
- PWA manifest + service worker for offline play
- Sound effects for correct/incorrect answers (beyond TTS)
- Visual animations for HP damage and crystal rewards

### P2 (Nice to have)
- Simplified keyboard layout option for younger kids
- Word difficulty tracking (which words are most often misspelled)
- Session stats (words correct, time taken)

## Next Tasks
1. Test with real children (ages 4–7) for usability feedback
2. Add PWA install flow when ready
3. Consider adding visual reward animations for correct spellings
4. Plan World 2 (long-vowel CVCe words) based on Phase 1 learnings
