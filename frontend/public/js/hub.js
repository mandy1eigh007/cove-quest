// js/hub.js
// Shared crystal counter utilities + hub-specific init.
// Uses localStorage for persistence. No server calls.

const CRYSTAL_KEY = "spellquest_cove_crystals";

export function getCrystalCount() {
  try {
    const raw = window.localStorage.getItem(CRYSTAL_KEY);
    const parsed = raw == null ? 0 : Number(raw);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  } catch {
    return 0;
  }
}

export function setCrystalCount(value) {
  const safe = Math.max(0, Math.floor(value || 0));
  try {
    window.localStorage.setItem(CRYSTAL_KEY, String(safe));
  } catch {
    // localStorage might be unavailable — silently ignore
  }
  return safe;
}

export function addCrystals(delta) {
  const current = getCrystalCount();
  return setCrystalCount(current + delta);
}

/** Update any element with [data-crystal-count] to show current crystal total. */
export function initCrystalDisplay() {
  const el = document.querySelector("[data-crystal-count]");
  if (!el) return;
  el.textContent = String(getCrystalCount());
}

// --- Pet evolution (Phase 1.5 Light) ---

const PET_STAGE_KEY = "spellquest_pet_stage";
const PET_THRESHOLDS = { egg: 25, hatched: 75 };

export function checkPetStage() {
  const crystals = getCrystalCount();
  let stage = "locked";
  try { stage = localStorage.getItem(PET_STAGE_KEY) || "locked"; } catch {}

  if (crystals >= PET_THRESHOLDS.hatched && stage !== "hatched") {
    stage = "hatched";
    try { localStorage.setItem(PET_STAGE_KEY, stage); } catch {}
  } else if (crystals >= PET_THRESHOLDS.egg && stage === "locked") {
    stage = "egg";
    try { localStorage.setItem(PET_STAGE_KEY, stage); } catch {}
  }
  return stage;
}

/** Render the pet slot visual in any [data-pet-slot] element on the page. */
export function renderPetSlot() {
  const container = document.querySelector("[data-pet-slot]");
  if (!container) return;
  const stage = checkPetStage();

  if (stage === "egg") {
    container.innerHTML =
      '<div class="pet-egg-visual" data-testid="pet-egg">' +
        '<svg viewBox="0 0 32 40" width="28" height="36">' +
          '<ellipse cx="16" cy="22" rx="11" ry="15" fill="rgba(168,85,247,0.35)" stroke="rgba(168,85,247,0.55)" stroke-width="1"/>' +
          '<ellipse cx="16" cy="17" rx="5" ry="3.5" fill="rgba(168,85,247,0.15)"/>' +
        '</svg>' +
        '<div class="pet-stage-label">Egg found!</div>' +
      '</div>';
  } else if (stage === "hatched") {
    container.innerHTML =
      '<div class="pet-hatched-visual" data-testid="pet-hatched">' +
        '<svg viewBox="0 0 40 40" width="32" height="32">' +
          '<circle cx="20" cy="15" r="9" fill="rgba(56,189,248,0.35)"/>' +
          '<circle cx="16" cy="13" r="2" fill="rgba(255,255,255,0.6)"/>' +
          '<circle cx="24" cy="13" r="2" fill="rgba(255,255,255,0.6)"/>' +
          '<path d="M17 18 Q20 21 23 18" stroke="rgba(255,255,255,0.5)" fill="none" stroke-width="0.8"/>' +
          '<ellipse cx="20" cy="31" rx="7" ry="5" fill="rgba(56,189,248,0.25)"/>' +
        '</svg>' +
        '<div class="pet-stage-label">Pebble</div>' +
      '</div>';
  } else {
    container.innerHTML = '<div class="hero-pet-slot">Sidekick locked</div>';
  }
}

// Auto-init on page load
document.addEventListener("DOMContentLoaded", () => {
  initCrystalDisplay();
  renderPetSlot();
});
