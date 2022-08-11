console.log("Hello World!");

let score = 0;
let roundNo = 1;
let roundMax = 5;

const bttns = document.getElementById("buttons");
const outputFld = document.getElementById("game-output");
const scoreFld = document.getElementById("score");
const vsFld = document.getElementById("vs");
const roundNoFld = document.getElementById("round");
const resetBttn = document.getElementById("reset");
const overFld = document.getElementById("over");

buttons.addEventListener("click", event => {
  if (event.target.nodeName == "BUTTON") {
    handleClick(event.target.textContent.toLowerCase());
}});
 
resetBttn.addEventListener("click", resetGame);

function getComputerItem() {
  let x = Math.floor(Math.random()*3);
  switch (true) {
    case x===0: 
      return "rock";
    case x===1: 
      return "paper";
    case x===2:
      return "scissors";
  }
}

function playRound(UserItem, ComputerItem) {
  switch (true) {
    case UserItem===ComputerItem:
      return `It's a draw!`;
  
    case UserItem==="rock" && ComputerItem==="paper":
    case UserItem==="paper" && ComputerItem==="scissors":
    case UserItem==="scissors" && ComputerItem==="rock":
      return `You have lost...`;
      
    case UserItem==="rock" && ComputerItem==="scissors":
    case UserItem==="paper" && ComputerItem==="rock":
    case UserItem==="scissors" && ComputerItem==="paper":
      incrementScore();
      return `You won!`;
        
    default:
      return "Something went wrong";
  }
}

function playGame(UserItem, lastGame=false) {
  roundNoFld.textContent = `Round ${roundNo}`
  let ComputerItem = getComputerItem();
  vsFld.textContent = `${UserItem} vs. ${ComputerItem}`
  outputFld.textContent = playRound(UserItem, ComputerItem);
  scoreFld.textContent = `Your score is ${score}`;
  if (lastGame) endGame();
    roundNo += 1;
}

function handleClick(UserItem) {
  switch (true) {
    case (roundNo < roundMax):
      playGame(UserItem);
      break;
    case (roundNo === roundMax):
      playGame(UserItem, true);
      break;
    default:
      resetGame();
      playGame(UserItem);
  }
}

function incrementScore() {
  score += 1; //happens inside playRound function
}

function endGame() {
  overFld.classList.add("gameOver");
  overFld.innerText = `Game over!\n
    Your total score is ${score}\n
    Press any button to start over...`;
}

function resetGame() {
  roundNo =1;
  score =0;
  roundNoFld.textContent="Press a button to start";
  vsFld.textContent="";
  outputFld.textContent="";
  scoreFld.textContent="";
  overFld.textContent="";
  overFld.classList.remove("gameOver");
}