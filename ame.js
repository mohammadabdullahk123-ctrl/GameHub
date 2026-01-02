const grid = document.getElementById("grid");
const input = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");

const WORDS = [
  "APPLE","BANJO","CRANE","DRIVE","EAGER",
  "ABOUT","ALIVE","ALONE","ANGLE","BASIC",
  "BEGIN","BELOW","BIRTH","BLACK","BRAIN",
  "CATCH","COVER","EARLY","EARTH","FIELD",
  "FRESH","FRONT","GROUP","GUESS","HUMAN",
  "LEVEL","LOCAL","NORTH","OCEAN","ORDER",
  "POWER","QUIET","REACH","SCALE","SHAPE",
  "SHARE","SLEEP","SOUND","SPACE","SPEND",
  "STAND","STONE","THING","THINK","TOUCH",
  "TRAIN","TRUTH","VISIT","VOICE"
];

let answer = WORDS[Math.floor(Math.random() * WORDS.length)];
let attempts = 0;
const maxAttempts = 6;

// Create grid once
for (let i = 0; i < maxAttempts * 5; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
}

// Update the grid
function updateGrid(guess, attempt) {
  const cells = grid.querySelectorAll(".cell");
  for (let i = 0; i < 5; i++) {
    const cell = cells[attempt * 5 + i];
    cell.textContent = guess[i];
    cell.classList.remove("correct","present","absent");

    if (guess[i] === answer[i]) cell.classList.add("correct");
    else if (answer.includes(guess[i])) cell.classList.add("present");
    else cell.classList.add("absent");
  }
}

// Handle submit
submitBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent form refresh
  const guess = input.value.toUpperCase();
  if (guess.length !== 5) {
    message.textContent = "Word must be 5 letters!";
    return;
  }

  updateGrid(guess, attempts);
  attempts++;
  input.value = "";

  if (guess === answer) {
    message.textContent = "You Win!";
    submitBtn.disabled = true;
  } else if (attempts >= maxAttempts) {
    message.textContent = `Game Over! Answer: ${answer}`;
    submitBtn.disabled = true;
  } else {
    message.textContent = "";
  }
});

// Handle restart
restartBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent form refresh
  attempts = 0;
  answer = WORDS[Math.floor(Math.random() * WORDS.length)];
  message.textContent = "";
  input.value = "";
  submitBtn.disabled = false;

  // Clear all cells, but keep the grid
  const cells = grid.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("correct","present","absent");
  });
});
