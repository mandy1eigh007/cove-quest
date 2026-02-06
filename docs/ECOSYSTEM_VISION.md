# SpellQuest Ecosystem Vision

> **FUTURE VISION. DO NOT IMPLEMENT IN PHASE 1 MVP.**
>
> Everything in this document is concept and roadmap only. None of it is built yet.
> The only active build plan is in `PHASE_1_BOOTSTRAP_MVP.md`.

---

## Platform Overview

SpellQuest is a multi-platform phonics and spelling practice system for children ages 4–8.
It combines structured phonics progression with game mechanics across several surfaces.

---

## Platforms (Planned)

### 1. SpellQuest: Cove (PWA)

- Progressive Web App for mobile and desktop browsers
- Core spelling quest loop with world-based progression
- Offline-capable with service worker caching
- Primary surface for early development and testing

### 2. SpellQuest: Roblox Experience

- Roblox-native front-end for the spelling quest
- Shared word bank and progression data with the PWA
- Social/multiplayer spelling challenges
- Integration with Roblox avatar and economy systems

### 3. Spellbound Stage RPG

- Deeper RPG layer with narrative progression
- Turn-based spelling battles with more complex mechanics
- Character progression, equipment, and abilities
- Intended as the "endgame" experience for advanced players

---

## World Structure (Planned)

| World | Focus | Status |
|-------|-------|--------|
| World 1 | Short-vowel CVC (cat, sun, bed) | Phase 1 MVP |
| World 2 | Long-vowel CVCe (cake, bike, rope) | Future |
| World 3 | Consonant blends (frog, stop, clam) | Future |
| World 4 | Digraphs (ship, chat, thin) | Future |
| World 5+ | R-controlled, diphthongs, multisyllabic | Future |

---

## Characters and Mentors (Concept)

- **Player character** customizable avatar with unlockable cosmetics
- **Mentors** guide players through each world (one mentor per world)
- **Enemies** themed "glitch" creatures that represent spelling challenges
- Design language: friendly, non-threatening, encouraging

---

## Pets System (Concept)

- Collectible companion creatures earned through quest completion
- Pets provide passive bonuses (e.g., hint frequency, crystal multipliers)
- Cosmetic pet customization
- No loot boxes or randomized purchases

---

## Parent/Teacher Dashboard (Concept)

- Progress tracking per child (words mastered, time spent, accuracy)
- Class/group management for teachers
- Word list customization
- Session time limits and parental controls
- COPPA-compliant data handling

---

## Economy (Concept)

- **Crystals** earned through gameplay (no real-money purchase in MVP)
- Crystals unlock cosmetics, pets, and world access
- No pay-to-win mechanics
- Future: optional parent-approved purchases for cosmetic bundles

---

## Technical Architecture (Planned)

- **Shared word bank** across all platforms (JSON/JS modules)
- **Server component** for persistence, auth, and sync (Express or similar)
- **Client apps** consume shared data and implement platform-specific UI
- **Scripts** for word bank generation and validation
