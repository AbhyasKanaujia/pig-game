'use strict';

const $score0 = document.getElementById('score--0');
const $score1 = document.getElementById('score--1');
const $currentScore0 = document.getElementById("current--0");
const $currentScore1 = document.getElementById("current--1");
const $dice = document.querySelector('.dice');
const $newGameButton = document.querySelector('.btn--new');
const $rollButton = document.querySelector('.btn--roll');
const $holdButton = document.querySelector('.btn--hold');

// Game state
const highScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const initGame = function () {
    $score0.textContent = "0";
    $score1.textContent = "0";
    $currentScore0.textContent = "0";
    $currentScore1.textContent = "0";
    $rollButton.classList.remove('hidden');
    $holdButton.classList.remove('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    currentScore = 0;
    activePlayer = 0;
    highScores[0] = 0;
    highScores[1] = 0;
    $dice.classList.add('hidden');
    document.querySelector(".player--0").classList.add('player--active');
    document.querySelector(".player--1").classList.remove('player--active');
    $dice.classList.add('hidden');
}

function getRandomDiceRoll() {
    return Math.trunc(Math.random() * 6) + 1;
}

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = "0";
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
}

$rollButton.addEventListener('click', function () {
    const roll = getRandomDiceRoll();

    $dice.classList.remove('hidden');
    $dice.src = `img/dice-${roll}.png`;

    if (roll !== 1) {
        currentScore += roll;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayer();
    }
})

$holdButton.addEventListener('click', function () {
    highScores[activePlayer] = highScores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = `${highScores[activePlayer]}`;
    $dice.classList.add('hidden');
    if (highScores[activePlayer] >= 100) {
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        $rollButton.classList.add('hidden');
        $holdButton.classList.add('hidden');
    } else {
        switchPlayer();
    }
})

$newGameButton.addEventListener('click', initGame);

initGame();
