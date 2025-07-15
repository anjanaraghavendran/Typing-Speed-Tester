let startTime, selectedSentence = "", timerRunning = false;
let timerInterval;


function getRandomSentence(level) {
  const options = sentences[level];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function startTest() {
  const level = document.getElementById("difficulty").value;
  selectedSentence = getRandomSentence(level);

  document.getElementById("sentenceDisplay").innerText = selectedSentence;
  document.getElementById("typedInput").value = "";
  document.getElementById("typedInput").disabled = false;
  document.getElementById("typedInput").focus();

  document.getElementById("results").style.display = "none";
  startTime = new Date();
  clearInterval(timerInterval); // clear previous timer if any
document.getElementById("timerDisplay").innerText = "Time: 0.00s";
timerInterval = setInterval(() => {
  const now = new Date();
  const seconds = ((now - startTime) / 1000).toFixed(2);
  document.getElementById("timerDisplay").innerText = `Time: ${seconds}s`;
}, 100);

  timerRunning = true;
}

function restartTest() {
  startTest();
}

document.getElementById("typedInput").addEventListener("input", function () {
  if (!timerRunning) return;

  const typed = this.value;
  const original = selectedSentence;
  const sentenceDisplay = document.getElementById("sentenceDisplay");

  let colored = "";
  let correctChars = 0;

  for (let i = 0; i < original.length; i++) {
    if (i < typed.length) {
      if (typed[i] === original[i]) {
        colored += `<span class="correct">${original[i]}</span>`;
        correctChars++;
      } else {
        colored += `<span class="incorrect">${original[i]}</span>`;
      }
    } else {
      colored += original[i];
    }
  }

  sentenceDisplay.innerHTML = colored;

  if (typed === original) {
    clearInterval(timerInterval);

    timerRunning = false;
    const timeTaken = (new Date() - startTime) / 1000;
    const wpm = Math.round((typed.length / 5) / (timeTaken / 60));
    const accuracy = Math.round((correctChars / typed.length) * 100);

    document.getElementById("wpm").innerText = `Speed: ${wpm} WPM`;
    document.getElementById("accuracy").innerText = `Accuracy: ${accuracy}%`;
    document.getElementById("time").innerText = `Time: ${timeTaken.toFixed(2)} sec`;
    document.getElementById("results").style.display = "block";
    document.getElementById("typedInput").disabled = true;
  }
});
