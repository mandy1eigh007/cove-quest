# SpellQuest: Cove
Research-based spelling adventure game built as a web MVP first, then expanded to Roblox.

This README is the project "North Star." If a feature does not strengthen literacy outcomes *and* the game loop, it does not ship.

---

## 1. North Star
SpellQuest: Cove is a fantasy spelling/literacy adventure where kids progress across themed worlds by completing short, high-feedback spelling quests, battling "Spelling Bosses," evolving a companion pet, and earning achievements—without requiring strong reading skills to navigate the UI.

Non-negotiable outcome:
- This must measurably improve encoding/decoding skills through systematic progression and repeated retrieval practice, not "edutainment wallpaper."

---

## 2. Vision (what the game should feel like)
- Bright, magical world map with an obvious path, big "quest" nodes, and a looming boss landmark.
- Boss battles as short, dramatic set-pieces.
- Pet evolution as the emotional hook.
- Achievements as constant reinforcement.

Design translation:
- Macro loop: Map -> Quest chain -> Boss -> Reward -> Pet evolution/achievements -> Unlock next world.
- Micro loop: Hear -> Attempt -> Instant feedback -> Fix -> Succeed -> Reward.

---

## 3. Learning design (research-based, not vibes)
The learning model is "systematic progression + retrieval + spacing":
- Systematic phonics progression (teach patterns explicitly and build complexity).
- Retrieval practice (being tested by trying to produce the spelling) strengthens long-term retention.
- Spacing/distributed practice improves durable learning versus massed practice.

What that means in gameplay:
- One skill focus per session (no mixed chaos until mastery is demonstrated).
- Immediate corrective feedback, then a second chance quickly.
- Built-in review scheduling (previous worlds as "echo quests").

Input modes (multi-modal by design):
- Typed spelling is the baseline (voice may be optional/assistive, but never the only path).

---

## 4. Story and world bible
Core premise:
Words are magic in Cove. A "glitch" corrupts spelling patterns across the realm. Kids restore order by clearing quests, defeating glitch bosses, and evolving their companion.

World map and progression (locked):
1. **Echo Harbor** (CVC / short vowels) — Boss: Glitchling Prime
2. **Prism Peaks** (Blends) — Boss: Snarejaw
3. **Byte Hollow** (Digraphs) — Boss: Static Moth
4. **Luma Citadel** (Long vowels / CVCe) — Boss: Mirage Lord
5. **The Great Unravel** (Prefix/suffix) — Boss: The Unraveler

Helper NPCs (world guides):
- Captain Echo, Prism, Archivist

Narrative arc:
- Act 1: The glitches slip in, small corruptions appear (Echo Harbor).
- Act 2: The corruption spreads and mutates; rules get tricky.
- Act 3: The source is revealed: the Unraveler is scrambling word structure itself.
- Finale: The pet's final evolution is tied to mastery, not grinding.

---

## 5. Game modes
- Hub (map, profile, progress, pet, achievements)
- Quest Mode (main spelling loop + battles)
- Spell Helper (controlled scope, assistive)

MVP = Hub + Quest Mode + Pet Evolution + Achievements fully integrated.

---

## 6. Safety, privacy, and compliance (non-negotiable)
- Minimize data collection; avoid collecting unnecessary personal info.
- Default to parent/guardian gate for account actions that touch identity, sharing, or payments.
- The child experience must work without exposing chat, open messaging, or public posting.

---

## 7. Platforms and build strategy
- Web MVP proves the learning loop, pacing, and progression.
- Roblox version adapts the same loop into a 3D social platform without compromising outcomes.

---

## 8. Product rules (to prevent scope drift)
1. If it does not reinforce a specific spelling pattern, it is decoration.
2. No long instructions. The game teaches by doing.
3. Rewards are tied to mastery signals, not time spent.
4. Progression must be explainable to a parent/teacher in 60 seconds.
5. Every new feature must answer: "What skill does this practice, and how do we measure it?"

---

## 9. Definition of "not flat anymore"
When these are true, the game has evolved:
- Hub looks like a real map quest experience (path, nodes, boss silhouette, clear next action).
- Quest Mode is punchy: attempt -> feedback -> success -> spell cast -> reward.
- Pet evolution is visible and meaningfully tied to progression.
- Achievements fire frequently early (reinforcement), then become harder (mastery).
- A kid can navigate without reading-heavy menus.

---

## 10. What to build next (order matters)
1. World Map Hub (Echo Harbor only) with quest nodes + boss gate.
2. One complete Quest loop (10–15 words) with instant feedback and a "boss" at the end.
3. Pet evolution v1 (one evolution step) triggered by boss completion.
4. Achievements v1 (streak, first-try correct, boss clear).
5. Test with real kids before adding new systems.

---

## Current Implementation Status

### Phase 1 (Bootstrap MVP) — Complete
- Hub page with avatar, pet slot, crystal counter, navigation
- Quest Battle with 20 CVC words, QWERTY keyboard, HP bar, streak counter
- Spell Helper with word input, letter chip breakdown, TTS
- Web Speech API helpers, localStorage crystal counter

### Phase 1.1 (2.5D Gamer Layer) — Complete
- World Map (map.html) with 21 nodes in winding S-curve path
- Level progression: locked/available/completed states
- Level-mode quest: 1 word per normal level, 5 words for boss
- Deterministic enemy per level from enemies.json with HP scaling
- Battle VFX: hit shake + particle burst, red flash + slot shake
- Pet evolution: locked -> egg (25 crystals) -> hatched "Pebble" (75 crystals)
- Map as main entry point

### File Structure
```
/app/frontend/public/
  hub.html              Hub / menu
  map.html              World Map (main entry)
  quest.html            Quest battle screen
  spellhelper.html      Spell Helper
  styles.css            Shared styles
  js/
    speechHelpers.js    Web Speech API wrapper
    data_w1_words.js    20 CVC words
    hub.js              Crystal counter + pet evolution
    quest.js            Quest battle logic
    spellhelper.js      Spell Helper logic
    map.js              World Map logic
  data/
    enemies.json        5 World 1 enemies
    worlds.json         World 1 definition
    avatars.json        3 avatar options
    pets.json           5 pet definitions
/docs/
  PHASE_1_BOOTSTRAP_MVP.md
  ECOSYSTEM_VISION.md
```
