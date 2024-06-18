// QUERYING THE DOM
const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissors = document.querySelector(".scissors");
const resultScreen = document.querySelector(".resultScreen");
const scores = document.querySelector(".scores");
const resetScore = document.querySelector(".reset");
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

  resultScreen.textContent = `You chose ${playerMove}, Computer chose ${computerMove}.
  ${result}`;
  scores.textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

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
  scores.textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
});

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
