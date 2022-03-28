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


const msgWon = 'You won!';
const msgLost = 'You lost!';
const msgDraw = 'It\'s a draw!'

let playerChoice = '';
let computerChoice = '';

let computerScore = 0;
let playerScore = 0;
let drawCount = 0;

let canPlayerChoose = true;
let isStopped = false;


//We need to check if player made a choice
function isChoiceCorrect(playerChoice){

    console.log('Checking choice')

    console.log(`Player choosed ${playerChoice}`);

    switch(playerChoice){
        case 'rock':
        case 'paper':
        case 'scissors':
            return true
        default:
            return false
    }
    

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

        console.log(`${msgDraw} ${message}`);

        drawCount += 1;

        return 
    }

    if(didPlayerWon(player, computer)){

        console.log(`${msgWon}  ${message}`);

        playerScore += 1;

        return
    }
    else if (!didPlayerWon(player, computer)){
        
        console.log(`${msgLost} ${message}`);

        computerScore +=1

        return
    }

    console.log('Something went wrong');


}


function checkWinner(playerScore, computerScore){

    if (playerScore == computerScore) return msgDraw
    if (playerScore > computerScore) return msgWon
    return msgLost

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

function handleGame(roundNumber){

    console.log('');
    console.log('Game number ' + (roundNumber))
    if (canPlayerChoose) {playerChoice = prompt(' Choose between "Rock", "Paper" and "Scissors" ')}

    // If the input is null, 0 or undefined stop the game
    // return 1 means that we need to stop the game
    if (!playerChoice) return 1;

    if (canPlayerChoose && playerChoice == '42' && roundNumber == 1 ){
        canPlayerChoose = false;
        gameLoop(42);
        return 1;
    }

    canPlayerChoose? playerChoice = playerChoice.toLowerCase() : playerChoice = makeRandomChoice()

   
    if (isChoiceCorrect(playerChoice)){

        computerChoice = makeRandomChoice();
        playRound(playerChoice, computerChoice);

    }
    else{

        console.log(`Oopise, there is no ${playerChoice} in this game!`); //Sounds afwul :D

        if (handleGame(roundNumber)) return 1; //Not punishing for misspells 

    }

}

function gameLoop(numberOfRounds = 5)
{   

    for (let i = 1; i <= numberOfRounds; i++){

        isStopped = handleGame(i);
        if (isStopped) break;
        
    }

    if (isStopped){
        canPlayerChoose? console.log('You aborted the game!') : printGameOverMessage(playerScore, computerScore, drawCount);
    }
    else{
        printGameOverMessage(playerScore, computerScore, drawCount);
    }

}


gameLoop();
