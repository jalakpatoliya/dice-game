/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, active, inactive;
init();


document.querySelector('.btn-roll').addEventListener("click", function () {
    console.log("active player:",activePlayer);
    dice = Math.ceil(Math.random() * 6);
    document.querySelector('.dice').src = `dice-${dice}.png`;
    document.querySelector('#score-0').textContent = scores[0];
    document.querySelector('#score-1').textContent = scores[1];
    checkActive();
    if (dice == 1) {
        document.querySelector('.player-' + active + '-panel').classList.remove("active")
        document.querySelector('.player-' + inactive + '-panel').classList.add("active")
        document.querySelector('#current-' + active).textContent = 0;
        activePlayer = inactive;
        roundScore = 0
    } else {
        roundScore = roundScore + dice
        document.querySelector('#current-' + active).textContent = roundScore;
    }
})

document.querySelector('.btn-hold').addEventListener("click", function () {
    console.log("active player:", activePlayer);
    checkActive()
    if (activePlayer == active) {
        scores[active] = scores[active] + roundScore;
        roundScore = 0;
        activePlayer = inactive;
        document.querySelector('#current-' + active).textContent = roundScore;
        document.querySelector('#score-' + active).textContent = scores[active];
        if (scores[active] >= 1) {
            document.querySelector(`#name-${active}`).textContent = "Winner!"
            document.querySelector(`.player-${active}-panel`).classList.add("winner")
            document.querySelector('.btn-roll').style.display = "none";
            document.querySelector('.btn-hold').style.display = "none";
        } 
    }
});

document.querySelector('.btn-new').addEventListener("click",function () {
    // location.reload()
    var player;
    activePlayer === 0 ? (player = 1) : (player = 0)

    init();
    
    document.querySelector(`.player-${player}-panel`).classList.remove("winner");
    document.querySelector(`#name-${player}`).textContent = `PLAYER ${player+1}`;
    
});

function checkActive() {
    activePlayer === 0 ? (active=0,inactive=1):(active=1,inactive=0)
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('.btn-roll').style.display = "block";
    document.querySelector('.btn-hold').style.display = "block";
    document.querySelector('.player-1-panel').classList.remove("active");
    document.querySelector('.player-0-panel').classList.add("active");
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('.player-current-score').textContent = 0;
    document.querySelector('.dice').src = "dice-5.png";
}