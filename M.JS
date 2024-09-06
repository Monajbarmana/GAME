let player = document.getElementById("player");
let obstacle = document.getElementById("obstacle");
let scoreElement = document.getElementById("score");
let score = 0;
let jumping = false;

document.body.onkeydown = function (e) {
  if (e.key === " " || e.key === "ArrowUp") {
    jump();
  }
};

function jump() {
  if (jumping) return;
  jumping = true;
  let jumpCount = 0;

  let jumpInterval = setInterval(function () {
    if (jumpCount < 15) {
      player.style.bottom = `${parseInt(player.style.bottom) + 5}px`;
    }
    if (jumpCount >= 15 && jumpCount < 30) {
      player.style.bottom = `${parseInt(player.style.bottom) - 5}px`;
    }
    if (jumpCount >= 30) {
      clearInterval(jumpInterval);
      jumping = false;
    }
    jumpCount++;
  }, 20);
}

function checkCollision() {
  let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
  let obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));
  let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

  if (obstacleRight >= 0 && obstacleRight <= 50 && playerBottom <= 50) {
    alert("Game Over! Final Score: " + score);
    score = 0;
    obstacle.style.animation = "none";
    setTimeout(function () {
      obstacle.style.animation = "moveObstacle 2s infinite linear";
    }, 10);
  }
}

function updateScore() {
  score++;
  scoreElement.textContent = "Score: " + score;
}

setInterval(checkCollision, 10);
setInterval(updateScore, 100);
