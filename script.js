// Initialize variables
let score = 0;
let timer = 30;
let targetColor = "red";
let gameInterval, timerInterval;

const playArea = document.getElementById("play-area");
const startBtn = document.getElementById("start-btn");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const targetColorDisplay = document.getElementById("target-color");

// Colors to be used in the game
const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

// Start the game
function startGame() {
  // Reset game state
  score = 0;
  timer = 30;
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  targetColorDisplay.textContent = targetColor;
  targetColorDisplay.style.color = targetColor;
  scoreDisplay.textContent = "Score: 0";
  timerDisplay.textContent = `Time Left: ${timer}`;
  playArea.innerHTML = "";

  // Start intervals
  gameInterval = setInterval(spawnShape, 800);
  timerInterval = setInterval(updateTimer, 1000);

  startBtn.disabled = true;
}

// Spawn shapes randomly
function spawnShape() {
  const shape = document.createElement("div");
  shape.classList.add("shape");
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  shape.style.backgroundColor = randomColor;

  // Random position within the play area
  shape.style.top = `${Math.random() * (playArea.offsetHeight - 50)}px`;
  shape.style.left = `${Math.random() * (playArea.offsetWidth - 50)}px`;

  // Add click event
  shape.addEventListener("click", () => {
    if (randomColor === targetColor) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      shape.remove();
    } else {
      score = Math.max(0, score - 1); // Penalize wrong clicks
      scoreDisplay.textContent = `Score: ${score}`;
    }
  });

  playArea.appendChild(shape);

  // Remove shape after 2 seconds
  setTimeout(() => {
    if (playArea.contains(shape)) {
      shape.remove();
    }
  }, 2000);
}

// Update the timer
function updateTimer() {
  timer--;
  timerDisplay.textContent = `Time Left: ${timer}`;
  if (timer <= 0) {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    alert(`Game Over! Your score is ${score}`);
    startBtn.disabled = false;
  }
}

// Attach start button click event
startBtn.addEventListener("click", startGame);
