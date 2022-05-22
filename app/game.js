const selectors = document.querySelectorAll(".selection");
const resultDiv = document.querySelector("#result");
const gameBoard = document.querySelector("#gameBoard");
const choices = ["rock", "paper", "scissors"];
let score = sessionStorage.getItem("rps-score") || 0;

//Game functions
const randomize = (length) => {
  const position = Math.floor(Math.random() * length);
  return choices[position];
};

window.addEventListener('load',()=> {
  document.querySelector('#scoreCounter').innerHTML = score;
})
const playGame = (playerChoice, computerChoice) => {
  if ((playerChoice === "rock") & (computerChoice === "scissors")){
    score++;
    return "You Win";}
  else if ((playerChoice === "paper") & (computerChoice === "rock")){
    score++;
    return "You Win";}
  else if ((playerChoice === "scissors") & (computerChoice === "paper")){
    score++;
    return "You Win";}
  else if (playerChoice === computerChoice) return "Tie";
  else {
    score--;
    return "You Lose";}
};

//Views
const renderUserSelection = (id) => {
  const userSelection = document.createElement("div");
  userSelection.classList.add("selection");
  userSelection.id = id;
  userSelection.style.gridArea = "pos1";
  userSelection.innerText = "";
  return userSelection;
};
//would be better with promises
const renderComputerSelection = (id) => {
  const selection = renderUserSelection(id);
  selection.style.gridArea = "pos2";
  const choicesForLoop = choices.concat(choices);
  gameBoard.appendChild(selection);
  for (let choice in choicesForLoop) {
    setTimeout(() => {
      selection.id = choicesForLoop[choice];
    }, 250 * choice);
    setTimeout(() => {
      selection.id = id;
    }, 251 * choicesForLoop.length);
  }
};
const renderTexts = (content, position) => {
  const text = document.createElement("div");
  text.classList.add("mainText");
  text.innerText = content;
  text.style.gridArea = position;
  return text;
};
const playAgainButton = () => {
  const button = document.createElement("button");
  button.classList.add("playAgain");
  button.innerText = "Play Again";
  button.addEventListener("click", () => {
    location.reload();
  });
  return button;
};
const renderResults = (result) => {
  const userText = renderTexts("You Picked", "user");
  const computerText = renderTexts("The House Picked", "house");
  const resultText = renderTexts(result, "");
  gameBoard.appendChild(userText);
  gameBoard.appendChild(computerText);
  setTimeout(() => {
    resultDiv.appendChild(resultText);
    resultDiv.appendChild(playAgainButton());
  }, 2000);
};
const play = (id) => {
  const computerChoice = randomize(choices.length);
  const gameResult = playGame(id, computerChoice);
  gameBoard.innerHTML = "";
  gameBoard.appendChild(renderUserSelection(id));
  renderComputerSelection(computerChoice);
  renderResults(gameResult);
};
selectors.forEach((selector) => {
  selector.addEventListener("click", () => {
    const computerChoice = randomize(choices.length);
    const gameResult = playGame(selector.id, computerChoice);
    gameBoard.classList.remove("initialBoard");
    gameBoard.innerHTML = "";
    gameBoard.appendChild(renderUserSelection(selector.id));
    renderComputerSelection(computerChoice);
    renderResults(gameResult);
    sessionStorage.setItem("rps-score", score)
    console.log(score)
  });
});
