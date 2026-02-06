// js/quest.js
// Quest battle logic for World 1.
// Picks all 20 CVC words, shuffles them, runs a spelling battle.
// +1 crystal per correct word, +5 bonus on completion.

import { W1_WORDS } from "./data_w1_words.js";
import { speakWord, speakLettersSlow } from "./speechHelpers.js";
import { addCrystals, initCrystalDisplay, renderPetSlot } from "./hub.js";

// --- Level mode detection ---
const selectedLevel = Number(localStorage.getItem("w1_selected_level")) || 0;
const isLevelMode = selectedLevel > 0;
const isBossLevel = selectedLevel === 21;

// DOM refs
const enemyNameEl = document.querySelector("[data-enemy-name]");
const enemyTypeEl = document.querySelector("[data-enemy-type]");
const statusEl = document.querySelector("[data-quest-status]");
const hpFillEl = document.querySelector("[data-enemy-hp-fill]");
const hpTextEl = document.querySelector("[data-hp-text]");
const slotsContainer = document.querySelector("[data-word-slots]");
const keyboardContainer = document.querySelector("[data-keyboard]");
const btnPlayWord = document.querySelector("[data-btn-play-word]");
const btnSpellLetters = document.querySelector("[data-btn-spell-letters]");
const btnClear = document.querySelector("[data-btn-clear]");
const progressLabel = document.querySelector("[data-progress-label]");
const feedbackEl = document.querySelector("[data-feedback]");
const streakEl = document.querySelector("[data-streak-count]");

// State
let queue = [];
let currentIndex = 0;
let currentWord = "";
let typed = [];
let totalHp = 0;
let enemyHp = 0;
let damagePerWord = 1;
let battleDone = false;
let streak = 0;
let bestStreak = 0;

// --- Enemy loading ---

