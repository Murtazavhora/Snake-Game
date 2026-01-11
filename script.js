const board = document.querySelector(".board");
const scoreboard = document.querySelector(".score");
const highscoreboard = document.querySelector(".high-score");
const modal = document.querySelector(".modal");
const startBtn = document.querySelector(".btn-start");
const restartBtn = document.querySelector(".restart-btn");

const blockSize = 50;
const rows = Math.floor(board.clientHeight / blockSize);
const cols = Math.floor(board.clientWidth / blockSize);

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;


board.style.setProperty("--rows", rows);
board.style.setProperty("--cols", cols);

let time = 0;
let timeInterval = null;
const timeDisplay = document.querySelector(".Time");


const blocks = {};
let interval;
let snake;
let food;
let direction;
let score = 0;
let highscore = Number(localStorage.getItem("highscore")) || 0;

/* ---------- GRID ---------- */
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const div = document.createElement("div");
    div.classList.add("block");
    board.appendChild(div);
    blocks[`${r}-${c}`] = div;
  }
}

/* ---------- GAME STATE ---------- */
function resetGame() {
  snake = [{ x: 1, y: 3 }];
  direction = "down";
  score = 0;
  time = 0;
  food = spawnFood();
  draw();
}

/* ---------- FOOD ---------- */
function spawnFood() {
  const emptyCells = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!snake.some(s => s.x === r && s.y === c)) {
        emptyCells.push({ x: r, y: c });
      }
    }
  }

  if (emptyCells.length === 0) {
    gameOver(); // board full, player wins
    return null;
  }

  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}


/* ---------- UPDATE ---------- */
function update() {
  const head = { ...snake[0] };

  if (direction === "up") head.x--;
  if (direction === "down") head.x++;
  if (direction === "left") head.y--;
  if (direction === "right") head.y++;

  if (
    head.x < 0 || head.x >= rows ||
    head.y < 0 || head.y >= cols
  ) {
    return gameOver();
  }

  snake.unshift(head);
  if(selfCollision(head)){
    return gameOver();
  }
if (head.x === food.x && head.y === food.y) {
  score++;

  if (score > highscore) {
    highscore = score;
    localStorage.setItem("highscore",highscore);
  }

  food = spawnFood();
} else {
  snake.pop();
}
}

/*----TIMER----*/
function updateTimer() {
  time++;
  timeDisplay.textContent = time;
}
function startTimer() {
  stopTimer();      
  time = 0;         
  timeDisplay.textContent = 0;

  timeInterval = setInterval(updateTimer, 1000);
}
function stopTimer() {
  if (timeInterval) {
    clearInterval(timeInterval);
    timeInterval = null;
  }
}


/*-----------SELF COLLISION--------*/
function selfCollision(head) {
  return snake.slice(1).some(segment =>
    segment.x === head.x && segment.y === head.y
  );
}
/* ---------- DRAW ---------- */
function draw() {
  Object.values(blocks).forEach(b =>
    b.classList.remove("fill", "food")
  );

  snake.forEach(s =>
    blocks[`${s.x}-${s.y}`].classList.add("fill")
  );

  blocks[`${food.x}-${food.y}`].classList.add("food");

  scoreboard.textContent = score;
  highscoreboard.textContent = highscore;
}

/* ---------- LOOP ---------- */
function gameLoop() {
  update();
  draw();
}

/* ---------- GAME OVER ---------- */
function gameOver() {
  clearInterval(interval);
  stopTimer();
  modal.style.display = "flex";
  document.querySelector(".start-game").style.display = "none";
  document.querySelector(".restart").style.display = "flex";

}



/* ---------- CONTROLS ---------- */
addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && direction !== "down") direction = "up";
  if (e.key === "ArrowDown" && direction !== "up") direction = "down";
  if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
  if (e.key === "ArrowRight" && direction !== "left") direction = "right";
});


/* ---------- TOUCH CONTROLS ---------- */
board.addEventListener("touchstart", e => {
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});

board.addEventListener("touchend", e => {
  const touch = e.changedTouches[0];
  touchEndX = touch.clientX;
  touchEndY = touch.clientY;

  handleSwipe();
});
function handleSwipe() {
  const dx = touchEndX - touchStartX;
  const dy = touchEndY - touchStartY;

  // ignore small accidental swipes
  if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return;

  if (Math.abs(dx) > Math.abs(dy)) {
    // horizontal swipe
    if (dx > 0 && direction !== "left") direction = "right";
    else if (dx < 0 && direction !== "right") direction = "left";
  } else {
    // vertical swipe
    if (dy > 0 && direction !== "up") direction = "down";
    else if (dy < 0 && direction !== "down") direction = "up";
  }
}

/* ---------- START / RESTART ---------- */
startBtn.addEventListener("click", () => {
  modal.style.display = "none";
  resetGame();
  startTimer();
  interval = setInterval(gameLoop, 250);

});

restartBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.querySelector(".restart").style.display = "none";
  document.querySelector(".start-game").style.display = "flex";
  resetGame();
  startTimer();
  interval = setInterval(gameLoop, 250);
});

// Sound effects