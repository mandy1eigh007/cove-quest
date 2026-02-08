// js/map.js
// World Map — level progression, node rendering, path drawing.

import { initCrystalDisplay } from "./hub.js";
import { W1_WORDS } from "./data_w1_words.js";
import { renderPetSlot } from "./hub.js";

const TOTAL_LEVELS = W1_WORDS.length; // 20
const BOSS_LEVEL = TOTAL_LEVELS + 1;  // 21

const LS_UNLOCKED = "w1_unlocked_level";
const LS_COMPLETED = "w1_completed_levels";
const LS_SELECTED  = "w1_selected_level";

// Node positions [x%, y%] — winding S-curve from bottom to top
const NODE_POS = [
  // Row 1: bottom, left→right (1-5)
  { x: 15, y: 88 }, { x: 30, y: 84 }, { x: 45, y: 80 }, { x: 60, y: 76 }, { x: 75, y: 72 },
  // Row 2: right→left (6-10)
  { x: 82, y: 64 }, { x: 67, y: 60 }, { x: 52, y: 56 }, { x: 37, y: 52 }, { x: 22, y: 48 },
  // Row 3: left→right (11-15)
  { x: 15, y: 40 }, { x: 30, y: 36 }, { x: 45, y: 32 }, { x: 60, y: 28 }, { x: 75, y: 24 },
  // Row 4: right→left (16-20)
  { x: 82, y: 17 }, { x: 67, y: 14 }, { x: 52, y: 11 }, { x: 37, y: 8 },  { x: 22, y: 5 },
  // Boss at top center
  { x: 50, y: 2 }
];

function getUnlocked() {
  return Number(localStorage.getItem(LS_UNLOCKED)) || 1;
}

function getCompleted() {
  try { return JSON.parse(localStorage.getItem(LS_COMPLETED) || "[]"); }
  catch { return []; }
}

function nodeState(level) {
  const completed = getCompleted();
  const unlocked = getUnlocked();
  if (completed.includes(level)) return "completed";
  if (level <= unlocked) return "available";
  return "locked";
}

function startLevel(level) {
  localStorage.setItem(LS_SELECTED, String(level));
  window.location.href = "./quest.html";
}

// --- Rendering ---

function drawPath() {
  const svg = document.querySelector(".map-path-svg");
  if (!svg) return;

  // Glow background line
  const glow = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  glow.setAttribute("points", NODE_POS.map(p => `${p.x},${p.y}`).join(" "));
  glow.setAttribute("fill", "none");
  glow.setAttribute("stroke", "rgba(139,92,246,0.1)");
  glow.setAttribute("stroke-width", "2.5");
  glow.setAttribute("stroke-linecap", "round");
  glow.setAttribute("stroke-linejoin", "round");
  svg.appendChild(glow);

  // Dashed foreground line
  const line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  line.setAttribute("points", NODE_POS.map(p => `${p.x},${p.y}`).join(" "));
  line.setAttribute("fill", "none");
  line.setAttribute("stroke", "rgba(139,92,246,0.3)");
  line.setAttribute("stroke-width", "0.6");
  line.setAttribute("stroke-dasharray", "1.8,1.2");
  line.setAttribute("stroke-linecap", "round");
  line.setAttribute("stroke-linejoin", "round");
  svg.appendChild(line);
}

function renderNodes() {
  const container = document.querySelector("[data-map-nodes]");
  if (!container) return;
  container.innerHTML = "";

  for (let i = 0; i < NODE_POS.length; i++) {
    const level = i + 1;
    const pos = NODE_POS[i];
    const state = nodeState(level);
    const isBoss = level === BOSS_LEVEL;

    const node = document.createElement("button");
    node.type = "button";
    node.className = "map-node map-node--" + state + (isBoss ? " map-node--boss" : "");
    node.style.left = pos.x + "%";
    node.style.top = pos.y + "%";
    node.setAttribute("data-testid", "map-node-" + level);

    if (isBoss) {
      node.textContent = "BOSS";
    } else if (state === "completed") {
      node.textContent = "\u2713"; // checkmark
    } else {
      node.textContent = String(level);
    }

    if (state !== "locked") {
      node.addEventListener("click", () => {
        updateToast(level, isBoss);
        startLevel(level);
      });
    }

    container.appendChild(node);
  }
}

function updateToast(level, isBoss) {
  const toast = document.querySelector("[data-map-toast]");
  if (!toast) return;
  if (isBoss) {
    toast.textContent = "Boss battle! 5 words to defeat it.";
  } else {
    const word = W1_WORDS[(level - 1) % W1_WORDS.length];
    toast.textContent = "Level " + level + " — starting...";
  }
}

// --- Init ---

document.addEventListener("DOMContentLoaded", () => {
  initCrystalDisplay();
  renderPetSlot();
  drawPath();
  renderNodes();

  // Update toast based on next available level
  const unlocked = getUnlocked();
  const completed = getCompleted();
  const toast = document.querySelector("[data-map-toast]");
  const cta = document.querySelector("[data-map-cta]");

  if (toast) {
    if (completed.length >= BOSS_LEVEL) {
      toast.textContent = "All levels complete! Replay any level.";
    } else if (unlocked === BOSS_LEVEL) {
      toast.textContent = "Boss unlocked! Tap BOSS to start.";
    } else {
      toast.textContent = "Tap Level " + unlocked + " to continue";
    }
  }

  // Wire CTA to next available level
  if (cta) {
    const nextLevel = completed.includes(BOSS_LEVEL) ? 1 : unlocked;
    cta.addEventListener("click", () => startLevel(nextLevel));
  }

  // Unlock reveal: animate the newly unlocked node
  const justCompleted = Number(sessionStorage.getItem("sq_just_completed")) || 0;
  if (justCompleted > 0) {
    sessionStorage.removeItem("sq_just_completed");
    const nextNode = document.querySelector("[data-testid='map-node-" + (justCompleted + 1) + "']");
    if (nextNode && !nextNode.classList.contains("map-node--locked")) {
      nextNode.classList.add("map-node--reveal");
    }
  }
});
