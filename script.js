/*

There would be 5 rounds of Rock Paper Scissors

Input: "Rock", "Paper", "Scissors" -- Text
Input shouldn't be case sensitive

Then computer randomly picks either Rock, Paper or Scissors

We check who won based upon the rules of the game:
Rock (beats) -> Scissors
Scissors -> Paper
Paper -> Rock

*/


const MSG_WON = 'You won!';
const MSG_LOST = 'You lost!';
const MSG_DRAW = 'It\'s a draw!'

const choiceBtns = document.querySelectorAll('.player-choices>button');
const resetBtn = document.querySelector('button.reset');
const pWins = document.querySelector('.wins');
const pDraws = document.querySelector('.draws');
const pLoses = document.querySelector('.loses');
const pRoundNumber = document.querySelector('.round-number')
const pGameOverMessage = document.querySelector('.gameover')

let computerChoice = '';
let playerChoice = '';

// Computer score is number of rounds player lose 
let computerScore = 0;
let playerScore = 0;
let drawCount = 0;

let roundsPlayed = 0;

resetBtn.addEventListener('click', setGame)

function handleEvents(e){
    computerChoice = makeRandomChoice();
    playerChoice = this.className; // Class names are '.rock' , '.paper' , and '.scissors' obviosly 
    playRound(playerChoice, computerChoice);

    if (roundsPlayed === 5) {
        choiceBtns.forEach(function(button){
            button.removeEventListener('click', handleEvents);
        })
        setGameOverMessage(playerScore, computerScore);
    }
}


function resetValues(){

    roundsPlayed = 0;
    pRoundNumber.textContent = roundsPlayed;

    computerScore = 0;
    pLoses.textContent = computerScore;

    playerScore = 0;
    pWins.textContent = playerScore;

    drawCount = 0;
    pDraws.textContent = drawCount;

    pGameOverMessage.textContent = '';
}

function setGame(){

    resetValues();

    choiceBtns.forEach(function(button){
        button.addEventListener('click', handleEvents)
    })    
    
}

//Let the computer choose with RNG

//Will return the computer choice

function makeRandomChoice(){

    console.log('Computer\'s choosing');

    let randomNumber = Math.floor(Math.random() * 3) 
    /*  randomNumber will be between 0 and 2
        since Math.random() will return [0,1) number
        0 * 3 = 0 anyways and 0,999 * 3 = 2 when floored
    */

    if (randomNumber == 0) return 'rock'
    if (randomNumber == 1) return 'paper'
    if (randomNumber == 2) return 'scissors'



}

//Deciding who won

//Checking if it is a draw
function isDraw(player, computer){

    console.log('Checking if it\'s a draw');

    return player == computer
}

//Checking if player won against a computer
function didPlayerWon(player, computer){


    /* I will forget about this return statemnt so I'll write how it works
       On the rock example
       If I choose rock then for me to win computer must choose scissors
       Hence the computer == 'scissors' part. If it's true then I win. That's it.
    */
        
    switch(player){
        case 'rock':
            return computer == 'scissors';
        case 'paper':
            return computer == 'rock';
        case 'scissors':
            return computer == 'paper';
        default:
            return false
    }
}

function playRound(player, computer){


    // Rock -> Scissors
    // Scissors -> Paper
    // Paper -> Rock

    // There are 3 possibilities 
    // Draw | Player won | Computer won

    //Too lazy to CtrlV CtrlC
    let message =  `You chosed ${player} computer chosed ${computer}`;

    roundsPlayed += 1;
    pRoundNumber.textContent = roundsPlayed;

    if (isDraw(player, computer)) {

        console.log(`${MSG_DRAW} ${message}`);

        drawCount += 1;

        pDraws.textContent = drawCount;

        return 
    }

    if(didPlayerWon(player, computer)){

        console.log(`${MSG_WON}  ${message}`);

        playerScore += 1;

        pWins.textContent = playerScore;

        return
    }
    else if (!didPlayerWon(player, computer)){
        
        console.log(`${MSG_LOST} ${message}`);

        computerScore +=1

        pLoses.textContent = computerScore;

        return
    }

    console.log('Something went wrong');


}


function checkWinner(playerScore, computerScore){

    if (playerScore == computerScore) return MSG_DRAW
    if (playerScore > computerScore) return MSG_WON
    return MSG_LOST

}


function setGameOverMessage(playerScore, computerScore){

    let finalResults = checkWinner(playerScore, computerScore);

    pGameOverMessage.textContent = finalResults;


}


setGame()