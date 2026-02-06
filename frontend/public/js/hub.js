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

// Auto-init on page load
document.addEventListener("DOMContentLoaded", () => {
  initCrystalDisplay();
});
