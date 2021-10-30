'use strict';

const player0El = document.querySelector('.player0');
const player1El = document.querySelector('.player1');
const player0Score = document.querySelector('.player0Score');
const player1Score = document.querySelector('.player1Score');
const player0CurrentScore = document.querySelector('.player0CurrScorePoint');
const player1CurrentScore = document.querySelector('.player1CurrScorePoint');
const dice = document.querySelector('.diceImage');
const rollDice = document.querySelector('.rollDice');
const diceImage = document.querySelector('.diceImage');
const hold = document.querySelector('.hold');
const newGame = document.querySelector('.btn-new-game');
const currScore0 = document.querySelector('.current--0');
const currScore1 = document.querySelector('.current--1');

let gameStatus = true;

let totalScore = [0, 0];
let currScore = 0;
let activePlayer = 0;

//function to switch player
function switchPlayer() {
  document.querySelector(`.current--${activePlayer}`).textContent = 0;
  currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player-active');
  player1El.classList.toggle('player-active');
}

//start conditions
player0Score.textContent = 0;
player1Score.textContent = 0;
dice.classList.add('hidden');

//dice is rolled
rollDice.addEventListener('click', function () {
  if (gameStatus) {
    //generating a random number
    let diceRandomNumber = Math.trunc(Math.random() * 6) + 1;
    //displaying the dice image according to the random number generated

    diceImage.src = `images/dice-${diceRandomNumber}.png`;

    //checking it the random nunmber is not 1
    if (diceRandomNumber !== 1) {
      currScore += diceRandomNumber;
      document.querySelector(`.current--${activePlayer}`).textContent =
        currScore;
      dice.classList.remove('hidden');
    }
    //if random number is 1 then switching to the next player
    else {
      switchPlayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (gameStatus) {
    //saving the current of the active player and show the total score.
    totalScore[activePlayer] = totalScore[activePlayer] + currScore;
    document.querySelector(`.player${activePlayer}Score`).textContent =
      totalScore[activePlayer];

    //check if(totalScore === 100)
    if (totalScore[activePlayer] >= 20) {
      dice.classList.add('hidden');
      gameStatus = false;
      document
        .querySelector(`.player${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`.player${activePlayer}`)
        .classList.remove('player-active');
    } else {
      //switchPlayer
      switchPlayer();
    }
  }
});

//when new game button is pressed
newGame.addEventListener('click', function () {
  console.log('new game');
  player0Score.textContent = 0;
  player1Score.textContent = 0;
  currScore0.textContent = 0;
  currScore1.textContent = 0;

  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');
  player0El.classList.remove('player-winner');
  player1El.classList.remove('player-winner');
  dice.classList.add('hidden');

  gameStatus = true;
  totalScore = [0, 0];
  activePlayer = 0;
  currScore = 0;
});
