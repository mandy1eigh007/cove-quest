// js/quest.js
// Quest battle logic for World 1.
// Picks all 20 CVC words, shuffles them, runs a spelling battle.
// +1 crystal per correct word, +5 bonus on completion.

import { W1_WORDS } from "./data_w1_words.js";
import { speakWord, speakLettersSlow } from "./speechHelpers.js";
import { addCrystals, initCrystalDisplay } from "./hub.js";

// DOM refs
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
let battleDone = false;
let streak = 0;
let bestStreak = 0;

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
  if (hpTextEl) hpTextEl.textContent = "HP " + enemyHp + " / " + totalHp;
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
    enemyHp -= 1;
    updateHpBar();
    addCrystals(1);
    initCrystalDisplay();
    setFeedback("Nice. That hit the glitch.", "success");
    setTimeout(nextWord, 600);
  } else {
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

  const overlay = document.createElement("div");
  overlay.className = "victory-overlay";
  overlay.setAttribute("data-testid", "victory-overlay");
  overlay.innerHTML = `
    <div class="victory-panel">
      <div class="victory-title" data-testid="victory-title">You Won!</div>
      <div class="victory-subtitle">All words cleared. +5 bonus crystals earned.</div>
      <div class="victory-buttons">
        <button class="btn btn-sm btn-primary" data-testid="play-again-btn" type="button" id="victory-replay">Play Again</button>
        <button class="btn btn-sm" data-testid="victory-hub-btn" type="button" onclick="window.location.href='./hub.html'">Back to Hub</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById("victory-replay").addEventListener("click", () => {
    overlay.remove();
    startBattle();
  });
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

function startBattle() {
  queue = shuffle(W1_WORDS);
  totalHp = queue.length;
  enemyHp = totalHp;
  currentIndex = 0;
  currentWord = "";
  typed = [];
  battleDone = false;
  updateHpBar();
  nextWord();
}

document.addEventListener("DOMContentLoaded", () => {
  initCrystalDisplay();
  buildKeyboard();
  attachControlHandlers();
  startBattle();
});
