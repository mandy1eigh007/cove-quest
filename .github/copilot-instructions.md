# AI Assistant Instructions — SpellQuest

## Active Scope

**Phase 1 Bootstrap MVP is the only active build plan.**

See `/docs/PHASE_1_BOOTSTRAP_MVP.md` for the full scope definition.

### Key Points

- The PWA front-end lives in the project root as static HTML/CSS/JS files:
  - `hub.html` (Hub page)
  - `quest.html` (Quest Battle)
  - `spellhelper.html` (Spell Helper)
  - `styles.css` (Shared styles)
  - `js/` directory (all JavaScript modules)

- Other platform directories are **future work** and off-limits unless explicitly instructed:
  - `client/` — React app scaffold (future)
  - `mobile/` — Mobile app scaffold (future)
  - `roblox/` — Roblox experience (future)
  - `server/` — Express backend scaffold (future)
  - `shared/` — Shared libraries (future)
  - `shared-assets/` — Shared static assets (future)

## Rules

1. **No mass deletions** of files or directories without explicit approval.
2. **No unchecked multi-file refactors.** Changes should be targeted and reviewable.
3. **No new frameworks or services** without explicit approval. The MVP uses vanilla HTML/CSS/JS only.
4. **Do not modify off-limits directories** (`client/`, `mobile/`, `roblox/`, `server/`, `shared/`, `shared-assets/`) unless explicitly told to.
5. **Read before writing.** If a file exists, read it first and reconcile rather than overwriting blindly.
6. **Web Speech API** is the only audio dependency. No external TTS services.
7. **localStorage** is the only persistence layer. No databases or server calls in the MVP.
8. **Keep it simple.** No build steps, no bundlers, no transpilers. Files should work when opened directly in a browser.

## Architecture Notes

- All JS files use ES module syntax (`import`/`export`) loaded via `<script type="module">`
- Crystal counter is shared across pages via `js/hub.js` utility functions
- Speech synthesis is centralized in `js/speechHelpers.js`
- Word data is in `js/data_w1_words.js` (20 CVC short-vowel words)
