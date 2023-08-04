// Variables
const game_container = document.querySelector('.game-container')
game_container.classList.add('active')
const turn = document.querySelector('.turn')
turn.classList.add('active')

const win_menu = document.querySelector('.win-menu')
const win_text = document.querySelector('h1')
const replay_btn = document.querySelector('.win-btn')

const cells = document.querySelectorAll('.cell')
const letter = document.querySelector('h2')

const X = 'fa-x'
const O = 'fa-o'

const wining_combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let xTurn = true;
let activeCellsArray = Array(9).fill(null)

replay_btn.addEventListener('click', restart)

function restart() {
    activeCellsArray = Array(9).fill(null)
    cells.forEach((cell) => {
        cell.classList.remove('active')
        cell.classList.remove('static')
        cell.firstChild.classList.remove(X)
        cell.firstChild.classList.remove(O)

    })
    win_menu.classList.remove('active')
    game_container.classList.add('active')
    turn.classList.add('active')
    xTurn = true;

    letter.innerHTML = 'X'
    letter.style.textShadow = '0 0 5px rgb(255, 255, 0)'
    letter.style.color = 'rgb(255, 255, 0)'
}

function onStart() {
    gameLogic()
}

function gameLogic() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', function() {
            if(!cell.classList.contains('static')) {
                if(xTurn) {
                    cell.firstChild.classList.add(X)
                    cell.firstChild.style.color = 'rgb(255, 255, 0)'
                    cell.firstChild.style.textShadow = '0 0 5px rgb(255, 255, 0)'
                    cell.classList.add('static')
                    
                } else {
                    cell.firstChild.classList.add(O)
                    cell.firstChild.style.color = 'rgb(0, 255, 255)'
                    cell.firstChild.style.textShadow = '0 0 5px rgb(0, 255, 255)'
                    cell.classList.add('static')
                }

                cell.classList.add('active')

                activeCellsArray.splice(index, 1, cell.firstChild.classList.item(1))

                letter.innerHTML = xTurn == true ? 'O' : 'X'
                letter.style.textShadow = xTurn == true ? '0 0 5px rgb(255, 255, 0)' : '0 0 5px rgb(0, 255, 255)'
                letter.style.color = xTurn == true ? 'rgb(0, 255, 255)' : 'rgb(255, 255, 0)' 
                xTurn = !xTurn
            }
            let winPlayer = checkWin() ? checkWin() : null
            if(winPlayer) {
                game_container.classList.remove('active')
                turn.classList.remove('active')

                win_text.innerHTML = winPlayer

                if(winPlayer == 'X has won!') {
                    win_text.style.color = 'yellow'
                    win_text.style.textShadow = '0 0 5px yellow'
                } else if(winPlayer == 'O has won!') {
                    win_text.style.color = 'cyan'
                    win_text.style.textShadow = '0 0 5px cyan'
                } else {
                    win_text.style.color = 'white'
                    win_text.style.textShadow = '0 0 5px white'
                }

                win_menu.classList.add('active')
            } 
            else if(!activeCellsArray.includes(null)) {
                game_container.classList.remove('active')
                turn.classList.remove('active')

                win_text.style.color = 'white'
                win_text.style.textShadow = '0 0 5px white'
                
                win_text.innerHTML = 'Draw'
                win_menu.classList.add('active')
            }
        })
    })
}

function checkWin() {
    for (const [a, b, c] of wining_combos) {
        if(activeCellsArray[a] != null) {
            let letter = activeCellsArray[a]

            if(activeCellsArray[b] == letter && activeCellsArray[c] == letter) {
                return letter == 'fa-x' ? 'X has won!' : 'O has won!'
            }
        }
    }
    return false
}

onStart()
