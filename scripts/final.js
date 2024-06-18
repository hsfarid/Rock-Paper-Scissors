// QUERYING THE DOM
const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissors = document.querySelector(".scissors");
const resultScreen = document.querySelector(".resultScreen");
const scores = document.querySelector(".scores");
const resetScore = document.querySelector(".reset");
const autoPlay = document.querySelector(".auto-play");
let result = "";

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
// if (score === null){
//   score = {
//     wins: 0,
//     losses: 0,
//     ties: 0
//   }
// }
updateScore();

function playGame(playerMove) {
  let computerMove = pickComputerMove();
  if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie";
    } else if (computerMove === "Paper") {
      result = "You lose";
    } else if (computerMove === "Scissors") {
      result = "You win";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You win";
    } else if (computerMove === "Paper") {
      result = "Tie";
    } else if (computerMove === "Scissors") {
      result = "You lose";
    }
  } else if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You lose";
    }
    if (computerMove === "Paper") {
      result = "You win";
    }
    if (computerMove === "Scissors") {
      result = "Tie";
    }
  }

  if (result === "You win") {
    score.wins++;
  } else if (result === "You lose") {
    score.losses++;
  } else if (result === "Tie") {
    score.ties++;
  }
  localStorage.setItem("score", JSON.stringify(score));

  //   resultScreen.textContent = `You chose ${playerMove}, Computer chose ${computerMove}.
  //   ${result}`;

  resultScreen.innerHTML = `You <img src="images/${playerMove}-emoji.png" alt="" />
 <img src="images/${computerMove}-emoji.png" alt="" /> Computer`;

  updateScore();
}

document.body.addEventListener("keydown", (e) => {
  if (e.key === "r" || e.key === "R") {
    playGame("Rock");
  } else if (e.key === "p" || e.key === "P") {
    playGame("Paper");
  } else if (e.key === "s" || e.key === "S") {
    playGame("Scissors");
  }
});

rock.addEventListener("click", () => {
  playGame("Rock");
});

paper.addEventListener("click", () => {
  playGame("Paper");
});

scissors.addEventListener("click", () => {
  playGame("Scissors");
});

resetScore.addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScore();
  //scores.textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
});

function updateScore() {
  document.querySelector(".result").textContent = `${result}`;
  scores.textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }
  return computerMove;
}

let isAutoPlaying = false;
let intervalId;
autoPlay.addEventListener("click", () => {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);

      updateScore();
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
});
