// js/achievementsPage.js
// Renders the badge wall on achievements.html.

import { initCrystalDisplay } from "./hub.js";
import { getEarnedBadges, getAllBadgeIds, getBadgeMeta } from "./achievements.js";

function renderBadgeWall() {
  const grid = document.querySelector("[data-ach-grid]");
  if (!grid) return;

  const allIds = getAllBadgeIds();
  const earned = getEarnedBadges();
  grid.innerHTML = "";

  allIds.forEach(id => {
    const meta = getBadgeMeta(id);
    const isEarned = earned.includes(id);
    const card = document.createElement("div");
    card.className = "ach-badge" + (isEarned ? " ach-badge--earned" : " ach-badge--locked");
    card.setAttribute("data-testid", "ach-badge-" + id);
    card.innerHTML =
      '<div class="ach-badge-icon" style="' + (isEarned ? 'color:' + meta.color + ';text-shadow:0 0 12px ' + meta.color : '') + '">' +
        meta.icon +
      '</div>' +
      '<div class="ach-badge-name">' + meta.name + '</div>' +
      '<div class="ach-badge-desc">' + meta.desc + '</div>';
    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCrystalDisplay();
  renderBadgeWall();
});
