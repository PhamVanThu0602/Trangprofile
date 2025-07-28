const startScreen = document.getElementById("start-screen");
const gameContainer = document.querySelector(".container");

const questions = [
  {
    word: "apple",
    image: "images/apple.jpg",
    hint: "A red or green fruit."
  },
  {
    word: "cat",
    image: "images/cat.jpg",
    hint: "A small animal that says 'meow'."
  },
  {
    word: "sun",
    image: "images/sun.jpg",
    hint: "It's bright, hot, and in the sky."
  },
  {
    word: "book",
    image: "images/book.jpg",
    hint: "You read it."
  },
  {
    word: "fish",
    image: "images/ca.jpg",
    hint: "It swims in water."
  },
  {
    word: "cake",
    image: "images/banh.jpg",
    hint: "A sweet dessert often eaten on birthdays."
  },
  {
    word: "phone",
    image: "images/phone.jpg",
    hint: "You use it to call people."
  },
  {
    word: "train",
    image: "images/train.jpg",
    hint: "A long vehicle that runs on tracks."
  },
  {
    word: "chair",
    image: "images/chair.jpg",
    hint: "You sit on it."
  },
  {
    word: "bread",
    image: "images/banhmi.jpg",
    hint: "You may toast it or eat it with butter."
  }
];


let currentIndex = 0;
let score = 0;
let wrongGuesses = 0;
let timeLeft = 15;
let timer;

const imageDiv = document.getElementById("image");
const wordDisplay = document.getElementById("word-display");
const letterButtons = document.getElementById("letter-buttons");
const hint = document.getElementById("hint");
const hintText = document.getElementById("hint-text");
const message = document.getElementById("message");
const timerDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("point");

function startGame() {
  startScreen.style.display = "none";
  gameContainer.style.display = "block";
  displayQuestion();
  createButtons();
  startTimer();
}

function displayQuestion() {
  const q = questions[currentIndex];
  imageDiv.innerHTML = `<img src="${q.image}" alt="question image" />`;
  hint.style.display = "none";
  hintText.textContent = q.hint;
  message.textContent = "";
  wrongGuesses = 0;
  timeLeft = 15;
  timerDisplay.textContent = timeLeft;
  let word = q.word.toUpperCase();
  wordDisplay.textContent = "_ ".repeat(word.length).trim();
}

function createButtons() {
  letterButtons.innerHTML = "";

  const rows = [
    "YTREWQPIOU",
    "ADFGHKJLS",
    "BCNVMXZ"
  ];

  rows.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("keyboard-row");

    row.split("").forEach(letter => {
      const btn = document.createElement("button");
      btn.textContent = letter;
      btn.addEventListener("click", () => handleGuess(letter, btn));
      rowDiv.appendChild(btn);
    });

    letterButtons.appendChild(rowDiv);
  });
}


function handleGuess(letter, btn) {
  btn.disabled = true;
  const word = questions[currentIndex].word.toUpperCase();
  let display = wordDisplay.textContent.split(" ");
  let found = false;

  word.split("").forEach((ch, i) => {
    if (ch === letter) {
      display[i] = letter;
      found = true;
    }
  });

  wordDisplay.textContent = display.join(" ");

  if (!found) {
    wrongGuesses++;
    if (wrongGuesses === 2) hint.style.display = "block";
    if (wrongGuesses >= 5) gameOver();
  }

  if (display.join("") === word) {
    score++;
    scoreDisplay.textContent = score;
    nextQuestion();
  }
}

function nextQuestion() {
  clearInterval(timer);
  currentIndex = (currentIndex + 1) % questions.length;
  setTimeout(() => {
    displayQuestion();
    createButtons();
    startTimer();
  }, 1000);
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      gameOver();
    }
  }, 1000);
}

function gameOver() {
  localStorage.setItem("lastWord", questions[currentIndex].word);
  localStorage.setItem("score", score);
  window.location.href = "gameover.html";
}

