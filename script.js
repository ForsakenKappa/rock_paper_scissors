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
const gameBtns = document.querySelectorAll('.button-container>button');

let computerChoice = '';
let playerChoice = '';

let computerScore = 0;
let playerScore = 0;
let drawCount = 0;



gameBtns.forEach(function(button){
    button.addEventListener('click', handleEvents)
})


function handleEvents(e){
    computerChoice = makeRandomChoice();
    playerChoice = this.className; // Class names are '.rock' , '.paper' , and '.scissors' obviosly 
    playRound(playerChoice, computerChoice);
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

    if (isDraw(player, computer)) {

        console.log(`${MSG_DRAW} ${message}`);

        drawCount += 1;

        return 
    }

    if(didPlayerWon(player, computer)){

        console.log(`${MSG_WON}  ${message}`);

        playerScore += 1;

        return
    }
    else if (!didPlayerWon(player, computer)){
        
        console.log(`${MSG_LOST} ${message}`);

        computerScore +=1

        return
    }

    console.log('Something went wrong');


}


function checkWinner(playerScore, computerScore){

    if (playerScore == computerScore) return MSG_DRAW
    if (playerScore > computerScore) return MSG_WON
    return MSG_LOST

}


function printGameOverMessage(playerScore, computerScore, drawCount){

    let finalResults = checkWinner(playerScore, computerScore);
    let finalMessage = `Your score is ${playerScore} \nComputer's score is ${computerScore} \nThere was ${drawCount} draws`

    console.clear();
    if (!canPlayerChoose){
        console.log('PC fought itself so...')
        finalResults +=' Kinda...';
    }
    console.log(finalResults)
    console.log(finalMessage);
    console.log('Thanks for playing!')
    console.log('Press F5 to restart.')

}


function gameLoop()
{   
    handleGame();

    printGameOverMessage(playerScore, computerScore, drawCount)

}

