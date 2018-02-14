/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Variables

var scores, roundScore, activePlayer, diceDOM1,diceDOM2, gamePlaying, winningScore;

init();

diceDOM1 = document.getElementById("dice-1");
diceDOM2 = document.getElementById("dice-2");

document.querySelector(".btn-roll").addEventListener("click", function(){
    if (gamePlaying) {
        // 1. Random number
    var dice1 = Math.floor( Math.random() * 6 ) + 1;
    var dice2 = Math.floor( Math.random() * 6 ) + 1;
    // 2. Display the result
    diceDOM1.src = "dice-" + dice1 + ".png"
    diceDOM1.style.display = "block";
    diceDOM2.src = "dice-" + dice2 + ".png"
    diceDOM2.style.display = "block";
    if (dice1 === 6 && dice2 === 6) {
        scores[activePlayer] = 0;
        document.querySelector("#score-" + activePlayer).textContent = 0;
        nextPlayer();
    }else {
        // Update the round score, only if the rolled number was NOT a 1 and the rolled number was not a 6 in a row
        if ((dice1 !==1) && (dice2 !== 1)) {
            // Add score
            roundScore += dice1 + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }else {
            // Reseting roundScore and Next Player
            console.log("1 " + dice1 + " 2 " + dice2 );
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
    points = document.getElementById("points").value;
    if (points && points > 0) {
        winningScore = points;
    } else {
        points = document.getElementById("points").value = 100;
        winningScore = 100;
    }
    if (scores[activePlayer] >= winningScore) {
        document.getElementById("name-" + activePlayer).textContent = "Winner!"; 
        diceDOM1.style.display = "none";
        diceDOM2.style.display = "none";
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
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    diceDOM1.style.display = "none";
    diceDOM2.style.display = "none";
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
    points = document.getElementById("points").value;

    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";

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