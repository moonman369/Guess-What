"use strict";

/*console.log(document.querySelector('.message').textContent)
//setting the text content
document.querySelector('.message').textContent = 'Correct Number'
document.querySelector('.number').textContent = '2'
document.querySelector('.score').textContent = '69'
document.querySelector('.guess').value = 69
console.log(document.querySelector('.guess').value)*/

//State variables
let secretNum = Math.trunc(Math.random() * 20) + 1;

let gleft = 7;

let highScore = 0;

let guess = 0;

let score = 0;

//Modal and overlay objects
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

//function to calculate score from the number of guesses left
const calcScore = (n) => n * 10;

//function to display suitable message
const displayMessage = (message) =>
  (document.querySelector(".message").textContent = message);

//To handle the click event on `check`
const handleClickCheck = function () {
  guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  if (gleft > 1) {
    //No input
    if (!guess) {
      displayMessage("⛔ No Number Entered.");

      //Correct number
    } else if (guess === secretNum) {
      displayMessage("✅ Correct Number!!!");
      document.querySelector("body").classList.add("winner");
      document.querySelector(".number").textContent = secretNum;
      document.querySelector(".number").style.width = "25rem";
      score = calcScore(gleft);
      document.querySelector(".score").textContent = score;
      highScore = Math.max(highScore, score);
      document.querySelector(".highscore").textContent = highScore;
      document.getElementById("guessField").disabled = true;

      //Number not equal
    } else if (guess !== secretNum) {
      if (guess < secretNum)
        displayMessage("📉 Too low! Enter again."); //Number too low
      else displayMessage("📈 Too high! Enter again."); //Number too high
      gleft--;
      score = calcScore(gleft);
      document.querySelector(".guess-left").textContent = gleft;
      document.querySelector(".score").textContent = score;

      //Game Over
    }
  } else {
    gleft = 0;
    score = calcScore(gleft);
    document.querySelector(".score").textContent = score;
    document.querySelector(".guess-left").textContent = gleft;
    document.querySelector(".number").textContent = secretNum;
    document.querySelector(".number").style.width = "25rem";
    displayMessage("👊🔴 GAME OVER!!! 🔴👊");
    document.querySelector("body").classList.add("loser");
    document.getElementById("guessField").disabled = true;
  }
};

//Handling click event on `Again`
const handleReset = function () {
  secretNum = Math.trunc(Math.random() * 20) + 1;
  score = 0;
  gleft = 7;
  document.querySelector(".number").textContent = "?";
  document.getElementById("guessField").disabled = false;
  document.querySelector(".score").textContent = score;
  document.querySelector(".guess-left").textContent = gleft;
  document.querySelector("body").classList.contains("winner")
    ? document.querySelector("body").classList.remove("winner")
    : document.querySelector("body").classList.remove("loser");

  document.querySelector(".number").style.width = "15rem";
  displayMessage("Start guessing...");
  //document.getElementById('guessField').reset()
  document.querySelector(".guess").value = "";
};

//Handling click event on `Instructions`
const handleInstructions = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//Event handler for close instructions
const handleCloseInstuctions = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//Event Listener for click event on `Check`
document
  .querySelector(".btn.check")
  .addEventListener("click", handleClickCheck);

//Event Listener for global `keyup` event
document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    handleClickCheck();
  }
});

//Event Listener for click event on `Again`
document.querySelector(".btn.again").addEventListener("click", handleReset);

//Event Listener for click on 'Inctructions'
document
  .querySelector(".btn.instruc")
  .addEventListener("click", handleInstructions);

//Close Instructions
//Click X
document
  .querySelector(".close-modal")
  .addEventListener("click", handleCloseInstuctions);
//Click overlay
overlay.addEventListener("click", handleCloseInstuctions);
//Keydown ESC
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape" && !modal.classList.contains("hidden"))
    handleCloseInstuctions();
});
