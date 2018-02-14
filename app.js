/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Variables

var scores, roundScore, activePlayer, diceDOM, gamePlaying, lastDice;

init();

diceDOM = document.querySelector(".dice");

document.querySelector(".btn-roll").addEventListener("click", function(){
    if (gamePlaying) {
        // 1. Random number
    var dice = Math.floor( Math.random() * 6 ) + 1;
    // 2. Display the result
    diceDOM.src = "dice-" + dice + ".png"
    diceDOM.style.display = "block";
    if (dice === 6 && dice === lastDice) {
        console.log("dos 6 seguidos");
        nextPlayer();
    }else {
        // Update the round score, only if the rolled number was NOT a 1 and the rolled number was not a 6 in a row
        if (dice !== 1) {
            // Add score
            roundScore += dice;
            lastDice = dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }else {
            // Reseting roundScore and Next Player
            console.log("ha sacado un 1");
            nextPlayer();
        }
    }

    } 
});

document.querySelector(".btn-hold").addEventListener("click", function(){

    if (gamePlaying) {
            // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game 
    if (scores[activePlayer] >= 100) {
        document.getElementById("name-" + activePlayer).textContent = "Winner!"; 
        diceDOM.style.display = "none";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        gamePlaying = false;
    } else {
        //  Reset roundScore and Next Player
        nextPlayer();
    }
    } 
});

function nextPlayer () {
    roundScore = 0;
    lastDice = 0;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    diceDOM.style.display = "none";
    document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("active");
    // Next player
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("active"); 
}

document.querySelector(".btn-new").addEventListener("click", init);

function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    lastDice = 0;

    document.querySelector(".dice").style.display = "none";

    document.getElementById("score-0").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById("name-0").textContent = "Player 1"; 
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner"); 
    document.querySelector(".player-1-panel").classList.remove("winner"); 
    document.querySelector(".player-0-panel").classList.add("active");
}