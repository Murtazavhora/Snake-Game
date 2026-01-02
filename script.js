const board = document.querySelector(".board");
const scoreboard = document.querySelector(".score");
const highscoreboard = document.querySelector(".high-score");
const modal = document.querySelector(".modal");
const startBtn = document.querySelector(".btn-start");
const restartBtn = document.querySelector(".restart-btn");

const blockSize = 50;
const rows = Math.floor(board.clientHeight / blockSize);
const cols = Math.floor(board.clientWidth / blockSize);

board.style.setProperty("--rows", rows);
board.style.setProperty("--cols", cols);

const blocks = {};
let interval;

let snake;
let food;
let direction;
let score = 0;
let highscore = 0;

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
if (head.x === food.x && head.y === food.y) {
  score++;

  if (score > highscore) {
    highscore = score;
  }

  food = spawnFood();
} else {
  snake.pop();
}

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

/* ---------- START / RESTART ---------- */
startBtn.addEventListener("click", () => {
  modal.style.display = "none";
  resetGame();
  interval = setInterval(gameLoop, 250);
});

restartBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.querySelector(".restart").style.display = "none";
  document.querySelector(".start-game").style.display = "flex";
  resetGame();
  interval = setInterval(gameLoop, 250);
});
