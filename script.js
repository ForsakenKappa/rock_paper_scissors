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


let playerChoice = '';
let computerChoice = '';

const msgWon = 'You won!';
const msgLost = 'You lost!';
const msgDraw = 'It\'s a draw!'

//TODO Scoring
let computerScore = 0;
let playerScore = 0;

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

function computerChoosing(){

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

        alert(`${msgDraw} ${message}`);
        return 
    }

    if(didPlayerWon(player, computer)){
        alert(`${msgWon}  ${message}`);
        return
    }
    else if (!didPlayerWon(player, computer)){
        alert(`${msgLost} ${message}`);
        return
    }

    console.log('Something went wrong');


}


function gameLoop(numberOfRounds)
{   

    for (let i = 0; i < numberOfRounds; i++){

        playerChoice = prompt(' Choose between "Rock", "Paper" and "Scissors" ')

        // If the input is null, 0 or undefined stop the game
        if (!playerChoice) break;

        playerChoice = playerChoice.toLowerCase()

        console.log('Game number ' + (i+1))

        if (isChoiceCorrect(playerChoice)){

            computerChoice = computerChoosing();
            playRound(playerChoice, computerChoice);

        }
        else{

            alert(`Oopise, there is no ${playerChoice} in this game!`); //Sounds afwul :D

            i--; //Not punishing for misspells 

        }

        console.log('');
        
    }

}

gameLoop(5)

console.clear()
console.log('Thank you for playing this humble game by a no-name');
