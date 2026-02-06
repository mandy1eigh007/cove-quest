# SPELLQUEST: COVE
Interactive spelling + phonics quest game (Web/PWA now, Roblox later)

Last updated: 2026-02-06

## 1) North Star (one sentence)
A kid-first spelling quest that feels like a real fantasy game (map, bosses, pets, achievements), while quietly delivering research-aligned phonics practice and measurable learning progress.

## 2) The "feel" (what we are building toward)
Visual target (style): high-saturation fantasy world, glossy "AAA mobile" UI, strong depth cues, map progression, boss set-pieces, collectible pets, badge wall.
- Map screen: winding path, node-to-node progression, big "Start Quest" call-to-action.
- Battle screen: 1 enemy + party of heroes, big feedback moment on correct answer, dramatic boss intros.
- Meta: pet evolution, achievements, streaks, gentle XP/leveling.

Important: We do NOT need real 3D today to hit this feel. We can achieve 80% of it with:
- Better art direction (lighting, gradients, depth, VFX)
- Stronger UI hierarchy (HUD, motion, reveal moments)
- Micro-animations (node pulsing, reward pop, boss intro)

Roblox will be the true 3D version.

## 3) Non-negotiables (product rules)
- No reading required to navigate: the kid should be able to play with minimal adult help.
- Audio-first feedback: every word and every correction can be heard (not just seen).
- Short sessions: 2-7 minutes feels like a "quest."
- No dark patterns: no loot boxes, no manipulative timers, no gambling mechanics.
- Privacy-first for kids: no child PII collection, no open chat, no ads.

COPPA note: Any data collection from children under 13 triggers strict requirements (notice + verifiable parental consent for personal info). If we keep child play fully offline/local (or adult-only accounts) we reduce risk significantly. Source: FTC COPPA overview.
- https://www.ftc.gov/business-guidance/privacy-security/childrens-privacy

## 4) Learning design (research-aligned, simple to explain)
Goal: systematic phonics practice presented as game actions.

Principles
- Small set, high repetition, clear mastery.
- Immediate corrective feedback (with audio).
- Interleaving: mix recently learned patterns with review.
- Adaptive difficulty: easier early, harder later, but always winnable.

Minimum learning scope for v1
- World 1 (CVC short vowels): early wins, fast feedback.
- World 2 (blends): more challenge, still short words.
- World 3 (digraphs): "sh/ch/th/wh/ph."
- World 4 (long vowels & silent-e): pattern recognition.
- World 5 (multi-syllable starter): syllable chunking and common affixes.

We will only claim learning outcomes after testing. The product is designed to support testing; it does not "promise" results by default.

## 5) Storyline (world bible)
Core conflict
- The Cove is being corrupted by "The Glitch," which scrambles letters and breaks words.
- Players restore order by casting spelling "fix" spells (completing the word correctly).

Heroes (player-facing cast)
- Lyric: curious leader, reads patterns fast.
- Chord: steady builder, likes rules and sequences.
- Melody: quick and bold, tries again without shame.
- Echo: quiet observer, catches details others miss.
- Riff: comic relief, but surprisingly sharp.

Mentors (teach the "why" in 1-2 lines)
- Nova Rei (vowels)
- Beat Haneul (blends)
- Seri Vale (sight words and exceptions)
- Dr. Tempo (prefix/suffix)
- Luma Cho (silent letters)

Enemy system
- Common enemies "glitch" letters (missing vowel, swapped consonant).
- Bosses represent the "hardest pattern" of each world.

Worlds (canonical for this build; older names can be kept as synonyms)
- World 1: Echo Harbor (short vowel CVC)
  - Boss (canonical): Glitchling Prime
  - Previously referenced in older docs: City of Echoes / Syllabyte Prime
- World 2: Cloud Conservatory (blends)
- World 3: Solar Pier (digraphs)
- World 4: Crystal Archive (long vowels / silent-e)
- World 5: Noise Core (multi-syllable starter)

## 6) Core game loop (web + Roblox parity)
1. Choose a node on the map.
2. Start a "5-word quest" (or 3 for youngest mode).
3. Each word is a micro-battle:
   - Hear the word (optional)
   - See the pattern (blank(s))
   - Choose letters (keyboard / taps)
   - Get feedback (VFX + audio + short text)
4. Rewards:
   - XP for participation
   - Bonus for first-try correct
   - Pet energy / evolution points
5. After 5 words:
   - Chest/reward reveal
   - Next node unlock

Boss levels
- Short intro sequence (2-3 seconds)
- Slightly longer battle (5-8 words)
- Boss "phase" behavior is visual only in v1 (no complex AI needed).

## 7) Achievements v1 (simple, frequent early; harder later)
- First-try streak: 3, 5, 10 correct-in-a-row
- Boss clear: each boss defeated once
- Practice consistency: 3 days, 7 days, 14 days
- Resilience badge: "try again" without quitting (tracked as finishing after mistakes)

## 8) Safety, privacy, and data model
Default: local-only child play
- Store progress in localStorage/IndexedDB for web.
- Optional adult login later to sync progress across devices.

If adult login is enabled
- Adult email magic-link sign-in only.
- Child profiles are pseudonyms (no real names required).
- No chat, no DMs, no user-generated content.

## 9) Tech North Star (what we should standardize)
Single source of truth for content:
- Word lists, pattern tags, difficulty, audio metadata, enemy/boss mapping.

Cross-platform content pack:
- JSON definitions consumed by Web game and Roblox game.
- Same "quest recipe" everywhere.

Web build path
- Keep current HTML/JS prototype working.
- Upgrade visuals via UI/VFX and structured scene system.
- Consider moving gameplay loop into a lightweight engine (Phaser 3) if animation/state complexity grows.
  - https://phaser.io/
  - https://github.com/phaserjs/phaser

Roblox build path
- Rebuild as 3D map + battle arenas with the same content pack.
- UI mimics the web version (map, nodes, battle HUD, pet/achievements screens).
- Keep educational loop identical.

## 10) Current implementation status (as of this README)
Working
- Map screen and quest flow
- Levels and VFX basics
- Pets (early version)
- Spell helper

In progress / next
- Achievements v1
- Boss intro sequence for World 1 boss (Glitchling Prime)
- PWA offline support (service worker)
  - https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

## 11) Definition of done (Phase 1.2 "looks like the vision")
- Map feels like a game map (depth, motion, node glow, unlock reveal)
- Boss level has a cinematic intro
- Rewards screen has 1 strong "pop" moment (pet/achievement/XP)
- The whole loop works on mobile without tiny tap targets

## 12) "Do not break this" constraints for agents
- Never refactor core flow without preserving working behavior.
- Additive changes only unless explicitly approved.
- If a design decision conflicts with this README, update the README first, then implement.
