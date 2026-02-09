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

// --- Practice consistency (days) ---

function ymd(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function daysBetween(a, b) {
  // a and b are Date objects at any time; compare by UTC midnight
  const aUTC = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const bUTC = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((bUTC - aUTC) / (24 * 60 * 60 * 1000));
}

/**
 * Call this once at the END of a quest (on victory) to track practice days.
 * - consecutive_days increments if last play was yesterday
 * - resets to 1 if gap > 1 day
 * - unchanged if already counted today
 */
export function recordPracticeDay() {
  const stats = getStats();
  const today = new Date();
  const todayKey = ymd(today);

  const lastKey = stats.last_play_date; // "YYYY-MM-DD"
  if (lastKey === todayKey) return stats; // already counted today

  let consecutive = Number(stats.consecutive_days) || 0;

  if (!lastKey) {
    consecutive = 1;
  } else {
    const last = new Date(lastKey + "T00:00:00");
    const diff = daysBetween(last, today);
    if (diff === 1) consecutive += 1;
    else consecutive = 1;
  }

  const best = Math.max(Number(stats.best_consecutive_days) || 0, consecutive);

  return updateStats({
    last_play_date: todayKey,
    consecutive_days: consecutive,
    best_consecutive_days: best,
  });
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
  { id: "first_quest",   check: s => (s.quests_completed || 0) >= 1 },

  // FIRST-TRY streaks (true first attempt)
  { id: "streak_3",      check: s => (s.best_first_try_streak_ever || 0) >= 3 },
  { id: "streak_5",      check: s => (s.best_first_try_streak_ever || 0) >= 5 },
  { id: "streak_10",     check: s => (s.best_first_try_streak_ever || 0) >= 10 },

  { id: "boss_clear",    check: s => !!s.boss_defeated },
  { id: "resilience",    check: s => !!s.finished_with_mistakes },

  // Practice consistency (days in a row)
  { id: "practice_3",    check: s => (s.best_consecutive_days || 0) >= 3 },
  { id: "practice_7",    check: s => (s.best_consecutive_days || 0) >= 7 },
  { id: "practice_14",   check: s => (s.best_consecutive_days || 0) >= 14 },
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
  first_quest:  { name: "First Steps",   icon: "★",  color: "#fbbf24", desc: "Complete your first quest" },

  streak_3:     { name: "Sharp Eye",     icon: "🔥", color: "#f97316", desc: "3 first-try correct in a row" },
  streak_5:     { name: "On Fire",       icon: "🔥", color: "#ef4444", desc: "5 first-try correct in a row" },
  streak_10:    { name: "Unstoppable",   icon: "⚡", color: "#a855f7", desc: "10 first-try correct in a row" },

  boss_clear:   { name: "Boss Slayer",   icon: "🛡", color: "#dc2626", desc: "Defeat Glitchling Prime" },
  resilience:   { name: "Never Quit",    icon: "❤",  color: "#ec4899", desc: "Finish even after mistakes" },

  practice_3:   { name: "3-Day Builder", icon: "📅", color: "#22c55e", desc: "Practice 3 days in a row" },
  practice_7:   { name: "Week Warrior",  icon: "📅", color: "#14b8a6", desc: "Practice 7 days in a row" },
  practice_14:  { name: "Two-Week Pro",  icon: "📅", color: "#3b82f6", desc: "Practice 14 days in a row" },
};

export function getBadgeMeta(id) {
  return BADGE_META[id] || { name: id, icon: "?", color: "#888", desc: "" };
}

export function getAllBadgeIds() {
  return BADGE_DEFS.map(d => d.id);
}