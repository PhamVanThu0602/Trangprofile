const eatSound = new Audio("tunes/eat.mp3");
const loseSound = new Audio("tunes/gameover.mp3");

function playEatSound() { eatSound.play(); }
function playLoseSound() { loseSound.play(); }

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake, food, dx, dy, score, intervalId;
let speed;

function restartGame() {
  const difficulty = document.getElementById("difficulty").value;

  if (difficulty === "easy") speed = 250;
  else if (difficulty === "medium") speed = 150;
  else if (difficulty === "hard") speed = 80;

  document.getElementById("gameOverOverlay").style.display = "none";
  resetGame();
  clearInterval(intervalId);
  intervalId = setInterval(drawGame, speed);
  document.getElementById("startBtn").disabled = true;
}


function drawGame() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = score;
    food = spawnFood();
    playEatSound(); // âm thanh ăn

  } else {
    snake.pop();
  }

  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    playLoseSound();// âm thanh thua
    clearInterval(intervalId);
    document.getElementById("finalScore").innerText = score;
    document.getElementById("gameOverOverlay").style.display = "flex"; 

  }

  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);



  ctx.fillStyle = "#00ff00bf";
  for (let segment of snake) {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function spawnFood() {
  let newFood;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };
    if (!snake.some(s => s.x === newFood.x && s.y === newFood.y)) return newFood;
  }
}

document.addEventListener("keydown", e => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault(); 

    if (e.key === "ArrowUp" && dy === 0) {
      dx = 0; dy = -1;
    } else if (e.key === "ArrowDown" && dy === 0) {
      dx = 0; dy = 1;
    } else if (e.key === "ArrowLeft" && dx === 0) {
      dx = -1; dy = 0;
    } else if (e.key === "ArrowRight" && dx === 0) {
      dx = 1; dy = 0;
    }
  }
});


document.getElementById("startBtn").addEventListener("click", () => {
  const difficulty = document.getElementById("difficulty").value;

  if (difficulty === "easy") speed = 250;
  else if (difficulty === "medium") speed = 150;
  else if (difficulty === "hard") speed = 80;

  resetGame();
  clearInterval(intervalId);
  intervalId = setInterval(drawGame, speed);
  document.getElementById("startBtn").disabled = true;
});


function resetGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 1;
  dy = 0;
  score = 0;
  document.getElementById("score").innerText = score;
  food = spawnFood();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
