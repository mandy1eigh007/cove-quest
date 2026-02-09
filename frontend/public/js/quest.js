function playBossIntro() {
  const overlay = document.getElementById("bossOverlay");
  overlay.style.display = "flex";
  document.body.classList.add("shake");

  setTimeout(() => {
    overlay.style.display = "none";
    document.body.classList.remove("shake");
  }, 2000);
}

if (isBossLevel) {
  playBossIntro();
}
