# Snake Game

A simple browser-based Snake game implemented with HTML, CSS and JavaScript.

**Overview:**
- The game renders a grid-based board and moves a single-player snake that grows when it eats food. Hitting the board edge ends the game.

**Files:**
- `index.html`: game UI and modal controls.
- `style.css`: game board and UI styles.
- `script.js`: game logic (grid creation, snake movement, food spawning, score handling).

**How to run:**
- Open [index.html](index.html) in any modern browser.
- Or serve the folder and open `http://localhost:8000` (example using Python):


**Controls:**
- Arrow keys: move the snake (↑ ↓ ← →).
- Click the Start button in the modal to begin.
- Use the Restart button after a game over to play again.

**Gameplay & Behaviour:**
- The board is built from square blocks; the grid size is calculated from `blockSize` and the board element's dimensions.
- The snake is represented as an array of coordinates. Each frame the head moves one cell in the current direction and the tail is removed unless food is eaten.
- Eating food increases the score and spawns new food in a random empty cell.
- Hitting the board boundary triggers the game over modal.
- A runtime `highscore` is tracked while the page is open; it is not persisted to storage by default.

**Important variables (in `script.js`):**
- `blockSize` — pixel size of each grid square (default 50).
- `rows`, `cols` — computed grid dimensions based on the board size.
- `interval` — game loop timer (controls speed).

**Ideas / Next steps:**
- Persist `highscore` to `localStorage` to survive page reloads.
- Add mobile touch controls or on-screen buttons.
- Improve collision rules (wrap-around or self-collision detection) and add levels/speed increase.

**License & Credits:**
- Simple demo project — feel free to adapt and extend.
