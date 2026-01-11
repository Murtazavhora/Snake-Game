# 🐍 Snake Game

![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)
![Deployment](https://img.shields.io/badge/Deployed-Vercel-black)

A browser-based Snake Game built with HTML, CSS, and Vanilla JavaScript.  
The game includes keyboard and mobile touch controls, a game timer, persistent high score storage, and self-collision detection.

The project is designed to work smoothly on both desktop and mobile devices.

---

## 🚀 Live Demo

Play the game here:  
https://snakegame-one-steel.vercel.app/

---

## 📖 Overview

This is a grid-based Snake game where the player controls a snake that moves continuously across the board.

- The snake grows by eating food
- The score increases with each food item
- The game ends when the snake hits a wall or collides with itself
- A modal-based flow manages game start and restart

---

## 📁 Project Structure

Snake_Game/
│
├── index.html # Game UI, scoreboard, modals
├── style.css # Board layout, UI styling, touch handling
├── script.js # Game logic, timer, controls, persistence
└── README.md


---

## ▶️ How to Run

### Option 1: Open Directly
Open `index.html` in any modern web browser.

### Option 2: Run via Local Server 

```bash
python -m http.server 8000
Then open:

http://localhost:8000
To test on a mobile device:

http://<your-local-ip>:8000
Ensure both devices are connected to the same Wi-Fi network.

🎮 Controls
Desktop
Arrow Up — Move Up

Arrow Down — Move Down

Arrow Left — Move Left

Arrow Right — Move Right

Mobile
Swipe Up, Down, Left, or Right on the game board

Touch scrolling is disabled to ensure accurate swipe input

🧠 Gameplay Mechanics
The game board is a grid of square cells (blockSize = 50px)

Grid dimensions (rows, cols) are calculated dynamically

The snake is represented as an array of { x, y } coordinates

Game Loop
On each game tick:

A new head is added in the current direction

The tail is removed unless food is eaten

Food Logic
Food spawns only in empty grid cells

Eating food increases the score and grows the snake

⏱️ Timer
Tracks the duration of the current run in seconds

Starts when the game begins

Stops on game over

Resets correctly on restart

🏆 Score & High Score
Score increases by 1 for each food eaten

High Score:

Stored using localStorage

Persists across page reloads

Updates immediately when beaten

🔑 Key Variables (script.js)
Variable	Description
blockSize	Size of each grid cell (default: 50px)
rows, cols	Computed grid dimensions
snake	Array of snake segments
food	Current food position
interval	Main game loop interval
timeInterval	Timer interval
highscore	Persistent high score

✨ Features
Grid-based movement

Food spawns only in empty cells

Self-collision detection

Boundary collision detection

Keyboard controls

Mobile swipe controls

Game timer

Persistent high score using localStorage

Start and restart modal flow

Clean separation of game logic and rendering

Deployed on Vercel


