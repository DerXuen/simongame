const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;
let clickable = false;

document.getElementById("start-btn").addEventListener("click", function () {
  if (!started) {
    started = true;
    level = 0;
    gamePattern = [];
    nextSequence();
  }
});

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function () {
    if (!clickable || !started) return;

    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  });
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;

  const randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColor);

  clickable = false;
  playSequence();
}

function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    const color = gamePattern[i];
    flash(color);
    playSound(color);
    i++;
    if (i >= gamePattern.length) {
      clearInterval(interval);
      clickable = true;
    }
  }, 600);
}

function flash(color) {
  const btn = document.getElementById(color);
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 200);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  flash(currentColor);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 200);
    document.getElementById("level-title").textContent = "Game Over, Press Start to Restart";
    startOver();
  }
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  clickable = false;
}
