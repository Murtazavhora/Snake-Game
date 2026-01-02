const board = document.querySelector(".board");
const blockheight = 50;
const blockwidth = 50;

const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockheight);

const blocks = {};
const snake = [
  { x: 1, y: 3 },
  { x: 1, y: 4 },
  { x: 1, y: 5 }
];

let direction = "left";

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row}-${col}`] = block;
  }
}

function render() {
  // clear board first
  Object.values(blocks).forEach(b => b.classList.remove("fill"));

  snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });
}

setInterval(() => {
  let head;

  if (direction === "left") {
    head = {
      x: snake[0].x,
      y: snake[0].y - 1
    };
  }

  snake.unshift(head);
  snake.pop();

  render();
}, 1000);
