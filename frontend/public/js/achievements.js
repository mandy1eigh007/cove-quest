// js/achievements.js
// Achievement engine — check conditions, award badges, persist to localStorage.

const LS_ACHIEVEMENTS = "spellquest_achievements";
const LS_STATS = "spellquest_stats";

// --- Stats tracking ---

export function getStats() {
  try { return JSON.parse(localStorage.getItem(LS_STATS) || "{}"); }
  catch { return {}; }
}

export function updateStats(patch) {
  const stats = getStats();
  Object.assign(stats, patch);
  try { localStorage.setItem(LS_STATS, JSON.stringify(stats)); } catch {}
  return stats;
}

export function incrementStat(key, delta = 1) {
  const stats = getStats();
  stats[key] = (Number(stats[key]) || 0) + delta;
  try { localStorage.setItem(LS_STATS, JSON.stringify(stats)); } catch {}
  return stats;
}

// --- Badge persistence ---

export function getEarnedBadges() {
  try { return JSON.parse(localStorage.getItem(LS_ACHIEVEMENTS) || "[]"); }
  catch { return []; }
}

function saveBadges(badges) {
  try { localStorage.setItem(LS_ACHIEVEMENTS, JSON.stringify(badges)); } catch {}
}

// --- Check & award ---

const BADGE_DEFS = [
  { id: "first_quest",  check: s => (s.quests_completed || 0) >= 1 },
  { id: "streak_3",     check: s => (s.best_streak_ever || 0) >= 3 },
  { id: "streak_5",     check: s => (s.best_streak_ever || 0) >= 5 },
  { id: "streak_10",    check: s => (s.best_streak_ever || 0) >= 10 },
  { id: "boss_clear",   check: s => !!s.boss_defeated },
  { id: "resilience",   check: s => !!s.finished_with_mistakes },
];

/**
 * Check all badges against current stats.
 * Returns array of NEWLY earned badge IDs (empty if none new).
 */
export function checkAchievements() {
  const stats = getStats();
  const earned = getEarnedBadges();
  const newlyEarned = [];

  for (const def of BADGE_DEFS) {
    if (!earned.includes(def.id) && def.check(stats)) {
      earned.push(def.id);
      newlyEarned.push(def.id);
    }
  }

  if (newlyEarned.length > 0) saveBadges(earned);
  return newlyEarned;
}

// --- Badge metadata (for rendering) ---

const BADGE_META = {
  first_quest: { name: "First Steps",    icon: "\u2605", color: "#fbbf24", desc: "Complete your first quest" },
  streak_3:    { name: "Hot Streak",      icon: "\u{1F525}", color: "#f97316", desc: "3 correct in a row" },
  streak_5:    { name: "On Fire",         icon: "\u{1F525}", color: "#ef4444", desc: "5 correct in a row" },
  streak_10:   { name: "Unstoppable",     icon: "\u26A1", color: "#a855f7", desc: "10 correct in a row" },
  boss_clear:  { name: "Boss Slayer",     icon: "\u{1F6E1}", color: "#dc2626", desc: "Defeat Glitchling Prime" },
  resilience:  { name: "Never Give Up",   icon: "\u2764", color: "#ec4899", desc: "Finish after mistakes" },
};

export function getBadgeMeta(id) {
  return BADGE_META[id] || { name: id, icon: "?", color: "#888", desc: "" };
}

export function getAllBadgeIds() {
  return BADGE_DEFS.map(d => d.id);
}
