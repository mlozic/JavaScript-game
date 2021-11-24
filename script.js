'use strict';
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0Elmnt = document.getElementById('score--0');
const score1Elmnt = document.getElementById('score--1');
const currentScore0Elmnt = document.getElementById('current--0');
const currentScore1Elmnt = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const scores = new Array(0, 0);

let currentScore = 0;
let activePlayer = 0;
let winner = -1;
let playing = true;

score0Elmnt.textContent = 0;
score1Elmnt.textContent = 0;

diceEl.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generating dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.Check if rolled num  is 1: if true switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playing = false;
      winner = activePlayer;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector(`.winner`).classList.remove('hidden');
      document.querySelector(`.winner`).textContent = activePlayer;

      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', function () {
  playing = true;
  if (
    document
      .querySelector(`.player--${winner}`)
      .classList.contains('player--winner')
  ) {
    document
      .querySelector(`.player--${winner}`)
      .classList.remove('player--winner');
  }
  scores[0] = 0;
  scores[1] = 0;
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  currentScore = 0;
  currentScore0Elmnt.textContent = currentScore;
  currentScore1Elmnt.textContent = currentScore;
  switchPlayer();
});
