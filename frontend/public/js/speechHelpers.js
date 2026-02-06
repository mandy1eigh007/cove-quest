// js/speechHelpers.js
// Centralized helpers for speech synthesis.
// Uses the browser Web Speech API. Picks an English voice and keeps pace kid-friendly.
//
// Usage (from other modules):
//   import { speakWord, speakLettersSlow, speakPhrase } from './speechHelpers.js';
//   speakWord('cat');           // says "cat" at a slow, clear rate
//   speakLettersSlow('cat');    // says "c" ... "a" ... "t" with pauses
//   speakPhrase('Nice job!');   // says arbitrary text

let cachedVoices = [];
let preferredVoice = null;

function loadVoices() {
  cachedVoices = window.speechSynthesis.getVoices();
  if (!cachedVoices || cachedVoices.length === 0) return;

  // Prefer en-US, then any en-*, then first available
  preferredVoice =
    cachedVoices.find(v => v.lang === "en-US") ||
    cachedVoices.find(v => v.lang && v.lang.toLowerCase().startsWith("en")) ||
    cachedVoices[0] ||
    null;
}

if ("speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
} else {
  console.warn("SpellQuest: Web Speech API not available in this browser. TTS will be silent.");
}

/**
 * Speak arbitrary text at a given rate/pitch.
 * Fails gracefully if the API is unavailable.
 */
function speakPhrase(text, options = {}) {
  if (!("speechSynthesis" in window)) return;
  const { rate = 0.9, pitch = 1.0 } = options;
  const utter = new SpeechSynthesisUtterance(text.toLowerCase());
  if (preferredVoice) utter.voice = preferredVoice;
  utter.rate = rate;
  utter.pitch = pitch;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

/**
 * Speak a whole word at a kid-friendly pace (~0.85 rate).
 * Does NOT uppercase — avoids "CAPITAL" announcements.
 */
function speakWord(word) {
  speakPhrase(word, { rate: 0.85, pitch: 1.0 });
}

/**
 * Spell out a word letter-by-letter with short pauses between.
 * Feeds lowercase letters to TTS to avoid "CAPITAL" announcements.
 */
function speakLettersSlow(word) {
  if (!("speechSynthesis" in window)) return;

  const letters = word.toLowerCase().split("");
  let delayMs = 0;
  window.speechSynthesis.cancel();

  letters.forEach(letter => {
    const utter = new SpeechSynthesisUtterance(letter);
    if (preferredVoice) utter.voice = preferredVoice;
    utter.rate = 0.75;
    utter.pitch = 1.0;
    setTimeout(() => {
      window.speechSynthesis.speak(utter);
    }, delayMs);
    delayMs += 550;
  });
}

export { speakPhrase, speakWord, speakLettersSlow };
