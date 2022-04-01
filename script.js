'use strict'

/*console.log(document.querySelector('.message').textContent)

//setting the text content
document.querySelector('.message').textContent = 'Correct Number'
document.querySelector('.number').textContent = '2'
document.querySelector('.score').textContent = '69'

document.querySelector('.guess').value = 69
console.log(document.querySelector('.guess').value)*/

//State variables
let secretNum = Math.trunc(Math.random() * 20) + 1

let gleft = 7

let highScore = 0

let guess = 0

let score = 0

//function to calculate score from the number of guesses left
const calcScore = n => n * 10

//To handle the click of `check`
const handleClickCheck = function () {
  guess = Number(document.querySelector('.guess').value)
  console.log(guess, typeof guess)
  if (gleft > 1) {
    //No input
    if (!guess) {
      document.querySelector('.message').textContent = '⛔ No Number Entered.'

      //Correct number
    } else if (guess === secretNum) {
      document.querySelector('.message').textContent = '🎉 Correct Number!!!'
      document.querySelector('body').style.backgroundColor = '#3DC22C'
      document.querySelector('.number').style.width = '30rem'
      document.querySelector('.number').textContent = secretNum
      score = calcScore(gleft)
      document.querySelector('.score').textContent = score
      highScore = Math.max(highScore, score)
      document.querySelector('.highscore').textContent = highScore
      document.getElementById('guessField').disabled = true

      //Number not equal
    } else if (guess !== secretNum) {
      document.querySelector('.message').textContent =
        guess < secretNum
          ? '📉 Too low! Enter again.'
          : '📈 Too high! Enter again.'
      gleft--
      score = calcScore(gleft)
      document.querySelector('.guess-left').textContent = gleft
      document.querySelector('.score').textContent = score

      //Number too low
    }
  } else {
    gleft = 0
    score = calcScore(gleft)
    document.querySelector('.score').textContent = score
    document.querySelector('.guess-left').textContent = gleft
    document.querySelector('.message').textContent = '👊🔴 GAME OVER!!! 🔴👊'
    document.querySelector('body').style.backgroundColor = '#ff3131'
    document.getElementById('guessField').disabled = true
  }
}

const handleReset = function () {
  secretNum = Math.trunc(Math.random() * 20) + 1
  score = 0
  gleft = 7
  document.querySelector('.number').textContent = '?'
  document.getElementById('guessField').disabled = false
  document.querySelector('.score').textContent = score
  document.querySelector('.guess-left').textContent = gleft
  document.querySelector('body').style.backgroundColor = '#222'
  document.querySelector('.number').style.width = '15rem'
  document.querySelector('.message').textContent = 'Start guessing...'
  //document.getElementById('guessField').reset()
  document.querySelector('.guess').value = ''
}

document.querySelector('.btn.check').addEventListener('click', handleClickCheck)

document.querySelector('.btn.again').addEventListener('click', handleReset)
