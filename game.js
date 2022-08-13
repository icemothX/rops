console.log("Hello World!");

let userScore = 0;
let computerScore = 0;
let roundNo = 1;
let scoreMax = 5;
let winner = "";

const bttns = document.querySelectorAll("button");
const resetBttn = document.getElementById("reset");
const leftBttns = document.querySelector(".left");

const roundNoFld = document.getElementById("round");
const vsFld = document.getElementById("vs");
const outputFld = document.getElementById("game-output");
const scoreFld = document.getElementById("score");
const overFld = document.getElementById("over");
const pressFld = document.getElementById("press");

leftBttns.addEventListener("click", event => {
  if (event.target.nodeName == "BUTTON") {
    handleClick(event);
}});
 
resetBttn.addEventListener("click", e => {
  resetBttn.classList.add("uponClick");
  resetGame(e);
});

bttns.forEach(btn => btn.addEventListener("transitionend", removeTransition))

function removeTransition(event) {
  if (event.propertyName!="transform") return;
  event.target.classList.remove("uponClick");
}

function handleClick(button) {
  button.target.classList.add("uponClick");
  if (winner!="") resetGame();
  playGame(button.target.textContent.toLowerCase());
}

  function playGame(UserItem) {
    roundNoFld.textContent = `Round ${roundNo}`
    let ComputerItem = getComputerItem();
    vsFld.textContent = `${UserItem} vs. ${ComputerItem}`
    outputFld.textContent = playRound(UserItem, ComputerItem);
    scoreFld.textContent = `You: ${userScore} --- Computer: ${computerScore}`;
    if (checkWinner()) endGame();
      roundNo += 1;
  }

function playRound(UserItem, ComputerItem) {
  switch (true) {
    case UserItem===ComputerItem:
      return `It's a draw!`;
  
    case UserItem==="rock" && ComputerItem==="paper":
    case UserItem==="paper" && ComputerItem==="scissors":
    case UserItem==="scissors" && ComputerItem==="rock":
      computerScore += 1;
      return `+1 for computer...`;
      
    case UserItem==="rock" && ComputerItem==="scissors":
    case UserItem==="paper" && ComputerItem==="rock":
    case UserItem==="scissors" && ComputerItem==="paper":
      userScore += 1;
      return `+1 for you!`;
        
    default:
      return "Something went wrong";
  }
}

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


function checkWinner() {
  if (computerScore >= 5) {
    winner="computer";
    return true;
  }
  if (userScore >= 5) {
    winner="user";
    return true;
  }
  return false;
}

function endGame() {
  overFld.innerText = winner==="user" ? 
  "You win!" : "You lose!";
  pressFld.style.visibility="visible";
}

function resetGame() {
  roundNo =1;
  userScore =0;
  computerScore=0;
  winner="";
  roundNoFld.textContent="Press a button to start";
  vsFld.textContent="";
  outputFld.textContent="";
  scoreFld.textContent="";
  overFld.textContent="";
  pressFld.style.visibility="hidden";
}