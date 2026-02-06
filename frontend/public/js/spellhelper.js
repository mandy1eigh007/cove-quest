// js/spellhelper.js
// Spell Helper logic: type a word, see its letter breakdown, hear it spoken.

import { speakWord, speakLettersSlow } from "./speechHelpers.js";
import { initCrystalDisplay } from "./hub.js";

const inputEl = document.querySelector("[data-word-input]");
const btnShow = document.querySelector("[data-btn-show]");
const wordDisplay = document.querySelector("[data-word-display]");
const letterRow = document.querySelector("[data-letter-row]");

function renderWord(word) {
  if (!wordDisplay || !letterRow) return;
  if (!word) {
    wordDisplay.textContent = "\u2014";
    letterRow.innerHTML = "";
    return;
  }

  wordDisplay.textContent = word;
  wordDisplay.style.fontSize = "1.4rem";
  wordDisplay.style.fontWeight = "600";
  wordDisplay.style.letterSpacing = "0.12em";
  letterRow.innerHTML = "";

  const letters = word.toUpperCase().split("");
  letters.forEach((letter, idx) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.textContent = letter;
    chip.setAttribute("data-testid", "letter-chip-" + idx);
    chip.addEventListener("click", () => {
      speakWord(letter.toLowerCase());
    });
    letterRow.appendChild(chip);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCrystalDisplay();

  if (btnShow) {
    btnShow.addEventListener("click", () => {
      const word = (inputEl.value || "").trim();
      if (!word) return;
      renderWord(word);
      speakWord(word);
      setTimeout(() => {
        speakLettersSlow(word);
      }, 800);
    });
  }

  if (inputEl) {
    inputEl.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (btnShow) btnShow.click();
      }
    });
  }
});
