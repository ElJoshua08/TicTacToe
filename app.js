// Elements
const body = document.body;
const theme_toggle = document.getElementById("theme-btn");

const game_container = document.querySelector(".game-container");
game_container.classList.add("active");
const turn = document.querySelector(".turn");
turn.classList.add("active");

const win_menu = document.querySelector(".win-menu");
const win_text = document.querySelector(".title");
const replay_btn = document.querySelector(".win-btn");

const cells = document.querySelectorAll(".cell");
const letter = document.querySelector(".letter");

// Variables
const X = "fa-x";
const O = "fa-o";

const wining_combos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn = true;
let activeCellsArray = Array(9).fill(null);

// Restart on replay btn click
replay_btn.addEventListener("click", restart);

function restart() {
  activeCellsArray = Array(9).fill(null);
  cells.forEach((cell) => {
    cell.classList.remove("active");
    cell.classList.remove("static");
    cell.firstChild.classList.remove(X);
    cell.firstChild.classList.remove(O);
  });

  turn.style.opacity = 1;
  game_container.style.opacity = 1;

  win_menu.classList.remove('active')

  xTurn = true;
  letter.innerHTML = "X";

  console.log('xq ahora no vas')
}

function onStart() {
  gameLogic();
}

function gameLogic() {
  cells.forEach((cell, index) => {
    cell.addEventListener("click", function () {
      if (!cell.classList.contains("static")) {
        if (xTurn) {
          cell.firstChild.classList.add(X);
          cell.classList.add("static");

          letter.classList.add(O);
          letter.classList.remove(X);
        } else {
          cell.firstChild.classList.add(O);
          cell.classList.add("static");

          letter.classList.add(X);
          letter.classList.remove(O);
        }

        cell.classList.add("active");

        activeCellsArray.splice(index, 1, cell.firstChild.classList.item(1));

        letter.innerHTML = xTurn == true ? "O" : "X";

        xTurn = !xTurn;
      }
      let winPlayer = checkWin() ? checkWin() : null;
      if (winPlayer) {
        game_container.style.opacity = 0.1;
        turn.style.opacity = 0.1;

        win_text.innerHTML = winPlayer;
        win_menu.classList.add("active");
      } else if (!activeCellsArray.includes(null)) {
        turn.style.opacity = 0.1;
        game_container.style.opacity = 0.1;

        win_text.classList.add("draw");

        win_text.innerHTML = "Draw";
        win_menu.classList.add("active");
      }
    });
  });
}

function checkWin() {
  for (const [a, b, c] of wining_combos) {
    if (activeCellsArray[a] != null) {
      let letter = activeCellsArray[a];

      if (activeCellsArray[b] == letter && activeCellsArray[c] == letter) {
        return letter == "fa-x" ? "X has won!" : "O has won!";
      }
    }
  }
  return false;
}

// Change theme on btn click
theme_toggle.onclick = (e) => {
  theme_toggle.classList.toggle("light");
  game_container.classList.toggle("light");
  win_menu.classList.toggle("light");
  turn.classList.toggle("light");
  body.classList.toggle("light");
  letter.classList.toggle("light");
};

onStart();