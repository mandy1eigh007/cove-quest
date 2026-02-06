# Phase 1 Bootstrap MVP — SpellQuest: Cove

> **This is the only active build plan.** Everything below is the current implementation scope.

---

## Overview

SpellQuest: Cove Phase 1 is a minimal, playable prototype of the CVC spelling quest loop.
It targets early readers (ages 4–7) practicing short-vowel CVC words through a simple
battle mechanic and a standalone Spell Helper tool.

**Stack:** Plain HTML + CSS + vanilla JavaScript. No bundler, no React, no build step.
Audio via the browser Web Speech API. Persistence via localStorage only.

---

## 8-Week Solo Scope

### Weeks 1–4: Core Loop Implementation

- [ ] Create project structure (HTML pages, CSS, JS modules)
- [ ] Implement `speechHelpers.js` — Web Speech API wrapper (`speakWord`, `speakLettersSlow`, `speakPhrase`)
- [ ] Implement `data_w1_words.js` — 20 CVC short-vowel words from the existing word bank
- [ ] Build Hub page (`hub.html`) with navigation to Quest and Spell Helper
- [ ] Build Quest Battle page (`quest.html` + `quest.js`):
  - Enemy with HP bar (20 units, one per word)
  - Letter-tile input for each word
  - Correct/incorrect feedback
  - Crystal reward system (+1 per word, +5 completion bonus)
  - Victory screen with replay option
- [ ] Build Spell Helper page (`spellhelper.html` + `spellhelper.js`):
  - Text input for any word
  - Letter chip breakdown display
  - "Say word" and "Say letters" audio buttons
- [ ] Implement localStorage-backed crystal counter (`hub.js`)
- [ ] Cross-page crystal display on all screens

### Weeks 5–8: Polish and Kid Testing

- [ ] Test with 3–5 real children (ages 4–7) and note usability issues
- [ ] Fix touch-target sizing and contrast issues found in testing
- [ ] Ensure graceful degradation when Web Speech API is unavailable
- [ ] Verify all 20 CVC words are correctly sourced from the word bank
- [ ] Final accessibility pass (large buttons, high contrast, no-reading-required navigation)
- [ ] Document any bugs or UX issues for Phase 2

---

## What Is IN Scope (Phase 1 MVP)

| Item | Location |
|------|----------|
| Hub page | `hub.html` |
| Quest Battle (World 1, 20 CVC words) | `quest.html` + `js/quest.js` |
| Spell Helper | `spellhelper.html` + `js/spellhelper.js` |
| Speech helpers (TTS) | `js/speechHelpers.js` |
| World 1 word data | `js/data_w1_words.js` |
| Crystal counter utilities | `js/hub.js` |
| Shared styles | `styles.css` |
| Project documentation | `/docs/` |

### Technical Details

- **1 world only:** World 1, short-vowel CVC words
- **20 CVC words** sourced from the existing word bank
- **One quest battle loop** per session (all 20 words)
- **One Spell Helper** for any word
- **localStorage** crystal counter (no server, no accounts)
- **Web Speech API** for text-to-speech (en-US preferred, graceful fallback)

---

## What Is NOT in Scope (Phase 1 MVP)

- Roblox front-end / experience
- Spellbound Stage RPG
- Pets and cosmetic systems
- Parent/teacher dashboards
- Multi-world progression (Worlds 2+)
- Full PWA install flow and offline caching (service worker)
- COPPA legal implementation
- Deep React integration
- Server-side persistence or accounts
- Multiplayer or social features
- Shop or cosmetic store
- Voice input (STT)
