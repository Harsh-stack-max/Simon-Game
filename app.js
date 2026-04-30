// ========================
// 🎮 Variables
// ========================
let userSeq = [];
let gameSeq = [];
let highScore = 0;
let started = false;
let level = 0;

let btns = ["yellow", "red", "purple", "green"];

// ========================
// 📌 DOM Elements
// ========================
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

let allBtns = document.querySelectorAll(".btn");
let startBtn = document.querySelector("#startBtn");

// 👉 Instructions
let instructions = document.querySelector("#instructions");
let startGameBtn = document.querySelector("#startGameBtn");

// ========================
// 📖 Instructions Close
// ========================
startGameBtn.addEventListener("click", function () {
  instructions.style.display = "none";
});

// ========================
// 🚀 Start / Restart Game
// ========================
startBtn.addEventListener("click", function () {
  if (!started) {
    startNewGame();
  }
});

function startNewGame() {
  started = true;

  // reset everything
  userSeq = [];
  gameSeq = [];
  level = 0;

  // enable buttons
  for (let btn of allBtns) {
    btn.style.pointerEvents = "auto";
    btn.addEventListener("click", btnPress);
  }

  levelUp();

  startBtn.innerText = "Game Running...";
  startBtn.disabled = true;
}

// ========================
// ✨ Flash Effects
// ========================
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 300);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => btn.classList.remove("userFlash"), 300);
}

// ========================
// 🔼 Level Up
// ========================
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  gameFlash(randBtn);
}

// ========================
// ✅ Check Answer
// ========================
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    gameOver();
  }
}

// ========================
// ❌ Game Over
// ========================
function gameOver() {
  h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b>`;

  // 🏆 High Score
  if (level - 1 >= highScore) {
    highScore = level - 1;
    h3.innerText = `High Score : ${highScore}`;
  }

  // 🔴 Flash screen
  document.body.style.backgroundColor = "red";
  setTimeout(() => {
    document.body.style.backgroundColor = "#f5f7fa";
  }, 300);

  // disable buttons
  for (let btn of allBtns) {
    btn.style.pointerEvents = "none";
  }

  // 🔥 change button text
  startBtn.innerText = "Play Again";
  startBtn.disabled = false;

  started = false;
}

// ========================
// 👆 Button Press
// ========================
function btnPress() {
  if (!started) return;

  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}