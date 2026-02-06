# SpellQuest: Cove — North Star (Source of Truth)

This repo ships a kid-safe, research-aligned spelling game where early readers learn phonics patterns by "casting" words in short battles.

If anything conflicts: this document wins.

---

## 1) One-Sentence Pitch

A map-based spelling adventure where kids defeat Glitch Spirits by spelling words aligned to systematic phonics progression, with rewards (pets/achievements) that reinforce short, repeatable practice.

---

## 2) Non-Negotiables (Product Rules)

- No reading required to navigate core flow (audio cues + simple taps).
- No shame language. Mistakes are neutral and instructional.
- Sessions are short: 1 battle or a few helper words.
- Core learning loop must stay stable as UI gets more "game-like".
- Phase 1 web build should avoid collecting child personal data.

---

## 3) Learning Design (Evidence-Aligned)

We align gameplay to:
- Systematic phonics progression (pattern-based decoding/spelling).
- Lots of short practice with immediate feedback.
- Retrieval practice: the kid must produce the spelling, not just recognize it.

References (for team alignment):
- National Reading Panel — phonics report (systematic phonics effectiveness).
- IES/WWC Practice Guide — Foundational Skills K–3.
- Retrieval practice ("testing effect") literature (Roediger & Karpicke).

(Do not add claims beyond these without a citation.)

---

## 4) World Bible (5 Worlds)

Worlds are phonics tiers. Each world has 21 levels; Level 21 is a boss.

NOTE: World 1 naming mismatch exists in older docs:
- "Echo Harbor" (current UI label) and "City of Echoes" (older doc label).
We treat Echo Harbor as the playable district inside the City of Echoes until renamed.

World 1: Echo Harbor (City of Echoes)
- Skill: Short Vowel CVC
- Boss (Level 21): Syllabyte Prime (Glitchling Prime — Echo form)

World 2: Blend Bay
- Skill: Initial/Final Blends
- Boss: Blend Kraken

World 3: Digraph Dunes
- Skill: Digraphs (sh/ch/th/wh/ph)
- Boss: Chomp Wyrm

World 4: Lantern Isles
- Skill: Long vowels (VCe + vowel teams)
- Boss: Prism Wraith

World 5: Noise Core
- Skill: Multisyllable + morphology (prefix/suffix roots)
- Boss: Glitchling Prime (true)

---

## 5) Characters (Anchor Cast)

Hero
- Lyric (player hero / avatar)

Core cast (future-facing but canonical)
- Chord (sound blends mentor energy)
- Melody (vowel mentor energy)

Enemies
- Glitch Spirits (enemy type label used in battle UI)
- Enemy variants can be data-driven (enemies.json) to add variety without changing learning logic.

Pets / Sidekicks
- Phase 1.5+: pets exist visually and evolve using crystals.
- Phase 1 MVP: pet slot is "locked" but UI slot remains consistent across screens.

---

## 6) Core Game Loop (Phase 1 MVP)

Map/Hub
- Pick mode: Quest Mode or Spell Helper
- Show hero panel + crystals counter

Quest Mode (battle)
- Present word (audio)
- Kid spells (tap letters / type as supported)
- Correct: enemy HP decreases + streak increments
- Incorrect: streak resets, feedback plays, retry or next (depending on setting)
- Victory: show crystals earned + best streak

Spell Helper
- Adult types a word; app breaks into letter chips and speaks slowly.
- Kid taps chips to rehear.

---

## 7) "Evolve the Flat Game" (Presentation Roadmap)

We are upgrading the presentation without destabilizing the learning engine.

Phase 1 (done): Stable learning loop + clean HUD
- Hub -> Quest -> Victory
- Streak + best streak
- Hero panel + HP bar + enemy label

Phase 1.5 (next): Gamer wrapper (no new pedagogy)
- Map Quest screen (level path + boss node)
- Enemy variety wired from enemies.json (cosmetic variety, same difficulty rules)
- Pet Evolution screen (crystals -> pet stage)
- Achievements v1 (early frequent, later harder)

Phase 2: "2.5D diorama" battles
- Background parallax + character silhouettes + simple VFX set pieces
- Boss intro sting (2-3 seconds) at Level 21

Phase 3: Full 3D (only after kid testing validates usability)
- 3D map + 3D arena
- Characters + pets animated

---

## 8) Safety / Privacy (Hard Requirements)

Web MVP:
- Avoid collecting child personal info.
- No ads, no external links, no chat.
- If accounts ever exist: parent-gated and minimal data, with clear consent flows.

Roblox version:
- Assume under-13 safety defaults (restricted communication).
- No reliance on chat for gameplay.
- No off-platform links or data capture.

---

## 9) Tech Direction (Open-Source Friendly)

We prefer open-source engines/libraries for the presentation layer:
- 2D/2.5D: Phaser (MIT) or similar.
- 3D (later): Three.js/Babylon.js (license check before committing).

Learning engine should remain platform-agnostic:
- Word banks and enemy definitions in JSON.
- Deterministic difficulty rules in plain JS so they can be ported to Roblox Lua.

---

## 10) Current Status (Manual Smoke Checks)

- Hub loads with hero panel and pet slot
- Quest battle runs end-to-end without breaking loop
- Streak increments/resets correctly; best streak appears on victory
- Crystals display persists across key screens
- Spell Helper runs and speaks/breaks letters

---

## 11) Next Build Tasks (Highest ROI)

1) Achievements v1:
   - Streak badge
   - First-try-correct badge
   - Boss clear badge

2) Boss treatment:
   - Level 21 intro sting (screen darken + glitch VFX + name reveal)

3) Enemy variety:
   - Wire enemies.json so each battle picks a different Glitch Spirit variant

4) Kid usability testing (ages 4-7):
   - Observe: can they start a battle, understand "spell to hit", recover from mistakes

5) PWA:
   - Manifest + service worker for offline install (after testing)

---

## 12) "Do Not Delete" (Intentional Parking Lot)

Anything cut should be moved here with ~~strikethrough~~ and a short reason.
We do not erase history; we annotate it.
