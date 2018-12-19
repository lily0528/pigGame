if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../sw.js')
    .then(registration => {
      console.log('Service Worker is registered', registration);
    })
    .catch(err => {
      console.error('Registration failed:', err);
    });
  });
}

const rollButton = document.querySelector('.btn-roll');
const dice1 = document.querySelector('.dice1');
const dice2 = document.querySelector('.dice2');
const holdButton = document.querySelector('.btn-hold');
const newGameButton = document.querySelector('.btn-new');
const rulesButton = document.querySelector('.btn-rules');
let rulesConfirmButton;

let gameOver = false;
let currentPlayer = 0;
let currentRoundScore = 0;
let winCondition = 100;
let gameLength = 1;

const game = {
    player0Current: document.getElementById('current-0'),
    player1Current: document.getElementById('current-1'),
    player0Score: document.getElementById('score-0'),
    player1Score: document.getElementById('score-1'),
    player0Panel: document.querySelector('.player-0-panel'),
    player1Panel: document.querySelector('.player-1-panel'),
    player0Name: document.getElementById('name-0'),
    player1Name: document.getElementById('name-1'),
    player0Total: 0,
    player1Total: 0,
    player0Wins: 0,
    player1Wins: 0,
}

const random = function() {
    return Math.floor((Math.random() * 6) + 1);
}

const togglePlayer = function() {
    currentPlayer = currentPlayer === 0 ? 1 : 0
}

const rulesOfTheGame = function() {
    swal({ 
        title: "Rules of Pig",
        confirmButtonClass: "rules",
        html: `
            <p><strong>Here are the rules:</strong></p>
            <div> No Punching </div>
            <div> No Cellphones </div>
            <div> Roll Big or Go home </div>
            <label>
                Points to Win
                <input type="number" id="win-condition" value="100">
            </label>
            <label>
                Rounds to Win
                <input type="number" id="game-length" value="3">
            </label>
        `
    }); 
}

const resetGame = function(){
    currentRoundScore = 0;
    game.player0Total = 0;
    game.player1Total = 0;
    gameOver = false;
    game.player0Score.textContent = 0;
    game.player1Score.textContent = 0;
    game.player0Name.textContent = "PLAYER 1"
    game.player1Name.textContent = "PLAYER 2"
}


newGameButton.addEventListener('click', function() {
    resetGame();
    numberOfWins = 0;
    rulesOfTheGame();
});

rollButton.addEventListener('click', function(e) {
    if(!gameOver) {
        const random1 = random();
        const random2 = random();

        dice1.src = `images/dice-${random1}.png`;
        dice2.src = `images/dice-${random2}.png`;

        if(random1 === 1 || random2 === 1) {            
            game[`player${currentPlayer}Current`].textContent = 0;
            currentRoundScore = 0;
            swal("Uh-Oh", "Sorry, you rolled a 1!", "error")
            game.player0Panel.classList.toggle('active');
            game.player1Panel.classList.toggle('active');
            togglePlayer();
        } else {
            currentRoundScore += random1 + random2;
            game[`player${currentPlayer}Current`].textContent = currentRoundScore;
        }
    }
});

holdButton.addEventListener('click', function() {
    if(!gameOver) {
        game[`player${currentPlayer}Total`] += currentRoundScore;
        game[`player${currentPlayer}Current`].textContent = 0;
        game[`player${currentPlayer}Score`].textContent = game[`player${currentPlayer}Total`];
        currentRoundScore = 0;

        if(game[`player${currentPlayer}Total`] >= winCondition) {
            game[`player${currentPlayer}Wins`]++;
            if(game[`player${currentPlayer}Wins`] >= gameLength) {
                swal({
                    title: "You Won Everything",
                    text: `Player ${currentPlayer + 1} WINS the Everything!`,
                    type: 'success',
                    confirmButtonClass: 'winner'
                });
            } else {
                swal({
                    title: "You Won This Round",
                    text: `Player ${currentPlayer + 1} WINS the round!`,
                    type: 'success',
                    confirmButtonClass: 'reset'
                });
            }
            game[`player${currentPlayer}Name`].textContent = "WINNER!!!"
            gameOver = true;
        } else {
            game.player0Panel.classList.toggle('active');
            game.player1Panel.classList.toggle('active');
            togglePlayer();
        }
    }
});

rulesButton.addEventListener('click', rulesOfTheGame);

document.body.addEventListener('click', function(e){
    if(e.target.classList.contains('rules')) {
        const winConditionElement = document.getElementById('win-condition');
        const gameLengthElement = document.getElementById('game-length');

        winCondition = winConditionElement.value;
        gameLength = gameLengthElement.value;
    }

    if(e.target.classList.contains('reset')) {  
        resetGame();
    }

    if(e.target.classList.contains('winner')) {
        resetGame();
        numberOfWins = 0;
        rulesOfTheGame();
    }
});

rulesOfTheGame();

