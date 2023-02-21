const highScoresList = document.getElementById("high-scores");
const clearSavesButton = document.getElementById("clear-saves");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .sort((a, b) => b.score - a.score)
  .map((score) => `<li>${score.initials.toUpperCase()} - ${score.score}</li>`)
  .join("");

clearSavesButton.addEventListener("click", () => {
  localStorage.removeItem("highScores");
  location.reload();
});