async function loadEnemies() {
  try {
    const res = await fetch("./data/enemies.json", { cache: "no-store" });
    if (!res.ok) throw new Error("bad response");
    const enemies = await res.json();
    if (!Array.isArray(enemies) || enemies.length === 0) throw new Error("empty");
    return enemies;
  } catch {
    return [
      { id: "fallback", name: "Echo Glitch", type: "Glitch Spirit", baseHP: 20 }
    ];
  }
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// --- Helpers ---

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function updateHpBar() {
  if (!hpFillEl) return;
  const pct = totalHp > 0 ? Math.max(0, (enemyHp / totalHp) * 100) : 0;
  hpFillEl.style.width = pct + "%";
  if (hpTextEl) hpTextEl.textContent = "HP " + Math.ceil(enemyHp) + " / " + totalHp;
}

function updateStreakDisplay() {
  if (!streakEl) return;
  streakEl.textContent = String(streak);
  streakEl.classList.add("streak-bump");
  setTimeout(() => streakEl.classList.remove("streak-bump"), 150);
}

function setFeedback(text, type) {
  if (!feedbackEl) return;
  feedbackEl.textContent = text;
  feedbackEl.className = "feedback-text" + (type === "success" ? " feedback-success" : type === "error" ? " feedback-error" : "");
}

function renderSlots() {
  if (!slotsContainer) return;
  slotsContainer.innerHTML = "";
  if (!currentWord) return;

  const letters = currentWord.split("");
  letters.forEach((_, idx) => {
    const filled = typed[idx] || "";
    const div = document.createElement("div");
    div.className = "quest-slot" + (filled ? " quest-slot-filled" : "");
    div.textContent = filled;
    div.setAttribute("data-testid", "quest-slot-" + idx);
    slotsContainer.appendChild(div);
  });
}

// --- VFX ---

function triggerHitVFX() {
  const card = document.querySelector(".quest-enemy-card");
  if (!card) return;
  card.classList.remove("vfx-hit");
  void card.offsetWidth;
  card.classList.add("vfx-hit");
  spawnParticles(card);
}

function triggerShakeVFX() {
  if (!slotsContainer) return;
  slotsContainer.classList.remove("vfx-shake");
  void slotsContainer.offsetWidth;
  slotsContainer.classList.add("vfx-shake");

  const shell = document.querySelector(".quest-enemy-card");
  if (shell) {
    shell.classList.remove("vfx-flash-red");
    void shell.offsetWidth;
    shell.classList.add("vfx-flash-red");
  }
}

function spawnParticles(anchor) {
  const rect = anchor.getBoundingClientRect();
  const container = document.createElement("div");
  container.className = "vfx-particles";
  container.style.position = "fixed";
  container.style.left = (rect.left + rect.width / 2) + "px";
  container.style.top = (rect.top + rect.height / 3) + "px";

  const colors = ["#38bdf8", "#818cf8", "#c084fc", "#4ade80", "#fbbf24"];
  for (let i = 0; i < 8; i++) {
    const p = document.createElement("div");
    p.className = "vfx-particle";
    const angle = (Math.PI * 2 / 8) * i + Math.random() * 0.5;
    const dist = 25 + Math.random() * 35;
    p.style.setProperty("--px", Math.cos(angle) * dist + "px");
    p.style.setProperty("--py", Math.sin(angle) * dist + "px");
    p.style.background = colors[i % colors.length];
    container.appendChild(p);
  }
  document.body.appendChild(container);
  setTimeout(() => container.remove(), 650);
}

// --- Core loop ---

function onKeyPress(letter) {
  if (battleDone || !currentWord) return;
  if (typed.length >= currentWord.length) return;

  typed.push(letter.toUpperCase());
  renderSlots();

  if (typed.length === currentWord.length) {
    checkAnswer();
  }
}

function checkAnswer() {
  const guess = typed.join("").toLowerCase();
  const target = currentWord.toLowerCase();

  if (guess === target) {
    enemyHp -= damagePerWord;
    if (enemyHp < 0) enemyHp = 0;
    updateHpBar();
    streak += 1;
    bestStreak = Math.max(bestStreak, streak);
    updateStreakDisplay();
    addCrystals(1);
    initCrystalDisplay();
    triggerHitVFX();
    setFeedback("Nice. That hit the glitch.", "success");
    setTimeout(nextWord, 600);
  } else {
    streak = 0;
    updateStreakDisplay();
    triggerShakeVFX();
    setFeedback("Not quite. Try that word again.", "error");
    typed = [];
    renderSlots();
  }
}

function nextWord() {
  if (currentIndex >= queue.length) {
    // Battle complete
    battleDone = true;
    addCrystals(5);
    initCrystalDisplay();
    showVictory();
    return;
  }

  currentWord = queue[currentIndex].word;
  typed = [];
  renderSlots();
  updateHpBar();
  if (progressLabel) {
    progressLabel.textContent = "Word " + (currentIndex + 1) + " of " + queue.length;
  }
  setFeedback("Tap Play Word to hear it.", "");
  currentIndex += 1;
}

function showVictory() {
  if (statusEl) statusEl.textContent = "Battle cleared!";
  if (progressLabel) progressLabel.textContent = "Battle complete";

  // Level completion bookkeeping
  if (isLevelMode) {
    try {
      const completed = JSON.parse(localStorage.getItem("w1_completed_levels") || "[]");
      if (!completed.includes(selectedLevel)) {
        completed.push(selectedLevel);
        localStorage.setItem("w1_completed_levels", JSON.stringify(completed));
      }
      const maxUnlocked = Number(localStorage.getItem("w1_unlocked_level")) || 1;
      if (selectedLevel >= maxUnlocked && selectedLevel <= 20) {
        localStorage.setItem("w1_unlocked_level", String(selectedLevel + 1));
      }
      localStorage.removeItem("w1_selected_level");
    } catch {}
  }

  const backUrl = isLevelMode ? "./map.html" : "./hub.html";
  const backLabel = isLevelMode ? "Back to Map" : "Back to Hub";

  const overlay = document.createElement("div");
  overlay.className = "victory-overlay";
  overlay.setAttribute("data-testid", "victory-overlay");
  overlay.innerHTML = `
    <div class="victory-panel">
      <div class="victory-title" data-testid="victory-title">You Won!</div>
      <div class="victory-subtitle">${isBossLevel ? "Boss defeated!" : isLevelMode ? "Level cleared!" : "All words cleared."} +5 bonus crystals earned.</div>
      <div class="victory-stats">
        <div class="victory-stat">
          <div class="victory-stat-value" data-testid="victory-best-streak">${bestStreak}</div>
          <div class="victory-stat-label">Best Streak</div>
        </div>
        <div class="victory-stat">
          <div class="victory-stat-value" data-testid="victory-crystals">${queue.length + 5}</div>
          <div class="victory-stat-label">Crystals Earned</div>
        </div>
      </div>
      <div class="victory-buttons">
        ${isLevelMode
          ? '<button class="btn btn-sm btn-primary" data-testid="continue-btn" type="button" id="victory-continue">Continue</button>'
          : '<button class="btn btn-sm btn-primary" data-testid="play-again-btn" type="button" id="victory-replay">Play Again</button>'}
        <button class="btn btn-sm" data-testid="victory-back-btn" type="button" onclick="window.location.href='${backUrl}'">${backLabel}</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  if (isLevelMode) {
    document.getElementById("victory-continue").addEventListener("click", () => {
      window.location.href = "./map.html";
    });
  } else {
    document.getElementById("victory-replay").addEventListener("click", () => {
      overlay.remove();
      startBattle();
    });
  }
}

// --- Keyboard ---

function buildKeyboard() {
  if (!keyboardContainer) return;
  const layout = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  keyboardContainer.innerHTML = "";

  layout.forEach((row, rowIdx) => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "quest-keyboard-row";

    row.split("").forEach(letter => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "key-btn";
      btn.textContent = letter;
      btn.setAttribute("data-testid", "key-" + letter.toLowerCase());
      btn.addEventListener("click", () => onKeyPress(letter));
      rowDiv.appendChild(btn);
    });

    keyboardContainer.appendChild(rowDiv);
  });
}

// --- Control buttons ---

function attachControlHandlers() {
  if (btnPlayWord) {
    btnPlayWord.addEventListener("click", () => {
      if (!currentWord || battleDone) return;
      speakWord(currentWord);
    });
  }
  if (btnSpellLetters) {
    btnSpellLetters.addEventListener("click", () => {
      if (!currentWord || battleDone) return;
      speakLettersSlow(currentWord);
    });
  }
  if (btnClear) {
    btnClear.addEventListener("click", () => {
      if (battleDone) return;
      typed = [];
      renderSlots();
    });
  }
}

// --- Init ---

async function startBattle() {
  const enemies = await loadEnemies();
  const HP_GROWTH = 2;

  let enemy;
  if (isLevelMode && !isBossLevel) {
    const enemyIdx = Math.floor((selectedLevel - 1) / 4) % enemies.length;
    enemy = enemies[enemyIdx];
  } else {
    enemy = pickRandom(enemies);
  }

  if (enemyNameEl) enemyNameEl.textContent = enemy.name || "Echo Glitch";
  if (enemyTypeEl) enemyTypeEl.textContent = enemy.type || "Glitch Spirit";

  const baseHP = Number(enemy.baseHP) || 20;

  if (isLevelMode && !isBossLevel) {
    // Single word per level
    const wordIdx = (selectedLevel - 1) % W1_WORDS.length;
    queue = [W1_WORDS[wordIdx]];
    totalHp = baseHP + (selectedLevel - 1) * HP_GROWTH;
  } else if (isBossLevel) {
    // Boss: 5 random words
    queue = shuffle(W1_WORDS).slice(0, 5);
    totalHp = 100;
  } else {
    // Legacy full quest
    queue = shuffle(W1_WORDS);
    totalHp = baseHP;
  }

  enemyHp = totalHp;
  damagePerWord = totalHp / queue.length;
  currentIndex = 0;
  currentWord = "";
  typed = [];
  battleDone = false;
  streak = 0;
  bestStreak = 0;
  updateStreakDisplay();
  updateHpBar();
  nextWord();
}

document.addEventListener("DOMContentLoaded", () => {
  initCrystalDisplay();
  renderPetSlot();
  buildKeyboard();
  attachControlHandlers();

  // Level mode UI tweaks
  if (isLevelMode) {
    const titleEl = document.querySelector(".app-title");
    if (titleEl) titleEl.textContent = isBossLevel ? "Boss Battle" : "Level " + selectedLevel;

    const backBtn = document.querySelector("[data-testid='back-to-hub-btn']");
    if (backBtn) {
      backBtn.textContent = "Back to map";
      backBtn.setAttribute("onclick", "");
      backBtn.addEventListener("click", () => {
        localStorage.removeItem("w1_selected_level");
        window.location.href = "./map.html";
      });
    }
  }

  startBattle();
});
