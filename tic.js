let boxes = document.querySelectorAll(".box");
let msg = document.querySelector(".msg");
let msgContainer = document.querySelector(".msgContainer");
let resetGame = document.querySelector(".resetGame");
let newGame = document.querySelector(".newGame");
let ternO = true;
let moves = 0;
const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
];

const resetButton = () => {
  ternO = true; // Reset to true to start with 'O'
  moves = 0;
  ternO = false;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (ternO) {
      box.innerText = "O";
      box.style.color = "blue";
      ternO = false;
    } else {
      box.innerText = "X";
      box.style.color = "yellow";
      ternO = true;
    }

    box.disabled = true;
    moves++;
    checkWinner();
  });
});

const showWinner = (winner) => {
  msg.innerText = `Congratulation, ${winner} you won this game `;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const showTie = () => {
  msg.innerText = `  Game is tied!!`;
  msg.style.textAlign = "center";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

function checkWinner() {
  for (const pattern of winningPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos3);
      }
    }
  }
  if (moves === 9) {
    showTie();
  }
}

resetGame.addEventListener("click", resetButton);
newGame.addEventListener("click", resetButton);
