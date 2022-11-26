const word = document.querySelector("#word");
const text = document.querySelector("#text");
const scoreEl = document.querySelector("#score");
const timeEl = document.querySelector("#time");
const endgameEl = document.querySelector("#end-game-container");
const settingsBtn = document.querySelector("#settings-btn");
const settings = document.querySelector("#settings");
const settingsForm = document.querySelector("#settings-form");
const difficultySelect = document.querySelector("#difficulty");

// Word List
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

// Focus on the text on strat
text.focus();

// Init Word
let randomWord;

// Init Score
let score = 0;

// Init time
let time = 10;

// Set Difficulty value to localStorage
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set difficulty select value
difficultySelect.value = difficulty;

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add Random Word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
addWordToDOM();

// Update Score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Start Counting down
const timeInterval = setInterval(updateTime, 1000);

// Update Time
function updateTime() {
  time--;
  timeEl.innerHTML = time;

  if (time === 0) {
    clearInterval(timeInterval);

    // End the GAME
    gameOver();
  }
}

// GAME Over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
  <h1>Time Ran Out</h1>
  <p>Your final score is: ${score}</p>
  <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = "flex";
}

// Event Listener

// Input text Event
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear the Input Box
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 4;
    }

    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// Difficulty Change Event
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;

  localStorage.setItem("difficulty", difficulty);
});
